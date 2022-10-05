// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

console.log(galleryItems);

// ЧЕРЕЗ КЛАСС

const divElementContainer = document.querySelector('.gallery'); // получение ссылки на контейнер куда будет добавлятся разметка

class Gallery {
  constructor(galleryItems, divElementContainer) {
    this.galleryItems = galleryItems;
    this.divElementContainer = divElementContainer;
  }
  foo(event) {
    event.preventDefault(); // удаление перехода по умолчанию по ссылке
  }
  createMarkup(galleryItems) {
    const markup = [];
    for (const galleryItem of galleryItems) {
      markup.push(
        `<a class="gallery__item" href="${galleryItem.original}">
        <img class="gallery__image" src="${galleryItem.preview}" alt="${galleryItem.description}" />
        </a>`
      );
    }
    return markup.join('');
  }
  addListener() {
    divElementContainer.addEventListener('click', this.foo); // добавление слушателя событий на клик по картинке с запуском функции foo()
  }
  init() {
    divElementContainer.insertAdjacentHTML(
      'beforeend',
      this.createMarkup(this.galleryItems)
    ); // добавление разметки на страницу
    this.addListener();
    let lightbox = new SimpleLightbox('.gallery a', {
      captions: true, //true	bool	show captions if availabled or not
      captionSelector: 'img', //'img'	string or function	set the element where the caption is. Set it to "self" for the A-Tag itself or use a callback which returns the element
      captionType: 'attr', //'attr'	string	how to get the caption. You can choose between attr, data or text
      captionsData: 'alt', //title	string	get the caption from given attribute
      captionPosition: 'bottom', //'bottom'	string	the position of the caption. Options are top, bottom or outside (note that outside can be outside the visible viewport!)
      captionDelay: 250, //int	adds a delay before the caption shows (in ms)
    });
  }
}

new Gallery(galleryItems, divElementContainer).init();
