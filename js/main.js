let searchBtn = document.querySelector(".search-btn");
let searchBar = document.querySelector(".search-bar");
searchBtn.addEventListener("click", () => {
  searchBar.classList.toggle("visible");
  results.classList.toggle("move");
});

loading(results);

window.addEventListener("load", () => {
  fetch(
    `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=snippet,contentDetails,statistics&type=video&chart=mostPopular&maxResults=40`
  )
    .then((response) => response.json())
    .then((data) => {
      resultsElements("Most Popular", data);
    })
    .catch((e) => error(results));
});

let search = document.querySelector(".search");
search.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (search.value.trim()) {
      loading(results);
      fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&type=video&q=${search.value.trim()}&maxResults=40`
      )
        .then((response) => response.json())
        .then((data) => {
          resultsElements("Results", data);
        })
        .catch((e) => error(results));
      searchBar.classList.remove("visible");
      results.classList.remove("move");
      search.value = "";
    }
  }
});

const resultsElements = (sectionTitle, data) => {
  results.innerHTML = "";
  const sectionTitleContainer = element("div", "container");
  const sectionTitleHeading = element("h1", "main-title", sectionTitle);
  sectionTitleContainer.append(sectionTitleHeading);
  results.append(sectionTitleContainer);
  const videosContainer = element("div", "container");
  return data.items.map((e) => {
    const videoBox = element("div", "box");
    videoBox.addEventListener("click", (event) => {
      event.preventDefault();
      navigateWithData("../html/video.html", { id: e.id.videoId || e.id });
    });
    videosContainer.append(videoBox);
    const videoImage = element("img");
    videoImage.setAttribute("src", e.snippet.thumbnails.high.url);
    videoImage.setAttribute("alt", e.snippet.title);
    videoBox.append(videoImage);
    const videoContent = element("div", "content");
    videoBox.append(videoContent);
    const videoDescription = element(
      "p",
      "description",
      `${e.snippet.title.toLowerCase().slice(0, 40)}...`
    );
    videoContent.append(videoDescription);
    const videochannel = element("p", "channel", e.snippet.channelTitle);
    videoContent.append(videochannel);
    results.append(videosContainer);
  });
};

function navigateWithData(pageUrl, data) {
  const params = new URLSearchParams(data).toString();
  window.location.href = `${pageUrl}?${params}`;
}
