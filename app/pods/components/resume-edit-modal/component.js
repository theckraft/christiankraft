import UiModal from 'semantic-ui-ember/components/ui-modal';
import {
  computed
} from '@ember/object';
import {
  isEmpty
} from '@ember/utils';
import {
  set
} from '@ember/object';
import Changeset from 'ember-changeset';
import {
  inject as service
} from '@ember/service';


export default UiModal.extend({
  //Service Injections
  notify: service(),

  //Component Attributes
  classNames: [],
  changeset: null,
  //Computed Properties
  isInvalidForm: computed('changeset.firstName', 'changeset.lastName', function() {
    let firstName = this.get('changeset.firstName'),
      lastName = this.get('changeset.lastName');

    let isNull = isEmpty(firstName) ||
      isEmpty(lastName);

    return isNull;
  }),
  didInsertElement() {
    this._super(...arguments);
    let resume = this.get('resume');
    let validator = function({
      key,
      newValue,
      oldValue,
      changes,
      content
    }) {
      return true;
    };
    let changeset = new Changeset(resume, validator);
    this.set('changeset', changeset);
  },
  actions: {
    uploadImage(files) {
      this.get("didSelectFiles")(files);
    },
    submit(changeset) {
      console.log("here")
      this.get('notify').success('Resume Modified!');
      return changeset.save();
    },
    rollback(changeset) {
      //this.get('notify').success('Resume Rollback! Did not modify.');
      return changeset.rollback();
    },
    cancel: function() {}
  }
});
