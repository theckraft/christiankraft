import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  notes: DS.attr('string'),
  competence: DS.attr('number'),
  resume: DS.belongsTo('resume')
});
