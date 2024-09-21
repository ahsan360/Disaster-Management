import { useEffect, useState } from "react";
import axios from "axios";

const useAuthUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/server/get_auth_user/",
          {
            withCredentials: true, // Include cookies for session-based authentication
          }
        );
        setUser(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};

export default useAuthUser;
