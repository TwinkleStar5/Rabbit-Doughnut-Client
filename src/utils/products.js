import axios from "axios";

export async function addProducts(product) {
  const res = await axios.post("http://localhost:8000/products", product, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
  return res.data;
}

export async function getProducts() {
  const res = await axios.get("http://localhost:8000/products", {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
  return res.data;
}

export async function editProduct(id) {
  const res = await axios.put(`http://localhost:8000/products/${id}`, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
  return res.data;
}

export async function deleteOneProduct(id) {
  const res = await axios.delete(`http://localhost:8000/products/${id}`, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
  return res.data;
}

export async function deleteAllProducts() {
  const res = await axios.delete(`http://localhost:8000/products/`, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
  return res.data;
}


