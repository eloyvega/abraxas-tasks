require('datejs');

export const prettyFormatSeconds = (seconds) => {
  return (new Date()).clearTime().addSeconds(seconds).toString('HH:mm:ss');
}
