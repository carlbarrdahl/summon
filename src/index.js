const runModule = module => {
  const path = module.includes("/") ? `${__dirname}/${module}.js` : module

  return require(path)
}
const getRef = (node, graph) => graph[node["$ref"].slice(2)]

const processNode = (node, data, graph) => {
  const args = (node["$ref"] || [])
    .map(n => processNode(getRef(n, graph), data, graph))

  const next = runModule(node.path)
  return typeof next === "function" ? next(...args, data, graph) : next
}

const compile = (graph, processes) =>
  processNode(graph.core, { version: 0.1 }, graph)

const graph = {
  core: {
    name: "core",
    path: "core/index",
    $ref: [{ $ref: "#/input" }, { $ref: "#/output" }]
  },
  input: {
    name: "input",
    $ref: [{ $ref: "#/http" }],
    path: "core/input"
  },
  output: {
    name: "output",
    path: "core/output",
    $ref: []
  },
  http: {
    name: "http",
    path: "http",
    $ref: []
  }
}

compile(graph)
