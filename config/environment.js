/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'christiankraft',
    podModulePrefix: 'christiankraft/pods',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    firebase: {
      apiKey: "AIzaSyC-6L9oSRstSxJtS2_B-BqGYYHcZlS2XyE",
      authDomain: "resume-builder-ckraft.firebaseapp.com",
      databaseURL: "https://resume-builder-ckraft.firebaseio.com",
      projectId: "resume-builder-ckraft",
      storageBucket: "resume-builder-ckraft.appspot.com",
      messagingSenderId: "498869189458"
    },
    torii: {
      sessionServiceName: 'session'
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
