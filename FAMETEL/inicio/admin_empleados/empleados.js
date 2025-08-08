// State management
let currentPage = 'dashboard';
let currentUser = null;
let currentMonth = new Date();
let selectedDocType = 'comprobante';

// QR Code generation function
function generateQRCode(employeeData) {
    const qrContainer = document.getElementById('qr-container');
    if (qrContainer) {
        qrContainer.innerHTML = '';
        const qr = new QRCode(qrContainer, {
            text: JSON.stringify(employeeData),
            width: 128,
            height: 128,
            colorDark: '#00aaff',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });
    }
}

// Sample data
const sampleData = {
    sistemas: [
        { sistema: 'RR-HH', codigo: '2060703', titulo: 'RR-HH', caracteristica: 'Sistema de Recursos Humanos' }
    ],
    personal: [
        { codigo: '70933255', nombre: 'Administrador S&T', dni: '70933255', telefono: '-', cargo: 'Desarrollador', estado: 'Activo', qr_code: null }
    ],
    empresas: [
        { empresa: 'CONSTRUCTOR SAC', ruc: '20487131901', responsable: 'Julia Chamorro', estado: 'Activo' },
        { empresa: 'oroya center', ruc: '5477777777', responsable: 'JAVIER CAJAHUAMAN MALLCCO', estado: 'Activo' }
    ],
    asistencia: [
        { trabajador: 'Saul, Peréz Cueva', entrada: '2024-10-30 19:17:56', salida: '2024-10-30 19:19:34', estado: 'Normal' }
    ],
    projects: [
        { name: 'PLAZA VEA', budget: 5000, spent: 0, workers: 1 }
    ]
};

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Add click listeners to menu items
    document.querySelectorAll('.menu-item, .submenu-item').forEach(item => {
        item.addEventListener('click', function(e) {
            const pageId = this.getAttribute('data-page');
            if (pageId) {
                showPage(pageId, this);
            }
        });
    });
});

// Navigation functionality
function showPage(pageId, clickedElement = null) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageId;
    }
    
    // Update active menu item
    document.querySelectorAll('.menu-item, .submenu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Find and activate the clicked menu item
    if (clickedElement && (clickedElement.classList.contains('menu-item') || clickedElement.classList.contains('submenu-item'))) {
        clickedElement.classList.add('active');
    }

    // Special handling for specific pages
    if (pageId === 'user-calendar') {
        generateCalendar();
    }
}

function toggleSubmenu(menuId) {
    const submenu = document.getElementById(menuId + '-submenu');
    const arrow = event.target.querySelector('.dropdown-arrow');
    
    if (submenu) {
        submenu.classList.toggle('active');
        if (arrow) {
            arrow.classList.toggle('rotated');
        }
    }
}

function goBack() {
    window.location.href = '../../inicio/inicio.html';
}

// Manejo del menú
document.addEventListener('DOMContentLoaded', function() {
    // Manejar clicks en items del menú con submenús
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        if (item.querySelector('.arrow')) {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Toggle la clase expanded en el item del menú
                this.classList.toggle('expanded');
                
                // Encontrar y mostrar/ocultar el submenú
                const submenu = this.nextElementSibling;
                if (submenu && submenu.classList.contains('submenu')) {
                    submenu.classList.toggle('active');
                    
                    // Rotar la flecha
                    const arrow = this.querySelector('.arrow');
                    if (arrow) {
                        arrow.style.transform = submenu.classList.contains('active') ? 'rotate(90deg)' : 'rotate(0)';
                    }
                }
            });
        }
    });
    
    // Activar el item del menú según la página actual
    const currentPath = window.location.pathname;
    menuItems.forEach(item => {
        if (item.getAttribute('href') === currentPath) {
            item.classList.add('active');
            
            // Si está en un submenú, mostrar el menú padre
            const parentSubmenu = item.closest('.submenu');
            if (parentSubmenu) {
                parentSubmenu.classList.add('active');
                const parentMenuItem = parentSubmenu.previousElementSibling;
                if (parentMenuItem) {
                    parentMenuItem.classList.add('expanded');
                    const arrow = parentMenuItem.querySelector('.arrow');
                    if (arrow) {
                        arrow.style.transform = 'rotate(90deg)';
                    }
                }
            }
        }
    });
});

