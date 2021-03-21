const httpProxy = require("http-proxy");

const production = process.env.NODE_ENV === "production";
const proxy = httpProxy.createServer({ target: "http://localhost:5001/api" });

module.exports = {
  mount: {
    "src/public": { url: "/", static: true, resolve: false },
    "src/frontend": "/_dist_",
  },
  plugins: [
    "@snowpack/plugin-svelte",
    "@snowpack/plugin-typescript",
    "@snowpack/plugin-dotenv",
    "@snowpack/plugin-optimize",
  ],
  alias: {
    "~": "./src",
  },
  devOptions: {
    open: "none",
    port: 5000,
  },
  routes: [
    {
      src: "/api/.*",
      dest: (req, res) => {
        proxy.web(req, res);
      },
    },
  ],
};
