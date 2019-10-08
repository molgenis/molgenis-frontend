describe('Progress', () => {
  it('shows progress as you fill in the questions', () => {
    cy.visit('/questionnaire_1/chapter/1')

    cy.get('div[role=progressbar]').should('have.attr', 'aria-valuenow').should('eq', '0')

    cy.get('#ch1_question1').type('Cypress testrunner')
    cy.get('div[role=progressbar]').should('have.attr', 'aria-valuenow').should('eq', '33')

    cy.get('#ch1_question2').type('1')
    cy.get('div[role=progressbar]').should('have.attr', 'aria-valuenow').should('eq', '67')

    cy.get('#next-chapter-btn').should('not.be.enabled')

    cy.get('#ch1_question3').type('hello')
    cy.get('div[role=progressbar]').should('have.attr', 'aria-valuenow').should('eq', '100')
    cy.get('#next-chapter-btn').should('be.enabled')

    cy.get('#ch1_question4-1').click()
    cy.get('div[role=progressbar]').should('have.attr', 'aria-valuenow').should('eq', '100')
  })
})