// Modal functionality
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Project details
function showProjectDetails(projectName) {
    currentProject = projectName;
    showPage('project-details');
}

// Scanner functionality
function startScanner() {
    const input = document.getElementById('scanner-input');
    const userData = document.getElementById('user-data');
    
    input.focus();
    
    // Simulate scanner input
    setTimeout(() => {
        input.value = '98765435';
        showUserData('98765435');
    }, 1000);
}

function showUserData(code) {
    const userData = document.getElementById('user-data');
    const userCode = document.getElementById('user-code');
    const userDni = document.getElementById('user-dni');
    const userNames = document.getElementById('user-names');
    const userSurnames = document.getElementById('user-surnames');
    
    // Simulate user lookup
    if (code === '98765435') {
        const employeeData = {
            codigo: code,
            dni: code,
            nombre: 'Saul Peréz',
            apellidos: 'Cueva',
            cargo: 'Desarrollador'
        };

        userCode.textContent = code;
        userDni.textContent = code;
        userNames.textContent = employeeData.nombre;
        userSurnames.textContent = employeeData.apellidos;
        userData.style.display = 'block';
        
        // Generate QR code
        generateQRCode(employeeData);
        openModal('qr-modal');
        
        // Auto-register attendance
        setTimeout(() => {
            showNotification('✅ Asistencia registrada correctamente', 'success');
        }, 2000);
    }
}

