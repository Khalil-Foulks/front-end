import React, { useState, useContext } from "react";
import axiosWithAuth from "../../utils/axiosWithAuth";
import { UserContext } from "../../utils/UserContext";
import axios from "axios"

const EditPost = (props) => {
  const { user_id, getData } = useContext(UserContext);

  const [postToEdit, setPostToEdit] = useState({
    id: "",
    user_id: "",
    title: "",
    content: "",
    subreddit: "",
  });

  // Web API PUT request
  const editPost = (e, id) => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/api/posts/${id}`, {
        user_id: user_id,
        title: postToEdit.title,
        content: postToEdit.content,
        subreddit: postToEdit.subreddit,
      })
      .then((res) => {
        // console.log("Post Changed", res);
        setPostToEdit({
          user_id: user_id,
          title: postToEdit.title,
          content: postToEdit.content,
          subreddit: postToEdit.subreddit,
        });

        //Resubmits post to DS API
        axios
        .post(`https://bw-post-here-2.herokuapp.com/predict`, {
          x1: postToEdit.title,
          x2: postToEdit.content,
        })
        .then((res) => {
          console.log("Submitted post to DS API", res);
          props.setSubredditPrediction(res.data.prediction);
          // alert("Post Submitted")
        })
        .catch((err) => {
          console.log(err);
        });
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangeHandler = (e) => {
    setPostToEdit({
      ...postToEdit,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="updatePost">
      <h3>Update a Post</h3>
      <form>
        <input
          type="text"
          name="title"
          value={postToEdit.title}
          onChange={onChangeHandler}
          placeholder="title"
        />
        <input
          type="text"
          name="content"
          value={postToEdit.content}
          onChange={onChangeHandler}
          placeholder="content"
        />
        <button id="editbutton" onClick={(e) => editPost(e, props.id)}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditPost;
