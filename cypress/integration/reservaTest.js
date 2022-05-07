/// <reference types="cypress" />


describe('Solicitar e aprovar reserva', () => {

  const descricao = 'Descrição teste ' + new Date().getTime()

  beforeEach(() => {
    cy.visit('http://localhost:8080/myApp/login.html')
  })

  it('Do reservation', () => {

    cy.get('#username').type('client')
    cy.get('#password').type('client')
    cy.get('.login100-form-btn').click()
    cy.get(':nth-child(1) > .nav-link').click()
    cy.get('#descricao').type(descricao)
    cy.get('#laboratorio').select('Laboratorio')
    cy.get('#data').type('2022-05-02T02:30')
    cy.get('#dataLimite').type('2022-05-02T03:30')
    cy.get('#enviar').click()
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Dados enviados com sucesso!')
    })
    cy.on('window:confirm', () => true)
    cy.get('#button-sair').click()

  })

  it('Approval reservation', () => {

    cy.get('#username').type('admin')
    cy.get('#password').type('admin')
    cy.get('.login100-form-btn').click()
    cy.get(':nth-child(3) > .nav-link').click()
    cy.contains('td', descricao)  // gives you the cell 
    .siblings()                            // gives you all the other cells in the row
    .contains('button', 'Editar')               // finds the delete button
    .click()

    cy.get('#status').select('APROVADO')
    cy.get('#enviar').click()
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Dados enviados com sucesso!')
    })
    cy.on('window:confirm', () => true)
   
  })
  after(() => {

   
  })
  
  
  
})
