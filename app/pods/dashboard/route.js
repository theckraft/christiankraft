import Route from '@ember/routing/route';
import {
  inject as service
} from '@ember/service';

export default Route.extend({
  session: service(),
  beforeModel: function() {
    // return this.transitionTo('/resume/-L_h_z2CUcvemirlw_vB')
  },
  model() {
    let session = this.get('session');
    if (session.get('isAuthenticated')) {
      let user = this.get('session.currentUser');
      if(user) {
        return user.get('resumes');
      } else {
        return [];
      }
    }
  }
});
