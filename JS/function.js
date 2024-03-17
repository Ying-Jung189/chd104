//商品頁照片切換+縮放
$(function () {
    let divWidth, div, winWidth, winWidthInit, imgCount, index, ratio = 0;
    let isResize = false;

    function init() {
        divWidth = $('#container').width();
        winWidthInit = $(window).width();
        imgCount = $('#container-list li').length;
        moveCenter();
    }

    function moveCenter() {
        $('#container').css({
            left: (winWidth - divWidth) / 2,
            top: 0
        });

        $('#container-list').css({
            left: div * index * -1,
        });
    }

    function update() {
        div = divWidth * ratio;
        $('#container').width(div);
        $('#container-list li').width(div);
        $('#container-list').width(div * imgCount);
        console.log(div * imgCount);
    }

    $(window).resize(function () {
        winWidth = $(window).width();
        ratio = winWidth / winWidthInit;
        isResize = true;
        moveCenter();
        update();
    });

    init();

    // for (let i = 0; i < imgCount; i++) {
    //     $('#contentButton').append('<li></li>');
    // }

    $('#container').width(divWidth);
    $('#container-list li').width(divWidth);
    $('#container-list').width(divWidth * imgCount);

    // $('#contentButton li:first').addClass('clicked');
    $('#pic-number').text(`1 / ${imgCount}`);

    let prevButton = $('#prev');
    let nextButton = $('#next');
    let picOrder = 0;
    prevButton.click(function(){
        picOrder--;
        if(picOrder < 1){
            picOrder = 0;
        }
        if (isResize) {
            $('#container-list').animate({
                left: div * picOrder * -1,
            });
        } else {
            $('#container-list').animate({
                left: divWidth * picOrder * -1,
            });
        }
        $('#pic-number').text(`${picOrder + 1} / ${imgCount}`);
    })
    nextButton.click(function(){
        picOrder++;
        if(picOrder >= 5){
            picOrder = 4;
        }
        if (isResize) {
            $('#container-list').animate({
                left: div * picOrder * -1,
            });
        } else {
            $('#container-list').animate({
                left: divWidth * picOrder * -1,
            });
        }
        $('#pic-number').text(`${picOrder + 1} / ${imgCount}`);
    })
    // $('#contentButton li').click(function () {
    //     index = $(this).index();
    //     if (isResize) {
    //         $('#container-list').animate({
    //             left: div * index * -1,
    //         });
    //     } else {
    //         $('#container-list').animate({
    //             left: divWidth * index * -1,
    //         });
    //     }
        // $(this).addClass('clicked');
        // $('#contentButton li').not(this).removeClass('clicked');
    // });
});

$(document).ready(function(){

    //q/a展開
    $('.answer').hide();
    $('.minus').hide();
    $('.question').click(function(){
        let slide = $(this).next('.answer')
        slide.slideToggle();
        $(this).find('.minus').toggle();
        $(this).find('.plus').toggle();
    })

    //hover切換圖片
    $('#left-btn').hover(
        function(){
            $('#left-btn').addClass('hidden'); // 添加 CSS 类，触发过渡效果
        setTimeout(function() {
            $('#left-btn').attr("src","/images/home/home-news-hover.svg"); // 切换图片
            $('#left-btn').removeClass('hidden'); // 移除 CSS 类
        }, 200); 
        },
        function(){
            $('#left-btn').attr("src","/images/home/home-news-left.svg");
        }
    )
    $('#right-btn').hover(
        function(){
            $('#right-btn').addClass('hidden'); // 添加 CSS 类，触发过渡效果
            setTimeout(function() {
                $('#right-btn').attr("src","/images/home/home-news-hoverR.svg"); // 切换图片
                $('#right-btn').removeClass('hidden'); // 移除 CSS 类
            }, 200); 
        },
        function(){
            $('#right-btn').attr("src","/images/home/home-news-right.svg");
        }
    )

    //點了換圖片
    let imgAmount = $('.sm-pic-list li').length;
    $('.pic-number').text(`1 / ${imgAmount}`);
    $('.sm-pic img').click(function(){
        let changeImg = $(this).attr('src');
        let index = $(this).parent().index() + 1;
        $('.pic-number').text(`${index} / ${imgAmount}`);
        $('.full').fadeOut(100, function(){
            $('.full').attr("src",changeImg);
            $('.full').fadeIn(400);
        })
    })
    
    //數量加減
    $('#btn-minus').click(function(){
        let amount = +$('#buy-number').val();
        let minAmount = +$('#buy-number').attr('min');
        let maxAmount = +$('#buy-number').attr('max');
        if (amount > 2) {
            $('#buy-number').val(amount - 1);
            $('#btn-minus').removeClass('disable');
        } else if (amount <= minAmount + 1) {
            $('#buy-number').val(1);
            $('#btn-minus').addClass('disable');
        }
        if(amount <= maxAmount){
            $('#btn-plus').removeClass('disable'); // 解禁增加按钮
        }
    });
    
    $('#btn-plus').click(function(){
        let amount = +$('#buy-number').val();
        let maxAmount = +$('#buy-number').attr('max');
    
        $('#buy-number').val(amount + 1);
        
        if (amount >= 1) {
            $('#btn-minus').removeClass('disable');
        }
    
        if (amount >= maxAmount - 1) { 
            $('#buy-number').val(10);
            $('#btn-plus').addClass('disable');
            $('#btn-minus').removeClass('disable'); // 解禁减少按钮
        }
    });
    
    //加入購物車
    $('#add-cart').click(function(){
        let buyAmount = $('#buy-number').val()
        $('.cart-num').show()
        $('.cart-num').text( buyAmount)
    })
    
    //骰選類別
    function selection(){
        if($(window).width()< 576){
            console.log('sm')
            $('.category-btn').click(function(){
                let targetGroup = $(this).data('target-group');
    
                $('.food').hide();
                $(targetGroup).show();
            });
            $('#all-btn').click(function(){
                $('.food').show();
            });
        }else{
            console.log('bg')
            $('.food').show();
        }
    }

    selection();
    $(window).resize(function(){
        console.log('resize')
        selection();
    })

})
//滑下換顏色
window.addEventListener('scroll', function(ht){
    if(document.getElementById("scroll-fb")!= null){
        if(window.scrollY > 400){
            document.getElementById("scroll-fb").classList.add("change-color");
            document.getElementById("scroll-ig").classList.add("change-color");
        }else{
            document.getElementById("scroll-fb").classList.remove("change-color");
            document.getElementById("scroll-ig").classList.remove("change-color");
        }
    }
    })
//滑下顯示
    window.addEventListener('scroll',function(vt){
    if(window.scrollY > 500){
        document.getElementById("top").classList.remove("close");
    }else{
        document.getElementById("top").classList.add("close");
    }
    }) 


