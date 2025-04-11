import { Suspense } from "react";
import AppRouter from "@app/providers/RouterProvider";
import { MainLayout } from "@shared/layouts/MainLayout/MainLayout";
import { Header } from "@widgets/Header";
import { Footer } from "@widgets/Footer";
import { Sidebar } from "@widgets/Sidebar";
import { SmoothTransition } from "@shared/ui/SmoothTransition";
// import { useSelector } from "react-redux";
// import { getUserAuthData, getUserInited, initUserAuthData } from "@entities/user";
// import { useAppDispatch } from "@shared/hooks";
// import { PageLoader } from "@shared/ui";
// import { useNavigate } from "react-router-dom";

function App() {
  // const inited = useSelector(getUserInited);
  // const dispatch = useAppDispatch();
  // const auth = useSelector(getUserAuthData);
  // const navigate = useNavigate();
   
  // useEffect(() => {
  //   dispatch(initUserAuthData());
  // }, [dispatch]);
  //
  // useEffect(() => {
  //   if (inited && !auth) {
  //     navigate("/login");
  //   }
  // }, [auth, navigate]);

  // if (!inited) {
  //   return <PageLoader />;
  // }

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <SmoothTransition>
        <MainLayout
          header={<Header />}
          content={<AppRouter />}
          sidebar={<Sidebar />}
          footer={<Footer />}
        />
      </SmoothTransition>
    </Suspense>
  );
}

export default App;
