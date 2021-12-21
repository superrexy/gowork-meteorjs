import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard as AdminDashboard } from "../views/admin/Dashboard";
import { LoginAdmin } from "../views/admin/LoginAdmin";
import { Invoice } from "../views/Invoice";
import LandingPage from "../views/LandingPage";
import { Login } from "../views/Login";
import { Order } from "../views/Order";
import { OrderSuccess } from "../views/OrderSuccess";
import { Dashboard as UserDashboard } from "../views/user/Dashboard";
import { Authenticated } from "../middleware/Authenticated";
import { Guest } from "../middleware/Guest";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} exact />
        <Route
          path="/login"
          element={
            <Guest>
              <Login />
            </Guest>
          }
        />
        <Route
          path="/user"
          element={
            <Authenticated roles={['user']}>
              <UserDashboard />
            </Authenticated>
          }
        />
        <Route
          path="/order/:id"
          element={
            <Authenticated roles={['user']}>
              <Order />
            </Authenticated>
          }
        />
        <Route
          path="/order-success"
          element={
            <Authenticated roles={['user']}>
              <OrderSuccess />
            </Authenticated>
          }
        />
        <Route
          path="/invoice/:id"
          element={
            <Authenticated roles={['user', 'admin']}>
              <Invoice />
            </Authenticated>
          }
        />

        <Route
          path="/admin"
          element={
            <Authenticated roles={['admin']}>
              <AdminDashboard />
            </Authenticated>
          }
        />

        <Route
          path="/admin/login"
          element={
            <Guest>
              <LoginAdmin />
            </Guest>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
