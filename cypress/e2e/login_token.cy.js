/// <reference types="cypress" />

import login_api from "../support/login_api";
import usuarios_api from "../support/usuarios_api";

describe('Login e Captura de Token - ServeRest API', () => {
  const userEmail = `teste.login.${Date.now()}@teste.com`
  const userPassword = "123456"

  it('1 - Criar Usuário', () => {    
    usuarios_api.criarUsuario ({
      nome: "Teste Login",
      email: userEmail,
      password: userPassword,
      administrador: "true"
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.message).to.eq("Cadastro realizado com sucesso")
      
    })
  })

  it('2 - Realizar Login e Capturar Token', () => {
    login_api.realizarLogin ({
      email: userEmail,
      password: userPassword
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.message).to.eq("Login realizado com sucesso")
      expect(response.body).to.have.property('authorization')

      // captura do token para reutilização
      const token = response.body.authorization
      cy.log('Token JWT: ' + token)

      // opcional: salvar como alias para outros testes
      cy.wrap(token).as('authToken')
    })
  })
})
