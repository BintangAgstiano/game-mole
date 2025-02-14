const canvas = document.querySelector('canvas');
const wCanvas = canvas.width = 600
const hCanvas = canvas.height = 600
let timerHtml = document.querySelector('.timer');
let scoreHtml = document.querySelector('.score');
let score = 0
scoreHtml.innerHTML = score
let timer = '30'
timerHtml.innerHTML = `${timer.toString().padStart(2, '0')}`
const ctx = canvas.getContext('2d');
const colVolume = document.querySelectorAll('.col-volume')
let isClickVolume = false
const lineVolume = document.querySelector('.line-volume');
const lineVolumeGameOver = document.querySelector('.line-volume-gameover');
const btnRestart = document.querySelector('.restart');
const audioUtama = document.querySelector('.audio-utama');
const audioTap = document.querySelector('.audio-tap');
const audioGameOver = document.querySelector('.audio-gameover');
const btnBack = document.querySelector('.col-btn-back');
const btnBackLeadeboard = document.querySelector('.col-btn-back-leadeboard');
const colBoxHowToPlay = document.querySelector('.col-box-how-to-play');
const colHowToPlay = document.querySelector('.col-how-to-play');
const colLeadeboard = document.querySelector('.col-leadeboard');
const colBoxLeadeboard = document.querySelector('.col-box-leadeboard');
const lineLeadeboard = document.querySelector('.box-isi-content-leadeboard');
const colBtnSort = document.querySelector('.col-btn-sort');
const exitGame = document.querySelector('.exitGame');
let xFirst
let yFirst
let xClient
let yClient
let btnPlay = document.querySelector('.col-play');
let username = document.querySelector('.username');
let popupScreen = document.querySelector('.popup-screen');
colHowToPlay.addEventListener('click', function () {
    colBoxHowToPlay.style.display = 'flex'
    popupScreen.style.display = 'none'

})
exitGame.addEventListener('click', function () {

    healt = 3
    setTimeout(() => {
        audioUtama.play()
    }, 2000);
    arrTikus = [];
    isClickVolume = true
    lineVolume.style.height = '0px'
    stopIntervalTimer()
    stopIntervalTikus()
    stopIntervalDrawTikus()
    stopIntervalShift()
    popupGameOver.style.display = 'flex'
    popupGameOver.style.display = 'none'
    popupScreen.style.display = 'flex'
    username.value = ''
    cekUsername=false
})
colBtnSort.addEventListener('click', function () {
    let data = JSON.parse(localStorage.getItem('score')) || []
    data.sort((a, b) => b.score - a.score)
    if (data.length > 0) {
        let leaderboardHTML = '';
        data.forEach((item, index) => {
            leaderboardHTML += `
            
            <div class="line-leadeboard">
                <div class="box-angka">${index + 1}</div>
                <h3>${item.username}</h3>
                <div class="col-score-leadeboard">
                    <img src="piala.png" alt="Piala">
                    <div class="text-score-leadeboard">${item.score}</div>
                </div>
            </div>
        `;
        });


        lineLeadeboard.innerHTML = leaderboardHTML;
    }
})
btnBack.addEventListener('click', function () {
    colBoxHowToPlay.style.display = 'none'
    popupScreen.style.display = 'flex'
})
btnBackLeadeboard.addEventListener('click', function () {
    colBoxLeadeboard.style.display = 'none'
    popupScreen.style.display = 'flex'
})
colLeadeboard.addEventListener('click', function () {
    colBoxLeadeboard.style.display = 'flex'
    popupScreen.style.display = 'none'
    let data = JSON.parse(localStorage.getItem('score'))

    if (data.length > 0) {
        let leaderboardHTML = '';
        data.forEach((item, index) => {
            leaderboardHTML += `
            
            <div class="line-leadeboard">
                <div class="box-angka">${index + 1}</div>
                <h3>${item.username}</h3>
                <div class="col-score-leadeboard">
                    <img src="piala.png" alt="Piala">
                    <div class="text-score-leadeboard">${item.score}</div>
                </div>
            </div>
        `;
        });


        lineLeadeboard.innerHTML = leaderboardHTML;

    }
})


