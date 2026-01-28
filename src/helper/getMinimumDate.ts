export function getMinDateInLocalTime({
  offset,
  startDate,
}: {
  offset?: number | undefined;
  startDate?: string | undefined;
}) {
  let date = undefined;

  if (startDate === undefined && offset === undefined) {
    return date;
  }

  if (startDate) {
    date = new Date(startDate);
    date.setUTCDate(date.getUTCDate() + 1);
  } else if (offset) {
    date = new Date();
    date.setUTCDate(date.getUTCDate() + offset);
  }

  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Tirane",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return formatter.format(date);
}
