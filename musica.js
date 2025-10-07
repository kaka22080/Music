
const paragrafo=document.getElementById('paragrafo')
const menuBt=document.querySelector(".menu-btn");
const navigation=document.querySelector(".navigation");
const audio=document.getElementById('audio');
const botaoMusica=document.getElementById('som')
let musicaAtual=0;
menuBt.addEventListener('click',()=>{
    menuBt.classList.toggle('active');
    navigation.classList.toggle('active');
})


const btns =document.querySelectorAll(".nav-btn");
const slides =document.querySelectorAll(".video-slide");

var sliderNav=function(manual){
    btns.forEach((btn)=>{
        btn.classList.remove('active')
    })
    slides.forEach((slide)=>{
        slide.classList.remove('active')
    })
    btns[manual].classList.add("active")
    slides[manual].classList.add("active")
}
btns.forEach((btn,i)=>{
    btn.addEventListener("click",()=>{
        sliderNav(i) 
    })
})

const musics=[
    "som/som-1.mp3",
    "som/som-2.mp3",
    "som/som-3.mp3",
    "som/som-5.mp3",
]

function escolherMusicaAleatoria() {
    const indiceAleatorio = Math.floor(Math.random() * musics.length);
    return musics[indiceAleatorio];
}

function tocarMusica(){
    const musicaSelecionada = escolherMusicaAleatoria();
    audio.src = musicaSelecionada;
    audio.play()
}
botaoMusica.addEventListener("click", () => {
    if (audio.paused) {
        tocarMusica();
    }   else {
      audio.pause();
    }
});

tocarMusica.loop=true

const btn1=document.getElementById("mudar-1")
const text1=document.getElementById("titulo")
btn1.addEventListener("click",function(){
    text1.textContent="O amor não tem meio termo ou ele te salva ou ele te destrói"
    const paragrafo=document.getElementById('paragrafo')
    paragrafo.textContent="(Nitz)"
})
const btn2=document.getElementById("mudar-2")
const text2=document.getElementById("titulo")
btn2.addEventListener("click",function(){
    text2.textContent="O coração tem suas razões que a própria razão discorda"
    const paragrafo=document.getElementById('paragrafo')
    paragrafo.textContent="(Pascal)"
})
const btn3=document.getElementById("mudar-3")
const text3=document.getElementById("titulo")
btn3.addEventListener("click",function(){
    text3.textContent="Ninguém foi ensinado a viver estamos todos improvizando"
    const paragrafo=document.getElementById('paragrafo')
    paragrafo.textContent="(Clarice)"
})
const btn4=document.getElementById("mudar-4")
const text4=document.getElementById("titulo")
btn4.addEventListener("click",function(){
    text4.textContent="Há pessoas inesquecíveis e para isso não há cura"
    const paragrafo=document.getElementById('paragrafo')
    paragrafo.textContent="(Bukowski)"
})
const btn5=document.getElementById("mudar-5")
const text5=document.getElementById("titulo")
btn5.addEventListener("click",function(){
    text5.textContent="É difícil esperar por algo que talvez nunca aconteça"
    paragrafo.textContent="(Platão)"
})
