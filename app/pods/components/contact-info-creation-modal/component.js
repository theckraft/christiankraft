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

  type: "",
  possibleTypes: ['Email', 'Phone', 'LinkedIn'],
  value: "",

  didInsertElement() {
    this._super(...arguments);
    this.send('resetContactInfo');
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
    resetContactInfo: function() {
      this.set('type', '');
      this.set('value', '');
      this.$("form input").each(function() {
        $(this).val("");
      });
    },
    submit: function() {
      let contactInfoData = {
        type: this.get('type'),
        value: this.get('value')
      }
      this.get('createContactInfo')(contactInfoData);
      this.send('resetContactInfo');
      this.$().modal('hide');
    },
    cancel: function() {
      this.send('resetContactInfo');
    }
  }
});
