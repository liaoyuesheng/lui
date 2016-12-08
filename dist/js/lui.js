(function(){
    var lui = {};


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


/**
 * ---------------------------
 * select 组件：下拉菜单
 * ---------------------------
 */
// 交互
$(document).on('click', '.lui-select-btn', function () {
    var $this = $(this),
        $wrap = $this.closest('.lui-select');
    if ($wrap.hasClass('open')) {
        $wrap.removeClass('open')
    } else {
        $wrap.addClass('open')
    }
})
    .on('focusout', '.lui-select', function () {
        $(this).removeClass('open');
    })
    .on('click', '.lui-select-option>li', function () {
        var $this = $(this);
        if ($this.attr('disabled') !== undefined) {
            return $this
        }
        var $wrap = $this.closest('.lui-select'),
            $btn = $wrap.find('.lui-select-btn');
        $input = $wrap.find('input');
        var txt = $this.text(),
            val = $this.attr('value');
        $btn.text(txt);
        $wrap.attr('value', val);
        $input.attr('value', val);
        if ($wrap.hasClass('open')) {
            $wrap.removeClass('open')
        } else {
            $wrap.addClass('open')
        }
    });

// 初始化
$('.lui-select').each(function () {
    initSelect($(this));
});

// 方法
/**
 * 初始化下拉菜单（select）方法
 * @param $obj 下拉菜单jq对象 或 jq选择器字符串
 */
function initSelect($obj) {
    $obj = $($obj);
    var tabindex = $obj.attr('tabindex');
    if (tabindex === undefined || tabindex === '') {
        $obj.attr('tabindex', 0)
    }
    var $btn = $obj.find('.lui-select-btn'),
        $option = $obj.find('.lui-select-option>li'),
        $input = $obj.find('input');
    var $currentOption = $option.filter('[checked]');

    if ($currentOption.length === 0) {
        $currentOption = $option.not('[disabled]').first();
    }

    var currentTxt = $currentOption.text(),
        currentVal = $currentOption.attr('value');

    if (!$btn.length) {
        $obj.prepend('<a class="lui-select-btn" value="' + currentVal + '">' + currentTxt + '</a>')
    } else {
        $btn.text(currentTxt).attr('value', currentVal);
    }

    var name = $obj.attr('name');

    if (!$input.length) {
        $obj.append('<input name="' + name + '" value="' + currentVal + '" readonly>')
    } else {
        $input.attr('name', name).attr('value', currentVal);
    }

    return lui
}

/**
 * 获取下拉菜单（select）的value值
 * @param $obj
 * @returns {*}
 */
function getSelectVal($obj) {
    $obj = $($obj);
    return $obj.find('input').val()
}

lui.select = {
    init: initSelect,
    getVal: getSelectVal
};


/**
 * ----------------------------------------
 * checkbox and radio 组件：复选框和单选按钮
 * ----------------------------------------
 */
// 初始化
$('.lui-checkbox').each(function () {
    initCheckbox($(this));
});
/**
 * 初始化复选框（单选按钮）
 * @param $obj ui组件的jq对象或jq选择器
 */
function initCheckbox($obj) {
    $obj = $($obj);
    var $input = $obj.find('input'),
        $icon = $obj.find('i');
    if ($input.length === 0) {
        var type = $obj.attr('type'),
            name = $obj.attr('name'),
            value = $obj.attr('value'),
            checked = $obj.attr('checked');
        if(checked === undefined) {
            checked = ''
        } else {
            checked = 'checked';
        }
        $obj.prepend('<input name="' + name + '" value="' + value + '" type="' + type + '"' + checked + '>')
    }
    if ($icon.length === 0) {
        $obj.append('<i></i>')
    }
}

// 方法
/**
 * 获取复选框（单选按钮）的value值
 * @param $obj ui组件的jq对象或jq选择器
 */
function getCheckboxVal($obj) {
    $obj = $($obj);
    return $obj.find('input').val()
}

/**
 * 筛选出已选中的复选框（单选按钮）
 * @param $obj ui组件的jq对象或jq选择器
 */
function getChecked($obj) {
    $obj = $($obj);
    var $cehcked = $obj.find('input:checked');
    return $cehcked.closest('.lui-checkbox');
}

/**
 * 设置复选框和单选按钮的选中状态
 * @param $obj ui组件的jq对象或jq选择器
 * @param status 状态，'check' 为选中，'uncheck'为未选中
 * @param triggerClick 是否触发选框的click事件，在全选功能下必须为true,默认为true
 * @returns {boolean} 如果选框状态发生改变返回true，反之返回false，如果找不到选框则返回undefined。
 */
function setCheckbox($obj,status,triggerClick) {
    if(triggerClick !== false) {
        triggerClick = true
    }
    $obj = $($obj);
    var $cehcked = $obj.find('input[type="checkbox"],input[type="radio"]');
    if($cehcked.length === 0) {
        return
    }
    if(status === 'check') {
        if(!$cehcked[0].checked) {
            if(triggerClick) {
                $cehcked.click()
            } else {
                $cehcked[0].checked = true;
            }
            return true
        } else {
            return false
        }
    } else if (status === 'uncheck'){
        if($cehcked[0].checked) {
            if(triggerClick) {
                $cehcked.click()
            } else {
                $cehcked[0].checked = false;
            }
            return true
        } else {
            return false
        }
    }
}

/**
 * 为复选框组添加全选功能
 * @param $container 复选框组的外围容器jq对象或者jq选择器
 * @param $checkall 作为全选框的复选框（input）或ui容器(div.lui-checkbox)的jq对象或者jq选择器
 * @param triggerChange 是否触发复选框change事件，默认为true
 */
function checkall($container, $checkall, triggerChange) {
    if(triggerChange !== false) {
        triggerChange = true
    }
    $container = $($container);
    $checkall = $($checkall);
    $checkall_parent = $checkall.closest('.lui-checkbox');
    if($container.length === 0 || $checkall.length === 0) {
        return lui
    }
    if($checkall[0].tagName !== 'INPUT'){
        $checkall = $checkall.find('input[type="checkbox"]')
    }
    // 复选框点击事件
    $container.on('click', 'input[type=checkbox]', function(){
        if(this === $checkall[0]) {
            // 点击的是全选框
            $checkall_parent.removeClass('lui-checkPart');
            if(this.checked){
                $container.find('input[type="checkbox"]').not($checkall).each(function(){
                    if(!this.checked) {
                        this.checked = true;
                        if(triggerChange) {
                            $(this).trigger('change')
                        }
                    }
                });
            } else {
                $container.find('input[type="checkbox"]').not($checkall).each(function(){
                    if(this.checked) {
                        this.checked = false;
                        if(triggerChange) {
                            $(this).trigger('change')
                        }
                    }
                });
            }
        } else {
            // 点击的是非全选框
            var isAllChecked = true;
            var checkPart = false;
            $container.find('input[type="checkbox"]').not($checkall).each(function(){
                if(!this.checked){
                    isAllChecked = false;
                    return $(this)
                } else {
                    checkPart = true
                }
            });
            if(checkPart && !isAllChecked) {
                $checkall_parent.addClass('lui-checkPart');
            } else {
                $checkall_parent.removeClass('lui-checkPart');
            }
            var checked_before = $checkall[0].checked;
            if(checked_before !== isAllChecked) {
                $checkall[0].checked = isAllChecked;
                if(triggerChange) {
                    $checkall.trigger('change');
                }
            }
        }
    });
    return lui
}
lui.checkbox = {
    init: initCheckbox,
    getVal: getCheckboxVal,
    getChecked: getChecked,
    checkall: checkall,
    setStatus: setCheckbox
};


/**
 * --------------------
 * table 组件：表格
 * --------------------
 */
// 交互
//-- 全选功能
checkall('.lui-table-checkbox','.lui-table-checkbox thead input[type="checkbox"]');


/**
 * ------------------------
 * collapse 组件：折叠
 * ------------------------
 */
$(document).on('click','.lui-collapse-head', function(e){
    var $this = $(this);
    var $target = $this.find('[data-target]');
    if($target.length !== 0 && $(e.target).attr('data-target') === undefined){
        return $this
    }
    if($this.attr('data-closeSibs') === undefined) {

    }
    var $wrap = $this.closest('.lui-collapse');
    if($wrap.hasClass('open')){
        collapse($wrap,'close')
    } else {
        collapse($wrap,'open');
    }
});

$(document).on(transitionEnd, '.lui-collapse-body', function(){
    var $this = $(this);
    var $wrap = $this.closest('.lui-collapse');
    if($wrap.hasClass('open')) {
        $this.removeCss('height')
    }
});

function collapse($obj,status){
    $obj = $($obj);
    if(status === 'open') {
        $obj.each(function(){
            var $this = $(this);
            if(!$this.hasClass('open')) {
                console.log($this)
                var $collapse_body = $this.children('.lui-collapse-body');
                var $collapse_content = $collapse_body.children('.lui-collapse-content');
                var contentHeight = $collapse_content.outerHeight();
                $collapse_body.height(contentHeight);

                var $collapse_head = $this.children('.lui-collapse-head');
                var $target = $collapse_head.find('[data-target]');
                if($target.length === 0) {
                    $target = $collapse_head;
                }
                if($target.attr('data-closesibs') !== undefined) {
                    collapse($(this).siblings('.lui-collapse'),'close')
                }
            }
            $this.addClass('open')
        });

    } else if (status === 'close') {
        $obj.each(function(){
            var $this = $(this);
            if($this.hasClass('open')) {
                console.log($this);
                var $collapse_body = $this.children('.lui-collapse-body');
                var $collapse_content = $collapse_body.children('.lui-collapse-content');
                var contentHeight = $collapse_content.outerHeight();
                $this.children('.lui-collapse-body').height(contentHeight).height(0);
            }
            $this.removeClass('open')
        });
    }
}
lui.collapse = collapse;

window.lui = lui;
})();