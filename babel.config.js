module.exports = {
  presets: ["@vue/app"],
  plugins: [
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk",
      },
    ],
  ],
};

// module.exports = {
//   presets: ["@vue/cli-plugin-babel/preset"],
// };

// module.exports = {
//   presets: [["es2015", { modules: false }]],
//   plugins: [
//     [
//       "component",
//       {
//         libraryName: "element-ui",
//         styleLibraryName: "theme-chalk",
//       },·
//     ],
//   ],
// };
