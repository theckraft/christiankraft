import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      experiences: this.store.findAll('experience')
    });
  }
});
