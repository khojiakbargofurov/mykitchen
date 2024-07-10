import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";
import { useCallback } from "react";

function useDelete() {
  const deleteTodo = useCallback(async (id) => {
    try {
      await deleteDoc(doc(db, "todos", id));
      toast.success("Deleted");
    } catch (error) {
      toast.error(error.message);
    }
  }, []);

  return deleteTodo;
}

export default useDelete;
