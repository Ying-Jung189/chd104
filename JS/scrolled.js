window.addEventListener('scroll', function(ht){
    if(window.scrollY > 400){
        document.getElementById("scroll-fb").classList.add("change-color");
        document.getElementById("scroll-ig").classList.add("change-color");
    }else{
        document.getElementById("scroll-fb").classList.remove("change-color");
        document.getElementById("scroll-ig").classList.remove("change-color");
    }
    })

    window.addEventListener('scroll',function(vt){
    if(window.scrollY > 800){
        document.getElementById("top").classList.remove("close");
    }else{
        document.getElementById("top").classList.add("close");
    }
    }) 