$(document).ready(function () {

    var showSkill = false;

    /* nav選單開關 */
    $('.jq_btn_bar').click(function(e) {
        e.preventDefault();
        /* 開啟功能選單_index.html/.nav */
        $('body').toggleClass('open');
    });

    $('.jq_close').click(function(e) {
		e.preventDefault();
		/* 關閉功能選單_index.html/.nav */
		$('body').removeClass('open');
    });

    /* nav選單指定滑動位置 */
    $('.jq_btn_scrollTop').click(function (e) {
        e.preventDefault();
        var target = $(this).attr('href');
        var targetPos = $(target).offset().top - 80;
        $('html,body').animate({scrollTop:targetPos},800);
    });

    $('.jq_btn_home').click(function (e) { 
        e.preventDefault();
        $('html,body').animate({scrollTop:0}, 800);
    });

    /*#works點擊特效*/

    $('.jq_btn_works').click(function (e) { 
        e.preventDefault();
        $(this).parent().find('.jq_flipInY').removeClass('flipOutY');
        $(this).parent().find('.jq_flipInY').addClass('flipInY');
        /*去除主體卷軸*/
        $('body').css('overflow', 'hidden');
    });

    $('.jq_close_works').click(function (e) { 
        e.preventDefault();
        $(this).parent().addClass('flipOutY');
        $('body').css('overflow', 'auto');
    });

    $(window).scroll(function () { 
        //在滑動區塊產生對應CSS
        var scrollPos = $(window).scrollTop();
        var windowHeight = $(window).height();
        //console.log(scrollPos, windowHeight);

        $('.jq_btn_scrollTop').removeClass('active');
        //console.log(scrollPos);
        $('.jq_btn_scrollTop').each(function(){
            var target = $(this).attr('href');
            var targetPos = $(target).offset().top - 81;
            var targetHeight = $(target).outerHeight() +80;
            if((targetPos) <= scrollPos && (targetPos + targetHeight) > scrollPos){
                $('.jq_btn_scrollTop').removeClass('active');
                $(this).addClass('active');
            }
        });

        //進度條動畫
        var skillTop = $('#skills').position().top;
        //console.log('skillTop' , skillTop);
        if(skillTop <= (scrollPos + windowHeight / 1.5)){
            showSkill = true;
            $('#skills .progress_bar').each(function(){
                var thisValue = $(this).data('progress');
                $(this).css('width', thisValue + '%');
            });
        }

        //animated
        $('.jq_lightSpeed').each(function(){
            var thisPos = $(this).offset().top;
            if((windowHeight + scrollPos) >= thisPos){
                $(this).addClass('lightSpeedIn');
            }
        });

        $('.jq_fadeInUp').each(function(){
            var thisPos = $(this).offset().top;
            if((windowHeight + scrollPos) >= thisPos){
                $(this).addClass('fadeInUp');
            }
        });
        
        $('.jq_hideLeft').each(function(){
            var thisPos = $(this).offset().top;
            if((windowHeight + scrollPos) >= thisPos){
                $(this).addClass('fade');
            }
        });
        
        $('.jq_dance_hideLeft').each(function(){
            var thisPos = $(this).offset().top;
            if((windowHeight + scrollPos) >= thisPos){
                $(this).addClass('fade_rotate');
            }
        });

        $('.jq_hideRight').each(function(){
            var thisPos = $(this).offset().top;
            if((windowHeight + scrollPos) >= thisPos){
                $(this).addClass('fade_rotate');
            }
        });

        $('.jq_hideShine').each(function(){
            var thisPos = $(this).offset().top;
            if((windowHeight + scrollPos) >= thisPos){
                $(this).addClass('shine');
                $('.jq_hideTop').addClass('fade_down');
            }
        });
    });
});