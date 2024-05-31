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
const $nav = document.querySelector("#nav")
const $listMenuBtn = document.querySelector(".bi-list")
const $listMenu = document.querySelector("#list")


let videoPlaying = false;
let currentVideoIndex = 0;

let videos = [
    {
        src : "./assets/videos/BellaCiao.mp4",
        title : "Bella Ciao",
        artist: "La Casa De Papel",
        pictures: "https://avatars.mds.yandex.net/i?id=410c95fc8e5c8b9a260ddfc3944b20041c6cf32f-7674757-images-thumbs&n=13"
       
    },
    {
        src : "./assets/videos/Blinding-Lights.mp4",
        title: "Blinding Lights",
        artist: "The Weeknd",
        pictures:"https://i.ytimg.com/vi/EXbpxn_ExC8/maxresdefault.jpg"
        
    },
    {
        src : "./assets/videos/MOONLIGHT.mp4",
        title: "Moonlight",
        artist: "XXXTENTATIONS",
        pictures:"https://medias.spotern.com/spots/w1280/164/164349-1538493175.jpg"
       
    },
    {
        src: "./assets/videos/Samurai.mp4",
        title: "Samurai",
        artist: "Miyagi",
        pictures:"https://i.ytimg.com/vi/KENLVZ1_4Ow/maxresdefault.jpg"
    },
    {
        src: "./assets/videos/Havo.mp4",
        title: "Havo",
        artist: "Konsta",
        pictures:"https://pic.rutubelist.ru/video/6c/d7/6cd7650be56e2a980360303500d03c11.jpg"
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

const renderList = () =>{
    videos.forEach((video,index) => {
        const videoEl = document.createElement("video");
        
        videoEl.src = video.src;
        videoEl.addEventListener("loadedmetadata" , (e) => {
            const $div = document.createElement("div");
            $div.dataset.videoId = index
            $div.className = "list-item text-white"
            $div.innerHTML = `
                <img class="w-[300px] h-[150px] rounded-xl " src="${video.pictures}" alt="${video.title}">
            <div class="flex justify-between w-full items-center"> 
                    <div>
                        <p class="text-[24px]">${video.title}</p>
                        <p class="text-gray-400">${video.artist}</p>
                    </div>
                    <div>
                        <p class="text-[16px] text-gray-300">${formatTime(e.target.duration)}
                    </div>
            </div>
            `
            $listMenu.append($div)
        })
        
    })
}
renderList()

const playSelectedVideo = (e) => {
    if(e.target.classList.contains("list-item")){
        currentVideoIndex = e.target.dataset.videoId;
        renewIndex()
        videoPlaying = false
        playVideo()
    }
}

$videoPlayline.addEventListener("input" , chnageVideoCurrentStep)
$shuffleBtn.addEventListener("click" ,randomVideo)
$playBtn.addEventListener("click" , playVideo);
$nextBtn.addEventListener("click" , playNextVideo)
$prevBtn.addEventListener("click" , playPrevVideo)
$listMenu.addEventListener("click", playSelectedVideo)

$container.addEventListener("scroll" , () => {
    if($container.scrollTop > 80 ){
        $nav.classList.add("pin")
    }
    else{
        $nav.classList.remove("pin")
    
    }
})

