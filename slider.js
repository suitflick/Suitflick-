const slides = [
"https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg",
"https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg",
"https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg"
];

let current = 0;

function changeSlide(){

const hero = document.querySelector(".hero");

hero.style.backgroundImage =
`linear-gradient(rgba(255,255,255,.35),rgba(255,255,255,.35)),url('${slides[current]}')`;

hero.style.backgroundSize="cover";
hero.style.backgroundPosition="center";

current++;

if(current>=slides.length){
current=0;
}

}

changeSlide();

setInterval(changeSlide,3000);