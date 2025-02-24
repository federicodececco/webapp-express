const connection = require('../data/db.js')
//index
const index = (req, res) => {
  const sql = `SELECT id,title FROM movies`
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: 'internal server error',
      })
    }
    res.json(results)
  })
}
//show
const show = (req, res) => {
  const { id } = req.params
  const sql = `SELECT id,title,director,genre,abstract,image
FROM movies
WHERE id= ?`

  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: 'internal server error',
      })
    }

    const movie = results[0]
    if (!movie) {
      return res.status(404).json({
        error: 'Not found',
        message: 'movie not found',
      })
    }
    const review = ` SELECT 	id,name,vote,text
    FROM reviews
    WHERE movie_id= ?`
    connection.query(review, [id], (err, results) => {
      if (err) {
        return res.status(500).json({
          error: 'internal server error',
        })
      }
      movie.reviews = results.res
      res.json(movie)
    })
  })
}
module.exports = { index, show }
