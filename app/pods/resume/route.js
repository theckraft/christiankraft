import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.store.findRecord('resume', params.resume_id);
  },
  renderTemplate(controller, model) {
    this.render();
    this.render("resume-menu", {
      outlet: "menu",
      into: "application",
      controller: "resume-menu",
      model: model
    });
  }
});
