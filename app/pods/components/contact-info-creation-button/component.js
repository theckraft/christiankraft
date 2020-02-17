import Component from '@ember/component';

export default Component.extend({
  actions: {
    openModal: function() {
      this.$('.ui.modal').modal('show');
    }
  }
});
