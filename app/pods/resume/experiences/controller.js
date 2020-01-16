import Controller, {
  inject as controller
} from '@ember/controller';
import {
  alias
} from '@ember/object/computed';
import {
  inject as service
} from '@ember/service';

export default Controller.extend({
  session: service('session'),
  notify: service('notify'),
  resume: alias('model'),
  experiences: alias('resume.experiences'),
  resumeController: controller('resume'),
  isOwner: alias('resumeController.isOwner'),
  actions: {
    createExperience(experienceData) {
      let self = this;
      let resume = this.get('resume');
      let user = this.get('session.currentUser');
      let newExperience = this.get('store').createRecord('experience', {
        title: experienceData.title,
        company: experienceData.company,
        location: experienceData.location,
        startDate: experienceData.startDate,
        endDate: experienceData.endDate,
        description: experienceData.description,
        resume: resume
      });
      resume.get('experiences').pushObject(newExperience);
      newExperience.save().then((experience) => {
        resume.save();
        self.get('notify').success('Experience Created!');
      }).catch((error) => {
        console.log(error);
        self.get('notify').error('Could Not Create Experience!');
      });
    }
  }
});
