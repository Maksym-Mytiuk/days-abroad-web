import { useNavigate } from 'react-router-dom';
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import firebase, { type Provider } from '../../services/Firebase';
import { ROUTES } from '../../router';

import SocialMedia from '../../components/SocialMedia';
import './signin.scss';

export default function SignUp() {
  const navigation = useNavigate();

  async function signin(provider: Provider) {
    try {
      await firebase.signin(provider);
      navigateToHomePage();
    } catch (error) {
      console.error(error);
    }
  }

  function navigateToHomePage() {
    navigation(ROUTES.HOME);
  }

  return (
    <div className="wrapper">
      <div className="form-container">
        <div className="col signin-wrapper">{/* <Button>Sign in</Button> */}</div>
        <div className="col signup-wrapper">
          <h1>Sign In</h1>
          {/* <form onSubmit={handleSubmit}> */}
          {/* </form> */}
          <SocialMedia
            signinByGoogle={() => signin(new GoogleAuthProvider())}
            signinByGithub={() => signin(new GithubAuthProvider())}
          />
        </div>
      </div>
    </div>
  );
}
