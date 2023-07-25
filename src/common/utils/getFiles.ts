import fs from 'fs';
import { readdir } from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import contentConfig from '../../../content.config';

// This functions should be agnostic, util functions using fs and path modules

function isDirectory(pathOrDir: string) {
  return fs.lstatSync(pathOrDir).isDirectory();
}

function createRandomIndex(max: number) {
  return Math.floor(Math.random() * max + 1);
}

export function selectRandomItems<T>(list: T[], numberOfItems: number) {
  if (list.length <= numberOfItems) {
    return list;
  }

  const result = <typeof list>[];
  let i = 0;

  while (i < numberOfItems) {
    const randomNum = createRandomIndex(numberOfItems);

    if (!result.includes(list[randomNum])) {
      result.push(list[randomNum]);
      i++;
    }
  }

  return result;
}

async function readSubDirsRecursive(dir: string, files: string[] = []) {
  const filesInDir = await readdir(dir);

  await Promise.all(
    filesInDir.map(async function (file) {
      const subpath = path.join(dir, file);

      if (isDirectory(subpath)) {
        try {
          await readSubDirsRecursive(subpath, files);
        } catch {
          // eslint-disable-next-line no-console
          console.error(`Cannot read file or directory at ${subpath}`);
          process.exit(1);
        }
      } else {
        files.push(subpath);
      }
    }),
  );

  return files;
}

export async function getFilePathsFromDirectory(dir: string) {
  const files = await readSubDirsRecursive(dir, []);
  // path.relative returns the part of the path relative to the dir
  // dir: /content, filePath: /content/myFile.md -> result: myFile.md

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
  ) {
    return [];
  }

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
