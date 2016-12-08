

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