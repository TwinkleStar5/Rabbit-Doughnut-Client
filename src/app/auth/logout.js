import { GoogleLogout } from "react-google-login";

const clientId =
  "821687526755-4a7n1niuf8phj6qtes2olnmhugs46sft.apps.googleusercontent.com";

function Logout() {
  const onSuccess = (res) => {
    console.log("Log out successful");
  };

  return (
    <div id="signOutButton">
      <GoogleLogout
        clientId={clientId}
        buttonText="login"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;
