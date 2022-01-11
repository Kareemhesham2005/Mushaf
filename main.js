listData();
let pageNum = 1;
let imageNum = 0001;
let audioNum = 001;
let loader = document.querySelector(".loader");

document.querySelector(".next").onclick = () => {
  loader.style.display = "flex";
  pageNum += 1;
  if (pageNum > 1) {
    document.querySelector(".back").classList.add("active");
  }

  if (pageNum + 3 < 10) {
    imageNum = `000${pageNum + 3}`;
  } else if (pageNum + 3 < 100) {
    imageNum = `00${pageNum + 3}`;
  } else if (pageNum + 3 < 1000) {
    imageNum = `0${pageNum + 3}`;
  } else {
    imageNum = pageNum + 3;
  }

  let image = document.querySelector(".img img");

  image.setAttribute(
    "src",
    `https://www.searchtruth.org/quran/images6/${imageNum}.jpg`
  );
  if (pageNum < 10) {
    audioNum = `00${pageNum}`;
  } else if (pageNum < 100) {
    audioNum = `0${pageNum}`;
  } else {
    audioNum = pageNum;
  }

  document
    .querySelector("audio")
    .setAttribute(
      "src",
      `https://www.searchtruth.org/recitation/Abdullah-Basfar-32kbps/page/Page${audioNum}.mp3`
    );
  image.addEventListener("load", () => {
    loader.style.display = "none";
  });
};

document.querySelector(".back").onclick = () => {
  loader.style.display = "flex";
  if (pageNum > 1) {
    pageNum -= 1;
  }
  if (pageNum <= 1) {
    document.querySelector(".back").classList.remove("active");
  }

  if (pageNum + 3 < 10) {
    imageNum = `000${pageNum + 3}`;
  } else if (pageNum + 3 < 100) {
    imageNum = `00${pageNum + 3}`;
  } else if (pageNum + 3 < 1000) {
    imageNum = `0${pageNum + 3}`;
  } else {
    imageNum = pageNum + 3;
  }

  let image = document.querySelector(".img img");

  image.setAttribute(
    "src",
    `https://www.searchtruth.org/quran/images6/${imageNum}.jpg`
  );

  if (pageNum < 10) {
    audioNum = `00${pageNum}`;
  } else if (pageNum < 100) {
    audioNum = `0${pageNum}`;
  } else {
    audioNum = pageNum;
  }

  document
    .querySelector("audio")
    .setAttribute(
      "src",
      `https://www.searchtruth.org/recitation/Abdullah-Basfar-32kbps/page/Page${audioNum}.mp3`
    );

  image.addEventListener("load", () => {
    loader.style.display = "none";
  });
};

let list = document.querySelector(".select ul");
let select = document.querySelector(".selectField");
let selectText = document.querySelector(".selectField p");
let v;
let num;

async function listData() {
  const res = await fetch(`https://api.alquran.cloud/v1/surah`);
  const data = await res.json();
  data.data.forEach((el) => {
    let li = document.createElement("li");
    li.innerHTML = el.name;
    list.appendChild(li);
  });

  let selecLi = document.querySelectorAll(".select ul li");
  selecLi.forEach((li) => {
    li.onclick = () => {
      loader.style.display = "flex";
      selectText.innerHTML = li.textContent;
      data.data.forEach((x) => {
        if (x.name == li.textContent) {
          num = x.number;
          fetch(`https://api.alquran.cloud/v1/surah/${num}`)
            .then((response) => response.json())
            .then((dat) => {
              v = dat.data.ayahs[0].page;
              pageNum = dat.data.ayahs[0].page;
              if (pageNum > 1) {
                document.querySelector(".back").classList.add("active");
              }

              if (pageNum <= 1) {
                document.querySelector(".back").classList.remove("active");
              }

              if (v + 3 < 10) {
                imageNum = `000${v + 3}`;
              } else if (v + 3 < 100) {
                imageNum = `00${v + 3}`;
              } else if (v + 3 < 1000) {
                imageNum = `0${v + 3}`;
              } else {
                imageNum = v;
              }

              let image = document.querySelector(".img img");

              image.setAttribute(
                "src",
                `https://www.searchtruth.org/quran/images6/${imageNum}.jpg`
              );

              if (v < 10) {
                audioNum = `00${v}`;
              } else if (v < 100) {
                audioNum = `0${v}`;
              } else {
                audioNum = v;
              }

              document
                .querySelector("audio")
                .setAttribute(
                  "src",
                  `https://www.searchtruth.org/recitation/Abdullah-Basfar-32kbps/page/Page${audioNum}.mp3`
                );
              image.addEventListener("load", () => {
                loader.style.display = "none";
              });
            });
        }
      });
    };
  });
}

select.onclick = () => {
  list.classList.toggle("hide");
};

window.addEventListener("load", () => {
  document.querySelector(".loader").style.display = "none";
});
