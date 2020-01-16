import Component from '@ember/component';
import { computed } from '@ember/object';
import { alias, sort } from '@ember/object/computed';

export default Component.extend({
  //Element Attributes
  classNames: ['ui', 'cards'],
  //Computed Properties
  sortedSkills: computed('skills.@each.competence', function() {
    let skills = this.get('skills');
    let sorted = skills.sortBy('competence').reverse();
    return sorted;
  })
});
