// side bar
let openShopping = document.querySelector(".shopping");
let closeShopping = document.querySelector(".closeShopping");
let list = document.querySelector(".list");
let listCard = document.querySelector(".listCard");
let body = document.querySelector("body");
let total = document.querySelector(".total");
let quantity = document.querySelector(".quantity");

openShopping.addEventListener("click", () => {
  body.classList.add("active");
});

closeShopping.addEventListener("click", () => {
  body.classList.remove("active");
});

//products
let products = [
  {
    id: 1,
    name: "Mango (per kg)",
    image: "mango.png",
    price: 3,
    color: "orange",
  },
  {
    id: 2,
    name: "Pineapple (per kg)",
    image: "pineApple.png",
    price: 5,
    color: "#4B92DB",
  },
  {
    id: 3,
    name: "Dragonfruits (per kg)",
    image: "dragonFruits.png",
    price: 3,
    color: "#c83a60",
  },
  {
    id: 4,
    name: "Apple (per kg)",
    image: "apple.png",
    price: 1,
    color: "#fc4a55",
  },
  {
    id: 5,
    name: "Watermelon (per kg)",
    image: "watermelon.png",
    price: 6,
    color: "#228B22",
  },
  {
    id: 6,
    name: "Fig (per kg)",
    image: "fig.png",
    price: 3,
    color: "#5E008D",
  },
];

let listCards = [];
function initApp() {
  products.forEach((value, key) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("item");
    newDiv.innerHTML = `
            <img src='img/${value.image}'>
            <div class='title'>${value.name}</div>
            <div class='price'>${value.price.toLocaleString()}$</div>
            <button onclick='addToCard(${key})'>Add To Cart</button>`;
    list.appendChild(newDiv);
    newDiv.style.backgroundColor = value.color;
  });
}
initApp();
function addToCard(key) {
  if (listCards[key] == null) {
    // copy product form list to list card
    listCards[key] = JSON.parse(JSON.stringify(products[key]));
    listCards[key].quantity = 1;
  }
  reloadCard();
}
function reloadCard() {
  listCard.innerHTML = "";
  let count = 0;
  let totalPrice = 0;
  listCards.forEach((value, key) => {
    totalPrice = totalPrice + value.price;
    count = count + value.quantity;
    if (value != null) {
      let newDiv = document.createElement("li");
      newDiv.innerHTML = `
                <div><img src='img/${value.image}'/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick='changeQuantity(${key}, ${
        value.quantity - 1
      })'>-</button>
                    <div class='count'>${value.quantity}</div>
                    <button onclick='changeQuantity(${key}, ${
        value.quantity + 1
      })'>+</button>
                </div>`;
      listCard.appendChild(newDiv);
    }
  });
  total.innerText = totalPrice.toLocaleString();
  quantity.innerText = count;
}
function changeQuantity(key, quantity) {
  if (quantity == 0) {
    delete listCards[key];
  } else {
    listCards[key].quantity = quantity;
    listCards[key].price = quantity * products[key].price;
  }
  reloadCard();
}
