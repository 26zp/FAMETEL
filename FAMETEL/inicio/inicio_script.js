// ===== FUNCIONES PRINCIPALES =====

// Crear partículas flotantes
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    
    if (particlesContainer) {
        particlesContainer.innerHTML = '';
        
        for (let i = 0; i < 60; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
            
            const colors = [
                'rgba(0, 170, 255, 0.3)', 
                'rgba(0, 102, 204, 0.3)', 
                'rgba(0, 68, 153, 0.3)', 
                'rgba(255, 255, 255, 0.1)'
            ];
            const color = colors[Math.floor(Math.random() * colors.length)];
            particle.style.background = color;
            particle.style.boxShadow = `0 0 6px ${color}`;
            
            particlesContainer.appendChild(particle);
        }
    }
}

// Mostrar portafolio
function showPortfolio() {
    const initialPage = document.getElementById('initialPage');
    const portfolioSection = document.getElementById('portfolioSection');
    
    if (initialPage && portfolioSection) {
        initialPage.style.opacity = '0';
        initialPage.style.transform = 'scale(0.9)';
        initialPage.style.transition = 'all 0.5s ease-out';
        
        setTimeout(() => {
            initialPage.style.display = 'none';
            portfolioSection.style.display = 'block';
            portfolioSection.style.opacity = '0';
            
            setTimeout(() => {
                portfolioSection.style.opacity = '1';
                portfolioSection.style.transition = 'opacity 0.5s ease-in';
            }, 50);
        }, 500);
    }
}

// Volver al inicio
function showInitialPage() {
    const initialPage = document.getElementById('initialPage');
    const portfolioSection = document.getElementById('portfolioSection');
    
    if (initialPage && portfolioSection) {
        portfolioSection.style.opacity = '0';
        portfolioSection.style.transition = 'opacity 0.4s ease-out';
        
        setTimeout(() => {
            portfolioSection.style.display = 'none';
            initialPage.style.display = 'flex';
            initialPage.style.opacity = '0';
            initialPage.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                initialPage.style.opacity = '1';
                initialPage.style.transform = 'scale(1)';
                initialPage.style.transition = 'all 0.5s ease-in';
            }, 50);
        }, 400);
    }
}

// Configurar eventos de clic
function setupClickEvents() {
    // Clic en logo principal para ir al portafolio
    const mainLogo = document.getElementById('mainLogo');
    const companyTitle = document.getElementById('companyTitle');
    
    if (mainLogo) {
        mainLogo.addEventListener('click', showPortfolio);
    }
    
    if (companyTitle) {
        companyTitle.addEventListener('click', showPortfolio);
    }
    
    // Clic en logo del header para volver al inicio
    const logoContainer = document.querySelector('.logo-container');
    if (logoContainer) {
        logoContainer.addEventListener('click', showInitialPage);
    }
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    setupClickEvents();
    
    // Auto-mostrar portafolio después de 3 segundos (opcional)
    setTimeout(() => {
        // showPortfolio(); // Descomenta si quieres que vaya automáticamente
    }, 3000);
});

// Recrear partículas al redimensionar
window.addEventListener('resize', () => {
    createParticles();
});
