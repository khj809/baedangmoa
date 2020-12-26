module.exports = {
  purge: ["./src/**/*.svelte"],
  theme: {
    extend: {
      colors: {
        kakao: "#fee500",
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
  plugins: [],
};
