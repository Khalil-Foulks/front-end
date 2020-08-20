import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from "./components/signup/SignUp.jsx";
import Login from "./components/login/Login.jsx";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./utils/PrivateRoute";
import axiosWithAuth from "./utils/axiosWithAuth";

import { UserContext } from "./utils/UserContext";

function App() {
  // CONTEXT STATE
  const user_id = window.localStorage.getItem("id");

  const [postList, setPostList] = useState([
    {
      id: "",
      user_id: "",
      title: "",
      content: "",
      subreddit: "",
    },
  ]);

  const getData = () => {
    axiosWithAuth()
      .get(`/api/posts/user/${user_id}`)
      .then((res) => {
        setPostList(res.data);
        // console.log("GET REQUEST", res)
      })
      .catch((err) => {
        console.log(err);
        // debugger
      });
  };

  const logOut = () => {
    window.localStorage.clear();
  };

  return (
    <Router>
      <UserContext.Provider
        value={{ user_id, postList, setPostList, getData, logOut }}
      >
        <div className="App">
          <PrivateRoute path="/Dashboard" component={Dashboard} />
          <Route path="/Login" component={Login} />
          <Route exact path="/" component={SignUp} />
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
