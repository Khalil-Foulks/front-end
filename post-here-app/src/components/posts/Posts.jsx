import React, { useEffect, useContext } from "react";
import Post from "./Post";
import { UserContext } from "../../utils/UserContext";

const Posts = () => {
  // Make sure the parent of Posts is passing the right props!
  // const [posts, setPosts] = useState([]);

  const { postList, getData } = useContext(UserContext);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {/* map through the posts here to return a Post component */}
      {postList.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      {/* Check the implementation of Post to see what props it requires! */}
    </div>
  );
};

export default Posts;
