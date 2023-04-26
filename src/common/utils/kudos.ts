export const addKudos = async ({
  filename,
  count,
}: {
  filename: string;
  count: number;
}) => {
  try {
    await fetch('/api/addKudos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename, count }),
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to update kudos count:', error);
  }
};

export const getKudos = async ({ filename }: { filename: string }) => {
  try {
    const kudos = await fetch(`/api/getKudos/?filename=${filename}`);
    const data = (await kudos.json()) as { kudosCount: number };
    return data.kudosCount;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to get kudos count:', error);
  }

  return 0;
};
