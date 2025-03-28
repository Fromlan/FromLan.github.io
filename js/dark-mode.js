/**
 * 深色模式切换功能
 */
document.addEventListener('DOMContentLoaded', function() {
    // 获取深色模式切换按钮
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    
    // 检查本地存储中的模式设置
    const savedMode = localStorage.getItem('darkMode');
    
    // 如果有保存的设置，应用它
    if (savedMode) {
        document.body.className = savedMode === 'dark' ? 'dark-mode' : 'light-mode';
        updateDarkModeIcon();
    }
    
    // 添加切换按钮事件监听器
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
    
    // 添加系统主题变化监听
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    prefersDarkScheme.addEventListener('change', function(e) {
        if (!localStorage.getItem('darkMode')) {
            // 只有在用户没有手动设置的情况下，才跟随系统设置
            document.body.className = e.matches ? 'dark-mode' : 'light-mode';
            updateDarkModeIcon();
        }
    });
});

/**
 * 切换深色/浅色模式
 */
function toggleDarkMode() {
    // 检查当前模式
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // 切换模式
    if (isDarkMode) {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        localStorage.setItem('darkMode', 'light');
    } else {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'dark');
    }
    
    // 更新图标
    updateDarkModeIcon();
}

/**
 * 更新深色模式图标
 */
function updateDarkModeIcon() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (!darkModeToggle) return;
    
    // 清除现有图标
    darkModeToggle.innerHTML = '';
    
    // 添加适当的图标
    if (document.body.classList.contains('dark-mode')) {
        // 在深色模式下显示太阳图标
        const sunIcon = document.createElement('i');
        sunIcon.className = 'fas fa-sun';
        darkModeToggle.appendChild(sunIcon);
    } else {
        // 在浅色模式下显示月亮图标
        const moonIcon = document.createElement('i');
        moonIcon.className = 'fas fa-moon';
        darkModeToggle.appendChild(moonIcon);
    }
}

/**
 * 检测系统颜色方案偏好
 * @returns {boolean} 是否偏好深色模式
 */
function prefersDarkMode() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}