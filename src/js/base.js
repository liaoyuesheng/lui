

/**
 * -------------------
 * 基础设置
 * -------------------
 */

/**
 * -- 全局方法
 */

/**
 * 移除css方法
 * 参数：css名称（驼峰命名）
 */
$.fn.removeCss = function(cssName){
    this.each(function(){
        this.style[cssName] = '';
    })
};

/* 阻止a[href="#"]默认事件 */
$(document).on('click', 'a[href="#"]', function(e){
    e.preventDefault();
});


/**
 * 获取浏览器支持的transitionEnd事件
 * @returns {*}
 */
var transitionEnd = (function () {
    var el = document.createElement('div');
    var transEndEventNames = {
        transition       : 'transitionend',
        WebkitTransition : 'webkitTransitionEnd',
        MozTransition    : 'transitionend',
        OTransition      : 'oTransitionEnd otransitionend'

    };
    for (var name in transEndEventNames) {
        if (el.style[name] !== undefined) {
            return transEndEventNames[name]
        }
    }
    return '';
})();