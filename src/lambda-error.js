export default class LambdaError extends Error {
  constructor(param) {
    super(JSON.parse(param).errorMessage)
    this.name = 'LambdaError'
  }
}