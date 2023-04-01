function addLeadingZero(num: number | string): string {
  return (num < 10 ? '0' : '') + num;
}

export function millisToDateTime(millis: number) {
  const date = new Date(millis);
  const hours: string = date.getHours().toString();
  const minutes: string = addLeadingZero(date.getMinutes());
  const seconds: string = addLeadingZero(date.getSeconds());
  return `${hours}:${minutes}:${seconds}`;
}
