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
    delete() {
      let resume = this.get('resume');

      let experiences = resume.get('experiences');
      experiences.forEach(function(experience) {
        experience.destroyRecord();
      });

      let skills = resume.get('skills');
      skills.forEach(function(skill) {
        skill.destroyRecord();
      });

      resume.destroyRecord();
      
      this.get('notify').info('Resume Deleted!');
      this.transitionToRoute('dashboard');
    }
  }
});
