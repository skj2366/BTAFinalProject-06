export default function getTime(time) {
  // console.log(time)
  if (time) {
    let _time;
    if (time.toString().includes('.')) {
      _time = time.split('.');
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }).format(_time[0] * 1000);
    } else {
      var ts = new Date(Number(time) * 1000);
      const date = ts.toLocaleString('en-GB', {
        dateStyle: 'short',
        timeStyle: 'medium',
      });
      // console.log(date);
      return date;
    }
  } else {
    return '';
  }
}
