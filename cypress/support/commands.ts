/// <reference types="cypress" />
// @ts-ignore
Cypress.Commands.add('waitForAudioPlaying', () => {
  cy.get('audio').should((els: JQuery<HTMLElement>) => {
    let audible = false;
    els.each((i: number, el: any) => {
      if (el.duration > 0 && !el.muted) {
        audible = true;
      }
    });
    expect(audible).to.eq(true);
  });
});

export default {};
