import Component from '@ember/component';
import {
  computed
} from '@ember/object';

export default Component.extend({
  //Element Attributes
  classNames: ['ui', 'card'],
  //Computed Properties
  //Lifecycle Hooks
  didInsertElement() {
    this._super(...arguments);
  },
  //Actions
  actions: {
    openModal: function() {
      this.$('.ui.modal').modal('show');
    }
  }
});
