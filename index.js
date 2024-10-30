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
let trys = 2;
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
        const input = document.createElement("input")
        input.id = element.id
        input.type = "number"
        input.maxLength = 10
        input.minLength = 1

        // Agregar el evento input
        input.addEventListener('input', (e) => {
            divImg.textContent = e.target.value || ''; // Si no hay valor, muestra string vacío
        });

        div.appendChild(divImg)
        div.appendChild(input)
        main.appendChild(div)
        array.push(element.rta)
    });

})

const verificacion = () => {
    const inputs = document.querySelectorAll("input");
    let allInputsValid = true; // Variable para verificar si todos los inputs son válidos
    const booleans = [];
    let i = 0;
    if (trys == 0) {
        window.location.href = "./derrota.html"
    } else {
        inputs.forEach(input => {


            const inputValue = parseFloat(input.value);

            if (inputValue > 10) {
                alert("Pista: Hay que ingresar números menores a 2*5");
                allInputsValid = false;
                return allInputsValid;
            }

            if (inputValue === array[i]) {
                booleans.push(array[i]);
            }
            i++;
        });

        if (booleans.length !== 4) {
            allInputsValid = false;
            trys--
            alert("Números incorrectos, prueba de nuevo")
        }

        console.log(booleans);
        console.log(allInputsValid);

        return allInputsValid;
    }

}


const button = document.querySelector("button")
button.addEventListener("click", e => {
    e.preventDefault()

    if (verificacion()) {
        window.location.href = "./victoria.html"
    }

}
)

