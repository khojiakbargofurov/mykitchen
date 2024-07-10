//firebase
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../firebase/firebaseConfig"

//react
import { useState } from "react"

//redux
import { login } from "../app/userSlice"
import { useDispatch } from "react-redux"

import { toast } from "react-hot-toast"

export const useLogin = () => {
  const dispatch = useDispatch();
  const [isPending, setisPending] = useState(false)

  const loginUser = async (email, password) => {
    setisPending(true);
    
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email, 
        password);

      const user = userCredential.user;
      setisPending(false)
      dispatch(login(user))
      setisPending(false)
      toast.success(`Welcome ${user.displayName}`)
    } catch (error) {
      toast.error(error.message)
      setisPending(false)
    }
  };
  return { isPending, loginUser }
};