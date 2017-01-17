import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  date_range: DS.attr('string'),
  descriptions: DS.attr()
});
