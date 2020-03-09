import React, {useContext, useEffect} from 'react';
import {AuthContext} from '../components/Context/authContext/AuthContext';
import {PreloaderContext} from '../components/Context/preloaderContext/preloaderContext';
import Contacts from '../components/Contacts/Contacts';
import {withRouter, Redirect} from 'react-router-dom';

const Home = () => {
  const {currentUser} = useContext(AuthContext);
  const {showPreloader, hidePreloader} = useContext(PreloaderContext);

  useEffect(() => {
    currentUser ? hidePreloader() : showPreloader();
  }, []);
  if (!currentUser) {
    return <Redirect to="/"/>
  }
  return (
      <Contacts/>
  )
};
export default withRouter(Home);