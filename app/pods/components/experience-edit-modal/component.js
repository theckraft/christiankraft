import UiModal from 'semantic-ui-ember/components/ui-modal';
import {
  computed
} from '@ember/object';
import {
  isEmpty
} from '@ember/utils';
import Changeset from 'ember-changeset';
import { alias, sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default UiModal.extend({
  notify: service(),
  changeset: null,
  today: null,

  init() {
    this._super(...arguments);
    let today = new Date();
    this.set('today', today);
  },

  didInsertElement() {
    this._super(...arguments);
    let experience = this.get('experience');
    let validator = function({ key, newValue, oldValue, changes, content }) {
      return true;
    };
    let changeset = new Changeset(experience, validator);
    this.set('changeset', changeset);
  },
  didRender() {
    this._super(...arguments);
    let startDate = get(this, 'changeset.startDate');
    let endDate = get(this, 'changeset.endDate');
    if(startDate && endDate) {
      let startDateCalendarId = this.get('startDateCalendarId');
      let endDateCalendarId = this.get('endDateCalendarId');
      this.$(`#${startDateCalendarId}`).calendar('set date', startDate, true, false);
      this.$(`#${endDateCalendarId}`).calendar('set date', endDate, true, false);
    }
  },

  //Computed Properties

  startDateCalendarId: computed('experience', function() {
    let id = this.get('experience.id');
    return `startDateCalendarFor${id}`;
  }),
  endDateCalendarId: computed('experience', function() {
    let id = this.get('experience.id');
    return `endDateCalendarFor${id}`;
  }),
  isInvalidForm: computed('changeset.title', 'changeset.company', 'changeset.location', 'changeset.startDate', 'changeset.endDate', 'changeset.description', function() {
    let title = this.get('changeset.title'),
      company = this.get('changeset.company'),
      location = this.get('changeset.location'),
      startDate = this.get('changeset.startDate'),
      endDate = this.get('changeset.endDate'),
      description = this.get('changeset.description');

    let isPristine = this.get('changeset.isPristine');

    let isNull = isEmpty(title) ||
      isEmpty(company) || isEmpty(location) || startDate === null ||
      endDate === null;

    return isNull || isPristine;
  }),
  actions: {
    submit(changeset) {
      this.get('notify').success('Experience Modified!');
      return changeset.save();
    },
    rollback(changeset) {
      return changeset.rollback();
    },
    delete() {
      let experience = this.get('experience');
      experience.destroyRecord();
      this.$().modal('hide');
      this.get('notify').info('Experience Deleted!');
    }
  }
});
