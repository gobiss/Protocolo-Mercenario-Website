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
});