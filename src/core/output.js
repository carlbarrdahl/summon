const stringify = s => JSON.stringify(s, null, 2)

module.exports = (system, state) => inputs => `
<html>
  <body>
    <pre>system: ${stringify(system)}
    <pre>nodes: ${stringify(state)}</pre>
  </body>
</html>
`

