import type { DateTimeFormatOptions } from '$/@types/additional';

const defaultOptions: DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export const formatDate = (date: string, options?: DateTimeFormatOptions) =>
  new Date(date).toLocaleDateString('en-EN', options ?? defaultOptions);
