import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  saveAuthData,
  setAuthLoading,
} from "../../features/authData/authDataSlice";
import { getUserData } from "../../api/endpoints/auth";
import { useNavigate } from "react-router-dom";
import { Mosaic } from "react-loading-indicators";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function PersistLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function refreshUserData() {
      try {
        const response = await getUserData();
        dispatch(
          saveAuthData({
            userId: response.data.user.id,
            allUserData: response.data.user,
            userRole: response.data.user.role,
          })
        );
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        dispatch(setAuthLoading(false));
        navigate("/");
      } finally {
        setLoading(false);
      }
    }
    refreshUserData();
  }, [dispatch, navigate]);

  return loading ? (
    <div className="w-full h-screen flex justify-center items-center bg-my-color">
      <Mosaic color={["#7a6a1d", "#a38d27", "#ccb131", "#d7c159"]} />
    </div>
  ) : (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}
