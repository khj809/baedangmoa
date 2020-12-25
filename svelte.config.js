const production = process.env.NODE_ENV === "production";

module.exports = {
  preprocess: require("svelte-preprocess")({
    defaults: {
      script: "typescript",
    },
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  }),
};
