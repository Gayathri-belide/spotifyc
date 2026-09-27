let songitems = Array.from(document.getElementsByClassName("songitem"));

let song = [
    { songname: "Tujh Mein Rab Dikhta Hai", filePath: "1.mp3", coverPath: "./cover1.jpeg" },
    { songname: "Kahani Suno", filePath: "2.mp3", coverPath: "./cover2.jpeg" },
    { songname: "Ye Ratein Ye Mausam", filePath: "3.mp3", coverPath: "./cover3.jpeg" },
    { songname: "Tu Jo Mila", filePath: "4.mp3", coverPath: "./cover4.jpeg" },
    { songname: "Lambiya Judaiyan", filePath: "5.mp3", coverPath: "./cover5.jpeg" },
    { songname: "Salam-e-Ishq", filePath: "6.mp3", coverPath: "./cover6.jpeg" },
    { songname: "Tere Bin", filePath: "7.mp3", coverPath: "./cover7.jpeg" },
    { songname: "Agar Tum Saath Ho", filePath: "8.mp3", coverPath: "./cover8.jpeg" },
    { songname: "Zaroori Tha", filePath: "9.mp3", coverPath: "./cover9.jpeg" },
    { songname: "Manidweepa Varnana", filePath: "./manidweepa_varana.mp3", coverPath: "./cover7.jpeg" }
];

songitems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = song[i].coverPath;
    element.getElementsByClassName("songname")[0].innerHTML = song[i].songname;
});

const makeallplay = () => {
    Array.from(document.getElementsByClassName('songplay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};

let index = 0;
let audio = new Audio(song[0].filePath);
let master = document.getElementById("master");
let pro = document.getElementById("progress");

const setActiveSong = (songIndex) => {
    index = songIndex;
    makeallplay();

    const playButton = document.getElementById(String(index + 1));
    if (playButton) {
        playButton.classList.remove("fa-circle-play");
        playButton.classList.add("fa-circle-pause");
    }

    audio.src = song[index].filePath;
    audio.currentTime = 0;
    document.getElementById("cur").innerHTML = song[index].songname;
    document.getElementById("gif").style.opacity = 1;
    master.classList.remove("fa-circle-play");
    master.classList.add("fa-circle-pause");
};

master.addEventListener('click', () => {
    if (!song[index]) {
        index = 0;
    }

    if (audio.paused || audio.currentTime <= 0) {
        if (!audio.src || audio.src.endsWith('undefined')) {
            audio.src = song[index].filePath;
        }
        audio.play();
        document.getElementById("cur").innerHTML = song[index].songname;
        document.getElementById("gif").style.opacity = 1;
        master.classList.remove("fa-circle-play");
        master.classList.add("fa-circle-pause");
    } else {
        audio.pause();
        document.getElementById("gif").style.opacity = 0;
        master.classList.remove("fa-circle-pause");
        master.classList.add("fa-circle-play");
    }
});

audio.addEventListener('timeupdate', () => {
    const prog = parseInt((audio.currentTime / audio.duration) * 100, 10);
    pro.value = prog;
});

pro.addEventListener('change', () => {
    if (audio.duration) {
        audio.currentTime = (pro.value / 100) * audio.duration;
    }
});

Array.from(document.getElementsByClassName("songplay")).forEach((ele) => {
    ele.addEventListener('click', (e) => {
        const clickedIndex = parseInt(e.target.id, 10) - 1;
        setActiveSong(clickedIndex);
        audio.play();
    });
});

document.getElementById('next').addEventListener('click', () => {
    const nextIndex = (index + 1) % song.length;
    setActiveSong(nextIndex);
    audio.play();
});

document.getElementById('prev').addEventListener('click', () => {
    const prevIndex = (index - 1 + song.length) % song.length;
    setActiveSong(prevIndex);
    audio.play();
});