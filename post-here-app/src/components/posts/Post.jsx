import React, { useContext, useState, useEffect } from "react";
import axiosWithAuth from "../../utils/axiosWithAuth";
import { UserContext } from "../../utils/UserContext";
import EditPosts from "../posts/EditPost";
import axios from "axios";
import styled from "styled-components";

const Post = (props) => {
  const { post } = props;
  const { getData } = useContext(UserContext);
  const [subredditPrediction, setSubredditPrediction] = useState("");

  const openModal = (e) => {
    e.preventDefault();
    const modal = document.querySelector("#modalTest");
    const editbutton = document.querySelector("#editButton");
    const deletebutton = document.querySelector("#deleteButton");
    modal.classList.add("open-modal");
    editbutton.classList.add("hide-button");
    deletebutton.classList.add("hide-button");
  };

  const closeModal = () => {
    const modal = document.querySelector("#modalTest");
    const editbutton = document.querySelector("#editButton");
    const deletebutton = document.querySelector("#deleteButton");
    modal.classList.remove("open-modal");
    editbutton.classList.remove("hide-button");
    deletebutton.classList.remove("hide-button");
  };

  // Web API DELETE request
  const deletePost = (e, id) => {
    e.preventDefault();
    axiosWithAuth()
      .delete(`/api/posts/${id}`)
      .then((res) => {
        console.log("Post Deleted", res);
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // DS API POST request
  const prediction = () => {
    axios
      .post(`https://bw-post-here-2.herokuapp.com/predict`, {
        x1: post.title,
        x2: post.content,
      })
      .then((res) => {
        // console.log("Submitted post to DS API", res);
        setSubredditPrediction(res.data.prediction);
        // alert("Post Submitted")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    prediction();
  }, []);
  const StyledForm = styled.div`
    nav {
      display: flex;
      justify-content: space-around;
      background-color: #d7bde2;
      width: 100%;
      a {
        text-decoration: none;
        font-size: 2rem;
        color: #2e4053;
      }
    }
    .cardBox {
      display: flex;
      align-items: center;
      justify-content: center;
      .card {
        margin-top: 3rem;
        background-color: cornsilk;
        width: 50%;
        border-radius: 2rem;
        p {
          font-size: 2rem;
          color: black;
        }
        button {
          margin-bottom: 1rem;
        }
      }
    }
  `;
  return (
    <StyledForm>
      <div className="cardBox">
        <div className="card">
          <button id="editButton" onClick={openModal}>
            Edit
          </button>
          <div id="modalTest">
            <p className="exit" onClick={closeModal}>
              X
            </p>
            <EditPosts setSubredditPrediction={setSubredditPrediction} id={post.id} />
          </div>
          <button id="deleteButton" onClick={(e) => deletePost(e, post.id)}>
            Delete
          </button>

          <p><span>Title:</span> {post.title}</p>
          <p><span>Content:</span> {post.content}</p>
          {subredditPrediction === "" && <h4 id="prediction-loading">Loading Prediction</h4>}
          {subredditPrediction !== "" && (
            <p>
              <span>Prediction:</span> r/{subredditPrediction}
            </p>
          )}
        </div>
      </div>
    </StyledForm>
  );
};

export default Post;
