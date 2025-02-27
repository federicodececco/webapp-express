const connection = require('../data/db.js')
const multer = require('multer')
//index
const index = (req, res) => {
  const sql = `SELECT id,title,image FROM movies`
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
  const sql = `SELECT id,title,director,genre,abstract,image,release_year
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
      movie.reviews = results
      res.json(movie)
    })
  })
}

//postReviews
const postReviews = (req, res) => {
  console.log('first')
  const { id } = req.params
  const { name, vote, text } = req.body
  console.log(req.body)
  const sql = 'INSERT INTO reviews (movie_id,name,vote,text) VALUES (?,?,?,?)'
  console.log('third')
  connection.query(sql, [id, name, vote, text], (err, results) => {
    console.log(sql)
    console.log(vote)
    if (err) {
      return res.status(500).json({
        error: 'internal server error',
        message: `query failed: ${sql}`,
      })
    }
    console.log(results)
    res.status(201).json({ id: results.insertId })
  })
}
//post book
const post = (req, res) => {
  const { title, director, genre, release_year, abstract, image } = req.body
  const sql = `INSERT INTO movies (title,director,genre,release_year,abstract) 
  VALUES ('?','?','?','?','?')`
}
module.exports = { index, show, post, postReviews }
