import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel( /* transition */ ) {
    window.location.replace("https://drive.google.com/file/d/1YudmO2KuKluoGAk_aSCxXaB7lyYKhQNC/view?usp=sharing");
  }
});
