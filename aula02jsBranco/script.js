const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner  = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const iniciarPausarBt = document.querySelector('#start-pause span');
const iconPausarIniciarBt = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');


const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('sons/luna-rise-part-one.mp3');
const musicaPlay = new Audio('sons/play.wav');
const musicaPause = new Audio('sons/pause.mp3');
const musicaFim = new Audio('sons/beep.mp3');


musica.loop = true;
let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;
musicaFocoInput.addEventListener('change', () =>{
    if(musica.paused){
        musica.play();
        musicaPlay.play();
    }else{
        musica.pause();
        musicaPause.play();


    
    }
})


focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');


})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');

})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');

})

function alterarContexto(contexto){
    mostarTempo();
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);

    switch(contexto){
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,
            <br><strong class = "app_title-strong"> mergulhe no que importa.</strong>`
            break;

    }

    switch(contexto){
        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada,
            <strong class = "app_title-strong"> faça uma pausa curta.</strong>`
            break;

    }

    switch(contexto){
        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superficie,
            <strong class = "app_title-strong"> faça uma pausa longa.</strong>`
            break;
        
        default:
            break;

    }

    botoes.forEach (function (contexto){
        contexto.classList.remove('active');


    })


    

}

const contagemRegressiva = () =>{
    tempoDecorridoEmSegundos -= 1;
    if (tempoDecorridoEmSegundos <= 0){
        parar();
        alert('Tempo esgotado');
        musicaFim.play();
        return;
    }

    mostarTempo();
    console.log('Temporizador = '+tempoDecorridoEmSegundos)

}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar(){
    
    if(intervaloId){
        musicaPause.play();
        parar();
        iniciarPausarBt.textContent = "Pause";
        iconPausarIniciarBt.setAttribute('src', '/imagens/pause.png')
        return;
    }
    intervaloId = setInterval(contagemRegressiva, 1000);

}

function parar(){
    iniciarPausarBt.textContent = "Começar";
    iconPausarIniciarBt.setAttribute('src', '/imagens/play_arrow.png')
    clearInterval(intervaloId);
    intervaloId = null;
}

function mostarTempo(){
    const tempo = new Date (tempoDecorridoEmSegundos*1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = (`${tempoFormatado}`)
}

mostarTempo();

