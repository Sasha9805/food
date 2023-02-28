/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function calc() {
	// Calculator

	const result = document.querySelector('.calculating__result span');

	let sex, height, weight, age, ratio;

	if (localStorage.getItem('sex')) {
		sex = localStorage.getItem('sex');
	} else {
		sex = 'female';
		localStorage.setItem('sex', 'female');
	}

	if (localStorage.getItem('ratio')) {
		ratio = localStorage.getItem('ratio');
	} else {
		ratio = 1.375;
		localStorage.setItem('ratio', 1.375);
	}

	function initLocalSettings(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(elem => {
			elem.classList.remove(activeClass);

			if (elem.getAttribute('id') === localStorage.getItem('sex')) {
				elem.classList.add(activeClass);
			}

			if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
				elem.classList.add(activeClass);
			}
		});
	}

	initLocalSettings('#gender div', 'calculating__choose-item_active');
	initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

	function calcTotal() {
		if (!sex || !height || !weight || !age ||!ratio) {
			result.textContent = '____';
			return;
		}

		if (sex === 'female') {
			result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
		} else {
			result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
		}
	}

	calcTotal();

	function getStaticInformation(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(el => {
			el.addEventListener('click', e => {
				if (e.target.getAttribute('data-ratio')) {
					ratio = +e.target.getAttribute('data-ratio');
					localStorage.setItem('ratio', ratio);
				} else {
					sex = e.target.getAttribute('id');
					localStorage.setItem('sex', sex);
				}
	
				elements.forEach(el => {
					el.classList.remove(activeClass);
				});
	
				e.target.classList.add(activeClass);
	
				calcTotal();
			});
		});
	}

	getStaticInformation('#gender div', 'calculating__choose-item_active');
	getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

	function getDynamicInformation(selector) {
		const input = document.querySelector(selector);

		input.addEventListener('input', () => {

			if (input.value.match(/\D/g)) {
				input.style.border = '1px solid red';
			} else {
				input.style.border = '';
			}

			switch (input.getAttribute('id')) {
			case 'height':
				height = +input.value;
				break;
			case 'weight':
				weight = +input.value;
				break;
			case 'age':
				age = +input.value;
				break;
			}

			calcTotal();
		});
	}

	getDynamicInformation('#height');
	getDynamicInformation('#weight');
	getDynamicInformation('#age');
}

module.exports = calc;

/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

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

	const getResource = async (url) => {
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		return res.json();
	};

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

