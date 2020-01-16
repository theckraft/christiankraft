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

  title: "",
  company: "",
  location: "",
  startDate: null,
  endDate: null,
  description: "",

  today: null,

  init() {
    this._super(...arguments);
    let today = new Date();
    this.set('today', today);
  },

  didInsertElement() {
    this._super(...arguments);
    this.send('resetExperience');
  },

  //Computed Properties
  isInvalidForm: computed('title', 'company', 'location', 'startDate', 'endDate', 'description', function() {
    let title = this.get('title'),
      company = this.get('company'),
      location = this.get('location'),
      startDate = this.get('startDate'),
      endDate = this.get('endDate'),
      description = this.get('description');

    let isNull = isEmpty(title) ||
      isEmpty(company) || isEmpty(location) || startDate === null ||
      endDate === null;

    return isNull;
  }),

  actions: {
    resetExperience: function() {
      this.set('title', '');
      this.set('company', '');
      this.set('location', '');
      this.set('startDate', null);
      this.set('endDate', null);
      this.set('description', "");
      this.$("form input").each(function() {
        $(this).val("");
      });
    },
    submit: function() {
      let experienceData = {
        title: this.get('title'),
        company: this.get('company'),
        location: this.get('location'),
        startDate: this.get('startDate'),
        endDate: this.get('endDate'),
        description: this.get('description')
      }
      this.get('createExperience')(experienceData);
      this.send('resetExperience');
      this.$().modal('hide');
    },
    cancel: function() {
      this.send('resetExperience');
    }
  }
});
