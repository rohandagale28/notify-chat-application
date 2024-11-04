const asyncHandler = (requestHandler) => {
  //wrapper function
  ;(req, res, next) => {
    Promise.resolve(requestHandler()).catch((err) => next(err))
  }
}

module.exports = { asyncHandler }
