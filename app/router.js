import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('dashboard', { path: '/' });
  this.route('resume', { path: '/resume/:resume_id' }, function() {
    this.route('home', { path: "/" });
    this.route('experiences', { path: '/experiences' } );
    this.route('skills', { path: '/skills' });
    this.route('contact', { path: '/contact' });
  });
});

export default Router;
