/**
 * 作品集页面脚本
 */
document.addEventListener('DOMContentLoaded', function() {
    // 初始化筛选功能
    initFilter();
    
    // 初始化项目详情模态框
    initProjectModals();
    
    // 初始化视频模态框
    initVideoModal();
});

/**
 * 初始化筛选功能
 */
function initFilter() {
    const filterTags = document.querySelectorAll('.filter-tag');
    const projectCards = document.querySelectorAll('.project-card');
    
    // 当前激活的筛选条件
    const activeFilters = {
        type: 'all',      // PC/手机/VR
        status: 'all',    // 已发布/开发中/原型
        style: 'all'      // 像素/3D/叙事
    };
    
    // 为每个筛选标签添加点击事件
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // 获取筛选类别和值
            const filterValue = this.getAttribute('data-filter');
            const filterCategory = this.parentElement.parentElement.querySelector('h3').textContent;
            
            // 更新激活状态
            const siblings = Array.from(this.parentElement.children);
            siblings.forEach(sibling => sibling.classList.remove('active'));
            this.classList.add('active');
            
            // 更新筛选条件
            if (filterCategory.includes('类别')) {
                activeFilters.type = filterValue;
            } else if (filterCategory.includes('状态')) {
                activeFilters.status = filterValue;
            } else if (filterCategory.includes('风格')) {
                activeFilters.style = filterValue;
            }
            
            // 应用筛选
            applyFilter(activeFilters, projectCards);
        });
    });
}

/**
 * 应用筛选条件
 * @param {Object} filters - 筛选条件
 * @param {NodeList} projects - 项目卡片元素列表
 */
function applyFilter(filters, projects) {
    projects.forEach(project => {
        const categories = project.getAttribute('data-categories');
        let visible = true;
        
        // 检查是否符合类型筛选
        if (filters.type !== 'all' && !categories.includes(filters.type)) {
            visible = false;
        }
        
        // 检查是否符合状态筛选
        if (filters.status !== 'all' && !categories.includes(filters.status)) {
            visible = false;
        }
        
        // 检查是否符合风格筛选
        if (filters.style !== 'all' && !categories.includes(filters.style)) {
            visible = false;
        }
        
        // 设置可见性
        if (visible) {
            project.style.display = '';
            // 添加淡入动画
            project.style.opacity = 0;
            setTimeout(() => {
                project.style.transition = 'opacity 0.5s ease';
                project.style.opacity = 1;
            }, 10);
        } else {
            project.style.display = 'none';
        }
    });
}

/**
 * 初始化项目详情模态框
 */
function initProjectModals() {
    // 获取所有模态框触发按钮
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modalContainers = document.querySelectorAll('.modal-container');
    const modalCloses = document.querySelectorAll('.modal-close');
    
    // 打开模态框
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // 防止背景滚动
                
                // 初始化图库
                initGallery(modal);
            }
        });
    });
    
    // 关闭模态框
    modalCloses.forEach(close => {
        close.addEventListener('click', function() {
            const modal = this.closest('.modal-container');
            modal.style.display = 'none';
            document.body.style.overflow = ''; // 恢复背景滚动
        });
    });
    
    // 点击模态框背景关闭
    modalContainers.forEach(container => {
        container.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    });
}

/**
 * 初始化图库功能
 * @param {HTMLElement} modal - 模态框元素
 */
function initGallery(modal) {
    const mainImage = modal.querySelector('.gallery-main img');
    const thumbs = modal.querySelectorAll('.gallery-thumbs img');
    
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // 更新主图
            mainImage.src = this.src;
            
            // 更新激活状态
            thumbs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

/**
 * 初始化视频模态框
 */
function initVideoModal() {
    const videoLinks = document.querySelectorAll('.video-link');
    const videoModal = document.querySelector('.video-modal');
    const videoIframe = document.querySelector('.video-container iframe');
    const videoClose = document.querySelector('.video-modal-close');
    
    // 打开视频模态框
    videoLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const videoUrl = this.getAttribute('data-video');
            
            if (videoUrl) {
                videoIframe.src = videoUrl;
                videoModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // 关闭视频模态框
    if (videoClose) {
        videoClose.addEventListener('click', function() {
            videoModal.style.display = 'none';
            videoIframe.src = ''; // 停止视频播放
            document.body.style.overflow = '';
        });
    }
    
    // 点击背景关闭
    if (videoModal) {
        videoModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                videoIframe.src = '';
                document.body.style.overflow = '';
            }
        });
    }
}

/**
 * 检测低性能设备
 * @returns {boolean} 是否为低性能设备
 */
function isLowPerformanceDevice() {
    // 简单检测 - 可以根据需要扩展
    return window.navigator.userAgent.includes('Mobile') || 
           window.navigator.userAgent.includes('Android');
}