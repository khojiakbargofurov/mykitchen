// firebase
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

// react
import { useState } from "react";

// redux
import { login } from "../app/userSlice";
import { useDispatch } from "react-redux";

// notifications
import { toast } from "react-hot-toast";

export const useRegister = () => {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);

  const register = async (email, password, displayName, photoURL) => {
    setIsPending(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });

      const user = userCredential.user;
      setIsPending(false);
      dispatch(login(user));
      toast.success(`Welcome ${user.displayName}`);
    } catch (error) {
      toast.error(error.message);
      setIsPending(false);
    }
  };

  const registerWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      toast.success(`Welcome, ${user.displayName}`);
      dispatch(login(user));
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { isPending, registerWithGoogle, register };
};
