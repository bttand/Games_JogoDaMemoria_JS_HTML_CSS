const cards = [
    "🍕","🍕","🍔","🍔","🌭","🌭","🥓","🥓","🍞","🍞","🥞","🥞","🍖","🍖","🍰","🍰","🍫","🍫"
];
let openCards = [];

function addListenerGameType() {
    document.querySelectorAll(".btn").forEach((type) => {
        type.addEventListener("click", () => {
            if (type.id === "btn-1") {
                localStorage.setItem("gameValue", 1);
            } else if (type.id === "btn-2") {
                localStorage.setItem("gameValue", 2);
            } else if (type.id === "btn-3") {
                localStorage.setItem("gameValue", 3);
            }
        })
    });
    return localStorage.getItem('gameValue');
}

let getGameValue = addListenerGameType();
let timer = 0;

if (getGameValue == 1) {
    timer = 60;
    document.getElementById('timing').textContent = '60';
    function countDown() {
        state.value.currentTime--;
        state.view.timeLeft.textContent = state.value.currentTime;
        if (state.value.currentTime == 0) {
            alert("Você perdeu, tente novamente!!");
            window.location.reload();
        }
    }
} else if (getGameValue == 2) {
    document.getElementById('timing').textContent = '30';
    timer = 40;
    function countDown() {
        state.value.currentTime--;
        state.view.timeLeft.textContent = state.value.currentTime;
        if (state.value.currentTime == 0) {
            alert("Você perdeu, tente novamente!!");
            window.location.reload();
        }
    }
} else if (getGameValue == 3) {
    timer = 0;
    function countDown() {
        state.value.currentTime++;
        state.view.timeLeft.textContent = state.value.currentTime;
    }
}

const state = {
    view: {
        timeLeft: document.querySelector("#timing"),
    },
    value: {
        countDownTimerId: setInterval(countDown, 1000),
        currentTime: timer,
    },
};

let shufflecards = cards.sort(() => (Math.random() > 0.5) ? 2 : -1);

for (let i = 0; i < cards.length; i++) {
    let box = document.createElement("div");
    box.className = "item";
    box.innerHTML = shufflecards[i];
    box.onclick = handleClick;
    document.querySelector(".game").appendChild(box);
}

function handleClick() {
    if (openCards.length < 2) {
        this.classList.add("boxOpen");
        openCards.push(this);
    }
    if (openCards.length == 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    if(openCards[0].innerHTML === openCards[1].innerHTML && openCards[0] !== openCards[1]) {
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
    } else {
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
    }
    openCards = [];
    if (document.querySelectorAll(".boxMatch").length === cards.length) {
        if (getGameValue == 3) {
            alert(`Você levou ${state.value.currentTime} segundos para terminar!!`);
            window.location.href="index.html";
        } else if (getGameValue == 1 || getGameValue == 2) {
            alert("Parabéns, você ganhou!!");
            window.location.href="index.html";
        }
    }
}
