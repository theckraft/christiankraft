import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import {
  computed
} from '@ember/object';

export default Controller.extend({
  resume: alias('model'),
  session: service('session'),
  user: alias('session.currentUser'),
  isOwner: computed('resume', 'user', function() {
    let user = this.get('user');
    let resume = this.get('resume');
    let owner = resume.get('user');
    if (user) {
      return user.get('id') === owner.get('id');
    } else return false;
  })
});
