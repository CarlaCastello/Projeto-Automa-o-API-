// cypress/support/api/loginApi.js

class LoginApi {
  realizarLogin(credentials) {
    return cy.request('POST', '/login', credentials)
  }
}

export default new LoginApi()
