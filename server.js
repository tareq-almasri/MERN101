const express = require("express");
const app = express();
const productsList = require("./data/listDB.json");

app.listen(5000, () => {
  console.log("start listening on port 5000");
});

app.use((req, res, next) => {
  res.set("ACCESS-CONTROL-ALLOW-ORIGIN", "*");
  res.set("ACCESS-CONTROL-ALLOW-HEADERS", "*");
  res.set("ACCESS-CONTROL-ALLOW-METHODS", "*");
  next();
});

app.use(express.json());
app.use(express.urlencoded());

let shoppingList = [];

//the routes for the CRUD operations:________________________________________

//Read op:
//the (Home) route fetches this one:
app.get("/product-list/", (req, res) => {
  res.send(productsList);
});

//Read op:
//the (cart) route fetches this one:
app.get("/shopping-cart", (req, res) => {
  res.send(shoppingList);
});

//Read op:
//the (product) route fetches this one:
app.get("/product-view/:id", (req, res) => {
  let product = productsList.find(x => x.id === req.params.id);
  res.send(product);
});

//Create op:
//the (addToCart) function fetches TO this one:
app.post("/shopping-cart/:id", (req, res) => {
  let product = productsList.find(x => x.id === req.params.id);

  if (shoppingList.includes(product)) {
    product.quantity += 1;
  } else {
    product.quantity = 1;
    shoppingList.push(product);
  }

  res.send(shoppingList);
});

//Delete op:
//the (deleteFromCart) function fetches TO this one:
app.delete("/shopping-cart/:id", (req, res) => {
  shoppingList = shoppingList.filter(x => x.id != req.params.id);
  res.send(shoppingList);
});

// Update op:
// the (updateQuantity) function fetches TO this one:
app.patch("/shopping-cart/:id", (req, res) => {
  shoppingList.map(x => {
    if (x.id === req.params.id) {
      x.quantity = req.body.quantity;
    }
  });

  res.send(shoppingList);
});
