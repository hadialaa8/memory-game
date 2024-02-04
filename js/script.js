let start = document.getElementById("start");
let succes = document.getElementById("succes");
let fail = document.getElementById("fail");
let player = document.querySelector(".name #name");
let tries = document.querySelector(".tries span");
let duration = 1000;
let blocksContainer = document.querySelector(".game-blocks");
let gameblock = Array.from(blocksContainer.children);
let orderRange = [...Array(gameblock.length).keys()];
/////////////////////////start button///////////////////////////
start.onclick = function () {
  let x = window.prompt("ENTER YOUR NAME");
  if (x == "" || x == null) {
    player.innerHTML = "noob";
  } else {
    player.innerHTML = x;
  }
  document.querySelector(".splash-face").remove();
};
/////////////////////Add order property///////////////////////////////
shuffle(orderRange);
gameblock.forEach(function (block, index) {
  block.style.order = orderRange[index];
  block.addEventListener("click", function () {
    isflipped(block);
  });
});
/////////////////////flipping the cards///////////////////////////////

function isflipped(f) {
  f.classList.add("is-flipped");

  let flippedcards = gameblock.filter(function (ele) {
    return ele.classList.contains("is-flipped");
  });
  if (flippedcards.length % 2 == 0) {
    stopClicking();
    matchingBlocks(flippedcards[0], flippedcards[1])
  }
}
/////////////////////shuffle cards///////////////////////////////
function shuffle(z) {
  length = z.length;
  var random;
  var temp;
  while (length > 0) {
    random = Math.floor(Math.random() * length);
    length--;
    temp = z[length];
    z[length] = z[random];
    z[random] = temp;
  }
  return z;
}
/////////////////////stop clicking function///////////////////////////////
function stopClicking() {
  blocksContainer.classList.add("stop-flipp");
  setTimeout(function () {
    blocksContainer.classList.remove("stop-flipp");
  }, duration);
}
/////////////////////check matching cards///////////////////////////////
function matchingBlocks(firstBLOCK, secondBLOCK) {
  if (firstBLOCK.dataset.technology == secondBLOCK.dataset.technology) {
    firstBLOCK.classList.remove("is-flipped");
    secondBLOCK.classList.remove("is-flipped");

    firstBLOCK.classList.add("match");
    secondBLOCK.classList.add("match");
    succes.play()
  } else {
    tries.innerHTML= parseInt(tries.innerHTML) +1;
    setTimeout(function () {
      firstBLOCK.classList.remove("is-flipped");
      secondBLOCK.classList.remove("is-flipped");
    }, duration);
    fail.play()
    if(tries.innerHTML>10){
      player.innerHTML="pro noob"
    }
    if(tries.innerHTML>15){
      player.innerHTML="pro max noob"
    }
    if(tries.innerHTML>20){
      window.alert("YOU ARE BAD IN THIS GAME")
    }

  }
}
