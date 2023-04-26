import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { NoteFrontmatter } from '../../common/utils/notes';
import contentConfig from '../../../content.config';

interface KudosResponse {
  kudosCount?: number;
}

const dataDirectory = path.join(process.cwd(), contentConfig.dataDirectory);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<KudosResponse>,
) {
  const response: KudosResponse = { kudosCount: 0 };

  if (req.method === 'GET') {
    const filename = req.query.filename as string;

    try {
      const jsonFilePath = path.join(dataDirectory, `${filename}.json`);
      const jsonContent = await fs.promises.readFile(jsonFilePath, 'utf8');
      const data = JSON.parse(jsonContent) as NoteFrontmatter;

      res.status(200).json({ kudosCount: data.kudosCount });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to fetch kudos count:', error);

      res.status(500).json(response);
    }
  } else {
    res.status(404).json(response);
  }
}
