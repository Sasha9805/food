import { getResource } from '../services/services';
import axios from 'axios';

function cards() { 
	// Используем классы для карточек
	class MenuCard {
		// Syntax Error. Rest параметр не поддерживает п-ры по умолчанию!
		constructor(src, alt, title, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			// Но [] в логическом контексте true
			// this.classes = classes || ['menu__item'];
			// Будем проверять длину массива classes
			this.classes = (classes.length == 0) ? ['menu__item'] : classes;
			this.parent = document.querySelector(parentSelector);
			// Курс валют
			this.transfer = 27;
			// Вызовем его в конструторе
			this.changeToUAH();
		}
		// Из БД приходит цена в долларах, а на сайте в гривнах
		changeToUAH() {
			this.price *= this.transfer;
		}
		render() {
			const element = document.createElement('div');
			// С урока
			// if (this.classes.length == 0) {
			//   this.element = 'menu__item';
			//   element.classList.add(this.element);
			// } else {
			//   this.classes.forEach(item => element.classList.add(item));
			// }
			this.classes.forEach(item => element.classList.add(item));
			element.innerHTML = `
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
      `;
			this.parent.append(element);
		}
	}

	// getResource('http://localhost:3000/menu')
	// 	.then(data => {
	// 		data.forEach(({img, altimg, title, descr, price}) => {
	// 			new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
	// 		});
	// 	});

	// Используем библиотеку axios (пока подключили через CDN)
	axios.get('http://localhost:3000/menu')
		.then(data => {
			console.log(data);
			data.data.forEach(({img, altimg, title, descr, price}) => {
				new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
			});
		});

	// Используем функцию вместо классов
	// function createCard(data) {
	// 	data.forEach(({img, altimg, title, descr, price}) => {
	// 		const element = document.createElement('div');
	// 		element.classList.add('menu__item');
	// 		// Нужно дополнительно price перевести в грн
	// 		element.innerHTML = `
	//       <img src=${img} alt=${altimg}>
	//       <h3 class="menu__item-subtitle">${title}</h3>
	//       <div class="menu__item-descr">${descr}</div>
	//       <div class="menu__item-divider"></div>
	//       <div class="menu__item-price">
	//           <div class="menu__item-cost">Цена:</div>
	//           <div class="menu__item-total"><span>${price}</span> грн/день</div>
	//       </div>
	//     `;

	// 		document.querySelector('.menu .container').append(element);
	// 	});
	// }

	// getResource('http://localhost:3000/menu')
	// 	.then(data => createCard(data));

	// Вызываем
	// new MenuCard(
	// 	'img/tabs/vegy.jpg',
	// 	'vegy',
	// 	'Меню "Фитнес"',
	// 	'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
	// 	9,
	// 	'.menu .container',
	// 	// 'menu__item'
	// ).render();

	// new MenuCard(
	// 	'img/tabs/elite.jpg',
	// 	'elite',
	// 	'Меню “Премиум”',
	// 	'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
	// 	21,
	// 	'.menu .container',
	// 	'menu__item',
	// 	'big'
	// ).render();

	// new MenuCard(
	// 	'img/tabs/post.jpg',
	// 	'post',
	// 	'Меню "Постное"',
	// 	'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
	// 	14,
	// 	'.menu .container',
	// 	'menu__item'
	// ).render();
}

export default cards;