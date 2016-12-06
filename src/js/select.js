/**
 * select
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
        if($this.attr('disabled') !== undefined) {
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
$('.lui-select').each(function(){
    initSelect($(this));
});

// 方法
/**
 * 初始化下拉菜单（select）方法
 * @param $this 下拉菜单jq对象 或 jq选择器字符串
 */
function initSelect($this){
    if(!($this instanceof jQuery)) {
        $this = $($this);
    }
    var $btn = $this.find('.lui-select-btn'),
        $option = $this.find('.lui-select-option>li'),
        $input = $this.find('input');
    var $currentOption = $option.filter('[checked]');

    if($currentOption.length === 0) {
        $currentOption = $option.not('[disabled]').first();
    }

    var currentTxt = $currentOption.text(),
        currentVal = $currentOption.attr('value');

    if(!$btn.length) {
        $this.prepend('<a class="lui-select-btn" value="' + currentVal + '">' + currentTxt + '</a>')
    } else {
        $btn.text(currentTxt).attr('value',currentVal);
    }

    var name = $this.attr('name');

    if(!$input.length) {
        $this.append('<input name="' + name + '" value="' + currentVal + '">')
    } else {
        $input.attr('name', name).attr('value', currentVal);
    }

    return lui
}
lui.initSelect = initSelect;