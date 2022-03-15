import fs from 'fs';
import matter from 'gray-matter';

export function getLatestFilesFromDirectory(dir: string, num?: number) {
  const files = fs.readdirSync(dir).sort(function (a, b) {
    return (
      fs.statSync(dir + b).mtime.getTime() -
      fs.statSync(dir + a).mtime.getTime()
    );
  });

  return files.slice(0, num);
}

export function getMarkdownContents(dir: string, slug: string) {
  const fileName = fs.readFileSync(`${dir}/${slug}.md`, 'utf-8');
  const contents = matter(fileName, {
    excerpt: true,
  });

  return contents;
}
