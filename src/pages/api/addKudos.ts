import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import contentConfig from '../../../content.config';
import type { NoteFrontmatter } from '../../common/utils/notes';

interface KudosRequest {
  filename: string;
  count: number;
}

const dataDirectory = path.join(process.cwd(), contentConfig.dataDirectory);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { filename, count } = req.body as KudosRequest;

    try {
      const jsonFilePath = path.join(dataDirectory, `${filename}.json`);
      const jsonContent = await fs.promises.readFile(jsonFilePath, 'utf8');
      const data = JSON.parse(jsonContent) as NoteFrontmatter;

      const newData = { ...data, kudosCount: count };
      const newJsonContent = JSON.stringify(newData);

      await fs.promises.writeFile(jsonFilePath, newJsonContent, 'utf8');

      res.status(200).send({ success: true });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to update kudos count:', error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  } else {
    res.status(404).send({ error: 'Not Found' });
  }
}
