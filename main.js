listData();
let pageNum = 1;
let imageNum = 001;

document.querySelector(".next").onclick = () => {
  pageNum += 1;
  if (pageNum > 1) {
    document.querySelector(".back").classList.add("active");
  }

  if (pageNum < 10) {
    imageNum = "00" + pageNum;
  } else if (pageNum < 100) {
    imageNum = `0${pageNum}`;
  } else {
    imageNum = pageNum;
  }

  let image = document.querySelector(".img img");

  image.setAttribute(
    "src",
    `https://www.searchtruth.org/quran/images1/${imageNum}.jpg`
  );
};

document.querySelector(".back").onclick = () => {
  if (pageNum > 1) {
    pageNum -= 1;
  }
  if (pageNum <= 1) {
    document.querySelector(".back").classList.remove("active");
  }

  if (pageNum < 10) {
    imageNum = `00${pageNum}`;
  } else if (pageNum < 100) {
    imageNum = `0${pageNum}`;
  } else {
    imageNum = pageNum;
  }

  let image = document.querySelector(".img img");

  image.setAttribute(
    "src",
    `https://www.searchtruth.org/quran/images1/${imageNum}.jpg`
  );
};

async function getSurah(name) {
  const res = await fetch("https://api.alquran.cloud/v1/surah");
  const data = await res.json();

  let surahNum = 1;
  data.data.forEach((el) => {
    if (name == el.name) {
      surahNum = el.number;
    } else if (name == el.englishName) {
      surahNum = el.number;
    }
  });

  if (surahNum < 10) {
    imageNum = `00${surahNum}`;
  } else if (surahNum < 100) {
    imageNum = `0${surahNum}`;
  } else {
    imageNum = surahNum;
  }

  let image = document.querySelector(".img img");

  image.setAttribute(
    "src",
    `https://www.searchtruth.org/quran/images1/${imageNum}.jpg`
  );
}

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
      selectText.innerHTML = li.textContent;
      data.data.forEach((x) => {
        if (x.name == li.textContent) {
          num = x.number;
          fetch(`https://api.alquran.cloud/v1/surah/${num}`)
            .then((response) => response.json())
            .then((dat) => {
              v = dat.data.ayahs[0].page;
              console.log(v);
              pageNum = dat.data.ayahs[0].page;
              if (pageNum > 1) {
                document.querySelector(".back").classList.add("active");
              }

              if (pageNum <= 1) {
                document.querySelector(".back").classList.remove("active");
              }

              if (v < 10) {
                imageNum = `00${v}`;
              } else if (v < 100) {
                imageNum = `0${v}`;
              } else {
                imageNum = v;
              }

              let image = document.querySelector(".img img");

              image.setAttribute(
                "src",
                `https://www.searchtruth.org/quran/images1/${imageNum}.jpg`
              );
            });
        }
      });
    };
  });
}

select.onclick = () => {
  list.classList.toggle("hide");
};
