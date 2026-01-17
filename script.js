document.addEventListener('DOMContentLoaded', () => {

    // Configuração do Observador de Scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Ativa quando 15% do elemento aparece
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona a classe 'visible' que dispara a animação simples
                entry.target.classList.add('visible');
                // Para de observar para não animar de novo
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observa todos os elementos com a classe .scroll-reveal
    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => observer.observe(el));

    // Efeito Hover nos Cards do Arsenal
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.card-icon');
            icon.style.filter = "grayscale(0%) drop-shadow(0 0 5px var(--primary))";
            icon.style.transform = "scale(1.1)";
            icon.style.transition = "all 0.3s ease";
        });

        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.card-icon');
            icon.style.filter = "grayscale(100%)";
            icon.style.transform = "scale(1)";
        });
    });

    // Scroll Suave para os botões
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    /* CONTROLE DE MÚSICA DE FUNDO */
    const audio = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-toggle');
    let hasStarted = false;

    // Configura volume inicial baixo (30%) para não estourar ouvidos
    audio.volume = 0.3;

    // Função para alternar som
    musicBtn.addEventListener('click', (e) => {
        // Impede que o clique no botão ative o evento de clique global abaixo
        e.stopPropagation();

        if (audio.paused) {
            audio.play();
            musicBtn.innerHTML = '🔊'; // Ícone de som ligado
            musicBtn.style.boxShadow = "0 0 15px var(--primary-color)";
        } else {
            audio.pause();
            musicBtn.innerHTML = '🔇'; // Ícone de som mudo
            musicBtn.style.boxShadow = "none";
        }
    });

    // Truque para Autoplay: O navegador só libera o áudio após o primeiro clique do usuário na página
    document.body.addEventListener('click', () => {
        if (!hasStarted) {
            audio.play().then(() => {
                musicBtn.innerHTML = '🔊';
                hasStarted = true;
            }).catch(error => {
                console.log("Aguardando interação para tocar áudio.");
            });
        }
    }, { once: true }); // { once: true } garante que isso só rode no primeiro clique
});