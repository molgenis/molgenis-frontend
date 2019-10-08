describe('Chapter navigation', () => {
  it('shows first chapter', () => {
    cy.visit('/questionnaire_1/chapter/1')
    cy.contains('legend', 'Chapter #1 - Personal information')
    cy.contains('#current-chapter-label', 'Chapter 1 of 2')
  })

  it('shows second chapter', () => {
    cy.visit('/questionnaire_1/chapter/2')
    cy.contains('legend', 'Chapter #2 - Professional questions')
    cy.contains('#current-chapter-label', 'Chapter 2 of 2')
    cy.contains('.btn', 'Submit')
  })

  it('can be navigated using chapter navigation links', () => {
    cy.visit('/questionnaire_1/chapter/1')

    cy.contains('a', 'Chapter #1 - Personal information').click()
    cy.url().should('include', '/questionnaire_1/chapter/1')

    cy.contains('a', 'Chapter #2 - Professional questions').click()
    cy.url().should('include', '/questionnaire_1/chapter/2')

    cy.contains('a', 'Chapter #1 - Personal information').click()
    cy.url().should('include', '/questionnaire_1/chapter/1')
  })

  it('has back to start button', () => {
    cy.visit('/questionnaire_1/chapter/2')
    cy.contains('.btn', 'Back to start').click()
    cy.url().should('include', '/questionnaire_1')
  })
})