module.exports = cards;

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function forms() {
	// Forms

	const forms = document.forms;
	// Для блока после формы - состояние запроса для пользователя
	const message = {
		// loading: 'Загрузка',
		loading: 'img/form/spinner.svg',
		success: 'Спасибо, скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так'
	};
  
	for (let form of forms) {
		bindPostData(form);
	}

	const postData = async (url, data) => {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: data
		});

		return res.json();
	};

	function bindPostData(form) {
		form.addEventListener('submit', event => {
			event.preventDefault();

			// const statusMessage = document.createElement('div');
			const statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			// Уст. по центру (лучше через css классы)
			statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
			// statusMessage.textContent = message.loading;
			// form.append(statusMessage);
			// Чтобы форма не уменьшалась при появлении спиннера
			form.after(statusMessage);

			// const request = new XMLHttpRequest();
			// request.open('POST', '/server.php');
			// Заголовок, используя FormData
			// Такой заголовок не сработает!!! (будет пустой ответ) + нужна последняя версия PHP, иначе - ошибка
			// См. вкладку Network в devtools
			// request.setRequestHeader('Content-type', 'multipart/form-data');

			// Передадим данные с пом. объекта FormData
			const formData = new FormData(form);
      
			// Но, напр., нам нужно передать в формате JSON
			// request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
			// Нужно преобр. FormData в JSON
			// const obj = {};
			// formData.forEach((value, key) => {
			// 	obj[key] = value;
			// });
			// // Конвертируем в JSON
			// const json = JSON.stringify(obj);

			// Исп. Object.fromEntries()
			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			// Отправим
			// request.send(formData);
			// Как JSON
			// request.send(json);

			// FETCH
			// При server1.php все равно промис будет успешно выполнен
			// Для fetch важно, что сам запрос вообще удалось сделать
			// А если это ошибка HTTP, то промис не перейдет в состояние reject
			// При server1 - 404 (запрашиваемый ресурс не найден)
			// Если в Network поставить offline, то catch сработает
			// fetch('server.php', {
			// 	method: 'POST',
			// 	headers: {
			// 		'Content-type': 'application/json'
			// 	},
			// 	// Для FormData заголовки не нужны!
			// 	// body: formData
			// 	body: json
			// })
			// Используем json-server, server.php не нужен
			postData('http://localhost:3000/requests', json)
			// response.json() - сработает catch, а от сервера получим NULL
				// .then(response => response.text())
				.then(data => {
					console.log(data);
					showThanksModal(message.success);
				})
				.catch(() => {
					showThanksModal(message.failure);
				})
				.finally(() => {
					form.reset();
					statusMessage.remove();
				});

			// request.addEventListener('load', () => {
			//   if (request.status == 200) {
			//     console.log(request.response);
			//     // statusMessage.textContent = message.success;
			//     showThanksModal(message.success);
			//     // Очистим форму и удалим блок с сообщением
			//     form.reset();
			//     // Это уже не нужно
			//     // setTimeout(() => {
			//     //   statusMessage.remove();
			//     // }, 2000);
			//     statusMessage.remove();
			//   } else {
			//     // statusMessage.textContent = message.failure;
			//     showThanksModal(message.failure);
			//     form.reset();
			//     statusMessage.remove();
			//   }
			// });
		});
	}

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		// Нужно скрывать, а не удалять, чтобы в дальнейшем пользоваться изначальным функционалом
		prevModalDialog.classList.add('hide');
		// Заново открываем
		openModal();

		// Формируем новое modal__dialog
		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		// Чтоб крестик работал, нужно применить делегирование к modal
		thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>&times;</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

		// Помещаем в div.modal
		modal.append(thanksModal);

		// Через время новое мод. окно должно пропасть и появиться старое
		// Напр., польз. заново захочет отпр. свои данные, а там должна быть форма
		setTimeout(() => {
			thanksModal.remove();
			// prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModal();
		}, 4000);
	}

	// Fake API jsonplaceholder
	// GET-запрос fetch
	// fetch('https://jsonplaceholder.typicode.com/todos/1')
	//   .then(response => response.json())
	//   .then(json => console.log(json));

	// POST
	// fetch('https://jsonplaceholder.typicode.com/posts', {
	//   method: 'POST',
	//   body: JSON.stringify({name: 'John'}),
	//   headers: {
	//     'Content-type': 'application/json'
	//   }
	// })
	//   .then(response => response.json())
	//   .then(json => console.log(json));

	// db.json
	// fetch('http://localhost:3000/menu')
	//   .then(data => data.json())
	//   .then(res => console.log(res))
}

