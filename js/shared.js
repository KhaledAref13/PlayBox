const apiKey = "AIzaSyAO0XniMK1KU74NONN10qJHUDAy7rTIouQ";
let results = document.querySelector(".results");

function element(tag, className, content) {
  const element = document.createElement(tag);
  if (className) {
    const classes = className.split(" ");
    element.classList.add(...classes);
  }
  if (content) {
    element.textContent = content;
  }
  return element;
}

function loading(wrapper) {
  wrapper.innerHTML = "";
  const loadingWrapper = element("div", "loading-wrapper");
  const ldsRing = element("div", "lds-ring");
  const ldsRingDivs = element("div");
  ldsRing.append(ldsRingDivs);
  loadingWrapper.append(ldsRing);
  wrapper.append(loadingWrapper);
}

function error(wrapper) {
  wrapper.innerHTML = "";
  const errorWrapper = element("div", "error");
  const fourOfour = element("h1", "", "404");
  const errorMessage = element("p");
  errorMessage.textContent =
    "Oops! Something went wrong. Please try again later.";
  errorWrapper.append(fourOfour, errorMessage);
  wrapper.append(errorWrapper);
}
