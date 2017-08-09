module.exports = ({ http }, out, c) => {
  http.createServer((req, res) => {
    res.end(out())
  }).listen(3000, err => {
    console.log("Server listening at: localhost:3000")
  })
}
