declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to wait for audio html tag to be playing.
       * @example cy.waitForAudioPlaying()
       */
      waitForAudioPlaying(): Chainable<JQuery<HTMLElement>>;
    }
  }
}

export default {};
