require('datejs');

export const prettyFormatSeconds = (seconds) => {
  if (seconds < 0) 
    seconds = 0;
  return (new Date()).clearTime().addSeconds(seconds).toString('HH:mm:ss');
}
