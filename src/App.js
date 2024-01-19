import { Routes, Route, Outlet } from "react-router-dom";
import {
  Home,
  LoginPage,
  SignupPage,
  Record,
} from "./pages";
import Loading from "./components/Loading";
import About from "./pages/About";
import LandingPage from "./pages/LandingPage";



// function Layout() {
//   return (
//       <div className='w-full flex flex-col min-h-screen px-4 md:px-10 2xl:px-28'>
//         { /*<Navbar /> */}
//         <div className='flex-1'>
//           <Outlet />
//         </div>
//         {/* <Footer /> */}
//       </div>
//   );
// }

function App() {
  const theme = "dark";
  const isLoading = false;

  return (
    <main className={theme}>
      <div className={`w-full min-h-sreen relative dark:bg-[#020b19] bg-white`}>
        <Routes>
            <Route path='/home' element={<Home />} />

          <Route path='/sign-up' element={<SignupPage />} />
          <Route path='/sign-in' element={<LoginPage />} />
          <Route path='/about' element={<About />} />
          <Route path = '/' element={<LandingPage/>} />
          <Route path = '/record' element={<Record />} />
        </Routes>

        {isLoading && <Loading />}
      </div>
    </main>
  );
}
export default App;
