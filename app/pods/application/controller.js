import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    signIn: function(provider) {
      let self = this;
      this.get('session').open('firebase', {
        provider: provider
      }).then(function(data) {
        self.send('refresh');
      });
    },
    signOut: function() {
      let session = this.get('session');
      let currentUser = session.get('currentUser');
      currentUser.unloadRecord();
      session.close();
      this.send('refresh');
    }
  }
});
