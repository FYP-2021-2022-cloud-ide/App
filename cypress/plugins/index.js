/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars

const dotenv = require("dotenv")

dotenv.config()

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  // config.env.OAUTH_ISSUER_BASE_URL = "https://cas.ust.hk/cas/oidc"
  // config.env.OAUTH_CLIENT_ID = process.env.OAUTH_CLIENT_ID
  // config.env.OAUTH_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET
  return config
}
