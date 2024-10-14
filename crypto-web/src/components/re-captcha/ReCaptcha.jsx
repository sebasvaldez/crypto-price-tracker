import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export const ReCaptcha = () => {

    

  const captcha = useRef(null);

  const onChangeCaptcha = () => {
    console.log(captcha.current.getValue());


  };



  return (
    <>
      <ReCAPTCHA
        ref={captcha}
        sitekey="6LeUv14qAAAAAGclFOFvwtuagS3FGSC3JSQe7AiA"
        onChange={onChangeCaptcha}
      />
    </>
  );
};
