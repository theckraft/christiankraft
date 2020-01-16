import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  company: DS.attr('string'),
  location: DS.attr('string'),
  startDate: DS.attr('date'),
  endDate: DS.attr('date'),
  description: DS.attr('string'),
  resume: DS.belongsTo('resume', { inverse: 'experiences' })
});
