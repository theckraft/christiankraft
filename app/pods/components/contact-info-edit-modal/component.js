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
  possibleTypes: ['Email', 'Phone', 'LinkedIn'],

  didInsertElement() {
    this._super(...arguments);
    let contactInfo = this.get('contactInfo');
    let validator = function({ key, newValue, oldValue, changes, content }) {
      return true;
    };
    let changeset = new Changeset(contactInfo, validator);
    this.set('changeset', changeset);
  },

  //Computed Properties
  isInvalidForm: computed('type', 'value', function() {
    let type = this.get('type'),
      value = this.get('value');

    let isNull = isEmpty(type) ||
      isEmpty(value);

    return isNull;
  }),
  actions: {
    submit(changeset) {
      this.get('notify').success('Contact Information Modified!');
      return changeset.save();
    },
    rollback(changeset) {
      return changeset.rollback();
    },
    delete() {
      let contactInfo = this.get('contactInfo');
      contactInfo.destroyRecord();
      this.$().modal('hide');
      this.get('notify').info('Contact Information Deleted!');
    }
  }
});
