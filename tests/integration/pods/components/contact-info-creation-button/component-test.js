import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('contact-info-creation-button', 'Integration | Component | contact info creation button', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{contact-info-creation-button}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#contact-info-creation-button}}
      template block text
    {{/contact-info-creation-button}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
