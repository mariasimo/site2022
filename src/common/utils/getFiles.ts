import { readdir, readFile } from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import contentConfig from '../../../content.config';
import {
  Language,
  MarkdownFile,
  MarkdownFileSchema,
  NoteLanguageOptions,
} from '../lib/notes/types';

// This functions should be agnostic, util functions using fs and path modules

async function isDirectory(pathOrDir: string) {
  try {
    const file = await readdir(pathOrDir);
    return !!file;
  } catch {
    return false;
  }
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
      const isDir = await isDirectory(subpath);

      if (isDir) {
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

export async function getMarkdownContent(
  filePath: string,
): Promise<MarkdownFile> {
  try {
    const fileName = await readFile(
      filePath.includes(contentConfig.notesDirectory)
        ? filePath
        : `${contentConfig.notesDirectory}${filePath}`,
      'utf-8',
    );

    const contents = matter(fileName, {
      excerpt: true,
    });

    const result = MarkdownFileSchema.safeParse(contents);

    if (!result.success) {
      throw new Error(`Bad data shape at ${filePath}: ${result.error.message}`);
    } else {
      return result.data;
    }
  } catch {
    throw new Error(`Error reading markdown file at ${filePath}}`);
  }
}

export async function getTranslationsList(
  filePath: string,
): Promise<Language[]> {
  const dir = path.join(contentConfig.notesDirectory, filePath);

  try {
    const files = await readdir(dir);
    return files.map((f) => {
      const locale = path.basename(f, '.md');
      return NoteLanguageOptions.parse(locale);
    });
  } catch {
    // eslint-disable-next-line no-console
    console.error(`Could not find file at ${filePath}}`);
    process.exit(1);
  }
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
