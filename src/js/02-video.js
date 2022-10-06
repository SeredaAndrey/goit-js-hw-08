import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const iframePlayer = new Player(iframe);

iframePlayer.on('play', function () {
  console.log('played the video!');
});

iframePlayer
  .getCurrentTime()
  .then(function (seconds) {
    console.log(seconds);
  })
  .catch(function (error) {
    console.log(error);
  });

iframePlayer
  .setCurrentTime(120)
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        console.log(
          'Error! The time was less than 0 or greater than the video’s duration.'
        );
        break;
      default:
        console.log('Error! Some other error occurred.');
        break;
    }
  });
