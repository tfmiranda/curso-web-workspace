const humanizeDuration = require('humanize-duration');

exports.tempoDesde = function(date) {
  const agoraMilli = new Date().getTime();
  const dateMilli = date.getTime();
  const diff = Math.abs(dateMilli - agoraMilli);
  return humanizeDuration(diff, {
    language: 'pt',
    largest: 2,
    delimiter: ' e ',
    round: true
  });
};
