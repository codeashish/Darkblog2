import axios from "axios";
import {
  ADD_BLOG,
  GET_ERRORS,
  GET_BLOGS,
  BLOG_LOADING,
  DELETE_BLOG,
  GET_BLOG,
} from "./types";

//ADD blog

export const addblog = (blogdata, history) => async (dispatch) => {
  try {
    dispatch(setBlogLoading());

    const res = await axios.post("/blogs", blogdata);

    dispatch({
      type: ADD_BLOG,
      payload: res.data,
    });
    history.push("/allblogs");
  } catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data,
    });
  }
};

export const getBlogs = () => async (dispatch) => {
  try {
    dispatch(setBlogLoading());

    const res = await axios.get("/blogs/all");
    console.log(res)
    dispatch({
      type: GET_BLOGS,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: GET_BLOGS,
      payload: null,
    });
  }
};

export const setBlogLoading = () => {
  return { type: BLOG_LOADING };
};

export const deleteblog = (id) => async (dispatch) => {
  try {
    dispatch(setBlogLoading());

    await axios.delete(`/blogs/${id}`);
    dispatch({
      type: DELETE_BLOG,
      payload: id,
    });
  } catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data,
    });
  }
};
//ADd Like
export const addLike = (id) => async (dispatch) => {
  try {
    await axios.post(`/blogs/like/${id}`);
    dispatch(getBlogs());
  } catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data,
    });
  }
};

//ADd Like
export const removeLike = (id) => async (dispatch) => {
  try {
    await axios.post(`/blogs/unlike/${id}`);
    dispatch(getBlogs());
  } catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data,
    });
  }
};

export const getBlog = (id) => async (dispatch) => {
  try {
    dispatch(setBlogLoading());

    const res = await axios.get(`/blogs/particular/${id}`);
    dispatch({
      type: GET_BLOG,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: GET_BLOG,
      payload: null,
    });
  }
};
