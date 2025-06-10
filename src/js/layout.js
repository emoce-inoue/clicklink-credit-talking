const triggerYesNo = () => {
  const yesnoItems = document.querySelectorAll('.l-chart__yesno-list');
  const yesAnswer = document.querySelector('.l-answer--yes');
  const noAnswer = document.querySelector('.l-answer--no');
  const typeElement = document.querySelector('.l-type');

  yesnoItems.forEach((item) => {
    item.addEventListener('click', () => {
      if (item.classList.contains('l-chart__yesno-list--selected')) {
        return;
      }

      document.querySelectorAll('.l-type__list-item--selected').forEach((targetType) => {
        targetType.classList.remove('l-type__list-item--selected');
      });
      document.querySelectorAll('.l-category--selected').forEach((targetCategory) => {
        targetCategory.classList.remove('l-category--selected');
      });
      document.querySelectorAll('.l-modal__list-item--selected').forEach((targetModal) => {
        targetModal.classList.remove('l-modal__list-item--selected');
      });

      typeElement.classList.add('l-type--opened');

      yesnoItems.forEach((targetItem) => targetItem.classList.remove('l-chart__yesno-list--selected'));
      document.querySelectorAll('.l-answer').forEach((answer) => answer.classList.remove('l-answer--selected'));

      item.classList.add('l-chart__yesno-list--selected');

      (item.dataset.answer === 'yes' ? yesAnswer : noAnswer).classList.add('l-answer--selected');
    });
  });
};

const closeModal = (modal, options = {}, context = {}) => {
  const { shouldDeselectType = true, restoreFocus = true } = options;

  const { previousFocus = null, deselectAllTypeItems = null } = context;

  if (!modal || !modal.classList.contains('l-modal--opened')) {
    return;
  }

  modal.classList.remove('l-modal--opened');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('l-body--noscroll');

  if (restoreFocus && previousFocus && typeof previousFocus.focus === 'function') {
    previousFocus.focus();
  }

  if (shouldDeselectType && typeof deselectAllTypeItems === 'function' && !document.querySelector('.l-category--selected')) {
    deselectAllTypeItems();
  }
};

const initializeModal = () => {
  const typeItems = document.querySelectorAll('.l-type__list-item');
  const modals = document.querySelectorAll('.l-modal');
  let previousFocus = null;

  const deselectAllTypeItems = () => {
    typeItems.forEach((item) => item.classList.remove('l-type__list-item--selected'));
  };

  const closeAllModals = () => {
    modals.forEach((modal) => {
      closeModal(modal, { shouldDeselectType: true, restoreFocus: true }, { previousFocus, deselectAllTypeItems });
    });
  };

  const openModal = (modal) => {
    if (modal.classList.contains('l-modal--opened')) {
      return;
    }

    previousFocus = document.activeElement;
    modal.classList.add('l-modal--opened');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('l-body--noscroll');

    const focusTarget = modal.querySelector('.js-modal-focus') || modal;
    focusTarget.focus();
  };

  typeItems.forEach((item) => {
    item.addEventListener('click', () => {
      if (!item.classList.contains('l-type__list-item--selected')) {
        const selectedCategory = document.querySelector('.l-category--selected');
        if (selectedCategory) {
          selectedCategory.classList.remove('l-category--selected');
        }
      }

      deselectAllTypeItems();
      item.classList.add('l-type__list-item--selected');
      closeAllModals();
      const typeValue = item.dataset.type;
      if (typeValue) {
        const modalToOpen = Array.from(modals).find((modal) => modal.dataset.target === typeValue);
        if (modalToOpen) {
          openModal(modalToOpen);
        }
      }
    });
  });
  modals.forEach((modal) => {
    modal.addEventListener('click', (event) => {
      if (!event.target.closest('.l-modal__content-inner')) {
        closeModal(modal, { shouldDeselectType: true, restoreFocus: true }, { previousFocus, deselectAllTypeItems });
      }
    });
    const closeBtn = modal.querySelector('.js-modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        closeModal(modal, { shouldDeselectType: true, restoreFocus: true }, { previousFocus, deselectAllTypeItems });
      });
    }
  });
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      modals.forEach((modal) => {
        if (modal.classList.contains('l-modal--opened')) {
          closeModal(modal, { shouldDeselectType: true, restoreFocus: true }, { previousFocus, deselectAllTypeItems });
        }
      });
    }
  });
};

const handleModalItemClick = () => {
  const modalListItems = document.querySelectorAll('.l-modal__list-item');
  const categories = document.querySelectorAll('.l-category');

  const deselectAllModalItems = () => {
    modalListItems.forEach((item) => item.classList.remove('l-modal__list-item--selected'));
  };

  const deselectAllCategories = () => {
    categories.forEach((category) => category.classList.remove('l-category--selected'));
  };

  modalListItems.forEach((item) => {
    item.addEventListener('click', () => {
      const modalValue = item.dataset.modal;
      const selectedCategory = document.querySelector(`.l-category[data-category="${modalValue}"]`);

      if (item.classList.contains('l-modal__list-item--selected')) {
        return;
      }

      deselectAllModalItems();
      item.classList.add('l-modal__list-item--selected');

      deselectAllCategories();
      if (selectedCategory) {
        selectedCategory.classList.add('l-category--selected');

        const rect = selectedCategory.getBoundingClientRect();
        const scrollTop = window.scrollY + rect.top;
        selectedCategory.scrollIntoView({
          top: scrollTop,
          behavior: 'smooth',
        });
      }

      const modal = item.closest('.l-modal');
      if (modal) {
        closeModal(modal, { shouldDeselectType: false, restoreFocus: false });
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
