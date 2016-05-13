/**************nav导航栏小图标 动画效果*************************/

var nav_icon = {
    navicon_to_remove: function() {
        $('.up').css('top', '0 ');
        setTimeout(function() {
            $('.up').css('transform', 'rotate3d(0,0,1,45deg) ');
        }, 200);
        $('.down').css('top', '0 ');
        setTimeout(function() {
            $('.down').css('transform', 'rotate3d(0,0,1,-45deg) ');
        }, 200);
        $('.middle').css('opacity', '0');
        $('.nav').css('background', '#104E8B');
    },
    remove_to_navicon: function() {
        $('.up').css('transform', 'rotate3d(0,0,1,0deg) ');
        setTimeout(function() {
            $('.up').css('top', '-20px ');
        }, 200);
        $('.down').css('transform', 'rotate3d(0,0,1,0deg) ');
        setTimeout(function() {
            $('.down').css('top', '20px');
        }, 200);
        $('.middle').css('opacity', '1');
    }
};

$('#hamburger').click(function(e) {

    var class_name = $(this).attr('class');
    if (class_name == 'close') {
        $('#mask-nav').css('display', 'flex');
        nav_icon.navicon_to_remove();
        setTimeout(function() {
            $('#hamburger').removeClass('close').addClass('open');
        }, 500);
    }
    if (class_name == 'open') {
        $('#mask-nav').css('display', 'none');
        nav_icon.remove_to_navicon();
        setTimeout(function() {
            $('#hamburger').removeClass('open').addClass('close');
        }, 500);
    }
});

$('#mask-nav li').click(function() {
        $('#mask-nav').css('display', 'none');
        nav_icon.remove_to_navicon();
    })
    /*************点击更多 按钮滑动到下一页******************/
$("#more").click(function() {
    var $page2 = $("#recommend");
    var offset = $page2.offset();
    // console.log(offset.top);
    $('html,body').animate({
        scrollTop: offset.top
    }, 1000);
});


// 监听滚动条
$(window).scroll(function() {

    /****************nav bar动态收缩效果************************/
    if (document.body.scrollTop >= 100) {
        $('#nav').css('width', '' + $('#nav').height() + 'px');
        $('nav ul').css('display', 'none');

        $("#nav").css('margin-top', '20px');
        $("#nav").css('margin-left', '20px');
        $('#hamburger').css('opacity', '1');
        $('#nav').css("border-radius", "5px");
    }
    if (document.body.scrollTop == 0) {
        $('#nav').css('width', '100%');
        setTimeout(function() {
            $('nav ul').css('display', 'block');
        }, 500);
        $("#nav").css('margin-top', '0');
        $("#nav").css('margin-left', '0');
        $('#hamburger').css('opacity', '0');
        $('#nav').css("border-radius", "0px");

    }
    /*********************三个icon的特效***********************/
    // 滚动条到达第二个页面，图片显现，透明度为1，且滑动到原位置
    if (document.body.scrollTop == $("#recommend").offset().top) {
        $(".icon").css('-webkit-transform', 'translateX(0px)');
        $(".icon").css({
            opacity: 1
        });
        $(".icon-name").css({
            opacity: 1
        });
    }

    /********当滚动条滑到饼状图页开始执行动画******************/
    if (document.body.scrollTop > ($("#skill").offset().top - 100) && document.body.scrollTop < ($("#skill").offset().top + 100)) {
        /*************如果是手机端,静态展示************/
        if (window.screen.width < 767) {
            static_show_piechart(200, '.left1');
            static_show_piechart(250, '.left2');
            static_show_piechart(180, '.left3');
            static_show_piechart(120, '.left4');
            static_show_piechart(80, '.left5');
            static_show_piechart(50, '.left6');
        }
        /*************如果是web端或者ipad,动态展示********/
        else {
            rotate(200, '.left1', width);
            rotate(250, '.left2', width);
            rotate(180, '.left3', width);
            rotate(120, '.left4', width);
            rotate(80, '.left5', width);
            rotate(50, '.left6', width);
        }
    }
});



/*****************根据屏幕视窗设置圆的宽度（宽为.card的30%）从而动态设置高度，边框曲率，位置使其居中********************/
width = $('.circle').outerWidth();
var height = width * 2;
$('.circle').css('height', '' + height + 'px');
$('.circle').css('border-radius', '' + width + 'px 0 0 ' + width + 'px');
$('.circle').css('transform-origin', '' + width + 'px ' + width + 'px');
$('.circle').css('margin-left', '' + 0 - width + 'px');
$('.circle').css('margin-top', '' + 0 - width + 'px');

$('.card').css('line-height', '' + $('.card').height() + 'px'); /***文字始终垂直居中*/

/*********防止害怕横屏竖屏旋转***********/
$(window).resize(function() {
    width = $('.circle').outerWidth();
    var height = width * 2;
    $('.circle').css('height', '' + height + 'px');
    $('.circle').css('border-radius', '' + width + 'px 0 0 ' + width + 'px');
    $('.circle').css('transform-origin', '' + height / 2 + 'px ' + width + 'px');
    $('.circle').css('margin-left', '' + 0 - width + 'px');
    $('.circle').css('margin-top', '' + 0 - width + 'px');
    $('.card').css('line-height', '' + $('.card').height() + 'px');

});
/**************动态展示饼状图**************/
function rotate(degree, object, rotate_origin) {
    $(object).animate({
        deg: degree
    }, {
        step: function(now, fx) {
            $(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
            $(this).css('-moz-transform', 'rotate(' + now + 'deg)');
            $(this).css('transform', 'rotate(' + now + 'deg)');
            if (now > 179) {
                $(object).prev().css('z-index', '-2'); /*邻近的上一个兄弟节点*/
                $(object + '+ .right').css('border-color', '#14bfff'); /*邻近的下一个兄弟节点*/
            }
        },
        duration: 2000
    }, 'linear');
};
/***************静态展示饼状图************/
function static_show_piechart(degree, object) {
    $(object).css('-webkit-transform', 'rotate(' + degree + 'deg)');
    $(object).css('-moz-transform', 'rotate(' + degree + 'deg)');
    $(object).css('transform', 'rotate(' + degree + 'deg)');
    if (degree > 179) {
        $(object).prev().css('z-index', '-2'); /*邻近的上一个兄弟节点*/
        $(object + '+ .right').css('border-color', '#14bfff'); /*邻近的下一个兄弟节点*/
    }
};

/********click weixin******/
$('.fa-weixin').click(function() {
    // sweetAlert("haha...", "Keep thinking!")
    $(".shadow-mask").addClass("mask-active");
    $(".joke").addClass("alert-active");
});

$(".close-alert").click(function() {
    $(".shadow-mask").removeClass("mask-active");
    $(".joke").removeClass("alert-active");
})
