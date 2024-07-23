/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

const getFileStructure = (dirs, outputFileName) => {
  const rootDir = path.resolve(process.cwd(), 'app');
  const result = [];
  const processDir = (base, prefix = '') => {
    const fullPath = path.join(base, prefix);
    if (!fs.existsSync(fullPath)) {
      console.log(`Path does not exist: ${fullPath}`);
      return null;
    }
    const structure = {
      parent: path.basename(prefix),
      route: `app/${prefix}`,
      children: {}
    };

    const processSubDir = (subDir, relativePath = '') => {
      const entries = fs.readdirSync(subDir, { withFileTypes: true });
      const files = [];

      entries.forEach(entry => {
        if (entry.isDirectory()) {
          processSubDir(path.join(subDir, entry.name), path.join(relativePath, entry.name));
        } else {
          files.push(entry.name);
        }
      });

      if (files.length > 0) {
        structure.children[`/${relativePath}`] = files;
      }
    };

    processSubDir(fullPath);

    return structure;

  };
  dirs.forEach(dir => {
    const structure = processDir(rootDir, dir);
    if (structure) {result.push(structure);}
  });
  fs.writeFileSync(outputFileName, JSON.stringify(result, null, 2));
};

const appDirectories = [
  '(admin)', '(entity)', '(evaluation)', '(home)',
  '(user)', 'api', 'constants', 'lib', 'login',
  'sandbox', 'services', 'shared',
];

getFileStructure(appDirectories, './static-data/file-system-structure.json');
