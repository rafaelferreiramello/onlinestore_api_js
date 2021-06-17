fetch('https://fakestoreapi.com/products/categories')
    .then(res=>res.json())
    .then(json=> {
        document.querySelector("button").addEventListener("click", (e) => {
            json.forEach((value, index) => {
                document.querySelector("#categories").innerHTML += `<br><button>${value}</button><br>`
            })
        })
    })
    