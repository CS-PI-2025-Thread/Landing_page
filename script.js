function toggleMenu() {
    const menu = document.querySelector('.menu-mobile');
    menu.classList.toggle('active');
}

function closeMenu() {
    const menu = document.querySelector('.menu-mobile');
    menu.classList.remove('active');
}

function toggleContrast() {
  const htmlElement = document.documentElement;
  const currentTheme = htmlElement.getAttribute('data-theme');
  const targetTheme = currentTheme === 'contrast' ? null : 'contrast';

  htmlElement.setAttribute('data-theme', targetTheme);
}