import DS from 'ember-data';

export default DS.Model.extend({
  username: DS.attr('string'),
  email: DS.attr('string'),
  resumes: DS.hasMany('resume', { inverse: 'user' })
});
