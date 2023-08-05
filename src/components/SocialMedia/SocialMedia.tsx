import './social-media.scss';
import GoogleIcon from '../Icons/GoogleIcon';
import GitHubIcon from '../Icons/GitHubIcon';

interface IProps {
  signinByGoogle: () => void;
  signinByGithub: () => void;
}

export default function SocialMedia({ signinByGoogle, signinByGithub }: IProps) {
  return (
    <div className="social-media">
      <div className="media-item" onClick={signinByGoogle}>
        <GoogleIcon />
        <span>Continue with Google</span>
      </div>
      <div className="media-item" onClick={signinByGithub}>
        <GitHubIcon />
        <span>Continue with Github</span>
      </div>
    </div>
  );
}
