
// Chart.js kutubxonasini import qilish
document.addEventListener('DOMContentLoaded', function() {
    // Grafik ma'lumotlarni yaratish uchun Chart.js kutubxonasini yuklab olish
    loadChartJS();
    
    // Sidebar menyusini faollashtirish
    initializeSidebar();
    
    // Dashboard kartochkalarining animatsiyasi
    initializeCards();
    
    // Grafiklarni ishga tushirish
    initializeCharts();
    
    // Jadval ma'lumotlarini yuklash
    loadTableData();
    
    // Topshiriqlar uchun interaktiv funksiyalar
    initializeTasks();
});

// Chart.js kutubxonasini yuklash
function loadChartJS() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = function() {
        console.log('Chart.js muvaffaqiyatli yuklandi');
        // Chart.js yuklanganidan so'ng grafiklarga ma'lumotlarni yuklash
        if (window.Chart) {
            renderSalesChart();
            renderCustomerActivityChart();
        }
    };
    document.head.appendChild(script);
}

// Sidebar menyusini faollashtirish
function initializeSidebar() {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Hozirgi aktiv linkni o'chirish
            sidebarLinks.forEach(el => el.classList.remove('active'));
            // Bosilgan linkni aktiv qilish
            this.classList.add('active');
            
            // Agar mobil qurilma bo'lsa, menu yopilishi kerak
            const isMobile = window.innerWidth < 768;
            if (isMobile) {
                // Bu yerda mobil menuni yopish kodini qo'shish mumkin
            }
            
            e.preventDefault();
        });
    });
    
         // Mobil qurilmalar uchun menu tugmasini boshqarish
    const menuToggle = document.querySelector('.md\\:hidden');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const sidebar = document.querySelector('.md\\:flex-shrink-0');
            sidebar.classList.toggle('hidden');
             
        });
    }
}

// Dashboard kartochkalarining animatsiyasi
function initializeCards() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Sotuv grafigini yaratish
function renderSalesChart() {
    if (!window.Chart) return;
    
    // Sotuv grafikasi uchun canvas elementi
    const salesChartCanvas = document.createElement('canvas');
    salesChartCanvas.id = 'salesChart';
    salesChartCanvas.style.width = '100%';
    salesChartCanvas.style.height = '100%';
    
    // Placeholder div o'rniga canvas elementini joylashtirish
    const salesChartPlaceholder = document.querySelector('.p-6.bg-white.rounded-lg.card:first-of-type .relative.h-60');
    if (salesChartPlaceholder) {
        salesChartPlaceholder.innerHTML = '';
        salesChartPlaceholder.appendChild(salesChartCanvas);
        
        // Grafik ma'lumotlari
        const salesData = {
            labels: ['Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan', 'Yak'],
            datasets: [{
                label: 'Kunlik Sotuv (mln so\'m)',
                data: [18.5, 15.2, 22.7, 19.8, 24.5, 28.1, 21.3],
                backgroundColor: 'rgba(49, 151, 149, 0.2)',
                borderColor: 'rgba(49, 151, 149, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(49, 151, 149, 1)',
                tension: 0.4
            }]
        };
        
        // Grafik opsiyalari
        const salesChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw + ' mln so\'m';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        };
        
        // Grafikni yaratish
        new Chart(salesChartCanvas, {
            type: 'line',
            data: salesData,
            options: salesChartOptions
        });
    }
}

// Mijozlar faolligi grafigini yaratish
function renderCustomerActivityChart() {
    if (!window.Chart) return;
    
    // Mijozlar faolligi grafikasi uchun canvas elementi
    const customerChartCanvas = document.createElement('canvas');
    customerChartCanvas.id = 'customerChart';
    customerChartCanvas.style.width = '100%';
    customerChartCanvas.style.height = '100%';
    
    // Placeholder div o'rniga canvas elementini joylashtirish
    const customerChartPlaceholder = document.querySelector('.p-6.bg-white.rounded-lg.card:nth-of-type(2) .relative.h-60');
    if (customerChartPlaceholder) {
        customerChartPlaceholder.innerHTML = '';
        customerChartPlaceholder.appendChild(customerChartCanvas);
        
        // Grafik ma'lumotlari
        const customerData = {
            labels: ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun'],
            datasets: [{
                label: 'Yangi mijozlar',
                data: [580, 620, 750, 820, 950, 1020],
                backgroundColor: 'rgba(79, 209, 197, 0.6)',
                borderRadius: 6
            }, {
                label: 'Qayta xarid qilgan mijozlar',
                data: [420, 480, 530, 590, 610, 680],
                backgroundColor: 'rgba(49, 151, 149, 0.8)',
                borderRadius: 6
            }]
        };
        
        // Grafik opsiyalari
        const customerChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        boxWidth: 6,
                        font: {
                            size: 11
                        }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        };
        
        // Grafikni yaratish
        new Chart(customerChartCanvas, {
            type: 'bar',
            data: customerData,
            options: customerChartOptions
        });
    }
}

