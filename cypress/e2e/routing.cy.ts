// @ts-ignore
describe('Routing', () => {
  it('should redirect to app error page and be able to return back to home page', () => {
    cy.visit('/abc');

    cy.url().should('eq', 'http://localhost:3000/abc');
    cy.get('h1').should('contain', 'Oops, we seem to have a problem');
    cy.get('h4').should('contain', '404 Not Found');

    cy.get('button[aria-label="Home page"]').click();

    cy.url().should('eq', 'http://localhost:3000/');
    cy.get('h1[aria-label="Header title"]').should('contain', 'Podcaster');
  });
});
