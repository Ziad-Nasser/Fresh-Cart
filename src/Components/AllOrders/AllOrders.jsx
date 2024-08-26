import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";

const AllOrders = () => {
  const { id } = jwtDecode(localStorage.getItem("userToken"));

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
        );
        setOrders(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      getOrders();
    } else {
      setIsLoading(false);
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error: {error.message || "Something went wrong."}
      </div>
    );
  }

  return (
    <section className=" bg-gray-100 pb-36">
      <title>Orders</title>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Your Orders</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </section>
  );
};

const OrderCard = ({ order }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105">
      <h2 className="text-xl font-semibold mb-4">Order ID: {order.id}</h2>
      <OrderDetail
        icon="fa-sack-dollar"
        label="Total Price"
        value={`$${order.totalOrderPrice}`}
      />
      <OrderDetail
        icon={
          order.paymentMethodType === "cash" ? "fa-money-bill" : "fa-cc-visa"
        }
        label="Payment Method"
        value={order.paymentMethodType}
      />
      <OrderDetail
        icon={
          order.isPaid ? "fa-check text-green-500" : "fa-xmark text-red-500"
        }
        label="Is Paid"
        value={order.isPaid ? "Yes" : "No"}
      />
      <OrderDetail
        icon="fa-city"
        label="Delivered To"
        value={order.shippingAddress.city}
      />
      <OrderDetail
        icon={
          order.isDelivered
            ? "fa-check text-green-500"
            : "fa-xmark text-red-500"
        }
        label="Is Delivered"
        value={order.isDelivered ? "Yes" : "Not Yet"}
      />
    </div>
  );
};

const OrderDetail = ({ icon, label, value }) => (
  <div className="flex justify-between items-center mb-2">
    <span className="text-gray-600">{label}:</span>
    <span className="font-semibold">
      <i className={`fas ${icon} mr-2`}></i>
      {value}
    </span>
  </div>
);

export default AllOrders;
