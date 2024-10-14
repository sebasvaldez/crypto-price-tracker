import { useEffect, useRef, useContext } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { AuthContext } from "../../context/AuthContext";


export const ReCaptcha = () => {

  const { setCaptchaToken } = useContext(AuthContext);


  const captcha = useRef(null);

  const onChangeCaptcha = () => {
    setCaptchaToken(captcha.current.getValue());
  };

  return (
    <>
      <ReCAPTCHA
        ref={captcha}
        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
        onChange={onChangeCaptcha}
      />
    </>
  );
};
