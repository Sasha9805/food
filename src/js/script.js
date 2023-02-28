/* eslint-disable no-mixed-spaces-and-tabs */
'use strict';

import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';

import { openModal } from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {

	// Функция предварительной загрузки изображения спиннера
	function preloadImg(sources) {
		for (let src of sources) {
			let img = document.createElement('img');
			img.src = src;
		}
	}
	preloadImg(['img/form/spinner.svg']);

	const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 7000);

	tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	modal('[data-modal]', '.modal', modalTimerId);
	timer('.timer', '2023-03-24 18:58:00');
	cards();
	calc();
	forms(modalTimerId);
	slider({
		container: '.offer__slider',
		nextArrow: '.offer__slider-next',
		prevArrow: '.offer__slider-prev',
		slide: '.offer__slide',
		totalCounter: '#total',
		currentCounter: '#current',
		wrapper: '.offer__slider-wrapper',
		field: '.offer__slider-inner',
	});

});