// @ts-ignore
describe('Podcasts lifecycle', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should filter podcasts and then go to an episode and listen', () => {
    // Loading podcast list
    cy.get('div[role="loader"]').should('be.visible');

    // Ensures that there are 100 podcast available
    cy.get('label[role="count"]').should('have.text', '100');

    cy.get('input[role="filter"]').type('mil');

    // Now podcast have been filtered
    cy.get('label[role="count"]').should('have.text', '3');

    // Checks first filtered podcast info and then clicks on it
    cy.get('a[role="podcast-link"]')
      .first()
      .invoke('attr', 'href')
      .then(($el) => {
        cy.wrap($el).as('podcastPath');
      });

    cy.get('a[role="podcast-link"]')
      .first()
      .within(() => {
        cy.get('img').should('have.attr', 'src');
        cy.get('span[aria-label="Podcast title"]').should('be.visible');
        cy.get('span[aria-label="Podcast author"]').should('be.visible');
      })
      .click();

    cy.get<string>('@podcastPath').then((podcastPath) => {
      cy.url().should('eq', `http://localhost:3000${podcastPath}`);
    });

    // Loading podcast episodes
    cy.get('div[role="loader"]').should('be.visible');

    // Checks number of episodes and then clicks in the first one
    cy.get('span[role="episodes-count"]').should('have.text', '20');

    cy.get('a[role="episode-link"]').first().click();

    // Plays the episode audio file
    cy.get('audio')
      .invoke('attr', 'src')
      .then((audiofile) => {
        const audio = new Audio(audiofile);
        audio.play();
        cy.waitForAudioPlaying();
      });
  });
});
