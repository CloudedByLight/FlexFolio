const mainMenu = document.getElementById("main-menu");
let radioGroups = document.getElementsByClassName("radio-group");
const wrapper = document.getElementById("wrapper");
const identify = document.getElementById("identify");
const b1 = document.getElementById("bubble1");
const b2 = document.getElementById("bubble2");
const b3 = document.getElementById("bubble3");
const bubbles = [b1, b2, b3];
const home = document.getElementById("home");
const visitorSelector = document.getElementById("visitor-selector");
const dropBtn = document.getElementById("dropbtn");
const dropdownContent = document.getElementById("dropdown-content");
const portfolioHR = document.getElementById("portfolio--HR");
const portfolioEng = document.getElementById("portfolio--eng");
const portfolioStranger = document.getElementById("portfolio--stranger");

const combinations = [
  { config: 0, roundness: 0 },
  { config: 1, roundness: 1 },
  { config: 2, roundness: 0 },
  { config: 0, roundness: 1 },
  { config: 1, roundness: 0 },
  { config: 2, roundness: 1 },
];

let index = 0;
let intervalID = null;

mainFormSetUp();
animateBubbleWrapper();

function mainFormSetUp() {
  for (let radioGroup of radioGroups) {
    radioGroup.addEventListener("change", function color() {
      // uncolor all radios
      for (let radioGroup of radioGroups) {
        // remove previously checked elements
        radioGroup.children[0].classList.remove("checked");

        // clone all elements to remove their event listeners
        let newRadioGroup = radioGroup.cloneNode(true);
        radioGroup.parentNode.replaceChild(newRadioGroup, radioGroup);
      }
      // color the checked radio
      if (document.getElementById(this.htmlFor).checked) {
        // check the checkmark
        document
          .getElementById(this.htmlFor)
          .closest("label")
          .children[0].classList.add("checked");

        // pause bubbles animation
        stopRepeating();

        // transition to portfolio animation
        const selectedValue = document.getElementById(this.htmlFor).value;
        transitionToPortfolio(selectedValue, bubbles);
      }
    });
  }
}

function animateBubbleWrapper() {
  const task = () => {
    wrapper.dataset.config = combinations[index].config;
    wrapper.dataset.roundness = combinations[index].roundness;
    index++;

    if (index == 6) {
      index = 0;
    }
  };
  task();

  // Assign the interval ID to a variable so it can be cleared later
  intervalID = setInterval(task, 2000);
}

// Stops repeated execution
function stopRepeating() {
  if (intervalID !== null) {
    clearInterval(intervalID);
    intervalID = null;
    // console.log("Repeated execution has been stopped");
  }
}

