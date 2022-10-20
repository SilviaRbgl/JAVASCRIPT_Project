// console.log("data >>>", data);
// console.log("occupation >>>", data[0].occupation);
// for (let i = 0; i < data.length; i++) {
//     console.log("status >>>", data[i].status);
// }

// let fetchController = new AbortController();
//   const signal = fetchController.signal;

//#region > FETCHING THE DATA
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
//#endregion

//#region > CONTROLLER FUNCTION
function controller(result) {
  // create the cards
  createCards(result);
  // dropdown occupations
  createDropdown(result);
  // checkbox experience
  createCheckbox(result);
  // add events
  addEvents(result);
  //event more info
  addEventMoreInfo(result);
}
//#endregion

//#region > CREATE CARDS
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
    img.setAttribute("style", "width: 16rem;");
    img.setAttribute("style", "height: 22rem;");
    img.setAttribute("referrerpolicy", "no-referrer");
    img.classList.add("card-img-top");
    // console.log(i, data[i].name, img);

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
    buttonCard.setAttribute("data-bs-target", `#exampleModal`); // template literal
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
//#endregion

//#region > EVENT LISTENERS
const addEvents = (characters) => {
  document
    .querySelector("#experienceCheckbox")
    .addEventListener("click", (event) => {
      console.log("checkbox worked");
      // filterByCheckbox(characters);
      combinedFilters(characters);
    });

  document
    .querySelector("#occupationDropdown")
    .addEventListener("change", (event) => {
      console.log("dropdown worked");
      // filterByDropdown(characters);
      combinedFilters(characters);
    });

  let occupation = "";
  document
    .getElementById("searchInputOccupation")
    .addEventListener("input", (event) => {
      occupation = event.target.value;
      console.log("occupation :>> ", occupation);
      filterByOccupationSearchBar(characters, occupation);
    });

  document
    .querySelector("#searchInputOccupation")
    .addEventListener("input", (event) => {
      // console.log("searchBar worked");
      // console.log("esto es lo que mando al filter by occupation", occupation);
      filterByOccupationSearchBar(characters, occupation);
    });

  document
    .querySelector("#searchButtonName")
    .addEventListener("click", (event) => {
      console.log(event);
      let name = document.querySelector("#searchInputName").value;
      // console.log("value", value);
      // name = event.target.value;
      console.log("event added to search button");
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
//#endregion


//#region > SHOW/HIDE FILTERS BUTTON

const showMore = (characters) => {
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
};
//#endregion

//#region > DROPDOWN FOR OCCUPATIONS
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
//#endregion

//#region > FILTERS FOR DROPDOWN
// const filterByDropdown = (characters) => {
//   // console.log("dropdoweddddd");
//   const dropDrownValue = document.querySelector("#occupationDropdown").value;
//   dropDrownValue;
//   // console.log("dropDrownValue", dropDrownValue);

//   const filteredOccupation = characters.filter((characters) => {
//     return (
//       characters.occupation.includes(dropDrownValue) || dropDrownValue === "all"
//     );
//   });
//   // console.log("filteredOccupation", filteredOccupation);
//   // createCards(filteredOccupation);
//   createCards(filteredOccupation);
// };
//#endregion

//#region > CHECKBOXES FOR EXPERIENCE
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
//#endregion

//#region > FILTERS FOR CHECKBOXES
// const filterByCheckbox = (characters) => {
//   // console.log("its checked");

//   const checkboxValue = document.querySelectorAll(".formCheckInput");
//   // console.log("checkboxValue >>", checkboxValue);
//   const checkedCheckboxes = [];
//   for (let i = 0; i < checkboxValue.length; i++) {
//     if (checkboxValue[i].checked === true) {
//       checkedCheckboxes.push(checkboxValue[i].value);
//     }
//     // console.log("checkedCheckboxes :>> ", checkedCheckboxes.length);
//   }

//   const checkedExperience = characters.filter((characters) => {
//     return (
//       checkedCheckboxes.includes(characters.status) ||
//       checkedCheckboxes.length == 0
//     );
//   });
//   // console.log("checkedExperience", checkedExperience);
//   createCards(checkedExperience);
// };
//#endregion

//#region COMBINED FILTERS
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

  // createNotFoundImage();
  createCards(filteredCharacters);
  addEventMoreInfo(filteredCharacters);
  // controller(filteredCharacters);
};
//#endregion

//#region > SEARCH BAR FOR OCCUPATION
const filterByOccupationSearchBar = (characters, occupation) => {
  // console.log("occupation inside filter :>> ", occupation);

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
  // controller(filteredOccupation);
};

const filterByNameSearchBar = (name) => {
  console.log("name :>> ", name);

  // if (name === "") {
  //   alert("please type a name")
  // }
  // let fetchController = new AbortController();
  // const signal = fetchController.signal;
  let url = `https://www.breakingbadapi.com/api/characters?name=${name}`;
  // setTimeout(() => fetchController.abort(), 1000);
  fetch(url)
    .then((response) => response.json())
    .then((newResult) => {
      // fetchController.abort()
      console.log("result live search", newResult);
      // error handling
      if (newResult.length === 0) {
        createNotFoundImage();
      }

      // createCards(newResult);
      controller(newResult);
    })
    .catch((error) => {
      console.log(error);
    });
};

//#endregion

//#region CREATE IMAGE NOT FOUND
const createNotFoundImage = () => {
  let imgNotFound = document.querySelector("#img-not-found");
  imgNotFound.style.display = "block";
};

const hideNotFoundImage = () => {
  let imgNotFound = document.querySelector("#img-not-found");
  imgNotFound.style.display = "none";
};
//#endregion

//#region > MODAL FOR MORE INFO

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
// console.log("showModal", showModal);
//#endregion