function downloadQR() {
    const qrContainer = document.getElementById('qr-container');
    const qrImage = qrContainer.querySelector('img');
    
    if (qrImage) {
        const link = document.createElement('a');
        link.href = qrImage.src;
        link.download = 'employee_qr.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// User calendar
function showUserCalendar(userId) {
    currentUser = userId;
    showPage('user-calendar');
    generateCalendar();
}

function generateCalendar() {
    const calendarGrid = document.getElementById('calendar-grid');
    const monthDisplay = document.getElementById('current-month');
    
    if (!calendarGrid || !monthDisplay) return;

    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                   'July', 'August', 'September', 'October', 'November', 'December'];
    
    monthDisplay.textContent = `${months[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;
    
    // Clear existing calendar (keep headers)
    const headers = calendarGrid.querySelectorAll('.calendar-day[style*="background: #f7fafc"]');
    calendarGrid.innerHTML = '';
    headers.forEach(header => calendarGrid.appendChild(header));
    
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay() + 1); // Start from Monday
    
    for (let i = 0; i < 42; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        const isCurrentMonth = currentDate.getMonth() === currentMonth.getMonth();
        const isToday = currentDate.toDateString() === new Date().toDateString();
        const hasAttendance = currentDate.getDate() === 30 && isCurrentMonth;
        
        if (isToday) {
            dayElement.classList.add('today');
        } else if (hasAttendance) {
            dayElement.classList.add('has-attendance');
        }
        
        dayElement.innerHTML = `
            <div class="day-number">${currentDate.getDate()}</div>
            <div class="day-status">${hasAttendance ? 'Presente' : isToday ? 'Hoy' : 'Sin Asistencia'}</div>
        `;
        
        if (!isCurrentMonth) {
            dayElement.style.opacity = '0.3';
        }
        
        calendarGrid.appendChild(dayElement);
    }
}

function changeMonth(direction) {
    currentMonth.setMonth(currentMonth.getMonth() + direction);
    generateCalendar();
}

// Justifications
function showJustifications() {
    showPage('justifications-view');
}

// Reports
function generateReport() {
    const fechaInicio = document.getElementById('fecha-inicio').value;
    const fechaFinal = document.getElementById('fecha-final').value;
    const codigoTrabajador = document.getElementById('codigo-trabajador').value;
    
    if (!fechaInicio || !fechaFinal || !codigoTrabajador) {
        showNotification('❌ Por favor complete todos los campos', 'error');
        return;
    }
    
    // Show results
    const resultsContainer = document.getElementById('report-results');
    resultsContainer.style.display = 'block';
    
    showNotification('✅ Reporte generado exitosamente', 'success');
}

function exportToExcel() {
    // Simulate Excel export
    const link = document.createElement('a');
    link.href = 'data:application/vnd.ms-excel,Reporte de Asistencia\nFecha\tNormal\tTarde\tFalta\n2024-10-30\t1\t0\t0';
    link.download = 'reporte_asistencia_' + new Date().toISOString().split('T')[0] + '.xls';
    link.click();
    
    showNotification('📊 Reporte Excel descargado', 'success');
}

function exportAttendancePDF() {
    showNotification('📄 Exportando reporte PDF...', 'info');
    
    setTimeout(() => {
        const link = document.createElement('a');
        link.href = 'data:application/pdf,Reporte de Asistencia PDF simulado';
        link.download = 'asistencia_' + new Date().toISOString().split('T')[0] + '.pdf';
        link.click();
        
        showNotification('✅ PDF exportado exitosamente', 'success');
    }, 1500);
}

// Payment functionality
function payWorker(workerName) {
    showNotification(`💳 Procesando pago para ${workerName}...`, 'info');
    
    setTimeout(() => {
        showNotification('✅ Pago procesado exitosamente', 'success');
        // Show receipt modal
        openModal('receipt-modal');
    }, 2000);
}

function processPayment() {
    closeModal('payment-modal');
    showNotification('💳 Procesando pago...', 'info');
    
    setTimeout(() => {
        showNotification('✅ Pago registrado exitosamente', 'success');
        openModal('receipt-modal');
    }, 1500);
}

function selectDocType(type) {
    selectedDocType = type;
    document.querySelectorAll('.doc-type').forEach(el => el.classList.remove('selected'));
    event.target.closest('.doc-type').classList.add('selected');
}

function generateReceipt() {
    showNotification('📄 Generando comprobante...', 'info');
    
    setTimeout(() => {
        closeModal('receipt-modal');
        showNotification('✅ Comprobante generado exitosamente', 'success');
    }, 1000);
}

function printReceipt() {
    showNotification('🖨️ Enviando a impresora...', 'info');
    
    setTimeout(() => {
        closeModal('receipt-modal');
        showNotification('✅ Documento enviado a impresión', 'success');
    }, 1000);
}

// Save functions
function saveSistema() {
    showNotification('💾 Sistema guardado correctamente', 'success');
    closeModal('sistemas-modal');
    // Add to table
    addRowToTable('sistemas-table', ['Nuevo Sistema', '2060704', 'Nuevo', 'Sistema de prueba']);
}

function saveObra() {
    showNotification('💾 Proyecto guardado correctamente', 'success');
    closeModal('obras-modal');
    addRowToTable('obras-table', ['Nueva Empresa', '20123456789', 'Responsable', '987654321', 'correo@test.com', 'Nuevo Proyecto']);
}

function savePersonal() {
    showNotification('👤 Administrativo guardado correctamente', 'success');
    closeModal('personal-modal');
    addRowToTable('personal-table', ['12345678', 'Nuevo Usuario', '12345678', '987654321', 'Administrador', '✓']);
}

function saveCargo() {
    showNotification('💼 Cargo guardado correctamente', 'success');
}

function saveEmpresa() {
    showNotification('🏢 Empresa guardada correctamente', 'success');
    closeModal('empresa-modal');
    addRowToTable('empresa-table', ['Nueva Empresa', '20987654321', 'Nuevo Responsable', '📋', '✓']);
}

function saveProveedor() {
    showNotification('🚚 Proveedor guardado correctamente', 'success');
    closeModal('proveedor-modal');
    addRowToTable('proveedor-table', ['Nuevo Proveedor', '20555666777', '987654321', 'Responsable', '✓']);
}

function saveJustificacion() {
    showNotification('📝 Justificación guardada correctamente', 'success');
    closeModal('justificar-modal');
}

function saveGasto() {
    showNotification('💰 Gasto registrado correctamente', 'success');
    closeModal('gasto-modal');
}

function saveAporte() {
    showNotification('📈 Aporte registrado correctamente', 'success');
    closeModal('aporte-modal');
}

// Helper function to add rows to tables
function addRowToTable(tableId, data) {
    const table = document.getElementById(tableId);
    if (!table) return;
    
    const tbody = table.querySelector('tbody');
    const newRow = document.createElement('tr');
    
    data.forEach(cellData => {
        const td = document.createElement('td');
        td.textContent = cellData;
        newRow.appendChild(td);
    });
    
    // Add actions column with enhanced functionality
    const actionsCell = document.createElement('td');
    actionsCell.className = 'table-actions';
    actionsCell.innerHTML = `
        <button class="btn-icon btn-view" title="Ver detalles">👁️</button>
        <button class="btn-icon btn-edit" title="Editar">✏️</button>
        <button class="btn-icon btn-delete" title="Eliminar">🗑️</button>
        <button class="btn-icon btn-history" title="Historial">📋</button>
    `;

    // Agregar event listeners para los botones
    const viewBtn = actionsCell.querySelector('.btn-view');
    const editBtn = actionsCell.querySelector('.btn-edit');
    const deleteBtn = actionsCell.querySelector('.btn-delete');
    const historyBtn = actionsCell.querySelector('.btn-history');

    viewBtn.addEventListener('click', () => {
        showNotification('👁️ Visualizando detalles del registro', 'info');
        // Aquí se implementaría la lógica para mostrar detalles
    });

    editBtn.addEventListener('click', () => {
        showNotification('✏️ Modo de edición activado', 'info');
        // Hacer la fila editable
        const cells = newRow.querySelectorAll('td:not(.table-actions)');
        cells.forEach(cell => {
            const originalText = cell.textContent;
            cell.innerHTML = `<input type="text" value="${originalText}" class="edit-input">`;
        });
        
        // Cambiar botones de acción
        editBtn.innerHTML = '💾';
        editBtn.title = 'Guardar';
        const oldClickHandler = editBtn.onclick;
        editBtn.onclick = () => {
            // Guardar cambios
            cells.forEach(cell => {
                const input = cell.querySelector('input');
                if (input) {
                    cell.textContent = input.value;
                }
            });
            editBtn.innerHTML = '✏️';
            editBtn.title = 'Editar';
            editBtn.onclick = oldClickHandler;
            showNotification('✅ Cambios guardados exitosamente', 'success');
        };
    });

    deleteBtn.addEventListener('click', () => {
        if (confirm('¿Está seguro de que desea eliminar este registro?')) {
            newRow.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                newRow.remove();
                showNotification('🗑️ Registro eliminado exitosamente', 'success');
            }, 300);
        }
    });

    historyBtn.addEventListener('click', () => {
        showNotification('📋 Cargando historial...', 'info');
        setTimeout(() => {
            const historyData = [
                { fecha: '2024-01-15', accion: 'Creación', usuario: 'Admin' },
                { fecha: '2024-01-20', accion: 'Modificación', usuario: 'Supervisor' },
                { fecha: '2024-02-01', accion: 'Actualización', usuario: 'Admin' }
            ];
            
            const historyModal = document.createElement('div');
            historyModal.className = 'modal active';
            historyModal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Historial de Cambios</h2>
                        <button class="modal-close" onclick="this.closest('.modal').remove()">×</button>
                    </div>
                    <div class="history-list">
                        ${historyData.map(item => `
                            <div class="history-item">
                                <div class="history-date">${item.fecha}</div>
                                <div class="history-action">${item.accion}</div>
                                <div class="history-user">${item.usuario}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            document.body.appendChild(historyModal);
        }, 500);
    });

    newRow.appendChild(actionsCell);
    
    tbody.appendChild(newRow);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    const colors = {
        success: '#38a169',
        error: '#e53e3e',
        info: '#4299e1',
        warning: '#ed8936'
    };
    
    notification.style.background = colors[type] || colors.info;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Sistema de respaldo y restauración
