const { Component } = require('@serverless/core')

/**
 * Will deploy the serverless component
 */
class Deploy extends Component {
  async default(inputs = {}) {
    const { stage } = inputs
    if (stage === 'staging' || stage === 'production') {
      const templateFiles = {
        staging: 'serverless.staging.yml',
        production: 'serverless.production.yml',
      }
      const template = await this.load('@serverless/template', stage)
      const output = await template({ template: templateFiles[stage] })
      return output
    }
    this.context.log('No environment defined... Choices are staging and prod')
  }

  // Remove will allow the stage to be set on the command line
  // run like so: serverless remove --stage=staging
  async remove(inputs = {}) {
    const { stage } = inputs
    if (stage === 'staging' || stage === 'prod') {
      const template = await this.load('@serverless/template', stage)
      const output = await template.remove()
      return output
    }
  }
}

module.exports = Deploy
