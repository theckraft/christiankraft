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
  session: service('session'),
  notify: service('notify'),
  resume: alias('model'),
  contactInfos: alias('resume.contactInfos'),
  resumeController: controller('resume'),
  isOwner: alias('resumeController.isOwner'),
  actions: {
    createContactInfo(contactInfoData) {
      let self = this;
      let resume = this.get('resume');
      let user = this.get('session.currentUser');
      let newContactInfo = this.get('store').createRecord('contact-info', {
        type: contactInfoData.type,
        value: contactInfoData.value,
        resume: resume
      });
      resume.get('contactInfos').pushObject(newContactInfo);
      newContactInfo.save().then((contactInfo) => {
        resume.save();
        self.get('notify').success('Contact Information Created!');
      }).catch((error) => {
        console.log(error);
        self.get('notify').error('Could Not Create Contact Information!');
      });
    }
  }
});
