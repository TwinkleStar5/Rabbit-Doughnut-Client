import axios from "axios";

export async function addToCart(product) {
  const res = await axios.post("http://localhost:8000/cart", product, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
  return res.data;
}

export async function getCart() {
  const res = await axios.get("http://localhost:8000/cart", {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
  return res.data;
}

export async function deleteSingleCartItem(id) {
  const res = await axios.delete(`http://localhost:8000/cart/${id}`, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
  return res.data;
}
