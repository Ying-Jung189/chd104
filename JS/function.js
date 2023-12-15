$(function () {
    let divWidth, div, winWidth, winWidthInit, imgCount, index, ratio = 0;
    let isResize = false;

    function init() {
        divWidth = $('#lg-pic').width();
        winWidthInit = $(window).width();
        imgCount = $('#lg-pic-list li').length;
        moveCenter();
    }

    function moveCenter() {
        $('#lg-pic').css({
            left: (winWidth - divWidth) / 2,
            top: 0
        });

        $('#lg-pic-list').css({
            left: div * index * -1,
        });
    }

    function update() {
        div = divWidth * ratio;
        $('#lg-pic').width(div);
        $('#lg-pic-list li').width(div);
        $('#lg-pic-list').width(div * imgCount);
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

    for (let i = 0; i < imgCount; i++) {
        $('#contentButton').append('<li></li>');
    }

    $('#lg-pic').width(divWidth);
    $('#lg-pic-list li').width(divWidth);
    $('#lg-pic-list').width(divWidth * imgCount);

    $('#contentButton li:first').addClass('clicked');
    $('#pic-number').text(`1 / ${imgCount}`);

    $('#contentButton li').click(function () {
        index = $(this).index();
        if (isResize) {
            $('#lg-pic-list').animate({
                left: div * index * -1,
            });
        } else {
            $('#lg-pic-list').animate({
                left: divWidth * index * -1,
            });
        }

        $('#pic-number').text(`${index + 1} / ${imgCount}`);
        $(this).addClass('clicked');
        $('#contentButton li').not(this).removeClass('clicked');
    });
});
// $(function () {

//     $(window).resize(function(){
//         moveCenter()
//     })

//     function moveCenter(){
//         // let divHeight = $('#lg-pic').height()
//         let divWidth = $('#lg-pic').width() 
//         console.log(divWidth)
//         // let winHeight = $(window).height()
//         // let winWidth = $(window).width()	

//         // $('#inCenter').css({
//         //     left :(winWidth - divWidth) / 2 ,
//         //     top :(winHeight - divHeight) / 2,
//         // })
//     }
// })

$(document).ready(function(){
    $('.answer').hide();
    $('.minus').hide();
    $('.question').click(function(){
        let slide = $(this).next('.answer')
        slide.slideToggle();
        $(this).find('.minus').toggle();
        $(this).find('.plus').toggle();

    })
})

