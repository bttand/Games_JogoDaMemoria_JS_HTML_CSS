const emojis = [
    "🍕","🍕","🍔","🍔","🌭","🌭","🥓","🥓","🥨","🥨","🍞","🍞","🥞","🥞","🍖","🍖","🍰","🍰","🍫","🍫"
];
let openCards = [];

function addListenerDiff() {
    document.querySelectorAll(".reset-menu").forEach((diff) => {
        diff.addEventListener("mousedown", () => {
            if (diff.id === "btn-1") {
                localStorage.setItem("diffValue", 1);
            } else if (diff.id === "btn-2") {
                localStorage.setItem("diffValue", 2);
            } else if (diff.id === "btn-3") {
                localStorage.setItem("diffValue", 3);
            }
        })
    });
    return localStorage.getItem('diffValue');
}

let getValueDiff = addListenerDiff();
let timer = 0;

if (getValueDiff == 1) {
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
} else if (getValueDiff == 2) {
    document.getElementById('timing').textContent = '40';
    timer = 40;
    function countDown() {
        state.value.currentTime--;
        state.view.timeLeft.textContent = state.value.currentTime;
        if (state.value.currentTime == 0) {
            alert("Você perdeu, tente novamente!!");
            window.location.reload();
        }
    }
} else if (getValueDiff == 3) {
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

let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5) ? 2 : -1);

for (let i = 0; i < emojis.length; i++) {
    let box = document.createElement("div");
    box.className = "item";
    box.innerHTML = shuffleEmojis[i];
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
    if (document.querySelectorAll(".boxMatch").length === emojis.length) {
        if (getValueDiff == 3) {
            alert(`Você levou ${state.value.currentTime} segundos para terminar`);
            window.location.href="index.html";
        } else if (getValueDiff == 1 || getValueDiff == 2) {
            alert("Parabéns, você ganhou!!");
            window.location.href="index.html";
        }
    }
}
