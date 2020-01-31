import Component from '@ember/component';
import { computed } from '@ember/object';
import { alias, sort } from '@ember/object/computed';

export default Component.extend({
  //Element Attributes
  classNames: ['ui', 'cards'],
  //Computed Properties
  sortedResumes: sort('resumes', function(a, b) {
    return 0;
  }),
  actions: {
    deleteResume(resume) {
      this.get('deleteResume')(resume);
    }
  }
});
