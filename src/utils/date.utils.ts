function addLeadingZero(num: number | string): string {
  return (num < 10 ? '0' : '') + num;
}

export function millisToDateTime(millis: number) {
  const date = new Date(millis);
  const hours: number = date.getHours();
  const printHours: string = hours ? `${hours.toString()}:` : '';
  const minutes: number = date.getMinutes();
  const printMinutes: string = minutes ? `${addLeadingZero(minutes)}:` : '';
  const seconds: number = date.getSeconds();
  const printSeconds: string = seconds ? addLeadingZero(seconds) : '';
  return `${printHours}${printMinutes}${printSeconds}`;
}
