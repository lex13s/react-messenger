import React, {useContext, useState, useEffect} from 'react';
import firebase from '../../Firebase/Firebase';
import {AuthContext} from '../../Context/authContext/AuthContext';
import {PreloaderContext} from '../../Context/preloaderContext/preloaderContext';
import Modal from "../../UI/Modal/Modal";
import Input from "../../UI/Input/Input";
import Icon from "../../UI/IconEye/Icon";
import MainButton from "../../UI/Buttons/MainButton/MainButton";
import withClass from "../../hoc/withClass/withClass";
import Wrapper from "../../hoc/Wrapper/Wrapper";

const FormLogin = ({showPasswordOrText, eyeShowHide, checkEye, history}) => {
  const {users, presence, login} = firebase;
  const {hidePreloader, showPreloader} = useContext(PreloaderContext);
  const {setCurrentUser} = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false),
      [messageErrEmailOrUser, setMessageErrEmailOrUser] = useState("Error username or password"),
      [title, setTitle] = useState("Error username or password"),
      [count, setCount] = useState(3);
  useEffect(() => {
    if (isOpen && count > 0) {
      const timer = setInterval(() => {
        setCount(c => c - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setCount(3);
      setIsOpen(false)
    }
  }, [isOpen, count]);
  const signIn = (event, name, password) => {
    event.preventDefault();
    showPreloader();
    users.once("value", (snapshot) => {
      const dataUsers = snapshot.val();
      if (!dataUsers[name]) {
        setTitle(`ОШИБКА ${name}`);
        setMessageErrEmailOrUser(`Пользователь ${name} не зарегистрирован. Просьба сначала зарегистрироваться`);
        setIsOpen(true);
        hidePreloader();
      }
      if (dataUsers[name] && password !== dataUsers[name].password) {
        setTitle(`ОШИБКА`);
        setMessageErrEmailOrUser(`Введите корректный пароль для пользователя ${name}`);
        setIsOpen(true);
        hidePreloader();
      }
      if (dataUsers[name] && password === dataUsers[name].password) {
        const email = dataUsers[name].email;
        presence.child(`/${name}`).update({
          userName: name,
          onlineStatus: true
        });
        presence.child(`/${name}`).onDisconnect().remove();
        setCurrentUser(name);
        //hidePreloader();
        login(email, password, name, history);
      }
    });
  };
  const [usernameValue, setUsernameValue] = useState(""),
      [passwordValue, setPasswordValue] = useState("");
  const [userValid, setUserValid] = useState(false),
      [passwordValid, setPasswordValid] = useState(false);
  const [showButton, setShowButton] = useState(true);
  useEffect(() => {
    if (usernameValue.length >= 3) setUserValid(true);
    else setUserValid(false)
  }, [usernameValue]);
  useEffect(() => {
    if (passwordValue.length >= 6) setPasswordValid(true);
    else setPasswordValid(false)
  }, [passwordValue]);
  useEffect(() => {
    if (userValid && passwordValid) setShowButton(false);
    else setShowButton(true);
  }, [userValid, passwordValid]);
  return (
      <>
        {isOpen && <Modal title={title}
                          isOpen={isOpen}
                          onSubmit={() => {
                            setIsOpen(false);
                          }}
        >
          <p>
            {messageErrEmailOrUser}
          </p>
          <p>{count}</p>
        </Modal>}
        <form action="">
          <Wrapper className={'credentials-form-item'}
                   tag={"section"}>
            <Input
                id="form-login_username"
                type="text"
                placeholder=" "
                inputClass="credentials-form-item__text"
                labelClass="form__label"
                onChange={(event) => {
                  setUsernameValue(event.target.value);
                }}
            >
              <Icon name={"sign-in"}/>
              {"User name"}
            </Input>
          </Wrapper>
          <Wrapper className={'credentials-form-item'}
                   tag={"section"}>
            <Input
                id="form-login_password"
                type={showPasswordOrText}
                placeholder=" "
                inputClass="credentials-form-item__text"
                labelClass="form__label"
                onChange={(event) => {
                  setPasswordValue(event.target.value);
                }}
            >
              <Icon name={"key"}/>
              {"Password"}
            </Input>
            <Wrapper className={'form__eye'}
                     tag={"span"}>
              <Icon
                  active={eyeShowHide || "hide"}
                  name={"eye-slash"}
                  onClick={checkEye}
              />
              <Icon
                  active={!eyeShowHide || "hide"}
                  name={"eye"}
                  onClick={checkEye}
              />
            </Wrapper>
          </Wrapper>
          <Wrapper className={'credentials-form-item credentials-form-item__checkbox'}
                   tag={"section"}>
            <Input
                inputClass="credentials-form-item_input"
                id="form-login_remember-me"
                type="checkbox"
                labelClass="form__label credentials-form-item_label"
            >
              {"Remember password"}
            </Input>
          </Wrapper>
          <MainButton
              className="credentials-form__btn form-login__btn"
              disabled={showButton}
              onClick={(event) => {
                signIn(event, usernameValue, passwordValue)
              }}
          >
            Sign in
          </MainButton>
        </form>
      </>
  )
};
export default withClass(FormLogin, "form-login", "section");