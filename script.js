document.addEventListener('DOMContentLoaded', () => {
  const buttons = Array.from(document.querySelectorAll('.menu-btn[data-target]'));
  const sections = Array.from(document.querySelectorAll('.recipe-section'));

  const activateSection = (targetId) => {
    buttons.forEach((button) => {
      const isActive = button.dataset.target === targetId;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });

    sections.forEach((section) => {
      const isActive = section.id === targetId;
      section.classList.toggle('active-section', isActive);
      section.classList.toggle('hidden', !isActive);
    });

    if (targetId) {
      window.history.replaceState(null, '', `#${targetId}`);
    }
  };

  const handleButtonClick = (event) => {
    const targetId = event.currentTarget.dataset.target;
    if (!targetId) return;
    activateSection(targetId);
  };

  const handleKeyDown = (event) => {
    if (!buttons.length || (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')) return;
    const currentIndex = buttons.findIndex((button) => button.classList.contains('active'));
    if (currentIndex === -1) return;

    const nextIndex = event.key === 'ArrowRight'
      ? Math.min(buttons.length - 1, currentIndex + 1)
      : Math.max(0, currentIndex - 1);

    if (nextIndex !== currentIndex) {
      buttons[nextIndex].focus();
      activateSection(buttons[nextIndex].dataset.target);
    }
  };

  const setupNavigation = () => {
    if (!buttons.length) return;

    buttons.forEach((button) => {
      button.setAttribute('type', 'button');
      button.setAttribute('aria-pressed', 'false');
      button.addEventListener('click', handleButtonClick);
      button.addEventListener('keydown', handleKeyDown);
    });

    const hashTarget = window.location.hash.slice(1);
    if (hashTarget && sections.some((section) => section.id === hashTarget)) {
      activateSection(hashTarget);
    } else {
      activateSection(buttons[0].dataset.target);
    }
  };

  setupNavigation();
});
