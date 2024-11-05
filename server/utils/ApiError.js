class ApiError extends Erros {
  constructor(statusCode, message = 'something went wrong', errors = [], stack = '') {
    super(message)
    this.statusCode = statusCode
    this.data = null
    this.message = message
    this.success = false
    this.errors = errors
  }
}

module.exports = ApiError
