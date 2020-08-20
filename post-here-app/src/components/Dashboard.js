import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Posts from "../components/posts/Posts";
import NewPost from "./posts/NewPost";
import { UserContext } from "../utils/UserContext";

export default function Dashboard() {
  const { logOut } = useContext(UserContext);
  return (
    <div className="dashboard">
      <header>
        <nav className="nav-links">
          <a target="_blank" rel="noopener noreferrer" id="logo" href="/">
            Post Here
          </a>
          <a target="_blank" rel="noopener noreferrer" href=" https://loving-yalow-27dd9e.netlify.app/">Home</a>
          <Link to="/">Signup</Link>
          <Link to="/login">Login</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/login" onClick={logOut}>
            Log Out
          </Link>
          <a target="_blank" rel="noopener noreferrer" href="https://loving-yalow-27dd9e.netlify.app/about.html">
            About Us
          </a>
        </nav>
        <NewPost />
      </header>
      <Posts />
    </div>
  );
}
