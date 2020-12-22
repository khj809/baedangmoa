const production = process.env.NODE_ENV === 'production';

module.exports = {
  preprocess: require('svelte-preprocess')({
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
    babel: {
      presets: ['@babel/preset-typescript'],
    },
  }),
};
