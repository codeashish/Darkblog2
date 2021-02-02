import { ADD_BLOG, GET_BLOGS, BLOG_LOADING, DELETE_BLOG, GET_BLOG } from "../actions/types";

const initialstate = {
  blogs: [],
  blog: {},
  loading: false,
};

export default function (state = initialstate, action) {
  switch (action.type) {
    case BLOG_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_BLOGS: {
      return {
        ...state,
        blogs: action.payload,
        loading: false,
      };
    }
    case ADD_BLOG:
      return {
        ...state,
        blogs: [action.payload, ...state.blogs],
        loading:false
      };

      case DELETE_BLOG:
        return {
          ...state,
          loading:false,
          blogs:state.blogs.filter(blog=>blog._id!==action.payload  )
        }
      case GET_BLOG:
        return {
          ...state,
          blog:action.payload,
          loading:false
        }
    default:
      return state;
  }
}

