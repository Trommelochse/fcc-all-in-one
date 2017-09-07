export function readableTime(seconds) {
  const minutes = Math.floor(seconds/60);
  seconds = seconds % 60;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  return `${minutes}:${seconds}`
}
