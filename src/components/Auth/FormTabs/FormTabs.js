import React from 'react';
import MainButton from "../../UI/Buttons/MainButton/MainButton";

const FormTabs = (props) => {
  const {styleTabsSlider, styleButtonTabSignIn, styleButtonTabRegister, setIsActive} = props;
  return (
      <section className="form-tabs">
        <div
            style={styleTabsSlider}
            className="form-tabs__slider"
        >
        </div>
        <MainButton
            className="form-tabs__btn form-tabs__btn_sign-in"
            type="button"
            onClick={() => setIsActive(false)}
            style={styleButtonTabRegister}
        >
          {"Register"}
        </MainButton>

        <MainButton
            className="form-tabs__btn form-tabs__btn_register"
            type="button"
            onClick={() => setIsActive(true)}
            style={styleButtonTabSignIn}
        >
          {"Sign In"}
        </MainButton>
      </section>
  )
};
export default FormTabs;