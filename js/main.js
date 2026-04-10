/**
 * Main JavaScript file for Audaz Jiu Jitsu
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // 2. Navbar Scroll Style
    
    const navbar = document.getElementById('mainNav');
    const headerLogo = document.getElementById('headerLogo');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            if (headerLogo) headerLogo.src = 'assets/img/logo.jpg';
        } else {
            navbar.classList.remove('scrolled');
            if (headerLogo) headerLogo.src = 'assets/img/logo-fundo.png';
        }
    });

    // Run once on load just in case page is not at top
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        if (headerLogo) headerLogo.src = 'assets/img/logo.jpg';
    } else {
        if (headerLogo) headerLogo.src = 'assets/img/logo-fundo.png';
    }

// 3. Smooth Scroll and collapse mobile menu for nav links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .scroll-indicator a, .btn-aula');
    const bsCollapse = new bootstrap.Collapse(document.getElementById('navbarContent'), { toggle: false });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Get target
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (document.getElementById('navbarContent').classList.contains('show')) {
                        bsCollapse.hide();
                    }
                    
                    // Smooth scroll with offset for fixed navbar
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                    window.scrollTo({
                         top: offsetPosition,
                         behavior: "smooth"
                    });
                }
            }
        });
    });

    // 4. City Switcher Logic (Petrolina / Juazeiro)
    const cityButtons = document.querySelectorAll('.unidade-nav .nav-link');
    const cityDisplayElements = document.querySelectorAll('.city-name-display');
    const planButtons = document.querySelectorAll('.plan-btn');
    
    // Base WhatsApp Number
    const waNumber = "5587988552442";

    function updateCityData(cityName) {
        // Update display text
        cityDisplayElements.forEach(el => {
            el.textContent = cityName;
        });
        // Sync multiple tab groups
        document.querySelectorAll('.unidade-nav .nav-link').forEach(btn => {
            if (btn.getAttribute('data-city') === cityName) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update Prices
        if (cityName === 'Juazeiro') {
            document.querySelectorAll('.preco-anual').forEach(el => el.textContent = 'R$ L');
            document.querySelectorAll('.preco-mensal').forEach(el => el.textContent = 'R$ M');
            document.querySelectorAll('.preco-recorrente').forEach(el => el.textContent = 'R$ M');
            document.querySelectorAll('.preco-individual').forEach(el => el.textContent = 'R$ N');
            document.querySelectorAll('.preco-familia-3').forEach(el => el.textContent = 'R$ O');
            document.querySelectorAll('.preco-familia-5').forEach(el => el.textContent = 'R$ P');
        } else {
            document.querySelectorAll('.preco-anual').forEach(el => el.textContent = 'R$ X');
            document.querySelectorAll('.preco-mensal').forEach(el => el.textContent = 'R$ Y');
            document.querySelectorAll('.preco-recorrente').forEach(el => el.textContent = 'R$ Y');
            document.querySelectorAll('.preco-individual').forEach(el => el.textContent = 'R$ Z');
            document.querySelectorAll('.preco-familia-3').forEach(el => el.textContent = 'R$ B');
            document.querySelectorAll('.preco-familia-5').forEach(el => el.textContent = 'R$ D');
        }


        // Update WhatsApp Links
        planButtons.forEach(btn => {
            const planName = btn.getAttribute('data-plan');
            let message = "";

            if (cityName === 'Juazeiro') {
                message = "Oi, gostaria de saber mais sobre os planos da unidade Juazeiro";
            } else {
                // Petrolina or default
                message = `Oi, gostaria de saber mais sobre o plano ${planName}`;
            }

            // Encode message for URL
            const encodedMessage = encodeURIComponent(message);
            const waUrl = `https://wa.me/${waNumber}?text=${encodedMessage}`;
            
            btn.setAttribute('href', waUrl);
            btn.setAttribute('target', '_blank');
        });

        // Toggle Schedule visibility
        const petrolinaTable = document.getElementById('horarios-petrolina');
        const juazeiroTable = document.getElementById('horarios-juazeiro');
        
        if (petrolinaTable && juazeiroTable) {
            if (cityName === 'Juazeiro') {
                petrolinaTable.classList.add('d-none');
                juazeiroTable.classList.remove('d-none');
            } else {
                juazeiroTable.classList.add('d-none');
                petrolinaTable.classList.remove('d-none');
            }
        }
    }

    // Attach Event Listeners to Tabs
    cityButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cityName = e.target.getAttribute('data-city');
            updateCityData(cityName);
        });
    });

    // Initialize with default selected tab (Petrolina)
    const activeTab = document.querySelector('.unidade-nav .nav-link.active');
    if (activeTab) {
        updateCityData(activeTab.getAttribute('data-city'));
    }

});
