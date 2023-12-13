$(function(){
    let divWidth = $('#lg-pic').width();
    let imgCount = $('#lg-pic-list li').length;
    console.log(imgCount)
    for(let i = 0; i< imgCount; i++){
        $('#contentButton').append(`<li></li>`);
    }
    $('#contentButton li:first').addClass('clicked');
    $('#pic-number').text('1 / 5')

    $('#lg-pic-list li').width(divWidth);
    $('#lg-pic-list').width(divWidth * imgCount)
    let index = 0;
    $('#contentButton li').click(function(){
        index = $(this).index();
        
        $('#lg-pic-list').animate({
            left: divWidth * index * -1
        })
        $('#pic-number').text(`${index+1} / 5`)
        $(this).addClass('clicked');
        $('#contentButton li').not(this).removeClass('clicked');
    });
});

