import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('contact-info-edit-modal', 'Integration | Component | contact info edit modal', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{contact-info-edit-modal}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#contact-info-edit-modal}}
      template block text
    {{/contact-info-edit-modal}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
