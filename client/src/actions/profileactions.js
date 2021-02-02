import axios from "axios";

import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER,
  GET_PROFILES,
} from "./types";

//get current profile

export const getCurrentProfile = () => async (dispatch) => {
  try {
    dispatch(setProfileLoading());

    const res = await axios.get("/profile");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: GET_PROFILE,
      payload: {},
    });
  }
};

export const createProfile = (profiledata, history) => async (dispatch) => {
  try {
    await axios.post("/profile", profiledata);
    history.push("/dashboard");
  } catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data,
    });
  }
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};

export const AddExperience = (expData, history) => async (dispatch) => {
  try {
    await axios.post("/profile/experience", expData);
    history.push("/dashboard");
  } catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data,
    });
  }
};

export const AddEducation = (eduData, history) => async (dispatch) => {
  try {
    await axios.post("/profile/education", eduData);
    history.push("/dashboard");
  } catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data,
    });
  }
};

export const DeleteExperience = (id, history) => async (dispatch) => {
  dispatch(setProfileLoading())

  try {
    const res = await axios.delete(`/profile/experience/${id}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    history.push("/dashboard");
  } catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data,
    });
  }
};

export const DeleteEducation = (id, history) => async (dispatch) => {
  dispatch(setProfileLoading())

  try {
    const res = await axios.delete(`/profile/education/${id}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    history.push("/dashboard");
  } catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data,
    });
  }
};




export const getProfiles=(id)=>async (dispatch)=>{
  dispatch(setProfileLoading())
  try{
const res= await axios.get('/profile/all')
    dispatch({
      type:GET_PROFILES,
      payload:res.data
    })  
     }
     catch(e){
       dispatch({
         type:GET_PROFILES,
         payload:null
       })
     }
}



//Get Profile by Username
export const getProfileByUsername=(username)=>async dispatch=>{
  dispatch(setProfileLoading())
  try{
  const res=await axios.get(`/profile/username/${username}`)

    dispatch({
      type:GET_PROFILE,
      payload:res.data
    })

}catch(e){
  dispatch({
    type:GET_PROFILE,
    payload:null
  })

} }







export const deleteAccount = () => async (dispatch) => {
  if (
    window.confirm(
      "Are you sure wanted to delete your account? This cannot be undone!"
    )
  ) {
    try {
      await axios.delete("/profile");
      dispatch({
        type: SET_CURRENT_USER,
        payload: {},
      });
    } catch (e) {
      dispatch({
        type: GET_ERRORS,
        payload: e.response.data,
      });
    }
  }
};

export const uploadImage = (avtaar, history) => async (dispatch) => {
  try {
    console.log(avtaar);
    const res = await axios.post("/users/image/upload", avtaar, {
      onUploadProgress: (ProgressEvent) => {
        console.log(
          "Upload Progreess" +
            Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
            "%"
        );
      },
    });
    console.log(res.data);
    dispatch({
      type: SET_CURRENT_USER,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data,
    });
  }
};
