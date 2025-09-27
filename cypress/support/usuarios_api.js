// cypress/support/api/usuariosApi.js

class UsuariosApi {
  criarUsuario(userData) {
    return cy.request('POST', '/usuarios', userData)
  }

  consultarUsuario(id) {
    return cy.request({
      method: 'GET',
      url: `/usuarios/${id}`,
      failOnStatusCode: false
    })
  }

  editarUsuario(id, userData) {
    return cy.request('PUT', `/usuarios/${id}`, userData)
  }

  deletarUsuario(id) {
    return cy.request('DELETE', `/usuarios/${id}`)
  }
}

export default new UsuariosApi()
