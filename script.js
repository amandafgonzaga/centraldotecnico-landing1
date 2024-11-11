let lastScrollTop = 0; // Para rastrear a posição de rolagem anterior
const navbar = document.querySelector('.navegacao-principal');

// Evento de rolagem para esconder/mostrar a barra de navegação
window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Se o usuário rolar para baixo, esconda a barra de navegação
    if (scrollTop > lastScrollTop && scrollTop > navbar.offsetHeight) {
        navbar.style.top = `-${navbar.offsetHeight}px`; // Ajusta a barra para cima
    } else {
        navbar.style.top = '0'; // Mostra a barra
    }
    lastScrollTop = scrollTop; // Atualiza a posição de rolagem anterior
});


function avisoCookiesDrcode({
    message='Utilizamos cookies para que vocÃª tenha a melhor experiÃªncia em nosso site. Para saber mais acesse nossa pÃ¡gina de PolÃ­tica de Privacidade',
    backgroundColor='rgba(255,255,255,0.95)',
    textColor='#666666',
    buttonBackgoundColor='#0e9a20',
    buttonHoverBackgoundColor='#0a6b16',
    buttonTextColor='#ffffff'
}){
    var check = localStorage.getItem('avisoCookies')
    if(!check){
        var body = document.getElementsByTagName('body')[0];
        body.innerHTML += `
        <style>
            #aviso-cookies{z-index:100000;display:flex;width:100%;position:fixed;bottom:0;left:0;background-color:${backgroundColor};padding:20px;box-sizing:border-box;box-shadow:0 0 7px rgb(0 0 0 / 50%);justify-content:center;align-items:center}
            #texto-cookies{font-family:'Open Sans', 'Arial',sans-serif;font-size:14px;margin:0 20px 0 0;line-height:1.25rem;color:${textColor}}
            #texto-cookies * {font-family:'Open Sans', 'Arial',sans-serif;font-size:14px;line-height:1.25rem;color:${textColor}}
            #entendi-cookies{background:${buttonBackgoundColor};transition: 0.3s all ease;-o-transition: 0.3s all ease;-ms-transition:0.3s all ease;-moz-transition:0.3s all ease;-webkit-transition:0.3s all ease;color:${buttonTextColor};text-shadow:0 1px 1px rgb(0 0 0 / 20%);border-radius: 2px;border: 1px solid rgba(0,0,0,0.1);border-bottom-color: rgba(0,0,0,0.2);font-size: 14px;padding: 6px 14px;cursor: pointer;line-height:19px}
            #entendi-cookies:hover{background-color: ${buttonHoverBackgoundColor};}
        </style>
        <div id="aviso-cookies">
            <span id="texto-cookies">${message}</span>
            <button id="entendi-cookies">Entendi</button>
        </div>`;
        document.getElementById('entendi-cookies').addEventListener('click', function(){
            localStorage.setItem("avisoCookies", "accept");
            document.getElementById('aviso-cookies').remove()
        })
    }
}


document.querySelectorAll('.dropbtn').forEach(button => {
    button.addEventListener('click', function() {
        const dropdownContent = this.nextElementSibling;
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    });
});



let currentDepoimentoIndex = 0;

function showDepoimento(index) {
    const wrapper = document.querySelector('.depoimentos-wrapper');
    const depoimentos = document.querySelectorAll('.depoimento');
    const totalDepoimentos = depoimentos.length;

    // Muda a transformação para exibir o depoimento correto
    wrapper.style.transform = `translateX(-${(index * 100) / totalDepoimentos}%)`;
}

function changeDepoimento(direction) {
    const depoimentos = document.querySelectorAll('.depoimento');
    const totalDepoimentos = depoimentos.length;

    currentDepoimentoIndex += direction;

    // Lógica para reiniciar o carrossel de forma infinita
    if (currentDepoimentoIndex < 0) {
        currentDepoimentoIndex = totalDepoimentos - 1; // vai para o último depoimento
    } else if (currentDepoimentoIndex >= totalDepoimentos) {
        currentDepoimentoIndex = 0; // volta para o primeiro depoimento
    }

    showDepoimento(currentDepoimentoIndex);
}

// Inicia mostrando o primeiro depoimento
showDepoimento(currentDepoimentoIndex);

// Lógica de eventos para os botões
document.querySelector('.prev').addEventListener('click', () => {
    changeDepoimento(-1);
});
document.querySelector('.next').addEventListener('click', () => {
    changeDepoimento(1);
});

// Opção de autoplay (pode ser ajustada ou removida se não desejar)
setInterval(() => {
    changeDepoimento(1);
}, 5000); // Troca a cada 5 segundos

