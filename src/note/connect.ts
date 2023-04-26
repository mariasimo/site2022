import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { addKudos, getKudos } from '../common/utils/kudos';

function buildJsonFilename({
  slug,
  locale,
}: {
  slug?: string;
  locale?: string;
}) {
  if (!slug) return;

  return `${slug}-${locale ?? 'en'}`;
}

export const useNoteData = () => {
  const [kudosCount, setKudosCount] = useState<number>(0);
  const { query, locale } = useRouter();
  const slug = typeof query.slug === 'string' ? query.slug : undefined;

  const filename = buildJsonFilename({ slug, locale });
  if (!filename) {
    throw new Error('missing filename');
  }
  const handleAddKudos = async () => {
    const updatedCount = kudosCount + 1;
    setKudosCount(updatedCount);
    await addKudos({ filename, count: updatedCount });
  };

  useEffect(() => {
    const fetchInitialKudos = async () => {
      const initialKudos = await getKudos({ filename });
      setKudosCount(typeof initialKudos === 'number' ? initialKudos : 0);
    };
    fetchInitialKudos().catch(() => {
      // eslint-disable-next-line no-console
      console.log('Error fetching kudos');
    });
  }, [filename]);

  return { kudosCount, handleAddKudos };
};
