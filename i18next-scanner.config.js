module.exports = {
  input: [
    "src/**/*.{js,jsx,ts,tsx}", // files to scan
  ],
  output: "./", // root output path
  options: {
    debug: true,
    removeUnusedKeys: false,
    sort: true,
    func: {
      list: ["i18n.t", "t"], // functions to look for
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    lngs: ["en", "al"], // languages you want to generate
    defaultLng: "al",
    resource: {
      loadPath: "src/locales/{{lng}}/{{ns}}.json",
      savePath: "src/locales/{{lng}}/{{ns}}.json",
      jsonIndent: 2,
      lineEnding: "\n",
    },
  },
};
