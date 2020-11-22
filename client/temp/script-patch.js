/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

// const scriptPatch = fs.readFileSync('./react-scripts/verifyTypeScriptSetup.js');
const scriptPatch = fs.readFileSync(
  path.join(__dirname, './react-scripts/scriptPatch'),
  'utf8',
  (err) => console.error(err),
);

fs.writeFileSync(
  path.join(__dirname, '../node_modules/react-scripts/scripts/utils/verifyTypeScriptSetup.js'),
  scriptPatch,
);
