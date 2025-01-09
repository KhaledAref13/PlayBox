const id = JSON.parse(localStorage.getItem("id"));
const video = document.querySelector(".video");

loading(video);

window.addEventListener("load", () => {
  fetch(
    `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=snippet,contentDetails,statistics&id=${id}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      videoElement(data);
    })
    .catch((e) => error(video));
});

const videoElement = (data) => {
  video.innerHTML = "";
  document.title = data.items[0].snippet.title;
  const iframeTag = element("iframe");
  iframeTag.setAttribute(
    "src",
    `https://www.youtube.com/embed/${data.items[0].id}`
  );
  iframeTag.setAttribute("title", "YouTube video player");
  iframeTag.setAttribute("frameborder", "0");
  iframeTag.setAttribute(
    "allow",
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  );
  iframeTag.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
  iframeTag.setAttribute("allowfullscreen", "");
  video.append(iframeTag);
  const videoTitle = element("p", "video-title");
  videoTitle.textContent = data.items[0].snippet.title;
  video.append(videoTitle);
  const videoChannel = element("p", "video-channel");
  videoChannel.textContent = data.items[0].snippet.channelTitle;
  video.append(videoChannel);
};