// Transitioning from main menu to any portfolio page
function transitionToPortfolio(visitorType, bubbles) {
  // disable scrolling while elements scale
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";

  // remove bubble shadows
  for (let bubble of bubbles) {
    bubble.style.boxShadow = "none";
  }

  /* 
  Chronological Animation Sequence:
  1. adequate bubble covers its container
  2. bubble scales out of its wrapper
  3. identify starts fading out
  4. body's color transitions into bubble's color
  5. identify completes fading out AND scrolling re-enabled
  6. Adequate Portfolio layout appears on screen
  */
  if (visitorType == "recruiter") {
    adjustSelector(dropBtn, dropdownContent, visitorType);
    dropdownSetUp(dropBtn, dropdownContent);

    bubbles[0].classList.add("takeOver");
    setTimeout(() => {
      document.body.style.backgroundColor = "var(--color-HR)";
      setTimeout(() => {
        visitorSelector.style.display = "flex";
        home.style.display = "block";
        setTimeout(() => {
          portfolioHR.style.display = "block";
          portfolioHR.style.animation = "fade-in-up 0.3s ease-in-out forwards";
          visitorSelector.style.opacity = "1";
          home.style.opacity = "1";
        }, 200);
      }, 200);
    }, 700);
  } else if (visitorType == "engineer") {
    adjustSelector(dropBtn, dropdownContent, visitorType);
    dropdownSetUp(dropBtn, dropdownContent);

    bubbles[1].classList.add("takeOver");
    setTimeout(() => {
      document.body.style.backgroundColor = "var(--color-eng)";
      setTimeout(() => {
        visitorSelector.style.display = "flex";
        home.style.display = "block";
        setTimeout(() => {
          portfolioEng.style.display = "block";
          portfolioEng.style.animation = "fade-in-up 0.3s ease-in-out forwards";
          visitorSelector.style.opacity = "1";
          home.style.opacity = "1";
        }, 200);
      }, 200);
    }, 700);
  } else if (visitorType == "stranger") {
    adjustSelector(dropBtn, dropdownContent, visitorType);
    dropdownSetUp(dropBtn, dropdownContent);

    bubbles[2].classList.add("takeOver");
    setTimeout(() => {
      document.body.style.backgroundColor = "var(--color-stranger)";
      setTimeout(() => {
        visitorSelector.style.display = "flex";
        home.style.display = "block";
        setTimeout(() => {
          portfolioStranger.style.display = "block";
          portfolioStranger.style.animation =
            "fade-in-up 0.3s ease-in-out forwards";
          visitorSelector.style.opacity = "1";
          home.style.opacity = "1";
        }, 200);
      }, 200);
    }, 700);
  }

  setTimeout(() => {
    identify.style.animation = "fade-out 0.3s ease-in-out forwards";
  }, 600);
  setTimeout(() => {
    document.documentElement.style.overflow = "auto";
    document.body.style.overflow = "auto";
  }, 950);
  setTimeout(() => {
    mainMenu.style.display = "none";
  }, 900);
}

// adjusts the inner text of the dropdown
function adjustSelector(dropBtn, dropdownContent, visitorType) {
  const visitorTypePossibilities = ["recruiter", "engineer", "stranger"];
  dropBtn.innerText = visitorType;

  for (let i = 0; i < visitorTypePossibilities.length; i++) {
    if (visitorType == visitorTypePossibilities[i]) {
      visitorTypePossibilities.splice(i, 1);
    }
  }

  for (let i = 0; i < dropdownContent.children.length; i++) {
    dropdownContent.children[i].innerText = visitorTypePossibilities[i];
  }
}

// adds the listeners to the dropdown elements
function dropdownSetUp(dropBtn, dropdownContent) {
  for (let i = 0; i < dropdownContent.children.length; i++) {
    dropdownContent.children[i].addEventListener("click", () => {
      let initialPortfolio = dropBtn.innerText;
      let nextPortfolio = dropdownContent.children[i].innerText;
      transitionFromPtoP(initialPortfolio, nextPortfolio);
    });
  }
}

// handles the transition from portfolio to portfolio
function transitionFromPtoP(initialPortfolio, nextPortfolio) {
  adjustSelector(dropBtn, dropdownContent, nextPortfolio);

  let nextBackgroundColor;

  if (initialPortfolio == "recruiter") {
    initialPortfolio = portfolioHR;
  } else if (initialPortfolio == "engineer") {
    initialPortfolio = portfolioEng;
  } else {
    initialPortfolio = portfolioStranger;
  }

  if (nextPortfolio == "recruiter") {
    nextPortfolio = portfolioHR;
    nextBackgroundColor = "var(--color-HR)";
  } else if (nextPortfolio == "engineer") {
    nextPortfolio = portfolioEng;
    nextBackgroundColor = "var(--color-eng)";
  } else {
    nextPortfolio = portfolioStranger;
    nextBackgroundColor = "var(--color-stranger)";
  }

  initialPortfolio.style.animation = "fade-out 0.3s ease-in-out forwards";
  document.body.style.transition = "background-color 1s";
  document.body.style.backgroundColor = nextBackgroundColor;
  setTimeout(() => {
    initialPortfolio.style.display = "none";
    nextPortfolio.style.animation = "fade-in-up 0.3s ease-in-out forwards";
    nextPortfolio.style.display = "block";
  }, 300);
}
