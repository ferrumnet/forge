module.exports = function () {
  return function (req: any, res: any, next: any) {
    req.query.limit = parseInt(req.query.limit) || 10
    req.query.offset = parseInt(req.query.offset) || 0
    next()
  }
}
