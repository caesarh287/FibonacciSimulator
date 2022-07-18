const prefix = "http://localhost:5050/"

const clear = (id) => { setTimeout(()=>{
    document.getElementById(id).style.display="none";
},1500)}

document.getElementById("calculateBtn").addEventListener("click", () => {
    calculate();
})

window.addEventListener("load",()=>{
    fetchCalculations();
})

function calculateAndSave() {
    document.getElementById("spinner").style.display = "inline"
    const index = document.getElementById("index-input").value
    if (index > 50) {
        document.getElementById("error-box").style.display = "inline"
        document.getElementById("spinner").style.display = "none"
        clear("error-box");
    }
    else {
        fetch(prefix + `fibonacci/${index}`)
            .then((res) => {
                console.log(res)
                if (!res.ok) {
                    res.text().then(data => {
                        document.getElementById("result").style.color = "#D9534F"
                        document.getElementById("result").style.textDecoration = "none"
                        document.getElementById("result").innerHTML = "Server error:" + data;
                        clear("result");
                        throw data
                    })
                } else {
                    return res.json()
                }
            })
            .then(data => {
                document.getElementById("spinner").style.display = "none"
                document.getElementById("result").innerHTML = data.result;
                fetchCalculations()
            }).catch(err => {
                console.log(err)
            })
    }
}

function fetchCalculations() {
    fetch(prefix + "getFibonacciResults")
        .then(res => res.json())
        .then(data => displayResults(data.results))
}

function displayResults(arrayOfRes) {
    arrayOfRes.forEach(res => {
        const div = createElement(res)
        document.getElementById("display-results").appendChild(div)
    })
}

function createElement(obj) {
    let div = document.createElement("div")
    div.style.textDecoration = "underline"
    div.innerHTML = `The Fibonacci Of ${obj.number} is ${obj.result}, Calculated at :${new Date()}`
    return div
}

function calculateFibonacciLocally(index) {
    if (index < 2)
        return index
    return calculateFibonacciLocally(index - 2) + calculateFibonacciLocally(index - 1)
}

function calculate() {
    const ifChecked = document.getElementById("flexCheckDefault").checked;
    if (ifChecked) {
        calculateAndSave();
    }
    else {
        const index = document.getElementById("index-input").value
        const Res = calculateFibonacciLocally(index);
        document.getElementById("result").innerHTML = Res;
    }
}