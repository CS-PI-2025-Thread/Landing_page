function toggleMenu() {
    const menu = document.querySelector('.menu-mobile');
    menu.classList.toggle('active');
}

function closeMenu() {
    const menu = document.querySelector('.menu-mobile');
    menu.classList.remove('active');
}
