const express = require("express");
const app = express();
const mongoose = require("mongoose");
const faker = require("faker");
const { ProductList } = require("./Models/product.model");

// CONNECT TO MONGODB
mongoose.connect(
  "mongodb+srv://alef:hello123@cluster0-2yq8x.mongodb.net/Onigiri?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);

// to create some documents in collection products in our database (only run it once)
// mongoose.connection.once('open', () => {
//     for(let i=0; i<4; i++){
//       ProductList.create({
//        img: "https://picsum.photos/200/200",
//         name: faker.name.title(),
//         price: faker.commerce.price(),
//         description: faker.lorem.sentence(),
//         quantity: 0
//       })
//     }
// });

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

//the routes for the CRUD operations:________________________________________

//Read op:
//the (Home) route fetches this one:
app.get("/product-list/", (req, res) => {
  ProductList.find()
    .then((list) => res.send(list))
    .catch((err) => console.log(err));
});

//Read op:
//the (cart) route fetches this one:
app.get("/shopping-cart", (req, res) => {
  ProductList.find({ quantity: { $gt: 0 } })
    .then((list) => res.send(list))
    .catch((err) => console.log(err));
});

//Read op:
//the (product) route fetches this one:
app.get("/product-view/:id", (req, res) => {
  ProductList.findById(req.params.id)
    .then((product) => res.send(product))
    .catch((err) => res.send(err));
});

//Create op:
//the (addToCart) function fetches TO this one:
app.post("/shopping-cart/:id", (req, res) => {
  ProductList.findById(req.params.id).then((product) => {
    product.quantity += 1;
    product.save();
    res.json('added to cart');
  })
});

//Delete op:
//the (deleteFromCart) function fetches TO this one:
app.delete("/shopping-cart/:id", (req, res) => {
  ProductList.findById(req.params.id).then((product) => {
    product.quantity = 0;
    product.save();
    res.json("deleted from cart");
  });
});

// Update op:
// the (updateQuantity) function fetches TO this one:
app.patch("/shopping-cart/:id", (req, res) => {
  ProductList.findById(req.params.id).then((product) => {
    product.quantity = req.body.quantity;
    product.save();
    res.json("quantity updated");
  });
});
