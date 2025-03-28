// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化导航菜单
    initNavigation();
    
    // 初始化滚动动画
    initScrollAnimations();
    
    // 初始化英雄区域背景
    initHeroBackground();
});

/**
 * 初始化导航菜单功能
 */
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // 移动端菜单切换
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // 点击导航链接后关闭菜单
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // 滚动时导航栏样式变化
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // 设置当前页面的导航链接为激活状态
    setActiveNavLink();
}

/**
 * 设置当前页面的导航链接为激活状态
 */
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        // 移除所有激活状态
        link.classList.remove('active');
        
        // 设置当前页面链接为激活状态
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

/**
 * 初始化滚动动画
 */
function initScrollAnimations() {
    // 滚动到指定区域的平滑滚动
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 获取目标元素
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // 平滑滚动到目标位置
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 添加滚动显示动画（可以在未来扩展）
    // 这里可以添加元素进入视口时的动画效果
}

/**
 * 初始化英雄区域背景
 * 这里使用简单的动态背景，可以在未来升级为WebGL效果
 */
function initHeroBackground() {
    const heroBackground = document.querySelector('.hero-background');
    if (!heroBackground) return;
    
    // 创建简单的动态背景
    // 这是一个基础实现，可以在未来替换为更复杂的WebGL效果
    createParticleBackground(heroBackground);
}

/**
 * 创建粒子背景效果
 * @param {HTMLElement} container - 背景容器元素
 */
function createParticleBackground(container) {
    // 检测设备性能，低性能设备使用静态背景
    if (isLowPerformanceDevice()) {
        container.style.backgroundImage = 'url("images/hero-bg-static.jpg")';
        container.style.backgroundSize = 'cover';
        container.style.backgroundPosition = 'center';
        return;
    }
    
    // 创建画布
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    container.appendChild(canvas);
    
    // 设置画布尺寸
    function resizeCanvas() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    }
    
    // 初始化调整大小
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // 粒子设置
    const particlesArray = [];
    const numberOfParticles = 100;
    const colors = ['#6200ea', '#9d46ff', '#00e5ff', '#b388ff'];
    
    // 粒子类
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // 边界检查
            if (this.x > canvas.width || this.x < 0) {
                this.speedX = -this.speedX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.speedY = -this.speedY;
            }
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // 初始化粒子
    function init() {
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }
    
    // 动画循环
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 绘制背景渐变
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#121212');
        gradient.addColorStop(1, '#1a1a2e');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 更新和绘制粒子
        for (let i = 0; i