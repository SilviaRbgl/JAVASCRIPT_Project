
///// FETCH THE DATA
const getData = () => {
  fetch("https://www.breakingbadapi.com/api/characters")
    .then((response) => {
      // console.log("response :>> ", response);
      return response.json();
    })
    .then((result) => {
      // console.log("data", result);
      controller(result);
    })
    .catch((error) => console.log(error));
};
getData();


///// 2) CONTROLLER FUNCTION
function controller(result) {
  // create the cards
  createCards(result);
  // dropdown for occupation
  createDropdown(result);
  // checkbox for experience
  createCheckbox(result);
  // add events
  addEvents(result);
  //event more info
  addEventMoreInfo(result);
}


///// CREATE CARDS
function createCards(characters) {
  if (characters.length > 0) {
    hideNotFoundImage();
  }
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
    img.setAttribute("referrerpolicy", "no-referrer");
    img.classList.add("card-img-top");

    let divCardBody = document.createElement("div");
    divCardBody.classList.add("card-body");

    let buttonCard = document.createElement("button");
    buttonCard.innerText = "More info";
    buttonCard.setAttribute("type", "button");
    buttonCard.setAttribute(
      "class",
      "btn btn-dark btn-show-more btn btn-primary"
    );
    buttonCard.setAttribute("data-bs-toggle", "modal");
    buttonCard.setAttribute("data-bs-target", `#exampleModal`);
    buttonCard.setAttribute("id", i);

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


///// EVENT LISTENERS
const addEvents = (characters) => {
  document
    .querySelector("#occupationDropdown")
    .addEventListener("change", (event) => {
      combinedFilters(characters);
    });
  
  document
    .querySelector("#experienceCheckbox")
    .addEventListener("click", (event) => {
      combinedFilters(characters);
    });

  let occupation = "";
  document
    .getElementById("searchInputOccupation")
    .addEventListener("input", (event) => {
      occupation = event.target.value;
      // console.log("occupation :>> ", occupation);
      filterByOccupationSearchBar(characters, occupation);
    });

  document
    .querySelector("#searchInputOccupation")
    .addEventListener("input", (event) => {
      // console.log("searchBar worked");
      filterByOccupationSearchBar(characters, occupation);
    });

  document
    .querySelector("#searchButtonName")
    .addEventListener("click", (event) => {
      let name = document.querySelector("#searchInputName").value;
      filterByNameSearchBar(name);
    },
    { once: true }
  );
  
  document
    .getElementById("btn-show-filters")
    .addEventListener("click", (event) => {
      showMore(characters);
    })
  
  document
    .getElementById("btn-hire")
    .addEventListener("click", (event) => {
    event.target.style.backgroundColor = "#C0B8D9";
    event.target.innerText = "Hired!";
  });

};


///// SEARCH BAR
//////// SEARCH BAR BY OCCUPATION
const filterByOccupationSearchBar = (characters, occupation) => {

  let filteredOccupation = characters.filter((character) => {
    // console.log('character.occupation :>> ', character.occupation);
    //store inside a new array the occupations set to lowecase
    const occupationsArrayLoweCase = character.occupation.map((element) => {
      // console.log("element.toLowerCase() :>> ", element.toLowerCase());
      return element.toLowerCase();
    });
    // we create a new array that contains the joined array...so it behaves as a single word
    // console.log('occupationsArrayLoweCase :>> ', occupationsArrayLoweCase.join(""))
    const joinedOccupationsArrayLoweCase = occupationsArrayLoweCase.join("");
    return joinedOccupationsArrayLoweCase.includes(occupation.toLowerCase());
  });
  console.log("filteredCharacters :>> ", filteredOccupation);

  if (filteredOccupation.length === 0) {
    createNotFoundImage();
  }

  createCards(filteredOccupation);
  addEventMoreInfo(filteredOccupation);
};

//////// SEARCH BAR BY NAME
const filterByNameSearchBar = (name) => {
  console.log("name :>> ", name);

  let url = `https://www.breakingbadapi.com/api/characters?name=${name}`;
  fetch(url)
    .then((response) => response.json())
    .then((newResult) => {
      // fetchController.abort()
      console.log("result live search", newResult);
      // error handling
      if (newResult.length === 0) {
        createNotFoundImage();
      }

      controller(newResult);
    })
    .catch((error) => {
      console.log(error);
    });
};


//////// SHOW/HIDE FILTERS BUTTON
const showMore = (characters) => {
  let showFilters = document.getElementById("filters");
  let btnShowFilters = document.getElementById("btn-show-filters");

  if (showFilters.style.display === "none") {
    btnShowFilters.innerHTML = "Hide filters";
    showFilters.style.display = "block";
  } else {
    showFilters.style.display = "none";
    btnShowFilters.innerHTML = "Show filters";
  }
};

//////// DROPDOWN FOR OCCUPATIONS
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
  // console.log("unique >>>", uniqueOccupations.sort());
  uniqueOccupations.sort().map((occupation) => {
    // console.log('occupation :>> ', occupation);
    let option = document.createElement("option");
    option.innerText = occupation;
    option.value = occupation;

    dropdown.appendChild(option);
  });
};


