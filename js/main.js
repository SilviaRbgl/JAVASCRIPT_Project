
console.log("data >>>", data);
console.log("occupation >>>", data[0].occupation);
// for (let i = 0; i < data.length; i++) {
//     console.log("status >>>", data[i].status);
// }

// SEARCH


// SHOW MORE
// const showMoreButton = document.getElementById("show-more")

// function showMore() {
//     console.log(containerCards.style.display);
//     if (containerCards.style.display === "none") {
//         containerCards.style.display = "block"
//     } 
//     else {
//         containerCards.style.display = "none"
//     }
// }
// showMoreButton.addEventListener("click", showMore)


// CARDS
let containerCards = document.getElementById("container-cards");
for (let i = 0; i < data.length; i++) {

    let divCard = document.createElement("div");
    // divCard.setAttribute("style", "width: 12rem;");
    divCard.setAttribute("class", "col-sm-6 col-md-3");
    divCard.classList.add("card");

    let img = document.createElement("img");
    img.setAttribute("src", data[i].img);
    img.setAttribute("alt", data[i].name);
    // img.setAttribute("referrerpolicy", "no-referrer");
    img.classList.add("card-img-top");
    console.log(i, data[i].name, img);

    let divCardBody = document.createElement("div");
    divCardBody.classList.add("card-body");
  

    let h5 = document.createElement("h5");
    h5.classList.add("card-title");
    h5.innerText = data[i].name;

    let p = document.createElement("p");
    p.classList.add("card-text");
    p.innerText = data[i].occupation;

    divCardBody.appendChild(h5)
    divCardBody.appendChild(p)
    divCard.appendChild(divCardBody)

    containerCards.appendChild(divCard); 
    divCard.appendChild(img);

}

const images = document.querySelectorAll("img")

for (let i = 0; i < images.length; i++) {
    images[i].addEventListener("error", function () {
        images[i].src = "https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg"
    })
}