module.exports = forms;

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function modal() {
	// Modal

	const modalTrigger = document.querySelectorAll('[data-modal]'),
		modal = document.querySelector('.modal');

	function openModal(e) {
		modal.classList.add('show');
		modal.classList.remove('hide');
		// Можно исп. toggle
		// modal.classList.toggle('show');

		document.body.style.overflow = 'hidden';

		// Чтобы не открывалось по таймеру, если польз. открыл вручную
		clearTimeout(modalTimerId);
		// Чтобы при срабатывании таймера не сработало открытие при докрутке
		// e - undefined
		if (!e) {
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	function closeModal() {
		modal.classList.add('hide');
		modal.classList.remove('show');
		// Можно исп. toggle
		// modal.classList.toggle('show');

		document.body.style.overflow = '';
	}

	modalTrigger.forEach(item => {
		item.addEventListener('click', openModal);
	});

	// Закрытие по клику на "подложку"
	modal.addEventListener('click', e => {
		// Мой вариант
		// if (e.target.classList.contains('modal')) {
		// В уроке
		// Бывает, не передают объект события, а
		// обращаются к event.target..
		// Так делать НЕ НАДО
		// if (event.target == modal) {
		// Мой вариант
		// if (e.target == modal || e.target.dataset.close != undefined) {
		// С урока
		if (e.target == modal || e.target.getAttribute('data-close') == '') {
			closeModal();
		}
	});

	// Закрытие по клику на esc
	document.addEventListener('keydown', e => {
		if (e.code == 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});

	// Мод. окно откроется через какое-то время
	const modalTimerId = setTimeout(openModal, 7000);

	// Мод.окно откр. при докрутке до конца
	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal();
		}
	}
	window.addEventListener('scroll', showModalByScroll);

}

module.exports = modal;

/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function slider() {
	// Slider

	const slides = document.querySelectorAll('.offer__slide'),
		slider = document.querySelector('.offer__slider'),
		prev = document.querySelector('.offer__slider-prev'),
		next = document.querySelector('.offer__slider-next'),
		total = document.querySelector('#total'),
		current = document.querySelector('#current'),
		slidesWrapper = document.querySelector('.offer__slider-wrapper'),
		slidesField = document.querySelector('.offer__slider-inner'),
		width = getComputedStyle(slidesWrapper).width;

	let slideIndex = 1;
	let offset = 0;

	if (slides.length < 10) {
		total.textContent = `0${slides.length}`;
	} else {
		total.textContent = slides.length;
	}
	current.textContent = `0${slideIndex}`;

	slidesField.style.width = 100 * slides.length + '%';
	slidesField.style.display = 'flex';
	slidesField.style.transition = '0.5s all';

	slidesWrapper.style.overflow = 'hidden';

	slides.forEach(slide => {
		slide.style.width = width;
	});

	slider.style.position = 'relative';

	const indicators = document.createElement('ol'),
		dots = [];
	indicators.classList.add('offer__carousel-indicators');
	slider.append(indicators);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i + 1);
		dot.classList.add('offer__dot');
		if (i === 0) {
			dot.style.opacity = 1;
		}
		indicators.append(dot);
		dots.push(dot);
	}

	function deleteNotDigits(str) {
		return +str.replace(/\D/g, '');
	}

	next.addEventListener('click', () => {
		if (offset === deleteNotDigits(width) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += deleteNotDigits(width);
		}
		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		if (slideIndex < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}

		dots.forEach(dot => dot.style.opacity = '');
		dots[slideIndex - 1].style.opacity = 1;
	});

	prev.addEventListener('click', () => {
		if (offset === 0) {
			offset = deleteNotDigits(width) * (slides.length - 1);
		} else {
			offset -= deleteNotDigits(width);
		}
		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		if (slideIndex < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}

		dots.forEach(dot => dot.style.opacity = '');
		dots[slideIndex - 1].style.opacity = 1;
	});

	dots.forEach(dot => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');

			slideIndex = slideTo;
			offset = deleteNotDigits(width) * (slideTo - 1);
			slidesField.style.transform = `translateX(-${offset}px)`;

			dots.forEach(dot => dot.style.opacity = '');
			dots[slideIndex - 1].style.opacity = 1;

			if (slideIndex < 10) {
				current.textContent = `0${slideIndex}`;
			} else {
				current.textContent = slideIndex;
			}
		});
	});

	// Первая версия
	// showSlides(slideIndex);

	// if (slides.length < 10) {
	// 	total.textContent = `0${slides.length}`;
	// } else {
	// 	total.textContent = slides.length;
	// }

	// function showSlides(n) {
	// 	if (n > slides.length) {
	// 		slideIndex = 1;
	// 	}

	// 	if (n < 1) {
	// 		slideIndex = slides.length;
	// 	}

	// 	slides.forEach(item => item.style.display = 'none');
	// 	slides[slideIndex - 1].style.display = '';

	// 	if (slideIndex < 10) {
	// 		current.textContent = `0${slideIndex}`;
	// 	} else {
	// 		current.textContent = slideIndex;
	// 	}
	// }

	// function plusSlides(n) {
	// 	showSlides(slideIndex += n);
	// }

	// prev.addEventListener('click', () => {
	// 	plusSlides(-1);
	// });

	// next.addEventListener('click', () => {
	// 	plusSlides(1);
	// });
}

