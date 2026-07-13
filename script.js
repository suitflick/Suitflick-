document.querySelectorAll("button").forEach(button=>{

button.addEventListener("click",()=>{

console.log("Button clicked");

});

});
// SuitFlick JavaScript

console.log("SuitFlick Loaded Successfully");

// Shop Now Button
document.querySelectorAll("button").forEach(button => {
  button.addEventListener("click", function () {
    console.log(button.innerText + " clicked");
  });
});