document.querySelector("#button").addEventListener("click", () => {
    fetch('https://fakestoreapi.com/products/categories')
        .then(res=>res.json())
        .then(json=> {
            categoriesDiv = document.querySelector("#categories")
            json.forEach(value => {
                button = document.createElement("button")
                button.classList.add("btn", "btn-primary", "btn-sm", "rounded-pill", "m-3")
                button.innerText = value.toUpperCase()
                button.addEventListener("click", () => {
                    fetch(`https://fakestoreapi.com/products/category/${value}`)
                    .then(response => response.json())
                    .then(json => {
                            json.forEach((value, index) => {
                                document.querySelector("#product").innerHTML += 
                                    `<div class="card" style="width: 18rem;">
                                        <img src="${value.image}" class="card-img-top" alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title">${value.title}</h5>
                                        <p class="card-text">${value.description}</p>
                                        <a href="#" class="btn btn-primary">Add to the cart</a>
                                    </div>
                                    </div>`
                            })
                    })
    
                })
                categoriesDiv.appendChild(button)
            })
        })
})

