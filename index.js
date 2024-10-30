
window.addEventListener('load', () => {
    failSound.load();
    victorySound.load();
    defeatSound.load();
});

const fetchNums = async () => {
    try {
        const response = await fetch('/rta.json');
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
        return null
    }
}

const main = document.querySelector("#numeros")
const array = []
let trys = 3;
const numeros = fetchNums();

numeros.then(data => {
    data.forEach(element => {
        const div = document.createElement("div")
        div.classList.add("card")
        div.setAttribute("key", element.id)

        const divImg = document.createElement("div")
        divImg.classList.add("card-img")
        divImg.style.backgroundColor = element.color;
        divImg.setAttribute("for", element.id)
        divImg.setAttribute("contenteditable", "true")
        divImg.textContent = ''
        divImg.addEventListener('keypress', (e) => {
            if (!/[0-9]/.test(e.key) || divImg.textContent.length >= 1) {
                e.preventDefault()
                return false
            }
        })

        div.appendChild(divImg)
        main.appendChild(div)
        array.push(element.rta)
    });
})

const showMessage = (message) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = message;
    document.body.appendChild(messageElement);

    setTimeout(() => {
        document.body.removeChild(messageElement);
    }, 5000);
}

const failSound = new Audio('fallo.mp3');

const verificacion = () => {
    const divs = document.querySelectorAll(".card-img");
    let allInputsValid = true;
    const booleans = [];
    let i = 0;

    if (trys == 1) {
        window.location.href = "./derrota.html"
    } else {
        divs.forEach(div => {
            const inputValue = parseFloat(div.textContent);
            if (inputValue === array[i]) {
                booleans.push(array[i]);
            }
            i++;
        });

        if (booleans.length !== 4) {
            failSound.play();
            allInputsValid = false;
            trys--
            showMessage(`Números incorrectos. Te quedan ${trys} intentos. ¡Sigue participando!`);
        }

        return allInputsValid;
    }
}

const button = document.querySelector("button")
button.addEventListener("click", e => {
    e.preventDefault()

    if (verificacion()) {
        window.location.href = "./victoria.html"
    }
})