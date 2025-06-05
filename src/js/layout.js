const triggerYesNo = () => {
  const yesnoItems = document.querySelectorAll('.l-chart__yesno-list');
  const yesAnswer = document.querySelector('.l-answer--yes');
  const noAnswer = document.querySelector('.l-answer--no');
  const typeElm = document.querySelector('.l-type');

  yesnoItems.forEach((item) => {
    item.addEventListener('click', () => {
      typeElm.classList.add('l-type--opened');

      yesnoItems.forEach((i) => i.classList.remove('l-chart__yesno-list--selected'));
      document.querySelectorAll('.l-answer').forEach((ans) => ans.classList.remove('l-answer--selected'));

      item.classList.add('l-chart__yesno-list--selected');

      const answer = item.getAttribute('data-answer');
      if (answer === 'yes') {
        yesAnswer.classList.add('l-answer--selected');
      } else {
        noAnswer.classList.add('l-answer--selected');
      }
    });
  });
};

const initializeModal = () => {
  const typeItems = document.querySelectorAll('.l-type__list-item');
  const modals = document.querySelectorAll('.l-modal');

  typeItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      typeItems.forEach((otherItem) => {
        otherItem.classList.remove('l-type__list-item--selected');
      });

      item.classList.add('l-type__list-item--selected');

      modals.forEach((modal) => modal.classList.remove('l-modal--opened'));

      const modalToOpen = document.querySelector(`.l-modal--modal${index + 1}`);
      if (modalToOpen) {
        modalToOpen.classList.add('l-modal--opened');
      }
    });

    modals.forEach((modal) => {
      modal.addEventListener('click', (event) => {
        if (!event.target.closest('.l-modal__content-inner')) {
          modal.classList.remove('l-modal--opened');
        }
      });
    });
  });
};

const handleModalItemClick = () => {
  const modalListItems = document.querySelectorAll('.l-modal__list-item');
  const typeItems = document.querySelectorAll('.l-type__list-item');
  const categories = document.querySelectorAll('.l-category');

  modalListItems.forEach((item) => {
    item.addEventListener('click', () => {
      categories.forEach((category) => {
        category.classList.remove('l-category--selected');
      });

      const category = document.querySelector(`.l-category[data-category="${item.getAttribute('data-modal')}"]`);
      if (category) {
        category.classList.add('l-category--selected');
      }

      modalListItems.forEach((selectedItem) => {
        selectedItem.classList.remove('l-modal__list-item--selected');
      });
      item.classList.add('l-modal__list-item--selected');

      const modal = item.closest('.l-modal');
      if (modal) {
        modal.classList.add('l-modal--opened');
      }

      modal.classList.remove('l-modal--opened');

      if (!document.querySelector('.l-category--selected')) {
        typeItems.forEach((typeItem) => {
          typeItem.classList.remove('l-type__list-item--selected');
        });
      }
    });
  });

  const modals = document.querySelectorAll('.l-modal');
  modals.forEach((modal) => {
    modal.addEventListener('click', (event) => {
      if (!event.target.closest('.l-modal__content-inner')) {
        modal.classList.remove('l-modal--opened');

        if (!document.querySelector('.l-category--selected')) {
          const typeItems = document.querySelectorAll('.l-type__list-item');
          typeItems.forEach((typeItem) => {
            typeItem.classList.remove('l-type__list-item--selected');
          });
        }
      }
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  triggerYesNo();
  initializeModal();
  handleModalItemClick();
});

window.addEventListener('load', () => {
  const loadElms = document.querySelectorAll('.js-load');
  loadElms.forEach((loadElm) => {
    loadElm.classList.add('js-load--loaded');
  });
});
