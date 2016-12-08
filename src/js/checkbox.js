

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