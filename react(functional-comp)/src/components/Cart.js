import React, { useState, useEffect } from "react";

export default function Cart() {
  const [arr, setArr] = useState([]);

  useEffect(() => {
    fetch("/shopping-cart")
      .then((res) => res.json())
      .then((data) => setArr(data));
  });

  const updateQuantity = (id, quant) => {
    fetch(`/shopping-cart/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ quantity: quant }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => setArr(data));
  };

  const totalPrice = () => {
    return arr.reduce((sum, x) => {
      sum += x.quantity * x.price;
      return sum;
    }, 0);
  };

  const deleteFromCart = (id) => {
    fetch(`/shopping-cart/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => setArr(data));
  };

  return (
    <div>
      {arr.map((x) => (
        <div
          key={x.id}
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <img src={x.img} style={{ width: "40px" }} alt="some pic" />
          <p> {x.name} </p>
          <p> $ {x.price} </p>

          <input
            onChange={(e) => updateQuantity(x.id, e.target.value)}
            type="number"
            min="1"
            value={x.quantity}
          />

          <button onClick={()=> deleteFromCart(x.id)}>Delete</button>
        </div>
      ))}
      <span> Total: </span>
      <input
        style={{ margin: "50px" }}
        type="number"
        disabled
        value={totalPrice()}
      />
      $
    </div>
  );
}
