/// <reference types="cypress" />

import usuarios_api from "../support/usuarios_api"

describe('CRUD Usuários - ServeRest API', () => {
  let userId
  let userEmail = `carla.tester.${Date.now()}@teste.com`

  it('1 - Criar Usuário', () => {
    usuarios_api.criarUsuario({
      nome: "Carla Sousa",
      email: userEmail,
      password: "123456",
      administrador: "true"
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.message).to.eq("Cadastro realizado com sucesso")
      userId = response.body._id
    })
  })

  it('2 - Consultar Usuário', () => {
    usuarios_api.consultarUsuario(userId).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('nome', 'Carla Sousa')
      expect(response.body).to.have.property('_id', userId)
    })
  })

  it('3 - Editar Usuário', () => {
    usuarios_api.editarUsuario(userId, {
      nome: "Carla Castello",
      email: userEmail,
      password: "654321",
      administrador: "false"
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.message).to.eq("Registro alterado com sucesso")
    })
  })

  it('4 - Deletar Usuário', () => {
    usuarios_api.deletarUsuario(userId).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.message).to.eq("Registro excluído com sucesso")
    })

  })

  // valida exclusão
 it('4.1 - Validar Exclusão do Usuário', () => {
    usuarios_api.consultarUsuario(userId).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.message).to.eq("Usuário não encontrado")
    })
  })

})
