
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardMedia } from "@mui/material";

export default function OrderDetails() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const token = localStorage.getItem("token");


  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const userData = localStorage.getItem("user");
  let userId = null;

  if (userData) {
    userId = JSON.parse(userData).userId;
  } else {
    console.log("User data not found in localStorage.");
  } useEffect(() => {
    async function fetchOrders() {
      try {
        const url = "http://localhost:8080/order/" + userId + "/getOrders";
        const response = await axios.get(url, config);
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);
  useEffect(() => {
    console.log(orders);
  }, [orders]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {orders.slice().reverse().map((order, index) => (
        <Card
          key={index}
          sx={{
            marginBottom: "10px",
            display: "flex",
            padding: "10px",
          }}
        >
          <CardMedia
            component="img"
            alt={order.product.productName}
            sx={{ height: "100px", width: "100px" }}
            image={`data:image/jpeg;base64,${order.product.productPic}`}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Order ID: {order.order.orderId}
            </Typography>
            <Typography variant="h6">{order.product.productName}</Typography>
            <Typography variant="body2" color="text.secondary">
              Quantity: {order.quantity}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Delivered: {order.delivered ? 'Yes' : 'No'}
            </Typography>

          </CardContent>
        </Card>
      ))}
    </div>
  );

}

