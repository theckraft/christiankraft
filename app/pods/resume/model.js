import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  fullName: computed('firstName', 'lastName', function() {
     let firstName = this.get('firstName');
     let lastName = this.get('lastName');
     return `${firstName} ${lastName}`;
  }),
  description: DS.attr('string'),
  photoURL: DS.attr('string'),
  experiences: DS.hasMany('experience', { inverse: 'resume' }),
  skills: DS.hasMany('skill', { inverse: 'resume' }),
  contactInfos: DS.hasMany('contact-info', { inverse: 'resume' }),
  user: DS.belongsTo('user', { inverse: 'resumes' })
});
