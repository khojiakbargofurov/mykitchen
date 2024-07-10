import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const useCollection = (collectionName, whereData, orderData) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (whereData[2]) {
      let q = query(collection(db, collectionName), where(...whereData));

      if (orderData && Array.isArray(orderData) && orderData.length > 0) {
        q = query(q, orderBy(...orderData));
      }

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setData(data);
      });

      return () => unsubscribe();
    }
  }, [collectionName, whereData[2], orderData]);

  return { data };
};
