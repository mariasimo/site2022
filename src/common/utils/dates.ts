type RelativeTimeFormatUnit =
  | 'year'
  | 'years'
  | 'quarter'
  | 'quarters'
  | 'month'
  | 'months'
  | 'week'
  | 'weeks'
  | 'day'
  | 'days'
  | 'hour'
  | 'hours'
  | 'minute'
  | 'minutes'
  | 'second'
  | 'seconds';

const TIME_UNITS: { [key in Partial<RelativeTimeFormatUnit>]?: number } = {
  month: 86400 * 30,
  week: 86400 * 7,
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1,
};

export function getTimeAgo(date: Date) {
  const timeAgoInSeconds = getSecondsDiff(date);
  const formatter = new Intl.RelativeTimeFormat('en-US', {
    numeric: 'auto',
    style: 'long',
  });

  const timeEntry = Object.entries(TIME_UNITS).find(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([_, seconds]) => timeAgoInSeconds >= seconds,
  ) ?? ['second', 1];

  const { unit, value } = {
    unit: timeEntry[0],
    value: Math.round((timeAgoInSeconds / timeEntry[1]) * -1),
  };

  return formatter.format(value, unit as RelativeTimeFormatUnit);
}

export function getSecondsDiff(date: Date): number {
  return (Date.now() - date.getTime()) / 1000;
}
