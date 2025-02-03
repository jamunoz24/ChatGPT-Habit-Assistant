import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

interface GoogleAuthProps {
  onSuccess: (userData: any) => void;
}

const GoogleAuth = ({ onSuccess} : GoogleAuthProps) => {
  const handleSuccess = (credentialResponse: any) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log('Login Success:', decoded);
    // Save user data to state or context
    onSuccess(decoded);
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;