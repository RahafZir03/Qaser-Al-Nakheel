import AppRouter from "./router/routers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppWithErrorBoundary from "./ErrorBoundary";
import AppWrapper from "./ChangeLayout";

function App() {
  return (
    <>
      <AppWithErrorBoundary>
        <AppWrapper>
          <AppRouter />
        </AppWrapper>
      </AppWithErrorBoundary>
      <ToastContainer
        theme="dark"
        limit={2}
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
