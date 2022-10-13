// console.log("data >>>", data);
// console.log("occupation >>>", data[0].occupation);
// for (let i = 0; i < data.length; i++) {
//     console.log("status >>>", data[i].status);
// }

// FETCHING THE DATA
const getData = () => {
  fetch("https://www.breakingbadapi.com/api/characters")
    .then((response) => {
      // console.log("response :>> ", response);
      return response.json();
    })
    .then((result) => {
      console.log("data", result);
      controller(result);
    })
    .catch((error) => console.log(error));
};
getData();


// CONTROLLER FUNCTION
function controller(result) {
  //get the data

  // create the cards
  createCards(result);
  // event listener show/hide
  addEventShowHide();
  // dropdown occupations
  createDropdown(result);
  // checkbox experience
  createCheckbox(result);
  // add events
  addEvents(result)
  // images error
  // imageError(result);
}


// FUNCTION FOR CREATING THE CARDS
function createCards(characters) {
  let containerCards = document.getElementById("container-cards");
  containerCards.innerText = "";

  for (let i = 0; i < characters.length; i++) {
    let divCard = document.createElement("div");
    divCard.setAttribute("style", "width: 20rem;");
    divCard.setAttribute("class", "col-sm-6 col-md-3");
    divCard.classList.add("card");

    let img = document.createElement("img");
    img.setAttribute("src", characters[i].img);
    img.setAttribute("alt", characters[i].name);
    img.setAttribute("style", "width: 16rem;");
    img.setAttribute("style", "height: 22rem;");
    img.setAttribute("referrerpolicy", "no-referrer");
    img.classList.add("card-img-top");
    // console.log(i, data[i].name, img);

    let divCardBody = document.createElement("div");
    divCardBody.classList.add("card-body");

    let buttonCard = document.createElement("button");
    buttonCard.innerText = "Hire me";
    buttonCard.setAttribute("type", "button");
    buttonCard.setAttribute("class", "btn btn-dark");
    buttonCard.setAttribute("data-bs-toggle", "popover");
    buttonCard.setAttribute("data-bs-title", "Congratulations");
    buttonCard.setAttribute(
      "data-bs-content",
      "You hired " + characters[i].name
    );

    let h5 = document.createElement("h5");
    h5.classList.add("card-title");
    h5.innerText = characters[i].name;

    let p = document.createElement("p");
    p.classList.add("card-text");
    p.innerText = characters[i].occupation;

    divCardBody.appendChild(h5);
    divCardBody.appendChild(p);
    divCard.appendChild(divCardBody);

    containerCards.appendChild(divCard);
    divCardBody.appendChild(img);
    divCardBody.appendChild(buttonCard);
  }
}

// EVENT LISTENER FOR SHOW/HIDE FILTERS
function addEventShowHide() {
  let btnShowFilters = document.getElementById("btn-show-filters");
  btnShowFilters.addEventListener("click", showMore);
}

function showMore() {
  let showFilters = document.getElementById("filters");
  let btnShowFilters = document.getElementById("btn-show-filters");
  // console.log(showFilters.style.display);

  if (showFilters.style.display === "none") {
    btnShowFilters.innerHTML = "Hide filters";
    showFilters.style.display = "block";
  } else {
    showFilters.style.display = "none";
    btnShowFilters.innerHTML = "Show filters";
    // console.log(showFilters.style.display);
  }
}


// FUNCTION FOR GENERATE DROPDOWN FOR OCCUPATIONS
const createDropdown = (result) => {
  const dropdown = document.getElementById("occupationDropdown");
  let charactersOccupationsArrays = [];
  let occupationsArray = [];

  for (let i = 0; i < result.length; i++) {
    let characterOcuppations = result[i].occupation;
    for (let b = 0; b < characterOcuppations.length; b++) {
      occupationsArray.push(characterOcuppations[b]);
      // console.log('occupationsArray :>> ', occupationsArray);
    }
    charactersOccupationsArrays.push(characterOcuppations);
    // console.log('charactersOccupationsArray :>> ', charactersOccupationsArrays);
  }

  const uniqueOccupations = [...new Set(occupationsArray)];
  // console.log("unique >>>", uniqueOccupations);
  uniqueOccupations.map((occupation) => {
    // console.log('occupation :>> ', occupation);
    let option = document.createElement("option");
    option.innerText = occupation;
    option.value = occupation;

    dropdown.appendChild(option);
  });
};

