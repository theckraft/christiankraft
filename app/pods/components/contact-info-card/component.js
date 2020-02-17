import Component from '@ember/component';
import {
  computed
} from '@ember/object';

export default Component.extend({
  //Element Attributes
  classNames: ['ui', 'card'],
  actions: {
    openModal: function() {
      this.$('.ui.modal').modal('show');
    }
  }
});
