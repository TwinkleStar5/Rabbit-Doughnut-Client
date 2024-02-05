import axios from "axios";

export async function createOrder(info) {
  let body = { ...info, pickUpDelivery: localStorage.getItem("selectedDate") };

  const res = await axios.post("http://localhost:8000/orders", body, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
  return res.data;
}

export async function getOrder() {
  const res = await axios.get("http://localhost:8000/orders/all", {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
  return res.data;
}
export async function getSingleOrder() {
  const res = await axios.get("http://localhost:8000/orders", {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
  return res.data;
}
