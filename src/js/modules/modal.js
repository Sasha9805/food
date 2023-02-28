function openModal(modalSelector, modalTimerId) {
	const modal = document.querySelector(modalSelector);
	modal.classList.add('show');
	modal.classList.remove('hide');
	// Можно исп. toggle
	// modal.classList.toggle('show');

	document.body.style.overflow = 'hidden';

	// Чтобы не открывалось по таймеру, если польз. открыл вручную
	if (modalTimerId) {
		clearTimeout(modalTimerId);
	}
}

function closeModal(modalSelector) {
	const modal = document.querySelector(modalSelector);
	modal.classList.add('hide');
	modal.classList.remove('show');
	// Можно исп. toggle
	// modal.classList.toggle('show');

	document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
	// Modal

	const modalTrigger = document.querySelectorAll(triggerSelector),
		modal = document.querySelector(modalSelector);

	modalTrigger.forEach(item => {
		item.addEventListener('click', () => openModal(modalSelector, modalTimerId));
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
			closeModal(modalSelector);
		}
	});

	// Закрытие по клику на esc
	document.addEventListener('keydown', e => {
		if (e.code == 'Escape' && modal.classList.contains('show')) {
			closeModal(modalSelector);
		}
	});

	// Мод.окно откр. при докрутке до конца
	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal(modalSelector, modalTimerId);
			window.removeEventListener('scroll', showModalByScroll);
		}
	}
	window.addEventListener('scroll', showModalByScroll);

}

export default modal;
export { closeModal, openModal };