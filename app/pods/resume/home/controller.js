import Controller, {
  inject as controller
} from '@ember/controller';
import {
  alias
} from '@ember/object/computed';
import {
  computed
} from '@ember/object';
import {
  inject as service
} from '@ember/service';
import {
  equal
} from '@ember/object/computed';
import {
  isEqual
} from '@ember/utils';
import Ember from 'ember';
import { task } from 'ember-concurrency';

const { get, set } = Ember;

export default Controller.extend({
  notify: service(),
  firebaseApp: service(),
  store: service(),
  resume: alias('model'),
  resumeController: controller('resume'),
  isOwner: alias('resumeController.isOwner'),
  uploadPhoto: task(function * (data) {
    let queue = data.get('queue');
    console.log(queue);
    let file = queue.get('files')[0].get('blob');
    let fileName = file.name;

    let firebase = this.get('firebaseApp');

    const storageRef = firebase.storage().ref();
    var uploadTask = storageRef.child('images/' + fileName).put(file);
    uploadTask.on('state_changed',
        (snapshot) => {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          queue.set('progress', progress);
          switch (snapshot.state) {
            case 'paused':
              this.set('status', 'Upload is paused');
              break;
            case 'running':
              this.set('status', 'Upload is running');
              break;
          }
        }, (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
            break;
        }
      }, () => {
        queue.get('files').clear();
        console.log('downloadURL', uploadTask.snapshot.downloadURL)
        //this.set('downloadURL', uploadTask.snapshot.downloadURL);
      });
  }).maxConcurrency(3).enqueue(),
  actions: {
    didSelectFiles(file) {
      get(this, 'uploadPhoto').perform(file);
    }
  }
});