module.exports = slider;

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function tabs() {
	// Tabs

	// Элементы меню (фитнес и т.д.)
	const tabs = document.querySelectorAll('.tabheader__item'),
		// Сами табы
		tabsContent = document.querySelectorAll('.tabcontent'),
		// Родитель эл-ов меню для делегирования
		tabsParent = document.querySelector('.tabheader__items');
	hideTabContent();
	// Можно без п-ов, будет отобр. первый элемент фитнес
	showTabContent();

	// Скроем все табы для начала
	function hideTabContent() {
		// Инлайн-стили
		// tabsContent.forEach(item => item.style.display = 'none');
		// С пом. классов
		tabsContent.forEach(item => {
			item.classList.add('hide');
			// Удалить класс обязательно
			item.classList.remove('show', 'fade');
		});
		// Убираем класс активности
		tabs.forEach(item => item.classList.remove('tabheader__item_active'));
	}

	// Показ табов
	function showTabContent(number = 0) {
		// Инлайн-стили
		// tabsContent[number].style.display = 'block';
		// Классы
		tabsContent[number].classList.add('show', 'fade');
		tabsContent[number].classList.remove('hide');
		tabs[number].classList.add('tabheader__item_active');
	}

	// Делегирование
	tabsParent.addEventListener('click', e => {
		// Проще сначала получить
		const target = e.target;
		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				// Если то, на что мы кликнули совпадает с элементом из псевдомассива, то вызываем ф-и
				if (item == target) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});
}

module.exports = tabs;

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function timer() {
	// Timer

	const deadline = '2023-03-24 18:58:00';

	// Расчет временных промежутков
	function getTimeRemaining(endtime) {
		// Обработка прошедшей даты
		// Тогда не нужно переносить в начало условие в updateTimer
		// let days, hours, minutes, seconds;
		// const t =  Date.parse(endtime) - Date.parse(new Date());
		// if (t <= 0) {
		//   days = 0;
		//   hours = 0;
		//   minutes = 0;
		//   seconds = 0;
		// } else {
		//   // Считаем эти перем. из t
		// }
		const t = new Date(endtime).getTime() - Date.now(),
			// const t = Date.parse(endtime) - Date.parse(new Date()),
			days = Math.floor(t / (24 * 60 * 60 * 1000)),
			// Может быть больше 24, поэтому берем остаток
			hours = Math.floor(t / (1000 * 60 * 60) % 24),
			minutes = Math.floor(t / (1000 * 60) % 60),
			seconds = Math.floor(t / 1000 % 60);

		return {
			'total': t,
			days,
			hours,
			minutes,
			seconds,
		};
	}

	// Установка нулей, если нужно
	function setZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	// Установка таймера
	function setTimer(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timerInterval = setInterval(updateTimer, 1000);

		// Рекурсивный setTimeout
		// let timerInterval = setTimeout(updateTimer, 1000);

		// Чтобы верстка изначально не мигала
		// Вызвать вручную (нужно и с рекурсивным setTimeout)
		updateTimer();

		// Обновление наших часов
		function updateTimer() {

			// Получили объект
			const t = getTimeRemaining(endtime);

			// Если дедлайн прошел
			if (t.total <= 0) {
				clearInterval(timerInterval);
				// clearTimeout(timerInterval);
				days.innerHTML = setZero(0);
				hours.innerHTML = setZero(0);
				minutes.innerHTML = setZero(0);
				seconds.innerHTML = setZero(0);
			} else {
				// Записываем на страницу
				// Мой вариант
				// days.innerHTML = ('0' + t.days).slice(-2);
				// hours.innerHTML = ('0' + t.hours).slice(-2);
				// minutes.innerHTML = ('0' + t.minutes).slice(-2);
				// seconds.innerHTML = ('0' + t.seconds).slice(-2);

				// Вариант с функцией
				days.innerHTML = setZero(t.days);
				hours.innerHTML = setZero(t.hours);
				minutes.innerHTML = setZero(t.minutes);
				seconds.innerHTML = setZero(t.seconds);

				// Рекурс. setTimeout
				// timerInterval = setTimeout(updateTimer, 1000);
			}
		}
	}

	setTimer('.timer', deadline);
}

module.exports = timer;

/***/ }),

/***/ "./src/js/script.js":
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint-disable no-mixed-spaces-and-tabs */


document.addEventListener('DOMContentLoaded', () => {

	// Функция предварительной загрузки изображения спиннера
	function preloadImg(sources) {
		for (let src of sources) {
			let img = document.createElement('img');
			img.src = src;
		}
	}
	preloadImg(['img/form/spinner.svg']);

	const tabs = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js"),
		  modal = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js"),
		  timer = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js"),
	  	  cards = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js"),
	  	  calc = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js"),
		  forms = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js"),
	  	  slider = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");

	tabs();
	modal();
	timer();
	cards();
	calc();
	forms();
	slider();

});

/***/ })

/******/ });
//# sourceMappingURL=script.js.map