module.exports = {
    presets: [
      '@babel/preset-env', // Compiles modern JavaScript to a version compatible with older browsers/environments
      ["@babel/preset-react", { "runtime": "automatic" }],
      '@babel/preset-typescript', // If you're using TypeScript
    ],
  };
  