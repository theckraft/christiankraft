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
  skills: alias('resume.skills'),
  resumeController: controller('resume'),
  isOwner: alias('resumeController.isOwner'),
  actions: {
    createSkill(skillData) {
      let self = this;
      let resume = this.get('resume');
      let user = this.get('session.currentUser');
      let newSkill = this.get('store').createRecord('skill', {
        name: skillData.name,
        notes: skillData.notes,
        competence: skillData.competence,
        resume: resume
      });
      resume.get('skills').pushObject(newSkill);
      newSkill.save().then((skill) => {
        resume.save();
        self.get('notify').success('Skill Created!');
      }).catch((error) => {
        console.log(error);
        self.get('notify').error('Could Not Create Skill!');
      });
    }
  }
});
