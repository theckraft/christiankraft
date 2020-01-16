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
  competence: 0,

  didInsertElement() {
    this._super(...arguments);
    let self = this;
    this.send('resetSkill');
  },

  //Computed Properties
  isInvalidForm: computed('name', 'notes', 'competence', function() {
    let name = this.get('name'),
      notes = this.get('notes'),
      competence = this.get('competence');

    let isNull = isEmpty(name) || competence == 0;

    return isNull;
  }),

  actions: {
    resetSkill: function() {
      this.set('name', '');
      this.set('notes', '');
      this.set('competence', 0);
      this.$("form input").each(function() {
        $(this).val("");
      });
    },
    submit: function() {
      let skillData = {
        name: this.get('name'),
        notes: this.get('notes'),
        competence: this.get('competence')
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
