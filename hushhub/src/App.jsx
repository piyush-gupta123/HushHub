import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import authActions from "./redux/index";
import Header from "./components/Header";
import Login from "./components/Login";
import Home from "./components/Home";
import Add from "./components/Add";
import "./styles/globals.css";
import Signup from "./components/signup";

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.login());
    }
  }, [dispatch]);
  return (
    <>
      <div className="main">
        <div className="gradient" />
      </div>
      <main>
        <header>
          <Header />
        </header>
        <section>
          <Routes>
            <Route path="/" element={<Home />}>
              {" "}
            </Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />} />
            {isLoggedIn && <Route path="/add" element={<Add />} />}
          </Routes>
        </section>
      </main>
    </>
  );
}

export default App;
