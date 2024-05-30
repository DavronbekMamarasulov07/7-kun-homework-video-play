const $currentVideoElement = document.querySelector("#current-video")
const $prevBtn = document.querySelector("#prev-btn")
const $playBtn = document.querySelector("#play-btn")
const $nextBtn = document.querySelector("#next-btn")
const $videoTitle = document.querySelector("#video-title")
const $videoArtist = document.querySelector("#video-artist")
const $addBgAnimation = document.querySelector(".add-animation")
const $videoList = document.querySelector("#video-list")
const $shuffleBtn = document.querySelector("#shuffle-btn")


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
    videoPlaying = !videoPlaying;
    if(videoPlaying){
        $currentVideoElement.play();
        $playBtn.firstElementChild.classList.add("hidden")
        $playBtn.lastElementChild.classList.remove("hidden")
        $addBgAnimation.classList.add("background")

    }
    else{
        $currentVideoElement.pause()
        $playBtn.firstElementChild.classList.remove("hidden")
        $playBtn.lastElementChild.classList.add("hidden")
        $addBgAnimation.classList.remove("background")

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


const playSelectedVideo = (event) => {
    event.preventDefault(); 
    const videoSrc = event.target.getAttribute("href"); 
    const videoIndex = videos.findIndex(video => video.src === videoSrc); 
    if (videoIndex !== -1) { 
        currentVideoIndex = videoIndex; 
        renewIndex(); 
        videoPlaying = true; 
        $currentVideoElement.play(); 
        $addBgAnimation.classList.add("background");
        $playBtn.firstElementChild.classList.add("hidden");
        $playBtn.lastElementChild.classList.remove("hidden");

    }
}

$videoList.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", playSelectedVideo);
});

const randomVideo = () => {
    let random = Math.floor(Math.random() * videos.length)
    currentVideoIndex = random
    renewIndex()
    videoPlaying = false,
    playVideo()
}



$shuffleBtn.addEventListener("click" ,randomVideo)
$playBtn.addEventListener("click" , playVideo);
$nextBtn.addEventListener("click" , playNextVideo)
$prevBtn.addEventListener("click" , playPrevVideo)