import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {AuthProvider} from './components/Context/authContext/AuthContext'
import './styles/style.css';
import Auth from "./components/Auth/Auth";
import ModalWithReducer from "./components/UI/Modal/ModalWithReducer";
import {Preloader} from "./components/UI/Preloader/Preloader";
import Home from "./pages/Home";
import Head from "./components/Head/Head";
import Contacts from "./components/Contacts/Contacts";
import Messages from "./components/Messages/Messages";
import {FirebaseProvide} from "./components/Context/firebaseContext/FirebaseContext";

function App() {
  return (
      <AuthProvider>
        <FirebaseProvide>
          <Preloader/>
          <ModalWithReducer/>
          <Switch>
            <Route path='/'
                   exact
                   component={Auth}
            />
            <Route path='/home/'
                   // exact
                   component={Home}/>

            {/*<Route path='/home/:id'*/}
            {/*       render={({match, location, history}) => {*/}
            {/*         console.log(match, location, history);*/}
            {/*         const {name} = match.params;*/}
            {/*         return (*/}
            {/*             <>*/}
            {/*               <Head/>*/}
            {/*               <Contacts/>*/}
            {/*               <Messages userId={name}/>*/}
            {/*             </>*/}
            {/*         )*/}
            {/*       }*/}
            {/*       }*/}
            {/*/>*/}
            <Redirect to='/'/>
          </Switch>
        </FirebaseProvide>
      </AuthProvider>
  );
}

export default App;