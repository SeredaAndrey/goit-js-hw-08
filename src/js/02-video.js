import Player from '@vimeo/player';
var throttle = require('lodash.throttle');

// const player = new Player('handstick', {
//   width: 640,
// });

// player.on('play', function () {
//   console.log('played the video!');
// });

const iframe = document.querySelector('iframe');
const iframePlayer = new Vimeo.Player(iframe);

// Select with jQuery
// If multiple elements are selected, it will use the first element.
const jqueryPlayer = new Vimeo.Player($('iframe'));

// Select with the `<iframe>`’s id
// Assumes that there is an <iframe id="player1"> on the page.
const idPlayer = new Vimeo.Player('player1');
