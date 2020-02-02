import UiModal from 'semantic-ui-ember/components/ui-modal';
import {
  computed
} from '@ember/object';
import {
  isEmpty
} from '@ember/utils';
import {
  set
} from '@ember/object';
import Changeset from 'ember-changeset';
import {
  inject as service
} from '@ember/service';
import Ember from 'ember';
import { task } from 'ember-concurrency';

export default UiModal.extend({
  //Service Injections
  notify: service(),
  firebaseApp: service(),
  store: service(),

  //Component Attributes
  classNames: [],
  changeset: null,
  //Computed Properties
  isInvalidForm: computed('changeset.firstName', 'changeset.lastName', function() {
    let firstName = this.get('changeset.firstName'),
      lastName = this.get('changeset.lastName');

    let isNull = isEmpty(firstName) ||
      isEmpty(lastName);

    return isNull;
  }),
  didInsertElement() {
    this._super(...arguments);
    let resume = this.get('resume');
    let validator = function({
      key,
      newValue,
      oldValue,
      changes,
      content
    }) {
      return true;
    };
    let changeset = new Changeset(resume, validator);
    this.set('changeset', changeset);
  },
  uploadPhoto: task(function * (data) {
    let changeset = this.get('changeset');

    let queue = data.get('queue');
    let file = queue.get('files')[0].get('blob');
    let id = data.get('id');

    let firebase = this.get('firebaseApp');

    const storageRef = firebase.storage().ref();
    var uploadTask = storageRef.child('images/' + id).put(file);
    uploadTask.on('state_changed',
        (snapshot) => {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          queue.set('progress', progress);
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
        changeset.set('photoURL', uploadTask.snapshot.downloadURL);
      });
  }).maxConcurrency(3).enqueue(),
  actions: {
    uploadImage(data) {
      this.get('uploadPhoto').perform(data);
    },
    submit(changeset) {
      this.get('notify').success('Resume Modified!');
      return changeset.save();
    },
    rollback(changeset) {
      return changeset.rollback();
    },
    cancel: function() {}
  }
});
