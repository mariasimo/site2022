import fs from 'fs';
import { readdir } from 'fs/promises';
import path from 'path';
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

async function readSubDirsRecursive(mainPath: string, files: string[] = []) {
  const filesInDir = await readdir(mainPath).then((f) => f);

  await Promise.all(
    filesInDir.map(async function (file) {
      const subpath = path.join(mainPath, file);

      if (isDirectory(subpath)) {
        await readSubDirsRecursive(subpath, files).then((f) => f);
      } else {
        if (typeof file === 'string') {
          files.push(subpath.replace('//', '/'));
        }
      }
    }),
  );

  return files;
}

const readDir = function (
  filePath: string,
  files: string[] = [],
  filterFunction?: (value: string, index: number, array: string[]) => boolean,
) {
  const filesInNotesDir = fs.readdirSync(filePath);

  return filterFunction ? filesInNotesDir.filter(filterFunction) : files;
};

export const getRandomFilesFromDirectory = function (
  dir: string,
  maxFiles: number,
  currentSlug: string,
) {
  const filterFunction = (filename: string) => {
    const filePath = filename.includes('.md') ? filename : `${filename}/en.md`;
    const { data: noteFrontmatter } = getMarkdownContents(filePath);
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

export async function getFilesFromDirectory(dir: string) {
  const files = await readSubDirsRecursive(dir, []).then((f) => f);
  return files.map((file) => file.replace(dir, ''));
}

export function getMarkdownContents(filePath: string) {
  const fileName = fs.readFileSync(
    filePath.includes(contentConfig.notesDirectory)
      ? filePath
      : `${contentConfig.notesDirectory}${filePath}`,
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

/**
 * Transform filename into slug
 * /content/notes/[filename]/[lang?].md -> /[filename]
 */
export function getSlugFromFilePath(fileName: string): string {
  const filePath = fileName
    .replace(contentConfig.notesDirectory, '')
    .replace('.md', '');

  const hasLanguage = filePath.includes('/');

  return hasLanguage ? filePath.split('/').slice(0, -1).join('/') : filePath;
}
