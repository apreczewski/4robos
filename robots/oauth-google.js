const express = require('express')
const google = require('googleapis').google
const OAuth2 = google.auth.OAuth2
const state = require('./state.js')

async function robot(nameCredential, scope) {
  const content = state.load()
  await authenticatedWithOauth(nameCredential, scope)

  async function authenticatedWithOauth(nameCredential, scope) {
    const webServer = await startWebServer()
    const OAuthClient = await createOauthClient(nameCredential)
    requestUserConsent(OAuthClient, scope)
    const authorizationToken =  await waitForGoogleCallback(webServer)
    await requestGoogleForAccessTokens(OAuthClient, authorizationToken)
    await setGlobalGoogleAuthentication(OAuthClient)
    await stopWebServer(webServer)

    async function startWebServer() {
      return new Promise((resolve, reject) => {
        const port = 5000
        const app = express()
        const server = app.listen(port, () => {
          console.log(`> Listening on http://localhost:${port}`)
          resolve({
            app,
            server
          })
        })
      })
    }

    async function createOauthClient(nameCredential) {
      const credentials = require(`../credentials/google-${nameCredential}.json`)
      const OAuthClient = new OAuth2(
        credentials.web.client_id,
        credentials.web.client_secret,
        credentials.web.redirect_uris[0]
      )
      return OAuthClient
    }

    function requestUserConsent(OAuthClient, scope) {
      const consentUrl = OAuthClient.generateAuthUrl({
        access_type: 'offline',
        scope: scope
      })
      console.log(`> Please give your consent: ${consentUrl}`)
    }

    async function waitForGoogleCallback(webServer) {
      return new Promise((resolve, reject) => {
        console.log('> Waiting for user consent...')

        webServer.app.get('/oauth2callback', (request, response) => {
          const authCode = request.query.code
          console.log(`> Consent given: ${authCode}`)
          response.send('<h1>Thanks you!</h1><p>Now close this tab.</p>')
          resolve(authCode)
        })
      })
    }

    async function requestGoogleForAccessTokens(OAuthClient, authorizationToken) {
      return new Promise((resolve, reject) => {
        OAuthClient.getToken(authorizationToken, (error, tokens) => {
          if(error){
            return reject(error)
          }
          console.log('> Access tokens received: ')
          console.log(tokens)

          OAuthClient.setCredentials(tokens)
          resolve()
        })
      })

    }

    async function setGlobalGoogleAuthentication(OAuthClient) {
      google.options({
        auth: OAuthClient
      })
    }

    async function stopWebServer(webServer) {
      return new Promise((resolve, reject) => {
        webServer.server.close(() =>{
          resolve()
        })
      })
    }
  }
}

module.exports = robot
