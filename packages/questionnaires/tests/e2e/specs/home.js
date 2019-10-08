describe('Home', () => {
  it('should render initial table content correctly', () => {
    cy.visit('/')
    cy.contains('h1', 'My questionnaires')

    cy.contains('td', 'Questionnaire #2')
      .parent().contains('td', 'Open')
      .parent().contains('.btn', 'View Questionnaire')

    cy.contains('td', 'Questionnaire #3')
      .parent().contains('td', 'Submitted')
      .parent().contains('.btn', 'Finished questionnaire overview')

    cy.contains('td', 'Questionnaire #1')
      .parent().contains('td', 'Not started yet')
      .parent().contains('.btn', 'View Questionnaire').click()

    cy.url().should('include', '/questionnaire_1')
  })
})
