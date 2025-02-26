const notFound = (req, res) => {
  return res.status(404).json({
    error: 'Not found',
    message: 'Not found',
  })
}
module.exports = notFound
