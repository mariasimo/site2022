import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import contentConfig from '../../../content.config';

const readSubDirsRecursive = function (
  dir: string,
  files: string[] = [],
  maxFiles?: number,
) {
  fs.readdirSync(dir).forEach(function (file) {
    const subpath = path.join(dir, file);

    if (fs.lstatSync(subpath).isDirectory()) {
      readSubDirsRecursive(subpath, files);
    } else {
      if (maxFiles && files.length >= maxFiles) return;

      if (typeof file === 'string') {
        files.push(subpath);
      }
    }
  });

  return files;
};

export function getFilesFromDirectory(dir: string, maxFiles?: number) {
  return readSubDirsRecursive(dir, [], maxFiles)
    .sort(function (a, b) {
      return fs.statSync(b).mtime.getTime() - fs.statSync(a).mtime.getTime();
    })
    .map((file) => file.replace(dir, ''));
}

export function getMarkdownContents(filePath: string) {
  const fileName = fs.readFileSync(
    `${contentConfig.notesDirectory}${filePath}.md`,
    'utf-8',
  );
  const contents = matter(fileName, {
    excerpt: true,
  });

  return contents;
}

export function getTranslationsList(filePath: string): string[] {
  const dir = `${contentConfig.notesDirectory}${filePath.replace('/', '')}`;

  if (
    !fs.existsSync(dir) ||
    (fs.existsSync(dir) && !fs.lstatSync(dir).isDirectory())
  )
    return [];

  return fs.readdirSync(dir).map((item) => item.replace('.md', ''));
}
