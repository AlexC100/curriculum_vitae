// UI Variables
const UILocation = document.querySelector("#location");
const UIHeader = document.querySelector("#header");
const UIContact = document.querySelector("#contact");
const UILocationAndObjective = document.querySelector(
  "#location-and-objective"
);
const UIContent = document.querySelector("#content");
const UIInput = document.querySelectorAll("input");
const UIContainer = document.querySelector("#content-to-print");
const UIPrint = document.querySelector("#print");

// Location API
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}
function showPosition(position) {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;

  showLocation(lat, long);
}
getLocation();

// Display location with open weather map API
function showLocation(latitude, longitude) {
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=1dc0c6d8ffc55f7d946aadc4ff47209b`
    )
    .then((res) => {
      UILocation.innerText = `${res.data.name}, ${res.data.sys.country}`;
    })
    .catch((err) => console.log(err));
}

// Slide content into place on page load and set input values to progress bar values
window.addEventListener("DOMContentLoaded", () => {
  UIHeader.style.top = 0;
  UIContact.style.left = 0;
  UILocationAndObjective.style.right = 0;
  UIContent.style.left = 0;

  UIInput.forEach((item) => {
    item.setAttribute(
      "value",
      `${item.parentElement.nextElementSibling.value}`
    );
  });
});

// Listen for click event to display category contents
UIContent.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-bars")) {
    e.target.parentElement.parentElement.nextElementSibling.classList.remove(
      "d-none"
    );
    e.target.classList.remove("fa-bars");
    e.target.classList.add("fa-times");
  } else if (e.target.classList.contains("fa-times")) {
    e.target.parentElement.parentElement.nextElementSibling.classList.add(
      "d-none"
    );
    e.target.classList.add("fa-bars");
    e.target.classList.remove("fa-times");
  }

  e.preventDefault();
});

// Change progress bar on input change
UIContent.addEventListener("change", (e) => {
  if (e.target.classList.contains("input-field")) {
    e.target.parentElement.nextElementSibling.setAttribute(
      "value",
      `${e.target.value}`
    );
  }
});

UIPrint.addEventListener("click", (e) => {
  UIPrint.style.right = "-400px";
  UIContainer.classList.remove("mt-5");
  UIContainer.classList.remove("shadow");

  print(UIContainer);

  setTimeout(() => {
    UIPrint.style.right = "20px";
    UIContainer.classList.add("mt-5");
    UIContainer.classList.add("shadow");
  }, 1000);

  e.preventDefault();
});
