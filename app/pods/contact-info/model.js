import DS from 'ember-data';

export default DS.Model.extend({
  type: DS.attr('string'),
  value: DS.attr('string'),
  resume: DS.belongsTo('resume')
});
