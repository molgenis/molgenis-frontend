describe('Start', () => {
  it('should show questionnaire details', () => {
    cy.visit('/questionnaire_1')

    cy.contains('.btn', 'Back to questionnaires list')
    cy.contains('.display-4', 'Questionnaire #1')
    cy.contains('p', 'This is a not started questionnaire used for showing the chapters')
    cy.contains('h3', 'This is the first mocked questionnaire response')

    cy.contains('.btn', 'Start questionnaire').click()
    cy.url().should('include', '/questionnaire_1/chapter/1')
  })
})