// FUNCTION FOR GENERATE FILTERS FOR OCCUPATIONS
const filterByDropdown = (characters) => {
  // console.log("dropdoweddddd");
  const dropDrownValue = document.querySelector("#occupationDropdown").value;
  // console.log("dropDrownValue", dropDrownValue);

  const filteredOccupation = characters.filter((characters) => {
    return (
      characters.occupation.includes(dropDrownValue) || dropDrownValue === "all"
    );
  });
  // console.log("filteredOccupation", filteredOccupation);
  createCards(filteredOccupation);
};


// FUNCTION FOR GENERATE CHECKBOXES FOR EXPERIENCE
const checkboxes = document.querySelectorAll(".form-check-input");
// console.log("checkboxes :>> ", checkboxes);
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("click", createCheckbox);
});

function createCheckbox(event) {
  const checkedCheckboxes = document.querySelectorAll(
    "input[type=checkbox]:checked"
  );
  // console.log("checkedCheckboxes :>> ", checkedCheckboxes);

  const checkboxesValues = Array.from(checkedCheckboxes).map(
    (checkedCheckbox) => {
      return checkedCheckbox.value;
    }
  );
  // console.log("checkboxesValues :>> ", checkboxesValues);
}

// // FUNCTION FOR GENERATE FILTERS FOR EXPERIENCE
const filterByCheckbox = (characters) => {
  // console.log("its checked");

  const checkboxValue = document.querySelectorAll(".formCheckInput");
  // console.log("checkboxValue >>", checkboxValue);
  const checkedCheckboxes =[]
  for (let i = 0; i < checkboxValue.length; i++) {
    if(checkboxValue[i].checked === true){
      checkedCheckboxes.push(checkboxValue[i].value)
    }
    console.log('checkedCheckboxes :>> ', checkedCheckboxes.length);
  }

  const checkedExperience = characters.filter((characters) => {
    return checkedCheckboxes.includes(characters.status) || (checkedCheckboxes.length == 0)
  })
  console.log("checkedExperience", checkedExperience);
  createCards(checkedExperience);                                                                                                                                                    
};

// FUNCTION FOR GENERATE SEARCH BAR FOR OCCUPATION
const filterBySearchBar = (characters) => {
  console.log("im typing");
  const typeSeachBar = []
  for (let i = 0; i < characters.length; i++) {
    if (typeSeachBar === characters.occupation) {
      //AQUI ME RINDO
    }
  }

  const textSearchBar = characters.filter((characters) => {
    return typeSeachBar.includes(characters.occupation)
  })
  console.log("textSearchBar >>", textSearchBar);
                                                                                                                                                  
};



// EVENT LISTENER
const addEvents = (characters) => {
  document
    .querySelector("#experienceCheckbox")
    .addEventListener("click", (event) => {
      console.log("checkbox worked");
      filterByCheckbox(characters);
    });

  document
    .querySelector("#occupationDropdown")
    .addEventListener("change", (event) => {
      console.log("dropdown worked");
      filterByDropdown(characters);
    });

  document
    .querySelector("#searchInput")
    .addEventListener("keydown", (event) => {
      console.log("searchBar worked");
      filterBySearchBar(characters);
    });
};




// FUNCTION TO REPLACE A FOTO MISSING
const imageError = (characters) => {
  let images = document.querySelectorAll("img");

  for (let i = 0; i < images.length; i++) {
    images.addEventListener("error", function () {
      images.src =
        "https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg";
    });
  }
}


// POPOVER EFFECT BOOTSTRAP
const popoverTriggerList = document.querySelectorAll(
  '[data-bs-toggle="popover"]'
);
const popoverList = [...popoverTriggerList].map(
  (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
);

