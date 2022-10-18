const hiredCharacter = localStorage.getItem("character");
console.log('hiredCharacter :>> ', hiredCharacter);

const div = document.createElement("div")
div.innerText = hiredCharacter

const body = document.querySelector("body")
body.appendChild(div)
