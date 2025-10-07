// Lista de músicas disponíveis no player
// Cada música é um objeto com:
// - name: Nome da música
// - artist: Nome do artista
// - src: Caminho para o arquivo de áudio
// - cover: Caminho para a imagem de capa

const songsList = [
    {
        name:"Kendrick Lamar",
        artist:"Pride",
        src:"som/som-1.mp3",
        cover:"img/damn.jpg",
        video:"video/video-7.mp4" // Adicione esta Linha
    },
    {
        name:"Kendrick Lamar",
        artist:"Meet The Grahams",
        src:"som/som-2.mp3",
        cover:"img/meet.avif",
        video:"video/video-2.mp4" // Adicione esta Linha
    },
    {
        name:"Kanye West",
        artist:"Runaway",
        src:"som/som-3.mp3",
        cover:"img/kanye.jpg",
        video:"video/video-3.mp4" // Adicione esta Linha
    },
    {
        name: "Kanye West",
        artist: "On sight",
        src: "som/som-5.mp3",
        cover: "img/yeezus.jpg",
        video: "video/video-6.mp4" // Adicione esta linha
    }
];

// Seleção dos elementos da interface

// Elementos de informação da música
const artistName = document.querySelector('.artist-name'); // Elemento que exibe o nome do artista
const musicName = document.querySelector('.song-name'); // Elemento que exibe o nome da música
const fillBar = document.querySelector('.fill-bar'); // Barra de progresso (parte preenchida)
const time = document.querySelector('.time'); // Elemento que exibe o tempo decorrido/total
const progress = document.querySelector('.progress-bar'); // Barra de progresso completa

// Elementos de controle/interação
const cover = document.getElementById('cover'); // Elemento que exibe a capa do album
const playBtn = document.getElementById('play'); // Botão de play/pause
const prevBtn = document.getElementById('prev'); // Botão de música anterior
const nextBtn = document.getElementById('next'); // Botão de próxima música

// Variáveis de estado do player
let song = new Audio(); // Objeto Audio que controla a reprodução
let currentSong = 0; // Índice atual na songsList
let playing = false; // Flag que indica se uma música está tocando

// Configura os event Listeners quando o DOM estiver totalmente carregado
document.addEventListener('DOMContentLoaded', () => {
    loadSong(currentSong); // Carrega a primeira música

    // Atualiza a barra de progresso enquanto a música toca
    song.addEventListener('timeupdate', updateProgress);
    // Avança para a próxima música quando a atual terminar
    song.addEventListener('ended', nextSong);
    // Configura os Listeners dos botões
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    playBtn.addEventListener('click', togglePlayPause);
    // Permite clicar na barra de progresso para buscar
    progress.addEventListener('click', seek);
});

/* Carrega uma música específica no player
* @param {number} index - Indice da música na songsList
*/
function loadSong(index) {
    const {name, artist, src, cover:thumb, video} = songsList[index];
    // Atualiza a interface com as informações da música
    artistName.innerText = artist;
    musicName.innerText = name;
    song.src = src;
    cover.style.backgroundImage = `url(${thumb})`;

    // Troca o vídeo de fundo
    const videos = document.querySelectorAll('.video-slide');
    videos.forEach(vid => vid.classList.remove('active'));
    const videoFileName = video.split('/').pop(); // Extrai o nome do arquivo do caminho
    const currentVideo = Array.from(videos).find(vid => vid.getAttribute('data-video') === videoFileName);
    if (currentVideo) {
        currentVideo.classList.add('active');
    }
}

/**
* Atualiza a barra de progresso e o tempo decorrido  
* Chamado repetidamente durante a reprodução  
*/
function updateProgress() {
    if(song.duration) {
        // Calcula a porcentagem completada
        const pos = (song.currentTime / song.duration) * 100;
        fillBar.style.width = `${pos}%`;

        // Formata e exibe os tempos
        const duration = formatTime(song.duration);
        const currentTime = formatTime(song.currentTime);
        time.innerText = `${currentTime} - ${duration}`;
    }
}

/**
* Formata segundos em uma string MM:SS  
* @param {number} seconds - Tempo em segundos  
* @returns {string} Tempo formatado  
*/
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

/**
 * Alterna entre play e pause
 */
function togglePlayPause() {
    if(playing) {
        song.pause();
    } else {
        song.play();
    }
    playing = !playing;

    // Atualiza ícones e estado visual
    playBtn.classList.toggle('fa-pause', playing);
    playBtn.classList.toggle('fa-play', !playing);
    cover.classList.toggle('active', playing);
}

/**
 * Avança para a próxima música na lista
 * (Volta para a primeira após a última)
 */
function nextSong() {
    currentSong = (currentSong + 1) % songsList.length;
    playMusic();
}

/**
 * Volta para a música anterior na lista
 * (Vai para a última se estiver na primeira)
 */
function prevSong() {
    currentSong = (currentSong - 1 + songsList.length) % songsList.length;
    playMusic();
}

/**
 * Prepara e inicia a reprodução da música atual
 */
function playMusic() {
    loadSong(currentSong); // Carrega a música
    song.play(); // Inicia a reprodução
    playing = true; // Atualiza estado

    // Atualiza ícones
    playBtn.classList.add('fa-pause');
    playBtn.classList.remove('fa-play');
    cover.classList.add('active');
}

/**
* Permite buscar uma posição específica clicando na barra de progresso
* @param {Event} e - Objeto de evento do clique
*/
function seek(e) {
    // Calcula a posição com base no clique
    const pos = (e.offsetX / progress.clientWidth) * song.duration;
    song.currentTime = pos; // Define o tempo da música
}
