const formData = {
  email: '',
  message: '',
};

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

populateText();

refs.form.addEventListener('submit', evt => {
  evt.preventDefault();
  evt.currentTarget.reset();
  removeData('feedback-form-state');
});

refs.email.addEventListener('input', evt => {
  formData.email = evt.target.value;
  saveData('feedback-form-state', formData);
});

refs.textarea.addEventListener('input', evt => {
  formData.message = evt.target.value;
  saveData('feedback-form-state', formData);
});

function populateText() {
  const data = loadData('feedback-form-state');
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
