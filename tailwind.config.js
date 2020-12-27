module.exports = {
  purge: ["./src/**/*.svelte"],
  theme: {
    extend: {
      colors: {
        kakao: "#fee500",
      },
      zIndex: {
        "-1": "-1",
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
