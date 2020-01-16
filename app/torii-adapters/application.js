import EmberObject from '@ember/object';
import { inject as service } from '@ember/service';
import { Promise } from 'rsvp';
import { reject } from 'rsvp';

export default EmberObject.extend({
  firebaseApp: service(),
  session: service(),
  store: service(),
  /**
   * Executed after Firebase authentication.
   *
   * Find or create the user based on the Firebase `authData`
   *
   * @param  {Object} authData
   * @return {Promise<Object>} Updated session info
   */
  open(authData) {
    return this._findOrCreateUser(authData)
      .then((user) => {
        return { currentUser: user };
      });
  },

  /**
   * Fetch an existing Firebase auth session and place into `session.currentUser`
   *
   * @return {Promise<Object>} Updated session info
   */
   fetch() {
     return this.fetchAuthState_()
       .then((user) => {
         if (!user) {
           return this.fetchRedirectState_();
         }
         return user;
       })
       .then((user) => {
         if (!user) {
           return reject(new Error('No session available'));
         }
         return this.open(user);
       })
       .catch((err) => reject(err));
   },

   /**
   * Fetches the redirect user, if any.
   *
   * @return {!Promise<?firebase.User>}
   * @private
   */
  fetchRedirectState_() {
    let auth = this.get('firebaseApp').auth();
    return auth.getRedirectResult()
      .then(result => result.user);
  },


  /**
   * Promisifies the first value of onAuthStateChanged
   *
   * @return {!Promise<?firebase.User>}
   * @private
   */
  fetchAuthState_() {
    return new Promise((resolve, reject) => {
      let auth = this.get('firebaseApp').auth();
      const unsub = auth.onAuthStateChanged((user) => {
        unsub();
        resolve(user);
      },
      (err) => {
        unsub();
        reject(err);
      });
    });
  },

  /**
   * Close existing authenticated session
   *
   * @return {Promise}
   */
  close() {
    let auth = this.get('firebaseApp').auth();
    return auth.signOut();
  },

  /**
   * Find the user with the given `authData`, create if not found
   *
   * @param  {Object} authData
   * @return {Promise<Object>} The user
   */
  _findOrCreateUser(authData) {
    let store = this.get('store');

    return store.find('user', authData.uid)
      .catch(() => {
        let newUser = store.createRecord('user', this.extractUserProperties(authData));
        return newUser.save();
      });
  },

  /**
   * Extract the user properties from `authData` that you care about.
   *
   * @param  {Object} authData
   * @return {Object} An updated property hash
   */
  extractUserProperties(authData) {

    var name = 'Unknown';
    if (authData.displayName) {
      name = authData.displayName;
    } else if (authData.username) {
      name = authData.username;
    }

    return {
      id: authData.uid,
      username: name,
      email: authData.email || null
    };
  }
});
