import { Input } from "@chakra-ui/react";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import firebase from "firebase/compat/app";
import { phoneSignIn } from "../utils/auth";
import * as firebaseui from "firebaseui";

export default function Login() {
  //   firebase.auth().settings.appVerificationDisabledForTesting = true;
  // phone number
  // verification code
  // recaptcha

  var phoneNumber = "+16505554567";
  var testVerificationCode = "123456";
  const auth = getAuth();

  window.recaptchaVerifier = new RecaptchaVerifier(
    "sign-in-button",
    {
      size: "invisible",
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // onSignInSubmit();
      },
    },
    auth
  );

  const uiConfig = {
    signInSuccessUrl: "https://here-255e5.web.app/", //This URL is used to return to that page when we got success response for phone authentication.
    signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
    tosUrl: "https://here-255e5.web.app/",
  };
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  ui.start("#firebaseui-auth-container", uiConfig);

  //   const phoneNumber = getPhoneNumberFromUserInput();
  const appVerifier = window.recaptchaVerifier;

  //   phoneSignIn(phoneNumber, appVerifier);

  function submitPhoneNumberAuth() {
    // We are using the test phone numbers we created before
    // var phoneNumber = document.getElementById("phoneNumber").value;
    var phoneNumber = "+16005551234";
    var appVerifier = window.recaptchaVerifier;
    getAuth
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        window.confirmationResult = confirmationResult;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // This function runs when the 'confirm-code' button is clicked
  // Takes the value from the 'code' input and submits the code to verify the phone number
  // Return a user object if the authentication was successful, and auth is complete
  //   function submitPhoneNumberAuthCode() {
  //     // We are using the test code we created before
  //     // var code = document.getElementById("code").value;
  //     var code = "123456";
  //     confirmationResult
  //       .confirm(code)
  //       .then(function (result) {
  //         var user = result.user;
  //         console.log(user);
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   }

  //This function runs everytime the auth state changes. Use to verify if the user is logged in
  getAuth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("USER LOGGED IN");
    } else {
      // No user is signed in.
      console.log("USER NOT LOGGED IN");
    }
  });
  return (
    <>
      <Input placeholder="large size" size="lg" />
      <div id="firebaseui-auth-container"></div>
    </>
  );
}
