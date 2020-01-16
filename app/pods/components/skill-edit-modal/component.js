import UiModal from 'semantic-ui-ember/components/ui-modal';
import {
  computed
} from '@ember/object';
import {
  isEmpty
} from '@ember/utils';
import Changeset from 'ember-changeset';
import {
  alias,
  sort
} from '@ember/object/computed';
import {
  inject as service
} from '@ember/service';
import {
  get
} from '@ember/object';

export default UiModal.extend({
  notify: service(),
  changeset: null,

  didInsertElement() {
    this._super(...arguments);
    let self = this;
    let skill = this.get('skill');
    let validator = function({
      key,
      newValue,
      oldValue,
      changes,
      content
    }) {
      return true;
    };
    let changeset = new Changeset(skill, validator);
    this.set('changeset', changeset);
  },

  //Computed Properties
  //Computed Properties
  isInvalidForm: computed('changeset.name', 'changeset.notes', 'changeset.competence', function() {
    let name = this.get('changeset.name'),
      notes = this.get('changeset.notes'),
      competence = this.get('changeset.competence');

    let isPristine = this.get('changeset.isPristine');

    let isNull = isEmpty(name) || competence == 0;

    return isNull || isPristine;
  }),
  actions: {
    submit(changeset) {
      this.get('notify').success('Skill Modified!');
      return changeset.save();
    },
    rollback(changeset) {
      return changeset.rollback();
    },
    delete() {
      let skill = this.get('skill');
      skill.destroyRecord();
      this.$().modal('hide');
      this.get('notify').info('Skill Deleted!');
    }
  }
});
