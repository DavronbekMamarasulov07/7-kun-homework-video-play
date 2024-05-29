const $currentVideoElement = document.querySelector("#current-video")
const $prevBtn = document.querySelector("#prev-btn")
const $playBtn = document.querySelector("#play-btn")
const $nextBtn = document.querySelector("#next-btn")
const $videoTitle = document.querySelector("#video-title")
const $videoArtist = document.querySelector("#video-artist")
const $addBgAnimation = document.querySelector(".add-animation")


let videoPlaying = false;
let currentVideoIndex = 0;

let videos = [
    {
        src : "./assets/videos/BellaCiao.mp4",
        title : "Bella Ciao",
        artist: "La Casa De Papel"
       
    },
    {
        src : "./assets/videos/Blinding-Lights.mp4",
        title: "Blinding Lights",
        artist: "The Weeknd"
        
    },
    {
        src : "./assets/videos/MOONLIGHT.mp4",
        title: "Moonlight",
        artist: "XXXTENTATIONS"
       
    },
    {
        src: "./assets/videos/Samurai.mp4",
        title: "Samurai",
        artist: "Miyagi"
    },
    {
        src: "./assets/videos/Havo.mp4",
        title: "Havo",
        artist: "Konsta"
    }
]

const renewIndex = () => {
    $currentVideoElement.src = videos[currentVideoIndex].src;
    $videoTitle.innerText = videos[currentVideoIndex].title;
    $videoArtist.innerText = videos[currentVideoIndex].artist; 
}

renewIndex()

 


const playVideo = () => {
    $addBgAnimation.classList.add("background")
    videoPlaying = !videoPlaying;
    if(videoPlaying){
        $currentVideoElement.play();
        $playBtn.firstElementChild.classList.add("hidden")
        $playBtn.lastElementChild.classList.remove("hidden")
    }
    else{
        $currentVideoElement.pause()
        $playBtn.firstElementChild.classList.remove("hidden")
        $playBtn.lastElementChild.classList.add("hidden")
    }
}

const playNextVideo = () => {
    currentVideoIndex++;
    if (currentVideoIndex >= videos.length) {
        currentVideoIndex = 0; 
    }
    renewIndex();
    videoPlaying = true; 
    $currentVideoElement.play();
}

const playPrevVideo = () => {
    currentVideoIndex--;
    if (currentVideoIndex < 0) {
        currentVideoIndex = videos.length - 1; 
    }
    renewIndex();
    videoPlaying = true;
    $currentVideoElement.play();
}




$playBtn.addEventListener("click" , playVideo);
$nextBtn.addEventListener("click" , playNextVideo)
$prevBtn.addEventListener("click" , playPrevVideo)