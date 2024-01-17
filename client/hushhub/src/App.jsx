import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import authActions from "./redux/index";
import Header from "./components/Header";
import Login from "./components/Auth/Login"
import Home from "./components/Home";
import Add from "./components/Add"

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(localStorage.getItem("userId")){
      dispatch(authActions.login());
    }
  },[dispatch])
  return (
    <div>
      <header>
        <Header />
      </header>
      <section>
        <Routes>
          <Route path="/" element={<Home />}>
            {" "}
          </Route>
          <Route path="/login" element={<Login />}></Route>
          {isLoggedIn && (
            <Route path="/add" element={<Add />} />
          )}
        </Routes>
      </section>
    </div>
  );
}

export default App;

// export const RecoveryContext = createContext();
// function App() {
  // const [page, setPage] = useState("login");
  // const [email, setEmail] = useState();
  // const [otp, setOTP] = useState();

  // function NavigateComponents() {
  //   if (page === "login") return <Login />;
  //   if (page == "register") return <Register />;
  //   if (page === "otp") return <OTPInput />;
  //   if (page === "reset") return <Reset />;

  //   return <Recovered />;
  // }

  // return (
  //   <RecoveryContext.Provider
  //     value={{ page, setPage, otp, setOTP, setEmail, email }}
  //   >
  //     <div className="flex justify-center items-center">
  //       <NavigateComponents />
  //     </div>
  //   </RecoveryContext.Provider>
  // );
// }

