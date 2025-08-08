// ===== FUNCIONALIDAD DE BÚSQUEDA AVANZADA =====
class SearchModule {
    constructor() {
        this.initializeSearch();
        this.initializeFilters();
    }

    initializeSearch() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.performSearch(e.target.value);
            });
        }
    }

    initializeFilters() {
        const filterButtons = document.querySelectorAll('.filter-button');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.toggleFilter(button);
            });
        });
    }

    performSearch(query) {
        // Lógica de búsqueda
        console.log('Buscando:', query);
        // Aquí implementarías la búsqueda real
    }

    toggleFilter(button) {
        button.classList.toggle('active');
        const filter = button.dataset.filter;
        console.log('Filtro activado:', filter);
        // Aquí implementarías la lógica de filtrado
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new SearchModule();
});