let cekUsername
username.addEventListener('change', function () {
    if (username.value == '') {
        cekUsername = false
    } else {
        cekUsername = true
    }
})
btnPlay.addEventListener('click', function () {
    if (cekUsername) {
        popupScreen.style.display = 'none'

        arrTikus = [{ x: xFirst * 200 + gap, y: yFirst * 200 + gap }]

        score = 0
        scoreHtml.innerHTML = score
        healt = 3

        if (healt == 1) {
            healtImg.innerHTML = `<img src="healt.png" width="40" alt="">`

        }
        else if (healt == 2) {
            healtImg.innerHTML = `<img src="healt.png" width="40" alt=""><img src="healt.png" width="40" alt="">`

        }
        else if (healt == 3) {
            healtImg.innerHTML = `<img src="healt.png" width="40" alt=""><img src="healt.png" width="40" alt=""><img src="healt.png" width="40" alt="">`

        }
        else if (healt == 0) {
            healtImg.innerHTML = ''
        }
        timer = '30'
        timerHtml.innerHTML = `${timer.toString().padStart(2, '0')}`
        main()
    }
})

function drawBoardUsername(x, y) {
    ctx.beginPath()
    ctx.fillStyle = "#C18936"
    ctx.strokeStyle = "black"
    ctx.rect(x - 50, y + 130, 150, 30)
    ctx.fill()
    ctx.stroke();

    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(username.value, x - 40, y + 151);


}
setInterval(() => {
    xFirst = Math.floor(Math.random() * 3)
    yFirst = Math.floor(Math.random() * 3)
}, 100);

const popupGameOver = document.querySelector('.popup-gameover');
colVolume[0].addEventListener('click', function () {
    if (isClickVolume) {
        lineVolume.style.height = '80px'
        audioUtama.currentTime = 0
        isClickVolume = false
        audioUtama.pause()
    } else if (!isClickVolume) {
        audioUtama.play()
        lineVolume.style.height = '0px'
        isClickVolume = true

    }

})
colVolume[1].addEventListener('click', function () {
    if (isClickVolume) {
        lineVolumeGameOver.style.height = '80px'
        audioUtama.currentTime = 0
        isClickVolume = false
        audioUtama.pause()
    } else if (!isClickVolume) {
        audioUtama.play()
        lineVolumeGameOver.style.height = '0px'
        isClickVolume = true

    }

})
btnRestart.addEventListener('click', function () {
    popupGameOver.style.display = 'none'

    ctx.clearRect(0, 0, wCanvas, hCanvas)
    drawTikus()
    startIntervalTimer()
    startIntervalTikus()
    startIntervalDrawTikus()
    arrTikus = [{ x: xFirst * 200 + gap, y: yFirst * 200 + gap }]

    score = 0
    scoreHtml.innerHTML = score
    healt = 3

    if (healt == 1) {
        healtImg.innerHTML = `<img src="healt.png" width="40" alt="">`

    }
    else if (healt == 2) {
        healtImg.innerHTML = `<img src="healt.png" width="40" alt=""><img src="healt.png" width="40" alt="">`

    }
    else if (healt == 3) {
        healtImg.innerHTML = `<img src="healt.png" width="40" alt=""><img src="healt.png" width="40" alt=""><img src="healt.png" width="40" alt="">`

    }
    else if (healt == 0) {
        healtImg.innerHTML = ''
    }
    timer = '30'
    timerHtml.innerHTML = `${timer.toString().padStart(2, '0')}`

});
const gap = 25
const wRect = 150
const hRect = 150

const tikusImg = new Image();
tikusImg.src = 'tikus.jpg';
tikusImg.onload = () => {
    drawTikus();
}
let clickPetung = false
const pentungImg = new Image();
if (clickPetung == false) {
    pentungImg.src = 'pentung1.png';
} else {
    pentungImg.src = 'pentung2.png';
}
pentungImg.onload = () => {
    drawPentung();
}
let healt = 3
const healtImg = document.querySelector('.healt')
console.log(healt);
if (healt == 1) {
    healtImg.innerHTML = `<img src="healt.png" width="40" alt="">`

}
else if (healt == 2) {
    healtImg.innerHTML = `<img src="healt.png" width="40" alt=""><img src="healt.png" width="40" alt="">`

}
else if (healt == 3) {
    healtImg.innerHTML = `<img src="healt.png" width="40" alt=""><img src="healt.png" width="40" alt=""><img src="healt.png" width="40" alt="">`

}
else if (healt == 0) {
    healtImg.innerHTML = ''
}

let intervalTikus
let intervalDrawTikus
let intervalShift
let arrTikus = [{ x: xFirst * 200 + gap, y: yFirst * 200 + gap }]
function startIntervalTikus() {
    intervalTikus = setInterval(() => {
        const xRand = Math.floor(Math.random() * 3)
        const yRand = Math.floor(Math.random() * 3)
        const x = xRand * 200 + gap;
        const y = yRand * 200 + gap;
        arrTikus.push({ x: x, y: y });
    }, 700);
    intervalShift = setInterval(() => {
        arrTikus.shift()
    }, 700);
}

