/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

const getPages = (dirs) => {
  const rootDir = path.resolve(process.cwd(), 'app');
  let pagePaths = ['/']; // Include the homepage explicitly (can be removed)

  const processDir = (base, prefix = '', level = 0) => {
    if (level > 4) { return; } // Limits directory depth to 4 (can be increased if necessary)

    const fullPath = path.join(base, prefix);
    if (!fs.existsSync(fullPath)) {
      return; // Skips if the path does not exist
    }

    const entries = fs.readdirSync(fullPath, { withFileTypes: true });

    let hasPageFile = entries.some(entry => entry.isFile() && entry.name === 'page.tsx');
    if (hasPageFile && prefix && !prefix.match(/^\([^)]+\)$/)) {
      // Adds the path without the initial parenthesis-wrapped directory
      const cleanPath = '/' + prefix.split('/').filter(p => !p.startsWith('(')).join('/');
      pagePaths.push(cleanPath);
    }

    for (const entry of entries) {
      if (entry.isDirectory()) {
        processDir(base, path.join(prefix, entry.name), level + 1);
      }
    }
  };

  dirs.forEach(dir => {
    // Process the directory normally without stripping parentheses here
    processDir(rootDir, dir);
  });

  fs.writeFileSync('site-map.json', JSON.stringify(pagePaths, null, 2));
};

const appDirectories = [
  'login', '(admin)', '(entity)',
  '(evaluation)', '(field_operation)',
  '(helpdesk)', '(home)', '(user)'
];

getPages(appDirectories);