//////// CHECKBOXES FOR EXPERIENCE
const checkboxes = document.querySelectorAll(".form-check-input");
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


///// COMBINE FILTERS (DROPDOWN and CHECKBOX)
const combinedFilters = (characters) => {
  const dropDrownValue = document.querySelector("#occupationDropdown").value;
  dropDrownValue;

  const checkboxValue = document.querySelectorAll(".formCheckInput");
  const checkedCheckboxes = [];
  for (let i = 0; i < checkboxValue.length; i++) {
    if (checkboxValue[i].checked === true) {
      checkedCheckboxes.push(checkboxValue[i].value);
    }
  }

  const filteredCharacters = characters.filter((characters) => {
    return (
      (characters.occupation.includes(dropDrownValue) ||
        dropDrownValue === "all") &&
      (checkedCheckboxes.includes(characters.status) ||
        checkedCheckboxes.length == 0)
    );
  });

  if (filteredCharacters.length === 0) {
    createNotFoundImage();
  }

  createCards(filteredCharacters);
  addEventMoreInfo(filteredCharacters);
};


///// IMAGE FOR NOT FOUND
//////// CREATE THE IMAGE
const createNotFoundImage = () => {
  let imgNotFound = document.querySelector("#img-not-found");
  imgNotFound.style.display = "block";
};

//////// HIDE THE IMAGE
const hideNotFoundImage = () => {
  let imgNotFound = document.querySelector("#img-not-found");
  imgNotFound.style.display = "none";
};


///// MODAL FOR MORE INFO

function addEventMoreInfo(characters) {
  let btnMoreInfo = document.querySelectorAll(".btn-show-more");
  // console.log('btnMoreInfo :>> ', btnMoreInfo);
  btnMoreInfo.forEach((button) => {
    button.addEventListener("click", (event) => {
      console.log("e.target.id :>> ", event.target.id);
      showModal(characters[event.target.id]);
    });
  });
}

function showModal(character) {
  console.log("character :>> ", character);

  let modalTitle = document.querySelector(".modal-title");
  modalTitle.innerText = character.name;

  let modalBody = document.querySelector(".modal-body");
  modalBody.innerText = "Occupation: " + character.occupation;

  let textModalBody1 = document.createElement("p");
  textModalBody1.innerText = "Working since: " + character.birthday;

  let textModalBody2 = document.createElement("p");
  textModalBody2.innerText = "Fiscal name: " + character.portrayed;

  let textModalBody3 = document.createElement("p");
  textModalBody3.innerText = "User rating: " + character.appearance;

  textModalBody2.appendChild(textModalBody3);
  textModalBody1.appendChild(textModalBody2);
  modalBody.appendChild(textModalBody1);
}