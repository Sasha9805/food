"use strict";

document.addEventListener('DOMContentLoaded', () => {

  // Функция предварительной загрузки изображения спиннера
  function preloadImg(sources) {
    for (let src of sources) {
      let img = document.createElement('img');
      img.src = src;
    }
  }
  preloadImg(['img/form/spinner.svg']);

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

  // Timer

  const deadline = '2020-09-02 18:58:00';

  // Расчет временных промежутков
  function getTimeRemaining(endtime) {
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
  // Вызываем
  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    '.menu .container',
    // 'menu__item'
  ).render();

  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    21,
    '.menu .container',
    'menu__item',
    'big'
  ).render();

  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    14,
    '.menu .container',
    'menu__item'
  ).render();
  
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
    postData(form);
  }

  function postData(form) {
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
      const obj = {};
      formData.forEach((value, key) => {
        obj[key] = value;
      });
      // Конвертируем в JSON
      const json = JSON.stringify(obj);

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
      fetch('/server.php', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        // Для FormData заголовки не нужны!
        // body: formData
        body: json
      })
      // response.json() - сработает catch, а от сервера получим NULL
      .then(response => response.text())
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
});