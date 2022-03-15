import fs from 'fs';

export default function getLatestFilesFromDirectory(dir: string, num?: number) {
  const files = fs.readdirSync(dir).sort(function (a, b) {
    return (
      fs.statSync(dir + b).mtime.getTime() -
      fs.statSync(dir + a).mtime.getTime()
    );
  });

  return files.slice(0, num);
}
