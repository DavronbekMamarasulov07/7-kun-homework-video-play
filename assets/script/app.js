const $currentVideoElement = document.querySelector("#current-video")
const $prevBtn = document.querySelector("#prev-btn")
const $playBtn = document.querySelector("#play-btn")
const $nextBtn = document.querySelector("#next-btn")
const $videoTitle = document.querySelector("#video-title")
const $videoArtist = document.querySelector("#video-artist")
const $addBgAnimation = document.querySelector(".add-animation")
const $videoList = document.querySelector("#video-list")
const $shuffleBtn = document.querySelector("#shuffle-btn")
const $videoPlayline = document.querySelector("#video-playline")
const $playedTime = document.querySelector("#played-time")
const $playedDuration = document.querySelector("#played-duration")
const $container = document.querySelector(".container")
const $nav = document.querySelector(".nav")


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

renewIndex();

const checkVideoEnd = () => {
    let  intervalCheckVideo = setInterval(() => {
         if($currentVideoElement.currentTime === $currentVideoElement.duration){
             playNextVideo(); 
             clearInterval(intervalCheckVideo)
         }
     },100)
 }

 


const playVideo = () => {
    videoPlaying = !videoPlaying;
    if(videoPlaying){
        $currentVideoElement.play();
        $playBtn.firstElementChild.classList.add("hidden")
        $playBtn.lastElementChild.classList.remove("hidden")
        $addBgAnimation.classList.add("background")
        movieVideoLine();

        
    }
    else{
        $currentVideoElement.pause()
        $playBtn.firstElementChild.classList.remove("hidden")
        $playBtn.lastElementChild.classList.add("hidden")
        $addBgAnimation.classList.remove("background")
    }

     checkVideoEnd();

}

const playNextVideo = () => {
    if (currentVideoIndex + 1 < videos.length) {
        currentVideoIndex++; 
    }
    else{
        currentVideoIndex = 0;
    }
    renewIndex();
    videoPlaying = false; 
    playVideo()
  
   
}

const playPrevVideo = () => {
    currentVideoIndex--;
    if (currentVideoIndex < 0) {
        currentVideoIndex = videos.length - 1; 
    }
    renewIndex();
    videoPlaying = false;
    playVideo()
}



const formatTime = (s) => {  
    let minute = Math.floor(s / 60);
    let seconds =  Math.floor(s % 60)

    return `${minute.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
}

const movieVideoLine = () => {
    let videoInterval = setInterval (() => {
        let percent = $currentVideoElement.currentTime / $currentVideoElement.duration * 100; 
        $videoPlayline.value = percent;
        $playedTime.innerText = isNaN($currentVideoElement.currentTime) ? "--:--" :formatTime($currentVideoElement.currentTime);
        $playedDuration.innerText = isNaN($currentVideoElement.currentTime) ? "--:--" : formatTime($currentVideoElement.duration - $currentVideoElement.currentTime)
        if($currentVideoElement.currentTime === $currentVideoElement.duration){
            clearInterval(videoInterval)
        }
    }, 100)
}

const randomVideo = () => {
    let random = Math.floor(Math.random() * videos.length);
    while(currentVideoIndex === random){
        random = Math.floor(Math.random() * videos.length)
    }
    currentVideoIndex = random
    renewIndex()
    videoPlaying = false,
    playVideo()
}

const chnageVideoCurrentStep = (e) => {
    let seconds = $currentVideoElement.duration * $videoPlayline.value / 100;
    $currentVideoElement.currentTime = seconds;
}


$videoPlayline.addEventListener("input" , chnageVideoCurrentStep)
$shuffleBtn.addEventListener("click" ,randomVideo)
$playBtn.addEventListener("click" , playVideo);
$nextBtn.addEventListener("click" , playNextVideo)
$prevBtn.addEventListener("click" , playPrevVideo)
$container.addEventListener("scroll" , () => {
    if($container.scrollTop > 60 ){
        $nav.classList.add("pin")
    }
    else{
        $nav.classList.remove("pin")
    
    }
})