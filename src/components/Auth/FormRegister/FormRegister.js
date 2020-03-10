import React, {Component} from 'react';
import Firebase from '../../Firebase/Firebase';
import Input from '../../UI/Input/Input';
import MainButton from '../../UI/Buttons/MainButton/MainButton';
import Icon from '../../UI/IconEye/Icon';
import withClass from '../../hoc/withClass/withClass';
import Wrapper from '../../hoc/Wrapper/Wrapper';

class FormRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataInput: {
        username: {
          name: 'form-register_username',
          value: '',
          type: 'text',
          validLabel: 'User name',
          label: 'User name',
          errorMessage: 'Min 3 characters',
          valid: false,
          touched: false,
          placeholder: " ",
          wrapperClassName: "credentials-form-item",
          formName: "form-register",
          inputClass: "credentials-form-item__text",
          labelClass: "form__label",
          iClass: "sign-in",
          validation: {
            required: true,
            minLength: 3
          }
        },
        email: {
          name: "email",
          value: '',
          type: 'email',
          validLabel: 'Email',
          label: 'Email',
          errorMessage: 'Email is not valid',
          valid: false,
          placeholder: " ",
          touched: false,
          wrapperClassName: "credentials-form-item",
          formName: "form-register",
          inputClass: "credentials-form-item__text",
          labelClass: "form__label",
          iClass: "envelope-o",
          validation: {
            required: true,
            email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          }
        },
        password: {
          name: "password",
          value: '',
          validLabel: 'Password',
          label: 'Password',
          errorMessage: 'Min 6 characters',
          valid: false,
          touched: false,
          placeholder: " ",
          wrapperClassName: "credentials-form-item",
          formName: "form-register",
          inputClass: "credentials-form-item__text",
          labelClass: "form__label",
          iClass: "key",
          eye: true,
          validation: {
            required: true,
            minLength: 6
          }
        },
        checkbox: {
          name: "form-register_agree-terms-conditions",
          type: 'checkbox',
          label: 'Agree terms conditions',
          errorMessage: 'Click me',
          valid: false,
          wrapperClassName: "credentials-form-item credentials-form-item__checkbox",
          formName: "form-register",
          inputClass: "credentials-form-item_input",
          labelClass: "form__label credentials-form-item_label",
          validation: {
            required: true,
            checked: false
          }
        },
      },
      formValid: false
    };
  }

  checkValue(event, elem) {
    const dataInput = {...this.state.dataInput};
    const currentValue = event.target.value;
    let formValid = true;
    const switchLabel = (data) => {
      if (data.touched) {
        data.label = data.errorMessage
      } else {
        data.label = `${data.validLabel} success`
      }
    };

    const addValidValue = (isElementValid)=>{
      if (isElementValid) {
        dataInput[elem].valid = true;
        dataInput[elem].touched = false;
        dataInput[elem].value = currentValue;
      } else {
        dataInput[elem].valid = false;
        dataInput[elem].touched = true;
        dataInput[elem].value = '';
      }
    };

    if (dataInput[elem].validation.required) {
      switch (elem) {
        case 'username' :
          addValidValue(currentValue.length >= dataInput[elem].validation.minLength);
          switchLabel(dataInput[elem]);
          break;
        case 'password' :
          addValidValue(currentValue.length >= dataInput[elem].validation.minLength);
          switchLabel(dataInput[elem]);
          break;
        case 'email' :
          addValidValue(dataInput[elem].validation.email.test(currentValue));
          switchLabel(dataInput[elem]);
          break;
        case 'checkbox' :
          if (event.target.checked) {
            dataInput[elem].valid = true;
          } else dataInput[elem].valid = false;
          break;
      }
    }

    Object.keys(dataInput).forEach(type => {
      formValid = dataInput[type].valid && formValid;
    });
    this.setState({dataInput, formValid})
  };

  registration = (event, name, email, password, showPreloader, hidePreloader, modalShow, modalHide, users, setIsActive) => {
    event.preventDefault();
    showPreloader(3);
    const checkEmailToDatabase = (data) => {
      let checkEmail = true;
      Object.keys(data).forEach((user) => {
        if (data[user].email === email) {
          hidePreloader();
          modalShow(`ОШИБКА ${email}`, `Email ${email} уже использован в системе, просьба использовать другой адрес`);
          return checkEmail = false;
        }
      });
      return checkEmail
    };
    const checkLoginToDatabase = (data) => {
      if (data[name]) {

        hidePreloader();

        modalShow(`ОШИБКА ${name}`, `Пользователь ${name} уже создан в системе, просьба выбрать другое имя`);
        return false
      }
      return true
    };

    users.once("value", (snapshot) => {
          const dataUsers = snapshot.val();
          if (checkLoginToDatabase(dataUsers) && checkEmailToDatabase(dataUsers)) {
            //================
           //Firebase.registerInFirebase(name, email, password);
            //ошибки можно не обрабатывать, тк проввверили
            //==============
            const newUser = users.child(`/${name}`);
            newUser.update({
              userName: name,
              email: email,
              password: password,
            });

            hidePreloader();

            modalShow(`Поздравляем!`, `Пользователь "${name}" успешно зарегистрирован! Просьба войти в систему`);

            setIsActive((preAction) => !preAction);
          }
        }
    );
  };

  render() {
    const {users} = Firebase;
    const {showPasswordOrText, eyeShowHide, checkEye, hidePreloader, showPreloader, modalHide, modalShow, setIsActive} = this.props;
    const inputRender = () => {
      const inputs = Object.keys(this.state.dataInput).map((elem, index) => {
        const currentDataInput = this.state.dataInput[elem];
        return (
            <Wrapper className={currentDataInput.wrapperClassName}
                     tag={"section"}
                     key={currentDataInput.wrapperClassName + index}>
              <Input
                  key={elem + index}
                  id={currentDataInput.name}
                  type={currentDataInput.type ? currentDataInput.type : showPasswordOrText}
                  placeholder={currentDataInput.placeholder ? currentDataInput.placeholder : null}
                  inputClass={currentDataInput.inputClass}
                  labelClass={currentDataInput.labelClass}
                  onChange={(event) => this.checkValue(event, elem)}
              >
                <Icon name={currentDataInput.iClass}/>
                {currentDataInput.label}
              </Input>
              {!currentDataInput.eye ? null : (
                  <span className="form__eye">
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
                  </span>
              )}
            </Wrapper>
        )
      });
      return inputs
    };
    return (
        <form>
          {inputRender()}
          <MainButton
              className="credentials-form__btn form-register__btn"
              disabled={!this.state.formValid}
              onClick={(event) => {
                this.registration(event,
                    this.state.dataInput.username.value,
                    this.state.dataInput.email.value,
                    this.state.dataInput.password.value,
                    showPreloader,
                    hidePreloader,
                    modalShow,
                    modalHide,
                    users,
                    setIsActive)
              }}
          >
            Register
          </MainButton>
        </form>
    )
  }
}

export default withClass(FormRegister, "form-register", "section");