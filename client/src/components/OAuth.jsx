import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess, signInFailure, signInStart } from '../redux/user/userSlice';
import {useNavigate} from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch(); // Correctly initialize dispatch
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      dispatch(signInStart()); // Dispatch start action before API call
      
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      
      const user = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      };

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!res.ok) throw new Error('Failed to authenticate with backend');

      const data = await res.json();
      dispatch(signInSuccess(data)); // Correctly dispatch success action
      navigate('/');
    } catch (error) {
      dispatch(signInFailure()); // Dispatch failure action
      console.error("Google sign-in failed:", error.message);
    }
  };

  return (
    <button 
      onClick={handleGoogleClick} 
      type="button" 
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
    >
      Continue With Google!
    </button>
  );
}