// Grafiklarga tegishli vaqt bo'yicha filtrlashni ishga tushirish
function initializeCharts() {
    // Sotuv statistikasi uchun filtrlash tugmalari
    const salesFilterButtons = document.querySelectorAll('.p-6.bg-white.rounded-lg.card:first-of-type .flex.items-center.space-x-2 button');
    salesFilterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Tugmalar stilini yangilash
            salesFilterButtons.forEach(btn => {
                btn.classList.remove('text-teal-700', 'bg-teal-100');
                btn.classList.add('text-gray-500');
            });
            this.classList.remove('text-gray-500');
            this.classList.add('text-teal-700', 'bg-teal-100');
            
            // Bu yerda tanlangan filtrga qarab grafikni yangilash mumkin
            // Misol uchun: updateSalesChart(this.textContent);
        });
    });
    
    // Mijozlar faolligi uchun filtrlash tugmalari
    const customerFilterButtons = document.querySelectorAll('.p-6.bg-white.rounded-lg.card:nth-of-type(2) .flex.items-center.space-x-2 button');
    customerFilterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Tugmalar stilini yangilash
            customerFilterButtons.forEach(btn => {
                btn.classList.remove('text-teal-700', 'bg-teal-100');
                btn.classList.add('text-gray-500');
            });
            this.classList.remove('text-gray-500');
            this.classList.add('text-teal-700', 'bg-teal-100');
            
            // Bu yerda tanlangan filtrga qarab grafikni yangilash mumkin
            // Misol uchun: updateCustomerChart(this.textContent);
        });
    });
}

// Jadval ma'lumotlarini yuklash (simulatsiya)
function loadTableData() {
    // Haqiqiy API'dan ma'lumotlarni yuklash imkoniyati
    console.log('Jadval ma'lumotlari yuklandi');
    
    // Jadval qatorlarini bosishda tanlangan qatorni ajratib ko'rsatish
    const tableRows = document.querySelectorAll('tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            tableRows.forEach(r => r.classList.remove('bg-gray-50'));
            this.classList.add('bg-gray-50');
        });
        
        // Hoverni qo'llash
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(237, 242, 247, 0.5)';
        });
        
        row.addEventListener('mouseleave', function() {
            if (!this.classList.contains('bg-gray-50')) {
                this.style.backgroundColor = '';
            }
        });
    });
}

// Topshiriqlar bilan ishlash funksiyalari
function initializeTasks() {
    // Topshiriqlarni bosish imkoniyati
    const taskItems = document.querySelectorAll('.space-y-3 .flex.items-center');
    taskItems.forEach(task => {
        task.addEventListener('click', function() {
            // Topshiriq holatini o'zgartirish imkoniyati
            const statusBadge = this.querySelector('.inline-flex.items-center');
            if (statusBadge) {
                if (statusBadge.classList.contains('bg-yellow-100')) {
                    // Jarayondagi topshiriqni yakunlangan qilish
                    statusBadge.classList.remove('bg-yellow-100', 'text-yellow-800');
                    statusBadge.classList.add('bg-green-100', 'text-green-800');
                    statusBadge.textContent = 'Yakunlandi';
                } else if (statusBadge.classList.contains('bg-blue-100')) {
                    // Rejalashtirilgan topshiriqni jarayonga o'tkazish
                    statusBadge.classList.remove('bg-blue-100', 'text-blue-800');
                    statusBadge.classList.add('bg-yellow-100', 'text-yellow-800');
                    statusBadge.textContent = 'Jarayonda';
                }
            }
        });
        
        // Hoverni qo'llash
        task.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        task.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}

// Qidirish funksiyasi
document.querySelector('input[type="search"]').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    console.log('Qidirilayotgan so\'z:', searchTerm);
    // Haqiqiy dasturda qidiruv natijalari bu yerda ko'rsatilishi kerak
});

// Responsive dizayn uchun oyna o'lchami o'zgarishini kuzatish
window.addEventListener('resize', function() {
    // Responsive dizayn uchun kerakli o'zgarishlarni qo'llash
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
        // Mobil ko'rinish uchun moslashtirish
    } else {
        // Desktop ko'rinish uchun moslashtirish
        const sidebar = document.querySelector('.md\\:flex-shrink-0');
        if (sidebar) {
            sidebar.classList.remove('hidden');
        }
    }
});

// Xabarnomalar funksiyasi
const notificationButton = document.querySelector('button:has(svg path[d*="M15 17h5l-1.405-1.405"])');
if (notificationButton) {
    notificationButton.addEventListener('click', function() {
        // Xabarnomalarni ko'rsatish/yashirish logikasi
        alert('Xabarnomalar tez kunda qo\'shiladi!');
    });
}

// Sozlamalar funksiyasi
const settingsButton = document.querySelector('button:has(svg path[d*="M10.325 4.317"])');
if (settingsButton) {
    settingsButton.addEventListener('click', function() {
        // Sozlamalar oynasini ko'rsatish logikasi
        alert('Sozlamalar tez kunda qo\'shiladi!');
    });
}

// Foydalanuvchi ma'lumotlari
const userDataElement = document.querySelector('.p-4.border-t');
if (userDataElement) {
    userDataElement.addEventListener('click', function() {
        // Foydalanuvchi profilini ko'rsatish logikasi
        alert('Foydalanuvchi profili tez kunda qo\'shiladi!');
    });
}

// Ma'lumotlarni saqlash va yuklash funksiyalari (Local Storage yordamida)
function saveState(key, data) {
    localStorage.setItem('menga_erp_' + key, JSON.stringify(data));
}

function loadState(key) {
    const data = localStorage.getItem('menga_erp_' + key);
    return data ? JSON.parse(data) : null;
}

// Dastur ishga tushganda oxirgi holatni yuklash
function loadAppState() {
    // Oxirgi aktiv menyu bandini yuklash
    const lastActiveMenu = loadState('active_menu');
    if (lastActiveMenu) {
        const menuLinks = document.querySelectorAll('.sidebar-link');
        menuLinks.forEach(link => {
            if (link.textContent.trim() === lastActiveMenu) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    // Boshqa holatlarni yuklash mumkin
}

// Menyu bandini bosganda holatni saqlash
document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', function() {
        saveState('active_menu', this.textContent.trim());
    });
});

// Tizimni ishga tushirish
loadAppState();
