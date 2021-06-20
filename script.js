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
                                        <p class="card-price">$${value.price}</p>
                                        <button href="#" class="btn btn-primary addToCart">Add to the cart</button>
                                    </div>
                                    </div>`
                            })
                            const addToCartButtons = document.querySelectorAll(".addToCart")
                            for (let i = 0; i < addToCartButtons.length; i++) {
                                const addButton = addToCartButtons[i]
                                addButton.addEventListener("click", addToCart)
                            }
                    })
    
                })
                categoriesDiv.appendChild(button)
            })
        })
})

const removeItemButton = document.querySelectorAll(".removeButton")
for (let i = 0; i < removeItemButton.length; i++) {
    const removeButton = removeItemButton[i]
    removeButton.addEventListener('click', removeCartItem)
}

const quantityInput = document.querySelectorAll(".cartQuantity")
for (let i = 0; i < quantityInput.length; i++) {
    const input = quantityInput[i]
    input.addEventListener("change", changeQuantity)
}

document.querySelector(".buttonPurchase").addEventListener("click", purchase)

function purchase() {
    alert("Thank you for your purchase")
    const cartItems = document.querySelector(".cartItems")
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function addToCart(event) {
    const button = event.target
    const shopItem = button.parentElement.parentElement
    const title = shopItem.querySelector(".card-title").innerText
    const price = shopItem.querySelector(".card-price").innerText
    const imageSrc = shopItem.querySelector(".card-img-top").src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart (title, price, imageSrc) {
    const cartRow = document.createElement("div")
    cartRow.innerText = title
    const cartItems = document.querySelector(".cartItems")
    const cartRowContent = `
                <div class="cartRow">
                    <div class="cart-item">
                        <img class="cartItemImage" src="${imageSrc}" width="100" height="100">
                        <span class="cartItemTitle">${title}</span>
                    </div>
                    <span class="cartPrice">${price}</span>
                    <div class="cartQuantityDiv">
                        <input class="cartQuantity" type="number" value="1">
                        <button class="btn btn-danger removeButton" type="button">REMOVE</button>
                    </div>
                </div>`
    cartRow.innerHTML = cartRowContent
    cartItems.append(cartRow)
    cartRow.querySelector(".removeButton").addEventListener("click", removeCartItem)
    cartRow.querySelector(".cartQuantity").addEventListener("change", changeQuantity)
}

function changeQuantity(event) {
    const input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function removeCartItem(event) {
    const clickButton = event.target
    clickButton.parentElement.parentElement.remove()
    updateCartTotal()
}

function updateCartTotal() {
    const cartItemDiv = document.querySelector(".cartItems")
    const cartRows = cartItemDiv.querySelectorAll(".cartRow")
    let total = 0
    for (let i = 0; i < cartRows.length; i++) {
        const cartRow = cartRows[i]
        const itemPrice = cartRow.querySelector(".cartPrice")
        const itemQuantity = cartRow.querySelector(".cartQuantity")
        const price = parseFloat(itemPrice.innerText.replace("$", ""))
        const quantity = itemQuantity.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.querySelector(".cartTotalPrice").innerText = `$${total}` 
}
