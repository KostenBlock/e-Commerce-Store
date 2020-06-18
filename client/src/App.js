import React, {Fragment} from 'react';
import Navbar from "./components/layouts/Navbar";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./pages/Home";
import ItemsState from "./context/items/ItemsState";
import CartState from "./context/cart/CartState";
import Cart from "./pages/Cart";
import AlertState from "./context/alert/AlertState";
import Product from "./pages/Product";
import Orders from "./pages/Orders";
import OrdersState from "./context/orders/OrdersState";
import AuthState from "./context/auth/AuthState";
import setAuthToken from "./utils/setAuthToken";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import PrivateRoute from "./components/routing/PrivateRoute";
import Settings from "./components/settings/Settings";
import Profile from "./components/user/Profile";
import Category from "./pages/Category";
import AdminRoute from "./components/routing/AdminRoute";
import AdminPanel from "./pages/AdminPanel";
import AdminState from "./context/admin/AdminState";
import Checkout from "./components/checkout/Checkout";
import AddItem from "./components/addItem/AddItem";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";

if(localStorage.token) {
    setAuthToken(localStorage.token);
}

function App() {
  return (
      <AuthState>
          <AdminState>
              <OrdersState>
                  <CartState>
                      <ItemsState>
                          <AlertState>
                              <Router>
                                  <Fragment>
                                      <Navbar />
                                      <div className="container">
                                          <Switch>
                                              <Route exact path="/" component={Home}/>
                                              <Route path="/login" component={Login}/>
                                              <Route path="/register" component={Register}/>
                                              <Route path="/cart" component={Cart}/>
                                              <Route path="/search/:query" component={Search}/>
                                              <Route path="/category/:name" component={Category}/>
                                              <Route path="/product/:id" component={Product}/>
                                              <PrivateRoute path="/checkout" component={Checkout}/>
                                              <PrivateRoute path="/profile" component={Profile}/>
                                              <PrivateRoute path="/orders" component={Orders}/>
                                              <PrivateRoute path="/settings" component={Settings}/>
                                              <AdminRoute path="/adminpanel" component={AdminPanel}/>
                                              <AdminRoute path="/additem" component={AddItem}/>
                                              <Route component={NotFound}/>
                                          </Switch>
                                      </div>
                                  </Fragment>
                              </Router>
                          </AlertState>
                      </ItemsState>
                  </CartState>
              </OrdersState>
          </AdminState>
      </AuthState>
  );
}

export default App;
