// module.exports = {
//   plugins: {
//     'posthtml-include': {
//       root: __dirname + '/src',
//     },
//   },
// };

// .posthtmlrc.js
const path = require('path');
const posthtmlInclude = require('posthtml-include');

module.exports = {
  plugins: [
    posthtmlInclude({
      root: path.join(__dirname, 'src'), // prawidłowa ścieżka
    }),
  ],
};
