import throttle from 'lodash.throttle';

const formData = {
  email: '',
  message: '',
};
const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

populateText();

refs.form.addEventListener('submit', evt => {
  evt.preventDefault();
  evt.currentTarget.reset();
  removeData(STORAGE_KEY);
});

refs.email.addEventListener(
  'input',
  throttle(evt => {
    formData.email = evt.target.value;
    saveData(STORAGE_KEY, formData);
    console.log(formData.email);
  }, 500)
);

refs.textarea.addEventListener(
  'input',
  throttle(evt => {
    formData.message = evt.target.value;
    saveData(STORAGE_KEY, formData);
    console.log(formData.message);
  }, 500)
);

function populateText() {
  const data = loadData(STORAGE_KEY);
  if (data) {
    console.log(data);
    refs.email.value = data.email;
    formData.email = data.email;
    refs.textarea.value = data.message;
    formData.message = data.message;
  }
}

function saveData(key, value) {
  try {
    const saveMessage = JSON.stringify(value);
    localStorage.setItem(key, saveMessage);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
}

function loadData(key) {
  try {
    const saveMessage = localStorage.getItem(key);
    if (saveMessage) {
      return JSON.parse(saveMessage);
    }
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}

function removeData(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}