function drawTikus() {
    arrTikus.forEach((tikus, i) => {
        ctx.drawImage(tikusImg, tikus.x, tikus.y, 150, 150)
    })
}
function startIntervalDrawTikus() {

    intervalDrawTikus = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBoard()
        drawTikus()
        drawPentung(xClient, yClient)

        drawBoardUsername(xClient, yClient)

    }, 100);
}
function drawBoard() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            ctx.beginPath()
            ctx.fillStyle = 'rgb(105, 79, 47)'
            ctx.rect(j * 200 + gap, i * 200 + gap, wRect, hRect)
            ctx.fill()
        }

    }
}
let intervalTimer
function startIntervalTimer() {
    intervalTimer = setInterval(() => {
        timer--
        timerHtml.innerHTML = `${timer.toString().padStart(2, '0')}`
        if (timer == 0) {
            gameOVer()
            let oldScore = JSON.parse(localStorage.getItem('score')) || [];
            oldScore.push({ score: score, username: username.value })
            if (oldScore) {
                localStorage.setItem('score', JSON.stringify(oldScore));
            }
        }
    }, 1000);
}
function drawPentung(x, y) {
    ctx.clearRect(0, 0, wCanvas, hCanvas);
    drawBoard();
    drawTikus();
    ctx.drawImage(pentungImg, x - 80, y - 80, 200, 200);
}
function update(e) {
    audioTap.currentTime = 0
    audioTap.play()
    clickPetung = true
    if (clickPetung == false) {
        pentungImg.src = 'pentung1.png';
    } else {
        pentungImg.src = 'pentung2.png';
        setTimeout(() => {
            clickPetung = false
            pentungImg.src = 'pentung1.png';

        }, 200);
    }
    let xClient = e.clientX - canvas.getBoundingClientRect().left
    let yClient = e.clientY - canvas.getBoundingClientRect().top
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (xClient > j * 200 + gap && xClient < j * 200 + gap + wRect && yClient > i * 200 + gap && yClient < i * 200 + gap + hRect) {
                arrTikus.forEach(tikus => {
                    if (xClient > tikus.x && xClient < tikus.x + wRect && yClient > tikus.y && yClient < tikus.y + hRect) {
                        score += 1
                        scoreHtml.innerHTML = score

                    } else {
                        healt -= 1
                        if (healt == 1) {
                            healtImg.innerHTML = `<img src="healt.png" width="40" alt="">`

                        }
                        else if (healt == 2) {
                            healtImg.innerHTML = `<img src="healt.png" width="40" alt=""><img src="healt.png" width="40" alt="">`

                        }
                        else if (healt == 3) {
                            healtImg.innerHTML = `<img src="healt.png" width="40" alt=""><img src="healt.png" width="40" alt=""><img src="healt.png" width="40" alt="">`

                        }
                        else if (healt == 0) {
                            healtImg.innerHTML = ''
                        }
                        if (healt === 0) {
                            gameOVer()
                            let oldScore = JSON.parse(localStorage.getItem('score')) || [];
                            oldScore.push({ score: score, username: username.value })
                            if (oldScore) {
                                localStorage.setItem('score', JSON.stringify(oldScore));
                            }

                        }
                    }
                })
            }
        }
    }
}
function stopIntervalTimer() {
    clearInterval(intervalTimer)
}
function stopIntervalTikus() {
    clearInterval(intervalTikus)
}
function stopIntervalDrawTikus() {
    clearInterval(intervalDrawTikus)
}
function stopIntervalShift() {
    clearInterval(intervalShift)
}
function gameOVer() {
    audioGameOver.currentTime = 0
    audioGameOver.play()
    audioUtama.pause()
    setTimeout(() => {
        audioUtama.play()
    }, 2000);
    arrTikus = [];
    isClickVolume = true
    lineVolume.style.height = '0px'
    stopIntervalTimer()
    stopIntervalTikus()
    stopIntervalDrawTikus()
    stopIntervalShift()
    popupGameOver.style.display = 'flex'

}
function main() {
    ctx.clearRect(0, 0, wCanvas, hCanvas)
    canvas.addEventListener('mousemove', (e) => {
        xClient = e.clientX - canvas.getBoundingClientRect().left;
        yClient = e.clientY - canvas.getBoundingClientRect().top;
        drawPentung(xClient, yClient);
        drawBoardUsername(xClient, yClient)

    });
    startIntervalTimer()
    drawBoard()
    drawTikus()
    startIntervalTikus()
    startIntervalDrawTikus()
    canvas.addEventListener('mouseup', update);
}
// main()