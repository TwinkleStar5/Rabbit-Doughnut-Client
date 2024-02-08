import axios from "axios";

export async function addProducts(product) {
  // return console.log(product);
  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("description", product.description);
  formData.append("quantity", product.quantity);
  formData.append("allergens", product.allergens);
  formData.append("image", product.image);
  formData.append("isActive", product.isActive);
  formData.append("glutenFree", product.glutenFree);
  formData.append("vegan", product.vegan);

  const res = await axios.post("http://localhost:8000/products", formData, {
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

export async function editOneProduct(editedProduct) {
  const formData = new FormData();
  formData.append("name", editedProduct.name);
  formData.append("description", editedProduct.description);
  formData.append("quantity", editedProduct.quantity);
  formData.append("allergens", editedProduct.allergens);
  formData.append("image", editedProduct.image);
  formData.append("glutenFree", editedProduct.glutenFree);
  formData.append("vegan", editedProduct.vegan);
  formData.append("isActive", editedProduct.isActive);

  const res = await axios.put(
    `http://localhost:8000/products/${editedProduct._id}`,
    formData,
    {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    }
  );
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

export const editProductStatus = async (id) => {
  // return console.log(id);
  const res = await axios.patch(`http://localhost:8000/products/${id}`, {
    headers: { "x-auth-token": localStorage.getItem("token") },
  });
  return res.data;
};
