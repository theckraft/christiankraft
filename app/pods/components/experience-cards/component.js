import Component from '@ember/component';
import { computed } from '@ember/object';
import { alias, sort } from '@ember/object/computed';

export default Component.extend({
  //Element Attributes
  classNames: ['ui', 'cards'],
  //Computed Properties
  sortedExperiences: computed('experiences.@each.endDate', function() {
    let experiences = this.get('experiences');
    return experiences.sortBy('endDate').reverse();
  })
});
