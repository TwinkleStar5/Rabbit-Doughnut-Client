import axios from "axios";

export async function addToCart(product) {
  const res = await axios.post("http://localhost:8000/cart", product, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
  return res.data;
}

export async function addToMainCart() {
  const res = await axios.put("http://localhost:8000/cart", null, {
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

export async function deleteAllItems() {
  const res = await axios.delete(`http://localhost:8000/cart/`, {
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

export async function deleteSingleMainCart(idx) {
  const res = await axios.delete(`http://localhost:8000/cart/main/${idx}`, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
  return res.data;
}

export async function updateQtyPack(act, idx) {
  const res = await axios.put(
    `http://localhost:8000/cart/main/${idx}/${act}`,
    null,
    {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    }
  );
  return res.data;
}
