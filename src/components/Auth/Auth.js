import React, {useState, useContext, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import FormTabs from "./FormTabs/FormTabs";
import FormLogin from "./FormLogin/FormLogin";
import FormRegister from "./FormRegister/FormRegister";
import {PreloaderContext} from '../Context/preloaderContext/preloaderContext';
import {ModalContext} from '../Context/modalContext/modalContext';

const Auth = ({history}) => {
  const {modalHide, modalShow} = useContext(ModalContext);
  const {hidePreloader, showPreloader} = useContext(PreloaderContext);
  const [isActive, setIsActive] = useState();
  useEffect(() => {
    hidePreloader();
  });
  const [styleButtonTabSignIn, setStyleButtonTabSignIn] = useState({}),
      [styleButtonTabRegister, setStyleButtonRegister] = useState({}),
      [styleTabsSlider, setStyleTabsSlider] = useState({}),
      [formLoginStyle, setFormLoginStyle] = useState({}),
      [formRegisterStyle, setFormRegisterStyle] = useState({});
  useEffect(() => {
    if (isActive) {
      setStyleTabsSlider({
        'left': '110px',
        'background': 'linear-gradient(to right, #015d53, #ce5e22)'
      });
      setStyleButtonTabSignIn({
        'color': '#ECEFF1'
      });
      setStyleButtonRegister({
        'color': '#000000'
      });
      setFormLoginStyle({
        left: '400px'
      });
      setFormRegisterStyle({
        right: '0px'
      });
    }
    if (!isActive) {
      setStyleTabsSlider({
        'left': '0px',
        'background': 'linear-gradient(to right, #ce5e22,  #015d53)'
      });
      setStyleButtonTabSignIn({
        'color': '#000000'
      });
      setStyleButtonRegister({
        'color': '#ECEFF1'
      });
      setFormLoginStyle({
        left: '0px'
      });
      setFormRegisterStyle({
        right: '400px'
      });
    }
  }, [isActive]);
  const [eyeShowHide, setEyeShowHide] = useState(true); //
  const [showPasswordOrText, setShowPasswordOrText] = useState('password');
  const checkEye = () => {
    setEyeShowHide(!eyeShowHide);
    if (showPasswordOrText === "password") {
      setShowPasswordOrText('text');
    } else {
      setShowPasswordOrText('password');
    }
  };
  return (
      <section className="authorisation">
        <div className="sign-in-up-form">

          <FormTabs styleTabsSlider={styleTabsSlider}
                    styleButtonTabSignIn={styleButtonTabSignIn}
                    styleButtonTabRegister={styleButtonTabRegister}
                    setIsActive={setIsActive}/>

          {isActive && <FormLogin style={formLoginStyle}
                                  showPasswordOrText={showPasswordOrText}
                                  eyeShowHide={eyeShowHide}
                                  checkEye={checkEye}
                                  history={history}/>}

          {!isActive && <FormRegister style={formRegisterStyle}
                                      showPasswordOrText={showPasswordOrText}
                                      eyeShowHide={eyeShowHide}
                                      checkEye={checkEye}
                                      hidePreloader={hidePreloader}
                                      showPreloader={showPreloader}
                                      modalHide={modalHide}
                                      modalShow={modalShow}
                                      setIsActive={setIsActive}/>}
        </div>
      </section>
  )
};
export default withRouter(Auth);