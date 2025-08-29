let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetBtn");
let newBtn = document.querySelector("#newBtn");
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msg_container");

let turn0 = true;
let count = 0;

let winPtrns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0) {
      box.innerText = "O";
      turn0 = false;
    } else {
      box.innerText = "X";
      turn0 = true;
    }

    box.disabled = true;

    let winner = checkWin();
    count++;
    if (count === 9 && !winner) {
      gameDraw();
    }
  });
});

const resetGame = () => {
  turn0 = true;
  count = 0;
  enableBoxs();
  msgContainer.classList.add("hide");
};

const disableBoxs = () => {
  for (box of boxes) {
    box.disabled = true;
  }
};

const enableBoxs = () => {
  for (box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const gameDraw = () => {
  msg.innerText = "There has been a draw";
  msgContainer.classList.remove("hide");
  disableBoxs();
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations! Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxs();
};

const checkWin = () => {
  for (let ptrn of winPtrns) {
    let pos1Val = boxes[ptrn[0]].innerText;
    let pos2Val = boxes[ptrn[1]].innerText;
    let pos3Val = boxes[ptrn[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
