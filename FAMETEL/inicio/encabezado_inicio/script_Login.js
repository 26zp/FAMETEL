// Crear partículas animadas
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 5 + 5) + 's';
        particlesContainer.appendChild(particle);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    
    const userTypeBtns = document.querySelectorAll('.user-type-btn');
    const subtitle = document.querySelector('.subtitle');
    const loginForm = document.getElementById('loginForm');
    const inputs = document.querySelectorAll('input');
    
    // Funcionalidad de pestañas
    userTypeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            userTypeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const userType = this.dataset.type;
            if (userType === 'admin') {
                subtitle.textContent = 'Panel de Control';
            } else {
                subtitle.textContent = 'Portal del Trabajador';
            }
        });
    });
    
    // Manejo del formulario
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const activeBtn = document.querySelector('.user-type-btn.active');
        const userType = activeBtn.dataset.type;
        
        if (!username.trim() || !password.trim()) {
            showMessage('Por favor, completa todos los campos.', 'error');
            return;
        }
        
        handleLogin(username, password, userType);
    });
    
    // Efectos en inputs
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateX(3px)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateX(0)';
        });
    });
});

function handleLogin(username, password, userType) {
    const loginBtn = document.querySelector('.login-btn');
    const originalText = loginBtn.textContent;
    loginBtn.textContent = 'AUTENTICANDO...';
    loginBtn.disabled = true;
    
    setTimeout(() => {
        console.log('Datos de login:', {
            usuario: username,
            tipo: userType === 'admin' ? 'Administrador' : 'Trabajador',
            timestamp: new Date().toISOString()
        });
        
        // Verificar credenciales de administrador
        if (userType === 'admin' && username === 'admin' && password === '12345') {
            showMessage(`Acceso concedido: Administrador`, 'success');
            setTimeout(() => {
                window.location.href = '../admin_empleados/empleados.html';
            }, 1000);
        }
        // Verificar credenciales de trabajador (simulado)
        else if (username && password) {
            showMessage(`Acceso concedido: ${username}`, 'success');
            
            if (userType === 'admin') {
                setTimeout(() => {
                    window.location.href = '../admin_empleados/empleados.html';
                }, 1000);
            } else {
                // Redirigir a portal del trabajador (simulado por ahora)
                setTimeout(() => {
                    window.location.href = '../inicio.html';
                }, 1000);
            }
        } else {
            showMessage('Credenciales inválidas', 'error');
        }
        
        loginBtn.textContent = originalText;
        loginBtn.disabled = false;
        
    }, 2000);
}

function showMessage(message, type) {
    const messageEl = document.createElement('div');
    messageEl.className = `message ${type}`;
    messageEl.textContent = message;
    
    document.body.appendChild(messageEl);
    
    setTimeout(() => {
        messageEl.style.animation = 'messageSlide 0.5s ease reverse';
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
        }, 500);
    }, 3000);
}