$(function () {
let divWidth, divHeight, winWidth, winHeight, imgCount, index = 0;

function initializeGallery() {
    divWidth = $('#lg-pic').width();
    divHeight = $('#lg-pic').height();
    winWidth = $(window).width();
    winHeight = $(window).height();
    imgCount = $('#lg-pic-list li').length;

    moveCenter();
}

function moveCenter() {
    $('#lg-pic').css({
    left: (winWidth - divWidth) / 2,
    top: (winHeight - divHeight) / 2,
    });

    $('#lg-pic-list').css({
    left: divWidth * index * -1,
    });
}

function updateGallery() {
    divWidth = $('#lg-pic').width();
    $('#lg-pic-list li').width(divWidth);
    $('#lg-pic-list').width(divWidth * imgCount);
}

$(window).resize(function () {
    winWidth = $(window).width();
    winHeight = $(window).height();

    moveCenter();
    updateGallery();
});

initializeGallery();

for (let i = 0; i < imgCount; i++) {
    $('#contentButton').append('<li></li>');
}

$('#contentButton li:first').addClass('clicked');
$('#pic-number').text(`1 / ${imgCount}`);

$('#contentButton li').click(function () {
    index = $(this).index();

    $('#lg-pic-list').animate({
    left: divWidth * index * -1,
    });

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
    $('.fa-minus').hide();
    $('.question').click(function(){
        let slide = $(this).next('.answer')
        slide.slideToggle();
        $(this).find('.fa-minus').toggle();
        $(this).find('.fa-plus').toggle();

    })
})

