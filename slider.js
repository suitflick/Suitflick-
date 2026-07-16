const slides = [
"https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80",
"https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80",
"https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80"
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