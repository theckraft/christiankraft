import Component from '@ember/component';
import {
  computed
} from '@ember/object';

export default Component.extend({
  //Element Attributes
  classNames: ['ui', 'raised', 'link', 'fluid card'],
  //Computed Properties
  lastUpdatedDateFormatted: computed('', function() {
    let date = this.get('');
    let options = {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    let dateFormatted = startDate.toLocaleDateString("en-US", options);
    return dateFormatted;
  })
});
