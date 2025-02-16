const fotoCumputer = document.querySelector(".areaCom img");
const pilihanPlayer = document.querySelectorAll(".areaPlayer ul img");
const info = document.querySelector(".info");
const tombol = document.getElementById("tombol");
// const hasilPlayer = document.getElementById("hasilPlayer");
// const hasilCom = document.getElementById("hasilCom");
const gambar = ["gunting", "batu", "kertas"];
let indexGambar = 0;
let scorePlayer = 0;
let scoreCom = 0;
let sedangBermain = false;
let pilPlayer;

//Menambahkan event pada setiap foto
pilihanPlayer.forEach(function (pil, index) {
  pil.parentElement.addEventListener("click", function () {
    pilPlayer = gambar[index];
    pilihanPlayer.forEach(function (element) {
      if (sedangBermain) {
        element.parentElement.style.transform = "scale(1)";
        element.className = "gambar";
      }
    });
    if (sedangBermain) {
      pil.parentElement.style.transform = "scale(1.1)";
      pil.classList.add("terpilih");
    }
  });
});
// event untuk tombol
tombol.addEventListener("click", function () {
  if (!sedangBermain) {
    main();
  }
});
// program utama,main page
function main() {
  tombol.style.opacity = "0";
  setTimeout(function () {
    tombol.style.backgroundImage = "url(gambar/reload.png)";
  }, 2000);
  sedangBermain = true;
  pilPlayer = undefined;
  // untuk setiap foto classnya jadi gambar dan menghilangkan tanda kali pd setiap foto
  pilihanPlayer.forEach(function (element) {
    element.className = "gambar";
    element.previousElementSibling.style.opacity = "0";
    element.parentElement.style.transform = "scale(1)";
  });
  const waktuMulai = new Date().getTime();
  const mulai = setInterval(function () {
    fotoCumputer.setAttribute("src", `gambar/${gambar[indexGambar++]}.jpg`);
    info.innerHTML = Math.floor((new Date().getTime() - waktuMulai) / 1000) + 1;
    if (indexGambar == 3) indexGambar = 0;
    if (new Date().getTime() - waktuMulai >= 3000) {
      const pCom = pilihanCom();
      const pPlayer = pilPlayer;
      fotoCumputer.setAttribute("src", `gambar/${pCom}.jpg`);
      info.innerHTML = hasil(pPlayer, pCom);
      tombol.style.opacity = "1";
      if (hasil(pPlayer, pCom) === "WIN") {
        scorePlayer++;
        menang(scorePlayer, hasilPlayer);
      } else if (hasil(pPlayer, pCom) === "DEFEAT") {
        scoreCom++;
        menang(scoreCom, hasilCom);
      } else if (hasil(pPlayer, pCom) === "DRAW") {
        menang(scorePlayer, hasilPlayer, hasilCom);
      }
      sedangBermain = false;
      clearInterval(mulai);
    }
  }, 100);
}

function menang(score, element) {
  for (let i = 1; i < arguments.length; i++) {
    arguments[i].style.fontSize = "2.5rem";
    arguments[i].style.color = "red";
  }
  arguments[1].innerHTML = score;
  let argumen = arguments;
  setTimeout(function () {
    for (let i = 1; i < argumen.length; i++) {
      argumen[i].style.fontSize = "1.5rem";
      argumen[i].style.color = "#A737FF";
    }
  }, 500);
}
function pilihanCom() {
  var com = Math.random();
  if (com < 0.34) return "kertas";
  if (com > 0.34 && com < 0.68) return "batu";
  return "gunting";
}
function hasil(p, com) {
  if (p === com) {
    return "DRAW";
  } else if (p === "gunting") {
    return com === "kertas" ? "WIN" : "DEFEAT";
  } else if (p === "kertas") {
    return com === "batu" ? "WIN" : "DEFEAT";
  } else if (p === "batu") {
    return com === "gunting" ? "WIN" : "DEFEAT";
  } else {
    pilihanPlayer.forEach(function (e) {
      e.previousElementSibling.style.opacity = "1";
      e.parentElement.style.transform = "scale(.9)";
    });
    return "DEFEAT";
  }
}
