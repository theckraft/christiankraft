import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';

export default Controller.extend({
  session: service(),
  store: service(),
  notify: service(),
  resumes: alias('model'),
  actions: {
    createResume(resumeData) {
      let self = this;
      let user = this.get('session.currentUser');
      let newResume = this.get('store').createRecord('resume', {
        firstName: resumeData.firstName,
        lastName: resumeData.lastName,
        description: ''
      });
      user.get('resumes').pushObject(newResume);
      newResume.save().then((resume) => {
        user.save();
        self.get('notify').success('Resume Created!');
      }).catch((error) => {
        self.get('notify').error('Could Not Create Resume!');
      });
    }
  }
});
