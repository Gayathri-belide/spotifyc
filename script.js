console.log("h")
let songin=0;
let songitems=Array.from(document.getElementsByClassName("songitem"));
console.log(songitems);
let song=[
    {songname:"Tuj Me rab Dikta he",filePath:"1.mp3",coverPath:"./cover1.jpeg"},
    {songname:"Kahani suno",filePath:"2.mp3",coverPath:"./cover2.jpeg"},
    {songname:"Ye Ratein",filePath:"3.mp3",coverPath:"./cover3.jpeg"},
    {songname:"Tu Jo Mila",filePath:"4.mp3",coverPath:"./cover4.jpeg"},
    {songname:"Lambiya Judain",filePath:"5.mp3",coverPath:"./cover5.jpeg"},
    {songname:"Salam e Ishq",filePath:"6.mp3",coverPath:"./cover6.jpeg"},
]
songitems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src=song[i].coverPath;
    element.getElementsByClassName("songname")[0].innerHTML=song[i].songname;
   
    
})
const makeallplay=()=>{
    Array.from(document.getElementsByClassName('songplay')).forEach((element)=>
    {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}
let index=0;
audio=new Audio("1.mp3");
let master=document.getElementById("master");
let pro=document.getElementById("progress");
master.addEventListener('click',()=>{
    if(audio.paused ||audio.currentTime<=0)
    {
        audio.play();
        document.getElementById("cur").innerHTML=song[index]['songname'];
        document.getElementById("gif").style.opacity=1;
        master.classList.remove("fa-circle-play");
        master.classList.add("fa-circle-pause");
  }
  else{
    audio.pause();
    document.getElementById("gif").style.opacity=0;
    master.classList.remove("fa-circle-pause");
        master.classList.add("fa-circle-play");
  }
})
audio.addEventListener('timeupdate',()=>{
    prog=parseInt((audio.currentTime/audio.duration)*100);
    pro.value=prog;
})
pro.addEventListener('change',()=>{
    audio.currentTime=pro.value*audio.duration/100;
})
Array.from(document.getElementsByClassName("songplay")).forEach((ele)=>{
    ele.addEventListener('click',(e)=>
    { console.log(e.target);
         makeallplay();
        index=parseInt(e.target.id);
        console.log(index);
    e.target.classList.remove("fa-circle-play");
      e.target.classList.add("fa-circle-pause");
     audio.src=song[index-1]['filePath'];
     
     audio.currentTime=0;
     document.getElementById("cur").innerHTML=song[index-1]['songname'];
     document.getElementById("gif").style.opacity=1;
     audio.play();
     master.classList.remove("fa-circle-play");
        master.classList.add("fa-circle-pause");

    })

})
document.getElementById('next').addEventListener('click',()=>
{
    if(index>5) index=1;
    else index+=1;
    makeallplay();
    let e=document.getElementById(index);
    e.classList.remove("fa-circle-play");
      e.classList.add("fa-circle-pause");
    master.classList.remove("fa-circle-play");
      master.classList.add("fa-circle-pause");
     audio.src=song[index-1]['filePath'];
     audio.currentTime=0;
     document.getElementById("cur").innerHTML=song[index-1]['songname'];
     document.getElementById("gif").style.opacity=1;
     audio.play();
})
document.getElementById('prev').addEventListener('click',()=>
{
    if(index==1) index=6;
    else index-=1;
    makeallplay();
    let e=document.getElementById(index);
    e.classList.remove("fa-circle-play");
      e.classList.add("fa-circle-pause");
    master.classList.remove("fa-circle-play");
      master.classList.add("fa-circle-pause");
     audio.src=song[index-1]['filePath'];
     audio.currentTime=0;
     document.getElementById("cur").innerHTML=song[index-1]['songname'];
     document.getElementById("gif").style.opacity=1;
     audio.play();
})