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

/**
 * Return an array of random non-repeated numbers
 * length {length} which highest number is {highestNum}
 */
function createUniqueRandomNumberList(
  length: number,
  highestNum: number,
  arr: number[] = [],
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
    createUniqueRandomNumberList(length, highestNum, arr);
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
        files.push(subpath);
      }
    }),
  );

  return files;
}

export async function getRandomFilesFromDirectory(
  dir: string,
  maxFiles: number,
  filterCondition?: (value: string) => boolean,
) {
  const fileListWithDups = (await getFilesFromDirectory(dir)).filter((slug) =>
    filterCondition?.(slug),
  );

  const fileList = [...new Set(fileListWithDups)] as string[];
  const indexes = createUniqueRandomNumberList(maxFiles, fileList.length);

  return indexes.map((i) => fileList[i]);
}

export async function getFilesFromDirectory(dir: string) {
  const files = await readSubDirsRecursive(dir, []).then((f) => f);
  return files.map((file) => path.relative(dir, file));
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