const backupSystem = {
    // Obtener todos los datos del sistema
    getAllData: function() {
        const data = {
            timestamp: new Date().toISOString(),
            version: '1.0',
            tables: {},
            settings: {},
            metadata: {
                createdAt: new Date().toISOString(),
                systemVersion: '1.0.0',
                userAgent: navigator.userAgent
            }
        };

        // Recopilar datos de todas las tablas
        document.querySelectorAll('.table-container table').forEach(table => {
            const tableName = table.getAttribute('data-table-name') || 'default';
            const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent.trim());
            const rows = Array.from(table.querySelectorAll('tbody tr')).map(row => {
                return Array.from(row.cells).map(cell => cell.textContent.trim());
            });

            data.tables[tableName] = {
                headers: headers,
                data: rows
            };
        });

        // Recopilar configuraciones del sistema
        data.settings = {
            theme: localStorage.getItem('theme') || 'light',
            language: localStorage.getItem('language') || 'es',
            notifications: JSON.parse(localStorage.getItem('notifications') || '[]'),
            userPreferences: JSON.parse(localStorage.getItem('userPreferences') || '{}')
        };

        return data;
    },

    // Crear y descargar respaldo
    downloadBackup: async function() {
        try {
            const data = this.getAllData();
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = window.URL.createObjectURL(blob);
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const filename = `backup_${timestamp}.json`;

            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            // Registrar el respaldo en el historial
            this.addToBackupHistory(filename, data.metadata);
            showNotification('💾 Respaldo creado correctamente', 'success');
        } catch (error) {
            console.error('Error al crear el respaldo:', error);
            showNotification('❌ Error al crear el respaldo', 'error');
        }
    },

    // Restaurar datos desde un archivo de respaldo
    restoreBackup: async function(file) {
        try {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    
                    // Verificar la versión y compatibilidad
                    if (!this.validateBackup(data)) {
                        showNotification('⚠️ Archivo de respaldo no válido o incompatible', 'error');
                        return;
                    }

                    // Confirmar la restauración
                    if (!confirm('¿Estás seguro de restaurar este respaldo? Los datos actuales serán reemplazados.')) {
                        return;
                    }

                    // Restaurar datos de las tablas
                    Object.entries(data.tables).forEach(([tableName, tableData]) => {
                        const table = document.querySelector(`table[data-table-name="${tableName}"]`);
                        if (table) {
                            this.restoreTableData(table, tableData);
                        }
                    });

                    // Restaurar configuraciones
                    Object.entries(data.settings).forEach(([key, value]) => {
                        localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
                    });

                    showNotification('✅ Respaldo restaurado correctamente', 'success');
                    setTimeout(() => location.reload(), 2000);
                } catch (error) {
                    console.error('Error al procesar el archivo de respaldo:', error);
                    showNotification('❌ Error al procesar el archivo de respaldo', 'error');
                }
            };
            reader.readAsText(file);
        } catch (error) {
            console.error('Error al restaurar el respaldo:', error);
            showNotification('❌ Error al restaurar el respaldo', 'error');
        }
    },

    // Validar archivo de respaldo
    validateBackup: function(data) {
        return (
            data &&
            data.version &&
            data.timestamp &&
            data.tables &&
            typeof data.tables === 'object' &&
            data.metadata
        );
    },

    // Restaurar datos de una tabla
    restoreTableData: function(table, tableData) {
        const tbody = table.querySelector('tbody');
        tbody.innerHTML = '';

        tableData.data.forEach(rowData => {
            const row = document.createElement('tr');
            rowData.forEach(cellData => {
                const cell = document.createElement('td');
                cell.textContent = cellData;
                row.appendChild(cell);
            });
            tbody.appendChild(row);
        });
    },

    // Agregar respaldo al historial
    addToBackupHistory: function(filename, metadata) {
        const history = JSON.parse(localStorage.getItem('backupHistory') || '[]');
        history.unshift({
            filename,
            timestamp: new Date().toISOString(),
            metadata
        });
        // Mantener solo los últimos 10 respaldos en el historial
        if (history.length > 10) history.pop();
        localStorage.setItem('backupHistory', JSON.stringify(history));
    },

    // Mostrar historial de respaldos
    showBackupHistory: function() {
        const history = JSON.parse(localStorage.getItem('backupHistory') || '[]');
        const modal = document.createElement('div');
        modal.className = 'modal backup-history-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Historial de Respaldos</h3>
                    <button class="close-modal">×</button>
                </div>
                <div class="modal-body">
                    ${history.length > 0 ? `
                        <div class="backup-list">
                            ${history.map(backup => `
                                <div class="backup-item">
                                    <div class="backup-info">
                                        <strong>${backup.filename}</strong>
                                        <span>Fecha: ${new Date(backup.timestamp).toLocaleString()}</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    ` : '<p>No hay respaldos registrados</p>'}
                </div>
                <div class="modal-footer">
                    <button class="btn-primary" onclick="backupSystem.downloadBackup()">Nuevo Respaldo</button>
                    <input type="file" id="restore-backup" accept=".json" style="display: none">
                    <button class="btn-secondary" onclick="document.getElementById('restore-backup').click()">Restaurar Respaldo</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Event listeners
        modal.querySelector('.close-modal').onclick = () => modal.remove();
        modal.querySelector('#restore-backup').onchange = (e) => {
            if (e.target.files[0]) {
                this.restoreBackup(e.target.files[0]);
                modal.remove();
            }
        };

        // Cerrar modal al hacer clic fuera
        modal.onclick = (e) => {
            if (e.target === modal) modal.remove();
        };
    }
};

// Función para iniciar el proceso de respaldo
function downloadBackup() {
    backupSystem.showBackupHistory();
}

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const menuItems = document.querySelectorAll('.menu-item, .submenu-item');
            
            menuItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm) || searchTerm === '') {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
});

// Sistema de notificaciones mejorado
let notifications = [
    { id: 1, type: 'warning', message: '⚠️ Actualización del sistema programada para hoy a las 22:00', read: false },
    { id: 2, type: 'info', message: '📊 Nuevo reporte de asistencia disponible', read: false },
    { id: 3, type: 'success', message: '✅ Backup automático completado exitosamente', read: false }
];

function updateNotificationCount() {
    const unreadCount = notifications.filter(n => !n.read).length;
    const notificationBell = document.querySelector('.notification-bell');
    if (notificationBell) {
        const countBadge = notificationBell.querySelector('.notification-count') || document.createElement('span');
        countBadge.className = 'notification-count';
        countBadge.textContent = unreadCount;
        countBadge.style.display = unreadCount > 0 ? 'block' : 'none';
        if (!notificationBell.querySelector('.notification-count')) {
            notificationBell.appendChild(countBadge);
        }
    }
}

function showNotificationPanel() {
    const panel = document.createElement('div');
    panel.className = 'notification-panel';
    panel.innerHTML = `
        <div class="notification-header">
            <h3>Notificaciones</h3>
            <button class="close-notifications">×</button>
        </div>
        <div class="notification-list">
            ${notifications.map(notif => `
                <div class="notification-item ${notif.read ? 'read' : ''}" data-id="${notif.id}">
                    <div class="notification-content">
                        <div class="notification-message">${notif.message}</div>
                        <div class="notification-time">Hace ${Math.floor(Math.random() * 60)} minutos</div>
                    </div>
                    ${!notif.read ? '<button class="mark-read">Marcar como leído</button>' : ''}
                </div>
            `).join('')}
        </div>
        ${notifications.length === 0 ? '<div class="no-notifications">No hay notificaciones</div>' : ''}
    `;

    document.body.appendChild(panel);

    // Event listeners para el panel
    panel.querySelector('.close-notifications').addEventListener('click', () => {
        panel.remove();
    });

    panel.querySelectorAll('.mark-read').forEach(button => {
        button.addEventListener('click', (e) => {
            const notifItem = e.target.closest('.notification-item');
            const notifId = parseInt(notifItem.dataset.id);
            const notification = notifications.find(n => n.id === notifId);
            if (notification) {
                notification.read = true;
                notifItem.classList.add('read');
                button.remove();
                updateNotificationCount();
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const notificationBell = document.querySelector('.notification-bell');
    if (notificationBell) {
        notificationBell.addEventListener('click', function() {
            showNotificationPanel();
        });
        updateNotificationCount();

        // Simular nueva notificación cada 5 minutos
        setInterval(() => {
            const newNotifId = notifications.length + 1;
            const types = ['info', 'warning', 'success'];
            const messages = [
                '📋 Nuevo registro de personal agregado',
                '🔄 Actualización de horarios disponible',
                '📊 Reporte semanal generado',
                '⚠️ Recordatorio de mantenimiento programado',
                '✅ Sincronización de datos completada'
            ];
            notifications.unshift({
                id: newNotifId,
                type: types[Math.floor(Math.random() * types.length)],
                message: messages[Math.floor(Math.random() * messages.length)],
                read: false
            });
            updateNotificationCount();
            showNotification('🔔 Nueva notificación recibida', 'info');
        }, 300000); // 5 minutos
    }
});

// Close modals when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Función para exportar datos de la tabla
function setupTableExport() {
    const tables = document.querySelectorAll('.table-container');
    
    tables.forEach(tableContainer => {
        const exportContainer = document.createElement('div');
        exportContainer.className = 'export-container';
        exportContainer.innerHTML = `
            <div class="export-buttons">
                <button class="export-btn" data-type="excel">📊 Exportar a Excel</button>
                <button class="export-btn" data-type="pdf">📄 Exportar a PDF</button>
                <button class="export-btn" data-type="print">🖨️ Imprimir</button>
            </div>
        `;

        tableContainer.insertBefore(exportContainer, tableContainer.firstChild);

        exportContainer.querySelectorAll('.export-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const table = tableContainer.querySelector('table');
                const type = btn.dataset.type;
                const visibleRows = Array.from(table.querySelectorAll('tbody tr'))
                    .filter(row => row.style.display !== 'none');

                switch(type) {
                    case 'excel':
                        exportToExcel(table, visibleRows);
                        break;
                    case 'pdf':
                        exportToPDF(table, visibleRows);
                        break;
                    case 'print':
                        printTable(table, visibleRows);
                        break;
                }
            });
        });
    });
}

// Initialize the system
document.addEventListener('DOMContentLoaded', async function() {
    // Load required libraries
    await scriptLoader.init();
    
    // Show dashboard by default
    showPage('dashboard');
    
    // Initialize scanner input listener
    const scannerInput = document.getElementById('scanner-input');
    if (scannerInput) {
        scannerInput.addEventListener('input', function(e) {
            if (e.target.value.length >= 8) {
                showUserData(e.target.value);
            }
        });
    }
    
    // Initialize table search and export functionality
    setupTableSearch();
    setupTableExport();
    
    // Show welcome notification
    setTimeout(() => {
        showNotification('🎉 ¡Bienvenido al Sistema FAMETEL!', 'success');
    }, 1000);
});

// Sistema avanzado de búsqueda y filtrado
function setupTableSearch() {
    const searchInputs = document.querySelectorAll('.table-search');
    searchInputs.forEach(input => {
        // Crear contenedor de filtros
        const filterContainer = document.createElement('div');
        filterContainer.className = 'filter-container';
        filterContainer.innerHTML = `
            <div class="search-wrapper">
                <input type="text" class="enhanced-search" placeholder="Buscar...">
                <button class="filter-toggle">🔍 Filtros</button>
            </div>
            <div class="filter-options" style="display: none;">
                <div class="filter-group">
                    <label>Estado:</label>
                    <select class="filter-select" data-column="estado">
                        <option value="">Todos</option>
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label>Ordenar por:</label>
                    <select class="sort-select">
                        <option value="">Sin ordenar</option>
                        <option value="nombre-asc">Nombre (A-Z)</option>
                        <option value="nombre-desc">Nombre (Z-A)</option>
                        <option value="fecha-asc">Fecha (Antigua)</option>
                        <option value="fecha-desc">Fecha (Reciente)</option>
                    </select>
                </div>
                <div class="filter-actions">
                    <button class="apply-filters">Aplicar</button>
                    <button class="reset-filters">Restablecer</button>
                </div>
            </div>
        `;

        // Reemplazar input original con el nuevo contenedor
        input.parentNode.replaceChild(filterContainer, input);

        const enhancedSearch = filterContainer.querySelector('.enhanced-search');
        const filterToggle = filterContainer.querySelector('.filter-toggle');
        const filterOptions = filterContainer.querySelector('.filter-options');
        const filterSelects = filterContainer.querySelectorAll('.filter-select');
        const sortSelect = filterContainer.querySelector('.sort-select');
        const applyButton = filterContainer.querySelector('.apply-filters');
        const resetButton = filterContainer.querySelector('.reset-filters');

        // Toggle filtros
        filterToggle.addEventListener('click', () => {
            filterOptions.style.display = filterOptions.style.display === 'none' ? 'block' : 'none';
        });

        // Función para aplicar filtros y búsqueda
        function applyFiltersAndSearch() {
            const searchTerm = enhancedSearch.value.toLowerCase();
            const table = filterContainer.closest('.table-container').querySelector('table');
            const rows = Array.from(table.querySelectorAll('tbody tr'));

            // Aplicar filtros y búsqueda
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                let showRow = text.includes(searchTerm);

                // Aplicar filtros adicionales
                filterSelects.forEach(select => {
                    if (select.value) {
                        const columnIndex = Array.from(row.cells).findIndex(cell => 
                            cell.textContent.toLowerCase().includes(select.value)
                        );
                        showRow = showRow && columnIndex !== -1;
                    }
                });

                row.style.display = showRow ? '' : 'none';
            });

            // Aplicar ordenamiento
            if (sortSelect.value) {
                const [column, direction] = sortSelect.value.split('-');
                const visibleRows = rows.filter(row => row.style.display !== 'none');
                
                visibleRows.sort((a, b) => {
                    const aValue = a.querySelector(`td[data-${column}]`).textContent;
                    const bValue = b.querySelector(`td[data-${column}]`).textContent;
                    return direction === 'asc' ? 
                        aValue.localeCompare(bValue) : 
                        bValue.localeCompare(aValue);
                });

                // Reordenar filas en la tabla
                visibleRows.forEach(row => {
                    row.parentNode.appendChild(row);
                });
            }

            // Mostrar resumen de resultados
            const visibleCount = rows.filter(row => row.style.display !== 'none').length;
            showNotification(`🔍 ${visibleCount} resultados encontrados`, 'info');
        }

        // Event listeners
        enhancedSearch.addEventListener('input', applyFiltersAndSearch);
        applyButton.addEventListener('click', applyFiltersAndSearch);
        resetButton.addEventListener('click', () => {
            enhancedSearch.value = '';
            filterSelects.forEach(select => select.value = '');
            sortSelect.value = '';
            applyFiltersAndSearch();
            showNotification('🔄 Filtros restablecidos', 'info');
        });
    });
}

// Auto-save functionality for forms
function autoSaveForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            // Save to localStorage for demo purposes
            try {
                // Note: In a real implementation, this would save to a server
                console.log('Auto-saving form data:', data);
            } catch (e) {
                console.log('Auto-save simulated');
            }
        });
    });
}

// Initialize auto-save for all forms
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form, .modal-content');
    forms.forEach((form, index) => {
        if (!form.id) form.id = `form-${index}`;
        autoSaveForm(form.id);
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl + S to save current form
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            const saveButton = activeModal.querySelector('.btn-primary');
            if (saveButton && saveButton.textContent.includes('Guardar')) {
                saveButton.click();
            }
        }
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            activeModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});