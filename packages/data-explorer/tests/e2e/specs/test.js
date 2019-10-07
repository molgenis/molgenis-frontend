// https://docs.cypress.io/api/introduction/api.html

describe('Data explorer', () => {
  it('Contains a cookie banner that you can click away', () => {
    cy.visit('/')
    cy.contains('div.jumbotron', 'Accept Cookies')
    cy.get('div.jumbotron >> button').click()
    cy.get('div.jumbotron').should('not.exist')
  })

  it('shows cards and table', () => {
    cy.entity()
    cy.get('div.card-deck').should('exist')
    cy.get('.table-layout').click()
    cy.get('table.table').should('exist')
    cy.get('.card-layout').click()
    cy.get('div.card-deck').should('exist')
  })

  it('allows you to add and remove items from shopping cart', () => {
    cy.entity()
    cy.get('.shopping-button').eq(0).click()
    cy.get('.show-cart').click()
    cy.get('.cart-order').should('exist')
    cy.get('.alert.alert-warning').should('not.exist')
    cy.get('.shopping-button').click()
    cy.get('.alert.alert-warning').should('exist')
  })

  it('should display custom card', () => {
    cy.entity('TableWithCustomCard')
    cy.contains('p', 'The custom card works')
  })

  it('lets you expand and collapse the default card in card layout', () => {
    cy.entity('TableWithMoreColumns')
    cy.contains('.card-body', 'hematocrit')
    cy.get('.card-body .card-text').first().children('.row').should('have.length', 6)
    cy.get('.mg-card-expand').first().should('contain', 'Expand').click()
    cy.get('.card-body .card-text').first().children('.row').should('have.length', 9)
    cy.get('.mg-card-expand').first().should('contain', 'Collapse').click()
    cy.get('.card-body .card-text').first().children('.row').should('have.length', 6)
  })
})
