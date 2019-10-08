describe('Submit', () => {
  it('shows progress as you fill in the questions', () => {
    cy.visit('/questionnaire_1/chapter/1')

    cy.get('#ch1_question1').type('Cypress testrunner')
    cy.get('#ch1_question2').type('1')
    cy.get('#ch1_question3').type('hello')
    cy.get('#ch1_question4-1').click()

    cy.get('#next-chapter-btn').should('be.enabled')
    cy.get('#next-chapter-btn').click()

    cy.get('#ch2_question1-0').click()
    cy.get('#ch2_question1-3').click()
    cy.get('#ch2_question2-0').click()
    cy.get('#submit-questionnaire-btn').click()

    cy.url().should('includes', '/questionnaire_1/submitted')
  })
})
