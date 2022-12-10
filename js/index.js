// 封装快速选择函数
function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}

var isGameOver = false; // 游戏是否结束

var curTargetIndex = null; // 记录当前索引
var maxIndex = 15; // 根据图片的数量来展示


var panel = $('.panel'); // 获取磨盘
var initImg = $('#initImg'); // 获取磨盘圆心
var resultImg = $('#resultImg'); // 获取最终结果
var container = $('.dictionary'); // 获取右侧初始化的内容容器

// 封装一个随机数
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// 初始化
function init() {
    // 保证9的倍数的这张图片一样
    curTargetIndex = getRandom(0, maxIndex); // 随机生成一张图片，我们将这个图片在后面用于我们的倍数图
    container.innerHTML = ''; //每次刷新都会重新清空之前的内容

    // 创建内容
    for (var i = 0; i < 100; i++) {
        // 100张图片，循环100次
        var imgIndex = null; // 该变量我们先定义着，用来存储我们生成的图片索引
        if (i % 9 === 0) {
            imgIndex = curTargetIndex; // 让记录图片的索引，赋值为我们随机生成的图片的索引
        } else {
            // 随便抛一张图片展示在页面上
            imgIndex = getRandom(0, 15);
        }
        // 这里为什么写在分支判断外面，是因为9的倍数需要生成内容，不是9的倍数也要生成内容，所以将这部分代码写在外面，就只用写一次
        container.innerHTML += `
                <div class="item">
                    <span class="number">${i}</span>
                    <span class="value">
                        <img src= "../images/values/${imgIndex}.png">
                    </span>
                </div>
            `;
    }
}

init();


// 交互：绑定事件
panel.onclick = function(e) {
    // 判断游戏是否结束
    if (isGameOver) {
        // 游戏没有结束
        if (window.confirm('是否重新开始游戏')) {
            init(); // 重新初始化棋盘
            initImg.style.opacity = 1;
            resultImg.style.opacity = 0;
            isGameOver = false; // 游戏设为结束

            // 接下来要将样式删除，
            e.currentTarget.setAttribute("style", '');
            // 还要删除transitionend事件
            panel.removeEventListener('transitionend', transitionendHandle);
        }
    } else {

        // 游戏结束了
        // 旋转1800度
        e.currentTarget.style.transition = 'all 2s'
        e.currentTarget.style.transform = 'rotate(1800deg)';
        panel.addEventListener('transitionend', handleTransitionEnd);
        // 让圆盘消失，让我们的结果图片显示
    }
}

function handleTransitionEnd() {
    initImg.style.opacity = 0;
    resultImg.src = '../images/values/' + curTargetIndex + '.png'; // 设置结果图片
    resultImg.style.opacity = 1;
    isGameOver = true;
}