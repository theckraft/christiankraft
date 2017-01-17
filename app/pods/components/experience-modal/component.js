import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['ui', 'modal'],
  actions: {
    open() {
      var self = this;
      var experience = self.get('experience');
    }
  }
});
