let movieReq = new XMLHttpRequest();
let data = [];
let chckpass;
let chcknameVal = false;
let chckemailVal = false;
let chckphoneVal = false;
let chckageVal = false;
let chckpassVal = false;
let chckrePassVal = false;
let menuWidth = $("#menu").outerWidth();
let choice = "now_playing";
let trend =
  "https://api.themoviedb.org/3/trending/all/day?api_key=8b1eee196752d07538b04497121e46e5";
function displayMovies() {
  let temp = ``;
  for (let i = 0; i < data.length; i++) {
    temp += `<div class="col-lg-4 col-md-6 p-3">
  <div class="movieInfo">
    <div class="imgCon">
      <img src="https://image.tmdb.org/t/p/w500${data[i].poster_path}" class="img-fluid  rounded" />
    </div>
    <div class="infoLayer text-center d-flex align-items-center">
      <div class="info">
        <h2>${data[i].original_title}</h2>
        <p>
          ${data[i].overview}
        </p>
        <p>${data[i].vote_average}</p>
        <p>${data[i].release_date}</p>
      </div>
    </div>
  </div>
</div>`;
  }
  document.getElementById("display").innerHTML = temp;
}

function getChoice(choice) {
  movieReq.open(
    "GET",
    `https://api.themoviedb.org/3/movie/${choice}?api_key=8b1eee196752d07538b04497121e46e5&language=en-US&page=1`
  );

  movieReq.send();
  movieReq.onreadystatechange = function() {
    if (movieReq.readyState == 4 && movieReq.status == 200) {
      data = JSON.parse(movieReq.response).results;
    }
    displayMovies();
  };
}

getChoice(choice);

$(".choose").click(function() {
  choice = $(this).data("value");
  getChoice(choice);
});
$("#trend").click(function() {
  movieReq.open("GET", trend);

  movieReq.send();
  movieReq.onreadystatechange = function() {
    if (movieReq.readyState == 4 && movieReq.status == 200) {
      data = JSON.parse(movieReq.response).results;
    }
    displayMovies();
  };
});

function searchMovie(key) {
  let temp = ``;
  for (let i = 0; i < data.length; i++) {
    if (data[i].original_title.toLowerCase().includes(key.toLowerCase())) {
      temp += `<div class="col-lg-4 col-md-6 p-3">
  <div class="movieInfo">
    <div class="imgCon">
      <img src="https://image.tmdb.org/t/p/w500${data[i].poster_path}" class="img-fluid  rounded" />
    </div>
    <div class="infoLayer text-center d-flex align-items-center">
      <div class="info">
        <h2>${data[i].original_title}</h2>
        <p>
          ${data[i].overview}
        </p>
        <p>${data[i].vote_average}</p>
        <p>${data[i].release_date}</p>
      </div>
    </div>
  </div>
</div>`;
    }
  }
  document.getElementById("display").innerHTML = temp;
}

function nameVal(name) {
  let regex = /^[A-z]{2,} [A-z]{2,}/;
  if (regex.test(name) == false) {
    document.getElementById("nameInp").classList.add("is-invalid");
    document.getElementById("name").classList.remove("d-none");
  } else {
    document.getElementById("nameInp").classList.remove("is-invalid");
    document.getElementById("nameInp").classList.add("is-valid");
    document.getElementById("name").classList.add("d-none");
    chcknameVal = true;
  }
}

function emailVal(email) {
  let regex = /^([A-z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  if (regex.test(email) == false) {
    document.getElementById("emailInp").classList.add("is-invalid");
    document.getElementById("email").classList.remove("d-none");
  } else {
    document.getElementById("emailInp").classList.remove("is-invalid");
    document.getElementById("emailInp").classList.add("is-valid");
    document.getElementById("email").classList.add("d-none");
    chckemailVal = true;
  }
}

function phoneVal(phone) {
  let regex = /^01(0|1|2|5)[0-9]{8}$/;
  if (regex.test(phone) == false) {
    document.getElementById("phoneInp").classList.add("is-invalid");
    document.getElementById("phone").classList.remove("d-none");
  } else {
    document.getElementById("phoneInp").classList.remove("is-invalid");
    document.getElementById("phoneInp").classList.add("is-valid");
    document.getElementById("phone").classList.add("d-none");
    chckphoneVal = true;
  }
}

function ageVal(age) {
  let regex = /(1[8-9]|[2-9][0-9]|100)$/;
  if (regex.test(age) == false) {
    document.getElementById("ageInp").classList.add("is-invalid");
    document.getElementById("age").classList.remove("d-none");
  } else {
    document.getElementById("ageInp").classList.remove("is-invalid");
    document.getElementById("ageInp").classList.add("is-valid");
    document.getElementById("age").classList.add("d-none");
    chckageVal = true;
  }
}

function passVal(pass) {
  let regex = /(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})/;
  chckpass = pass;
  if (regex.test(pass) == false) {
    document.getElementById("passInp").classList.add("is-invalid");
    document.getElementById("pass").classList.remove("d-none");
  } else {
    document.getElementById("passInp").classList.remove("is-invalid");
    document.getElementById("passInp").classList.add("is-valid");
    document.getElementById("pass").classList.add("d-none");
    chckpassVal = true;
  }
}

function rePassword(rePass) {
  if (rePass !== chckpass) {
    document.getElementById("rePassInp").classList.add("is-invalid");
    document.getElementById("rePass").classList.remove("d-none");
  } else if (rePass == chckpass) {
    document.getElementById("rePassInp").classList.remove("is-invalid");
    document.getElementById("rePassInp").classList.add("is-valid");
    document.getElementById("rePass").classList.add("d-none");
    chckrePassVal = true;
  }
}
function enableBtn() {
  if (
    chcknameVal == true &&
    chckemailVal == true &&
    chckphoneVal == true &&
    chckageVal == true &&
    chckpassVal == true &&
    chckrePassVal == true
  ) {
    document.getElementById("submit").removeAttribute("disabled");
  }
}
function submit() {
  document.getElementById("subMess").classList.remove("d-none");
}
function addRemove() {
  $("#li-1").toggleClass("li-anim-1 li-rev-1");
  $("#li-2").toggleClass("li-anim-2 li-rev-2");
  $("#li-3").toggleClass("li-anim-3 li-rev-3");
  $("#li-4").toggleClass("li-anim-4 li-rev-4");
  $("#li-5").toggleClass("li-anim-5 li-rev-5");
  $("#li-6").toggleClass("li-anim-6 li-rev-6");
  $("#openMenu").toggleClass("fa fa-align-justify far fa-times-circle");
}

$("#openMenu").click(function() {
  if ($("#side-bar").css("left") == "0px") {
    $("#side-bar").animate({ left: `-${menuWidth}px` }, 500);
    addRemove();
  } else {
    $("#side-bar").animate({ left: `0px` }, 500);
    addRemove();
  }
});

$(document).ready(function() {
  $(".onReady").fadeOut(1000, function() {
    $("body").css("overflow", "auto");
  });
});
