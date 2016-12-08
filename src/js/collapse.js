

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