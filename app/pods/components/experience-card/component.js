import Component from '@ember/component';
import {
  computed
} from '@ember/object';

export default Component.extend({
  //Element Attributes
  classNames: ['ui', 'fluid card'],
  //Computed Properties
  monthRange: computed('experience.startDate', 'experience.endDate', function() {
    let startDate = this.get('experience.startDate');
    let endDate = this.get('experience.endDate');
    let options = {
      year: 'numeric',
      month: 'long'
    };
    let startDateFormatted = (new Date(startDate)).toLocaleDateString("en-US", options);
    let endDateFormatted = new Date(endDate).toLocaleDateString("en-US", options);

    return startDateFormatted + " - " + endDateFormatted;
  }),
  actions: {
    openModal: function() {
      this.$('.ui.modal').modal('show');
    }
  }
});
