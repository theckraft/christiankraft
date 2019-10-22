import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel( /* transition */ ) {
    window.open("KraftResume.pdf",'_self');
  }
});
