// Variáveis para controle de navegação
let lastScrollTop = 0;
const navbarMobile = document.querySelector('.navegacao-movel'); // Navegação móvel
const navbar = document.querySelector('.navegacao-desktop'); // Navbar desktop
const menuMobile = document.querySelector('.menu-movel'); // Menu móvel
const menuIcon = document.querySelector('.menu-icon'); // Ícone do menu hamburguer

// Função para alternar a visibilidade do menu móvel
function toggleMobileMenu() {
    if (menuMobile) {
        menuMobile.classList.toggle('show'); // Alterna a visibilidade do menu móvel
        console.log('Menu mobile toggled'); // Debug
    }
}

// Alternar menus drop-down
const dropButtons = document.querySelectorAll('.dropbtn');
dropButtons.forEach(button => {
    button.addEventListener('click', function () {
        const dropdownContent = this.nextElementSibling;
        if (dropdownContent) {
            dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
        }
    });
});

// Evento de rolagem para esconder/mostrar a barra de navegação
if (navbar) {
    window.addEventListener('scroll', function () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > navbar.offsetHeight) {
            navbar.style.top = `-${navbar.offsetHeight}px`; // Esconde a navbar
        } else {
            navbar.style.top = '0'; // Mostra a navbar
        }
        lastScrollTop = scrollTop; // Atualiza a posição anterior
    });
}

// Carrossel de depoimentos
let currentDepoimentoIndex = 0;

function showDepoimento(index) {
    const wrapper = document.querySelector('.depoimentos-wrapper');
    const depoimentos = document.querySelectorAll('.depoimento');

    if (wrapper && depoimentos.length > 0) {
        const totalDepoimentos = depoimentos.length;
        wrapper.style.transform = `translateX(-${(index * 100) / totalDepoimentos}%)`;
    }
}

function changeDepoimento(direction) {
    const depoimentos = document.querySelectorAll('.depoimento');

    if (depoimentos.length > 0) {
        const totalDepoimentos = depoimentos.length;
        currentDepoimentoIndex = (currentDepoimentoIndex + direction + totalDepoimentos) % totalDepoimentos;
        showDepoimento(currentDepoimentoIndex);
    }
}

// Inicia o carrossel
showDepoimento(currentDepoimentoIndex);

const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

if (prevButton) {
    prevButton.addEventListener('click', () => changeDepoimento(-1));
}
if (nextButton) {
    nextButton.addEventListener('click', () => changeDepoimento(1));
}

// Autoplay do carrossel
let autoplayInterval;

function startAutoplay() {
    if (window.innerWidth > 768) {
        autoplayInterval = setInterval(() => changeDepoimento(1), 5000);
    }
}

function stopAutoplay() {
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
    }
}

function handleAutoplay() {
    if (window.innerWidth > 800) {
        startAutoplay();
    } else {
        stopAutoplay();
    }
}

window.addEventListener('resize', handleAutoplay);
handleAutoplay();

// Evento do menu móvel
if (menuIcon) {
    menuIcon.addEventListener('click', toggleMobileMenu);
}
