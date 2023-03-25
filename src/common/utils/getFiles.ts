import fs from 'fs';
import matter from 'gray-matter';
import contentConfig from '../../../content.config';

const readSubDirsRecursive = function (path: string, files: string[] = []) {
  fs.readdirSync(path).forEach(function (file) {
    const subpath = path + '/' + file;

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

export function getLatestFilesFromDirectory(dir: string, num?: number) {
  const files = readSubDirsRecursive(dir)
    .sort(function (a, b) {
      return fs.statSync(b).mtime.getTime() - fs.statSync(a).mtime.getTime();
    })
    .map((file) => file.replace(dir, ''));

  return files.slice(0, num);
}

export function getMarkdownContents(path: string) {
  const fileName = fs.readFileSync(
    `${contentConfig.notesDirectory}/${path}.md`,
    'utf-8',
  );
  const contents = matter(fileName, {
    excerpt: true,
  });

  return contents;
}
