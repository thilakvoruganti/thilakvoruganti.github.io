module.exports = {
  root: true,
  extends: ["react-app", "react-app/jest", "prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "react/jsx-key": "warn",
  },
};
