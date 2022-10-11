import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const iframePlayer = new Player(iframe);

setCurTime(STORAGE_KEY);

iframePlayer.on('play', () => {
  console.log('played the video!');
});

iframePlayer.on(
  'timeupdate',
  throttle(evt => {
    getCurTime(STORAGE_KEY);
  }, 1000)
);

function getCurTime(key) {
  iframePlayer
    .getCurrentTime()
    .then(function (seconds) {
      const saveMessage = JSON.stringify(seconds);
      localStorage.setItem(key, saveMessage);
      console.log(saveMessage);
    })
    .catch(function (error) {});
}

function setCurTime(key) {
  let messageParse = '';
  try {
    const saveMessage = localStorage.getItem(key);
    if (saveMessage) {
      messageParse = JSON.parse(saveMessage);
    }
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
  console.log('start time', messageParse);
  iframePlayer
    .setCurrentTime(messageParse)
    .then(function (seconds) {})
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          break;
        default:
          break;
      }
    });
}
