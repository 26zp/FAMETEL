// ===== CONTROL DE ANIMACIÓN DE CARGA =====
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar pantalla de carga
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');
    
    // Ocultar contenido principal inicialmente
    if (mainContent) {
        mainContent.style.display = 'none';
    }
    
    // Simular tiempo de carga (3 segundos)
    setTimeout(() => {
        // Ocultar pantalla de carga
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
        
        // Mostrar contenido principal después de la animación
        setTimeout(() => {
            if (mainContent) {
                mainContent.style.display = 'block';
                mainContent.style.animation = 'fadeIn 0.8s ease-in-out';
            }
            
            // Remover pantalla de carga del DOM
            if (loadingScreen) {
                loadingScreen.remove();
            }
        }, 800);
    }, 3000);
});

// Animación de aparición
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);