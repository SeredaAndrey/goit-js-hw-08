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

// слушатель событий на отправку формы
refs.form.addEventListener('submit', evt => {
  evt.preventDefault(); // сброс настроек по умолчанию
  evt.currentTarget.reset(); // очистка полей формы
  removeData(STORAGE_KEY); // очистка localStorage
});

// слушатель событий на ввод в поле почты
refs.email.addEventListener(
  'input',
  throttle(evt => {
    formData.email = evt.target.value;
    saveData(STORAGE_KEY, formData);
  }, 500)
);

// слушатель событий на отпровку формы текста
refs.textarea.addEventListener(
  'input',
  throttle(evt => {
    formData.message = evt.target.value;
    saveData(STORAGE_KEY, formData);
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

// запись в localStorage
function saveData(key, value) {
  try {
    const saveMessage = JSON.stringify(value);
    localStorage.setItem(key, saveMessage);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
}

// чтение из localStorage
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

// удаление из localStorage
function removeData(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}
