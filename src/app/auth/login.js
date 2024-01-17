import { GoogleLogin } from "react-google-login";

const clientId =
  "821687526755-4a7n1niuf8phj6qtes2olnmhugs46sft.apps.googleusercontent.com";

function Login() {
  const onSuccess = (res) => {
    console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
  };

  const onFailure = (res) => {
    console.log("LOGIN FAILED! ", res);
  };
  
  return (
    <div id="signInButton">
      <GoogleLogin
        clientId={clientId}
        buttonText="login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      ></GoogleLogin>
    </div>
  );
}

export default Login;
