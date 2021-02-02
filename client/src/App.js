import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import ReactDOM from 'react-dom'

import { Provider } from "react-redux";
import store from "./store";

import jwtDecode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logOutUser } from "./actions/authaction";
import Signup from "./components/auth/signup";
import Login from "./components/auth/login";
import Navbar from "./components/layouts/Navbar";
import Landing from "./components/layouts/landing";
import Dashboard from "./components/Dashboard/dashboard";

import EditProfile from "./components/editProfile/EditProfile";

import { clearCurrentProfile } from "./actions/profileactions";
import Privateroute from "./components/common/privateroute";
import Addexperience from "./components/add-credientials/Addexperience";
import Addeducation from "./components/add-credientials/addeducation";
import CreateProfile from "./components/createProfile/CreateProfile";
import UploadImage from "./components/Dashboard/uploadImage";
import Profiles from './components/bloggers/profiles'
import Profilepic from './components/uploads/profilepic'
import Profile from './components/personalProfile/Profile'
import Notfound from './components/404/404'
import Blogform from './components/blogs/blogform'
import Blogs from './components/blogs/blogs'
import FullPageBlog from './components/blogs/FullPageBlog'

if (localStorage.jwtToken) {

  setAuthToken(localStorage.jwtToken);

  const decoded = jwtDecode(localStorage.jwtToken);

  store.dispatch(setCurrentUser(decoded));

  const currenttime = Date.now() / 1000;
  if (decoded.exp < currenttime) {
    store.dispatch(logOutUser());
    store.dispatch(clearCurrentProfile());
    window.location.href = "/login";
  }
}

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Route path="/" exact={true} component={Landing} />

          <Route path="/login" exact={true} component={Login} />
          <Route path="/signup" exact={true} component={Signup} />
          <Switch>
            <Privateroute
              path="/dashboard"
              exact={true}
              component={Dashboard}
            />
          </Switch>
          <Switch>
            <Privateroute
              path="/create-profile"
              exact={true}
              component={CreateProfile}
            />
          </Switch>
          <Switch>
            <Privateroute
              path="/image/upload"
              exact={true}
              component={UploadImage}
            />
          </Switch>

       

          <Switch>
            <Privateroute
              path="/edit-profile"
              exact={true}
              component={EditProfile}
            />
          </Switch>

          <Switch>
            <Privateroute
              path="/add-experience"
              exact={true}
              component={Addexperience}
            />
          </Switch>

          <Switch>
            <Privateroute
              path="/add-education"
              exact={true}
              component={Addeducation}
            />
          </Switch>

          <Switch>
            <Privateroute
              path="/bloggers"
              exact={true}
              component={Profiles}
            />
          </Switch>

          <Switch>
            <Privateroute
              path="/uploadprofile"
              exact={true}
              component={Profilepic}
            />
          </Switch>
          
          <Switch>
            <Privateroute
              path="/profiles/username/:username"
              exact={true}
              component={Profile}
            />
          </Switch>
          <Switch>
            <Privateroute
              path="/notfound"
              exact={true}
              component={Notfound}
            />
          </Switch>

          <Switch>
            <Privateroute
              path="/addblog"
              exact={true}
              component={Blogform}
            />
          </Switch>


          <Switch>
            <Privateroute
              path="/allblogs"
              exact={true}
              component={Blogs}
            />
          </Switch>


          <Switch>
            <Privateroute
              path="/blogs/:id"
              exact={true}
              component={FullPageBlog}
            />
          </Switch>

         



        </BrowserRouter>
      </Provider>
    );
  }
}
