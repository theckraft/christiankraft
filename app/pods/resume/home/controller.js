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

export default Controller.extend({
  notify: service(),
  resume: alias('model'),
  resumeController: controller('resume'),
  isOwner: alias('resumeController.isOwner'),
  actions: {
    didSelectFiles(data) {
      console.log(data);
    }
  }
});
