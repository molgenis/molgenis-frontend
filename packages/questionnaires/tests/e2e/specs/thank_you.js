describe('Thank you', () => {
  it('thanks you for filling in the questionnaire', () => {
    cy.visit('/questionnaire_1/submitted')
    cy.contains('h1', 'Thank you')
    cy.contains('.btn', 'Back to questionnaires list').click()
    cy.url().should('includes', '/')
  })
})
