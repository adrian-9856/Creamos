// Funciones para manejar los modales
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event listeners para cerrar modales
document.addEventListener('DOMContentLoaded', function() {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal.id);
        });
    });

    // Cerrar modal al hacer click fuera del contenido
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });

    // Cerrar modal con la tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    closeModal(modal.id);
                }
            });
        }
    });
});

// Animación suave al hacer scroll
const cards = document.querySelectorAll('.program-card');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Efecto adicional de click en las tarjetas
document.addEventListener('DOMContentLoaded', function() {
    const programCards = document.querySelectorAll('.program-card');
    
    programCards.forEach(card => {
        card.addEventListener('click', function() {
            // Efecto de "pulso" al hacer click
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.1s ease';
            
            // Restaurar el tamaño original después de 100ms
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.style.transition = 'transform 0.2s ease';
            }, 100);
        });
        
        // Efecto hover mejorado
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        });
    });
});

// Función para inicializar tooltips (opcional)
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            tooltip.style.cssText = `
                position: absolute;
                background: #333;
                color: white;
                padding: 8px 12px;
                border-radius: 4px;
                font-size: 14px;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            
            setTimeout(() => tooltip.style.opacity = '1', 10);
            
            this.tooltipElement = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.tooltipElement) {
                this.tooltipElement.style.opacity = '0';
                setTimeout(() => {
                    if (this.tooltipElement) {
                        document.body.removeChild(this.tooltipElement);
                        this.tooltipElement = null;
                    }
                }, 300);
            }
        });
    });
}

// Función para scroll suave a elementos
function smoothScrollTo(targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Inicializar todas las funcionalidades cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tooltips si existen elementos con data-tooltip
    initializeTooltips();
    
    // Agregar clase de carga completada para animaciones CSS
    document.body.classList.add('loaded');
    
    // Manejar enlaces de navegación suave
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            smoothScrollTo(targetId);
        });
    });
});

// Función utilitaria para debounce (optimizar rendimiento)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimizar el scroll listener si es necesario
const debouncedScrollHandler = debounce(() => {
    // Aquí puedes agregar lógica adicional para el scroll
    console.log('Scroll event handled');
}, 100);

window.addEventListener('scroll', debouncedScrollHandler);