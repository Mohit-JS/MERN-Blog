import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import contentStyles from "./BlogContent.module.css";
import Loader from "../Loader/Loader";

const BlogContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [blogContent, setBlogContent] = useState({ title: "", content: "" });

  let params = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetch("https://blomo.herokuapp.com/oneBlog/" + params.id)
      .then(function (res) {
        return res.json();
      })
      .then(function (response) {
        setBlogContent({
          ...blogContent,
          title: response.title,
          content: response.content,
          author: response.author
        });
        setIsLoading(false);
      });
  }, []);

  var text = (
    <div>
      <h1 className={`text-left ${contentStyles.title}`}>{blogContent.title}</h1>
      <p className={contentStyles.capitalise}>by {blogContent.author}</p>
      <img src="" />
      <p className="text-left">{blogContent.content}</p>
    </div>
  );

  return (
    <div className={contentStyles.OneBlog}>
      <div className={contentStyles.shareContainer}>
        <span className="material-symbols-outlined">thumb_up</span>
        <span className="material-symbols-outlined">thumb_down</span>
        <span className="material-symbols-outlined">share</span>
      </div>

      <div className={contentStyles.blogContent}>
        {isLoading ? Loader : text}
      </div>
    </div>
  );
};

export default BlogContent;
