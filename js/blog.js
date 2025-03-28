/**
 * 博客页面脚本
 */
document.addEventListener('DOMContentLoaded', function() {
    // 初始化文章筛选功能
    initBlogFilter();
    
    // 初始化搜索功能
    initSearch();
    
    // 初始化图片对比滑块
    initComparisonSliders();
    
    // 初始化代码高亮
    initCodeHighlight();
    
    // 初始化视频模态框
    initVideoModal();
});

/**
 * 初始化文章筛选功能
 */
function initBlogFilter() {
    const filterTags = document.querySelectorAll('.filter-tag');
    const blogPosts = document.querySelectorAll('.blog-post');
    
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // 更新激活状态
            filterTags.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // 筛选文章
            blogPosts.forEach(post => {
                if (filterValue === 'all') {
                    post.style.display = '';
                } else {
                    const categories = post.getAttribute('data-categories');
                    if (categories && categories.includes(filterValue)) {
                        post.style.display = '';
                    } else {
                        post.style.display = 'none';
                    }
                }
            });
        });
    });
}

/**
 * 初始化搜索功能
 */
function initSearch() {
    const searchInput = document.getElementById('blog-search');
    const searchBtn = document.getElementById('search-btn');
    const blogPosts = document.querySelectorAll('.blog-post');
    
    // 搜索函数
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // 如果搜索框为空，显示所有文章
            blogPosts.forEach(post => {
                post.style.display = '';
            });
            return;
        }
        
        // 搜索文章标题和内容
        blogPosts.forEach(post => {
            const title = post.querySelector('h2').textContent.toLowerCase();
            const content = post.querySelector('.post-content').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || content.includes(searchTerm)) {
                post.style.display = '';
                
                // 高亮搜索结果（可选功能）
                // highlightSearchTerm(post, searchTerm);
            } else {
                post.style.display = 'none';
            }
        });
    }
    
    // 点击搜索按钮时执行搜索
    searchBtn.addEventListener('click', performSearch);
    
    // 按下回车键时执行搜索
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

/**
 * 初始化图片对比滑块
 */
function initComparisonSliders() {
    const sliders = document.querySelectorAll('.comparison-slider');
    
    sliders.forEach(slider => {
        const handle = slider.querySelector('.slider-handle');
        const overlay = slider.querySelector('.comparison-overlay');
        let isResizing = false;
        
        // 鼠标按下事件
        handle.addEventListener('mousedown', function(e) {
            isResizing = true;
            e.preventDefault();
        });
        
        // 触摸开始事件
        handle.addEventListener('touchstart', function(e) {
            isResizing = true;
        });
        
        // 鼠标移动事件
        window.addEventListener('mousemove', function(e) {
            if (!isResizing) return;
            
            const sliderRect = slider.getBoundingClientRect();
            const position = (e.clientX - sliderRect.left) / sliderRect.width;
            updateSliderPosition(overlay, handle, position);
        });
        
        // 触摸移动事件
        window.addEventListener('touchmove', function(e) {
            if (!isResizing) return;
            
            const touch = e.touches[0];
            const sliderRect = slider.getBoundingClientRect();
            const position = (touch.clientX - sliderRect.left) / sliderRect.width;
            updateSliderPosition(overlay, handle, position);
        });
        
        // 鼠标释放和触摸结束事件
        window.addEventListener('mouseup', function() {
            isResizing = false;
        });
        
        window.addEventListener('touchend', function() {
            isResizing = false;
        });
        
        // 初始化滑块位置
        updateSliderPosition(overlay, handle, 0.5);
    });
}

/**
 * 更新滑块位置
 * @param {HTMLElement} overlay - 覆盖层元素
 * @param {HTMLElement} handle - 滑块手柄元素
 * @param {number} position - 位置比例（0-1）
 */
function updateSliderPosition(overlay, handle, position) {
    // 限制位置在0-1之间
    position = Math.max(0, Math.min(position, 1));
    
    // 更新覆盖层宽度
    overlay.style.width = `${position * 100}%`;
    
    // 更新滑块手柄位置
    handle.style.left = `${position * 100}%`;
}

/**
 * 初始化代码高亮
 */
function initCodeHighlight() {
    // 检查是否已加载highlight.js
    if (window.hljs) {
        hljs.highlightAll();
    } else {
        console.warn('Highlight.js not loaded');
    }
}

/**
 * 初始化视频模态框
 */
function initVideoModal() {
    const videoPlaceholder = document.querySelector('.video-placeholder');
    const videoModal = document.querySelector('.video-modal');
    const videoIframe = document.querySelector('.video-container iframe');
    const videoClose = document.querySelector('.video-modal-close');
    
    // 如果页面上有视频占位符
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            const videoUrl = this.getAttribute('data-video');
            
            if (videoUrl && videoModal && videoIframe) {
                videoIframe.src = videoUrl;
                videoModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    }
    
    // 关闭视频模态框
    if (videoClose && videoModal) {
        videoClose.addEventListener('click', function() {
            videoModal.style.display = 'none';
            if (videoIframe) {
                videoIframe.src = ''; // 停止视频播放
            }
            document.body.style.overflow = '';
        });
        
        // 点击背景关闭
        videoModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                if (videoIframe) {
                    videoIframe.src = '';
                }
                document.body.style.overflow = '';
            }
        });
    }
}