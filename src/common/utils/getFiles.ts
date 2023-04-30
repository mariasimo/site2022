import fs from 'fs';
import matter from 'gray-matter';
import contentConfig from '../../../content.config';

function isDirectory(pathOrDir: string) {
  return fs.lstatSync(pathOrDir).isDirectory();
}

function createRandomIndex(max: number) {
  return Math.floor(Math.random() * max);
}

function createUniqueRandomNumbers(
  arr: number[],
  length: number,
  highestNum: number,
) {
  if (highestNum < length) {
    throw new Error(
      `highest number needs to be greater or equal to length: (${length})`,
    );
  }

  const randomNum = createRandomIndex(highestNum);

  if (!arr.includes(randomNum)) {
    arr.push(randomNum);
  }

  if (arr.length < length) {
    createUniqueRandomNumbers(arr, length, highestNum);
  }

  return arr;
}

const readSubDirsRecursive = function (path: string, files: string[] = []) {
  const filesInNotesDir = fs.readdirSync(path);

  filesInNotesDir.forEach(function (file) {
    const subpath = path + '/' + file;

    if (isDirectory(subpath)) {
      readSubDirsRecursive(subpath, files);
    } else {
      if (typeof file === 'string') {
        files.push(subpath.replace('//', '/'));
      }
    }
  });

  return files;
};

const readDir = function (
  path: string,
  files: string[] = [],
  filterFunction?: (value: string, index: number, array: string[]) => boolean,
) {
  const filesInNotesDir = fs.readdirSync(path);

  return filterFunction ? filesInNotesDir.filter(filterFunction) : files;
};

export const getRandomFilesFromDirectory = function (
  dir: string,
  maxFiles: number,
  currentSlug: string,
) {
  const filterFunction = (filename: string) => {
    const path = filename.includes('.md') ? filename : `${filename}/en.md`;
    const { data: noteFrontmatter } = getMarkdownContents(path);
    return !noteFrontmatter.hideFromList && !filename.includes(currentSlug);
  };

  const filesInNotesDir = readDir(dir, [], filterFunction);

  const indexes = createUniqueRandomNumbers(
    [],
    maxFiles,
    filesInNotesDir.length,
  );

  return indexes.map((i) => {
    return filesInNotesDir[i].includes('.md')
      ? filesInNotesDir[i]
      : `${filesInNotesDir[i]}/en.md`;
  });
};

export function getFilesFromDirectory(dir: string) {
  return readSubDirsRecursive(dir, [])
    .sort(function (a, b) {
      return fs.statSync(b).mtime.getTime() - fs.statSync(a).mtime.getTime();
    })
    .map((file) => file.replace(dir, ''));
}

export function getMarkdownContents(path: string) {
  const fileName = fs.readFileSync(
    path.includes(contentConfig.notesDirectory)
      ? path
      : `${contentConfig.notesDirectory}${path}`,
    'utf-8',
  );

  const contents = matter(fileName, {
    excerpt: true,
  });

  return contents;
}

export function getTranslationsList(path: string): string[] {
  const dir = `${contentConfig.notesDirectory}${path.replace('/', '')}`;

  if (
    !fs.existsSync(dir) ||
    (fs.existsSync(dir) && !fs.lstatSync(dir).isDirectory())
  )
    return [];

  return fs.readdirSync(dir).map((item) => item.replace('.md', ''));
}

/**
 * Transform filename into slug
 * /content/notes/[filename]/[lang?].md -> /[filename]
 */
export function getSlugFromFilePath(fileName: string): string {
  const path = fileName
    .replace(contentConfig.notesDirectory, '')
    .replace('.md', '');

  const hasLanguage = path.includes('/');

  return hasLanguage ? path.split('/').slice(0, -1).join('/') : path;
}
