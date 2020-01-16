import Component from '@ember/component';
import {
  computed
} from '@ember/object';

export default Component.extend({
  classNames: ['ui', 'centered', 'card', 'margin: auto;'],
  currentTitle: computed('resume.experiences.@each.endDate', function() {
    let output = "";
    let experiences = this.get('resume.experiences');
    let sortedExperiences = experiences.sortBy('startDate');
    sortedExperiences.forEach(function(experience) {
      let endDate = experience.get('endDate');
      if (endDate &&
        new Date().getMonth() == endDate.getMonth() &&
        new Date().getYear() == endDate.getYear()) {
        output += experience.get('title') + " ";
      }
    });
    return output;
  }),
  actions: {
    openModal: function() {
      this.$('.ui.modal').modal('show');
    }
  }
});
