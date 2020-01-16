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

  firstName: "",
  lastName: "",
  description: "",
  //Computed Properties
  isInvalidForm: computed('firstName', 'lastName', function() {
    let firstName = this.get('firstName'),
      lastName = this.get('lastName');

    let isNull = isEmpty(firstName) ||
      isEmpty(lastName) ;

    return isNull;
  }),
  didInsertElement() {
    this._super(...arguments);
    this.send('resetResume');
  },
  actions: {
    resetResume: function() {
      this.set('firstName', '');
      this.set('lastName', '');
      this.$("form input").each(function() {
        $(this).val("");
      });
    },
    submit: function() {
      let resumeData = {
        firstName: this.get('firstName'),
        lastName: this.get('lastName')
      }
      this.get('createResume')(resumeData);
      this.send('resetResume');
      this.$().modal('hide');
    },
    cancel: function() {}
  }
});
