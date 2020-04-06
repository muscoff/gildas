
var sw = window.innerWidth;
var bg = document.querySelector('.bg');
var sidemenu = document.querySelector('.side-menu');

bg.addEventListener('click', e=>{
    bg.style.width = '0%';
    sidemenu.style.width = '0%';
});

document.querySelector('#menu-btn').addEventListener('click', e=>{

    bg.style.width = '100%';

    if(sw<=420){
        sidemenu.style.width = '80%';
        sidemenu.style.display = 'block';
    }

    if(sw>420 & sw<=620){
        sidemenu.style.width = '70%';
        sidemenu.style.display = 'block';
    }

    if(sw>620 & sw<=820){
        sidemenu.style.width = '40%';
        sidemenu.style.display = 'block';
    }

    if(sw>820 & sw<=1120){
        sidemenu.style.width = '30%';
        sidemenu.style.display = 'block';
    }

    if(sw>1120){
        sidemenu.style.width = '25%';
        sidemenu.style.display = 'block';
    }
});

document.querySelector('#close').addEventListener('click', e=>{

    bg.style.width = '0%';

    if(sw<=420){
        sidemenu.style.width = '0%';
        sidemenu.style.display = 'none';
    }

    if(sw>420 & sw<=620){
        sidemenu.style.width = '0%';
        sidemenu.style.display = 'none';
    }

    if(sw>620 & sw<=820){
        sidemenu.style.width = '0%';
        sidemenu.style.display = 'none';
    }

    if(sw>820 & sw<=1120){
        sidemenu.style.width = '0%';
        sidemenu.style.display = 'none';
    }

    if(sw>1120){
        sidemenu.style.width = '0%';
        sidemenu.style.display = 'none';
    }
}); 