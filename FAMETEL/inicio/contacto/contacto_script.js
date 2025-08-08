// ===== FUNCIONALIDAD DEL FORMULARIO DE CONTACTO =====
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm.querySelector('.submit-btn');
    
    // Manejar envío del formulario
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener datos del formulario
        const formData = new FormData(contactForm);
        const data = {
            nombre: formData.get('nombre'),
            email: formData.get('email'),
            telefono: formData.get('telefono'),
            servicio: formData.get('servicio'),
            mensaje: formData.get('mensaje')
        };
        
        // Validar campos requeridos
        if (!data.nombre || !data.email || !data.servicio || !data.mensaje) {
            showNotification('Por favor, completa todos los campos requeridos.', 'error');
            return;
        }
        
        // Validar email
        if (!isValidEmail(data.email)) {
            showNotification('Por favor, ingresa un email válido.', 'error');
            return;
        }
        
        // Simular envío del formulario
        submitForm(data);
    });
    
    // Función para enviar el formulario
    function submitForm(data) {
        // Cambiar estado del botón
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        // Simular envío (aquí puedes integrar con tu backend)
        setTimeout(() => {
            // Restaurar botón
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Mostrar mensaje de éxito
            showNotification('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
            
            // Limpiar formulario
            contactForm.reset();
            
            // Opcional: Redirigir a WhatsApp con el mensaje
            const whatsappMessage = `Hola, soy ${data.nombre}. ${data.mensaje}`;
            const whatsappUrl = `https://wa.me/15551234567?text=${encodeURIComponent(whatsappMessage)}`;
            
            // Preguntar si quiere continuar en WhatsApp
            setTimeout(() => {
                if (confirm('¿Te gustaría continuar la conversación por WhatsApp?')) {
                    window.open(whatsappUrl, '_blank');
                }
            }, 2000);
            
        }, 2000);
    }
    
    // Función para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Función para mostrar notificaciones
    function showNotification(message, type) {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="close-notification" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Agregar estilos
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'linear-gradient(45deg, #4CAF50, #45a049)' : 'linear-gradient(45deg, #f44336, #da190b)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            max-width: 400px;
            animation: slideIn 0.3s ease;
        `;
        
        // Agregar al DOM
        document.body.appendChild(notification);
        
        // Remover automáticamente después de 5 segundos
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // Agregar animaciones CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .close-notification {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 0;
            margin-left: 0.5rem;
        }
    `;
    document.head.appendChild(style);
});

// ===== FUNCIONALIDAD DE BOTONES SOCIALES =====

// Función para manejar clics en botones sociales
function handleSocialClick(platform, url) {
    // Tracking de analytics (opcional)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'social_contact', {
            'platform': platform,
            'action': 'click'
        });
    }
    
    // Abrir enlace
    if (platform === 'phone' || platform === 'email') {
        window.location.href = url;
    } else {
        window.open(url, '_blank');
    }
}

// Agregar event listeners a botones sociales
document.addEventListener('DOMContentLoaded', function() {
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            let platform = '';
            
            // Determinar plataforma
            if (href.includes('wa.me')) platform = 'whatsapp';
            else if (href.includes('mailto:')) platform = 'email';
            else if (href.includes('github.com')) platform = 'github';
            else if (href.includes('linkedin.com')) platform = 'linkedin';
            else if (href.includes('facebook.com')) platform = 'facebook';
            else if (href.includes('instagram.com')) platform = 'instagram';
            else if (href.includes('twitter.com')) platform = 'twitter';
            else if (href.includes('tel:')) platform = 'phone';
            
            handleSocialClick(platform, href);
        });
    });
});

// ===== EFECTOS VISUALES =====

// Efecto de parallax suave en el scroll
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.info-card, .social-btn');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed / 10);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Animación de entrada para elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animación
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.info-item, .social-btn, .info-card');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
});