import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [arr, setArr] = useState([]);

  useEffect(() => {
    fetch("/product-list/")
      .then((res) => res.json())
      .then((data) => setArr(data));
  });

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      {arr.map((x) => (
        <div key={x.id}>
          <img src={x.img} alt="some pic" />
          <p> {x.name} </p>
          <p> $ {x.price} </p>
          <Link to={`/product/${x.id}`}> view product </Link>
        </div>
      ))}
    </div>
  );
}
