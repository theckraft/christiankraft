import UiModal from 'semantic-ui-ember/components/ui-modal';
import {
  computed
} from '@ember/object';
import {
  isEmpty
} from '@ember/utils';

export default UiModal.extend({

  //Component Attributes
  classNames: [],

  name: "",
  notes: "",

  didInsertElement() {
    this._super(...arguments);
    let self = this;
    this.send('resetSkill');
  },

  //Computed Properties
  isInvalidForm: computed('name', 'notes', function() {
    let name = this.get('name'),
      notes = this.get('notes');

    let isNull = isEmpty(name);

    return isNull;
  }),

  actions: {
    resetSkill: function() {
      this.set('name', '');
      this.set('notes', '');
      this.$("form input").each(function() {
        $(this).val("");
      });
    },
    submit: function() {
      let skillData = {
        name: this.get('name'),
        notes: this.get('notes')
      }
      this.get('createSkill')(skillData);
      this.send('resetSkill');
      this.$().modal('hide');
    },
    cancel: function() {
      this.send('resetSkill');
    }
  }
});
