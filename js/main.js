// console.log("data >>>", data);
// console.log("occupation >>>", data[0].occupation);
// for (let i = 0; i < data.length; i++) {
//     console.log("status >>>", data[i].status);
// }


function createCards() { 
    let containerCards = document.getElementById("container-cards");
  
    for (let i = 0; i < data.length; i++) {

        let divCard = document.createElement("div");
        // divCard.setAttribute("style", "width: 12rem;");
        divCard.setAttribute("class", "col-sm-6 col-md-3");
        divCard.classList.add("card");
    
        let img = document.createElement("img");
        // img.setAttribute("style", "width: 150px");
        img.setAttribute("src", data[i].img);
        img.setAttribute("alt", data[i].name);
        img.setAttribute("referrerpolicy", "no-referrer");
        img.classList.add("card-img-top");
        // console.log(i, data[i].name, img);
    
        let divCardBody = document.createElement("div");
        divCardBody.classList.add("card-body");
      
        // let today = new Date(data[i].birthday).toLocaleString("zh-CN")
        // console.log('today :>> ', today);
        // let age = data[i].birthday
        // console.log('age :>> ', age);
        // console.log('typeof :>> ', typeof age);
    
        let buttonCard = document.createElement("button");
        buttonCard.innerText = "Hire me";
        buttonCard.setAttribute("type", "button")
        buttonCard.setAttribute("class", "btn btn-dark")
        buttonCard.setAttribute("data-bs-toggle", "popover")
        buttonCard.setAttribute("data-bs-title", "Congratulations")
        buttonCard.setAttribute("data-bs-content", "You hired " + data[i].name)
    
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
        divCardBody.appendChild(img);
        divCardBody.appendChild(buttonCard);
    }
    
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
             const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
    const images = document.querySelectorAll("img")
    
    for (let i = 0; i < images.length; i++) {
        images[i].addEventListener("error", function () {
            images[i].src = "https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg"
        })
    }
    addEvents()
}


function addEvents() {
    let btnShowFilters = document.getElementById("btn-show-filters");
    btnShowFilters.addEventListener("click", showMore)
}


// SHOW MORE
function showMore() {

  let showFilters = document.getElementById("container-filters");
let btnShowFilters = document.getElementById("btn-show-filters");
  
console.log(showFilters.style.display);
    if (showFilters.style.display === "none") {
      console.log("A");
    btnShowFilters.innerHTML = "Hide filters"; 
        showFilters.style.display = "block";
        
    } else {
        console.log("B");
        showFilters.style.display = "none";
        btnShowFilters.innerHTML = "Show filters";
        console.log(showFilters.style.display);
     
    // showFilters.style.display = "inline";
  }
}
createCards()
