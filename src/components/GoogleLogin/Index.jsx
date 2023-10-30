import PropTypes from "prop-types";
import { useGoogleLogin } from "@react-oauth/google";
import { registerLoginWithGoogleAction } from "../../redux/actions/authAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

function GoogleLogin({ buttonText }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (responseGoogle) => dispatch(registerLoginWithGoogleAction(responseGoogle.access_token, navigate)),
  });

  return (
    <div className="mt-10">
      <button className="btn bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200" onClick={() => loginWithGoogle()}>
        <svg width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
          <path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z"></path>
        </svg>
        {buttonText}
      </button>
    </div>
  );
}

GoogleLogin.propTypes = {
  buttonText: PropTypes.string,
};

export default GoogleLogin;
