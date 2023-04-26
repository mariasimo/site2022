const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const contentConfig = require('../content.config');

const postsDirectory = path.join(process.cwd(), contentConfig.notesDirectory);
const dataDirectory = path.join(process.cwd(), contentConfig.dataDirectory);

const readSubDirsRecursive = function (dir, files = []) {
  fs.readdirSync(dir).forEach(function (file) {
    const subpath = path.join(dir, file);

    if (fs.lstatSync(subpath).isDirectory()) {
      readSubDirsRecursive(subpath, files);
    } else {
      if (typeof file === 'string') {
        files.push(subpath);
      }
    }
  });

  return files;
};

function getMarkdownContents(filePath) {
  const fileName = fs.readFileSync(filePath, 'utf-8');
  const contents = matter(fileName, {
    excerpt: true,
  });

  return contents;
}

async function convertMarkdownToJson() {
  const filePaths = readSubDirsRecursive(postsDirectory, []);

  for (const filePath of filePaths) {
    const { data } = getMarkdownContents(filePath);
    const fileName = path
      .relative(postsDirectory, filePath)
      .replace('.md', '')
      .replace('/', '-');
    const jsonFilePath = path.join(dataDirectory, `${fileName}.json`);

    const json = JSON.stringify(data);

    fs.appendFile(
      jsonFilePath,
      json,
      { encoding: 'utf8', flag: 'w' },
      function (err) {
        throw err;
      },
    );
  }
}

convertMarkdownToJson();
