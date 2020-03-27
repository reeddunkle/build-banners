module.exports = {
  extends: [
    "prettier" // [RD] Keep Prettier last
  ],
  plugins: ["prettier"],
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"]
  }
};
