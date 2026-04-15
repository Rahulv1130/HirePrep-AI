import { RouterProvider } from "react-router";
import {router} from './app.routes.jsx'
import Loader from "./features/auth/components/Loading.jsx";
import { useAuth } from "./features/auth/hooks/useAuth.js";
import { useInterview } from "./features/interview/hooks/useInterview.js";


const MainApp = () => {
  const { loading: authLoading } = useAuth();
  const { loading: interviewLoading } = useInterview();

  const loading = authLoading || interviewLoading;

  return (
    <>
      {loading && <Loader />}
      <RouterProvider router={router} />
    </>
  );
};

export default MainApp;