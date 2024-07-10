import toast from "react-hot-toast";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
// redux
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../app/userSlice";
import { useEffect, useState } from "react";

//img
import HomeIcon from "/public/home.svg"
import CreateIcon from "/public/create.svg"
import ChartIcon from "/public/chart.svg"
import WeatherIcon from "/public/weather.svg"

function Navbar() {
  const dispatch = useDispatch();
  const [weather, setWeather] = useState("");
  const [error, setError] = useState(null);
  const { calculator } = useSelector((state) => state.user);
  
  const amount = calculator.amount;

  const API_KEY = "39a2bcf93a5e2cc9bbf3119ffc0fb61a";

  useEffect(() => {
    const getWeather = (lat, lon) => {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Ob havo ma'lumotlari yuklanmadi");
          }
          return response.json();
        })
        .then((data) => {
          setWeather(data);
        })
        .catch((error) => {
          setError(error.message);
        });
    };

    const location = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            getWeather(latitude, longitude);
          },
          (error) => {
            setError(error.message);
          }
        );
      } else {
        setError("Geolokatsiya topilmadi");
      }
    };

    location();
  }, []);

  let iconurl = "";
  if (weather) {
    const iconcode = weather.weather[0].icon;
    iconurl = `http://openweathermap.org/img/w/${iconcode}.png`;
  }


  const { user } = useSelector((state) => state.user);

  const logOutProfile = async () => {
    try {
      await signOut(auth);
      toast.success("See you soon");
      dispatch(logout());
    } catch (error) {
      toast.error(error.message);
    }
  };


  return (
    <div className="bg-base-200 md:mb-8 mb-2">
      <div className="navbar align-element">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-40 p-2 shadow">
              <li>
                <Link to="/" >
                  <h5 className="font-bold text-[15px]">Home</h5>
                  <img src={HomeIcon} alt="home icon" className="w-5" />
                </Link>
              </li>
              <li>
                <Link to="/create">
                  <h5 className="font-bold text-[15px]">Create</h5>
                  <img src={CreateIcon} alt="create" className="w-5" />
                </Link>
              </li>
              <li>
                <Link to="/charts">
                  <h5 className="font-bold text-[15px]">Charts</h5>
                  <img src={ChartIcon} alt="chart icon" className="w-5" />
                </Link>
              </li>
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl font-bold">MyKitchen</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu  menu-horizontal px-1">
            <li>
              <Link to="/" className="justify-between">
                <h5 className="font-bold text-[18px]">Home</h5>
                <img src={HomeIcon} alt="home icon" className="w-5" />
              </Link>
            </li>
            <li>
              <Link to="/create">
                <h5 className="font-bold text-[18px]">Create</h5>
                <img src={CreateIcon} alt="create" className="w-5" />
              </Link>
            </li>
            <li>
              <Link to="/charts">
                <h5 className="font-bold text-[18px]">Charts</h5>
                <img src={ChartIcon} alt="chart icon" className="w-5" />
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">

          {/* cart */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="badge badge-sm indicator-item">{amount}</span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
              <div className="card-body rounded-lg">
                <span className="text-lg font-bold">{amount} Items</span>
                <span className="text-info">Total price: {calculator.price}</span>
                <div className="card-actions">
                  <Link to="/cart">
                    <button className="btn btn-primary  ">Go cart</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* weather */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <img className="w-8" src={WeatherIcon} alt="wheather" />
              </div>
            </div>
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">{weather.name}</span>
                  <img src={iconurl} alt="weather icon" />
                </div>
                <span className="text-info">Temperature: {weather.main?.temp}°C </span>

                <span className="text-info">Wind: {weather.wind?.speed} m/s </span>
              </div>
            </div>
          </div>

          {/* profil */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-7 rounded-full">
                {user ? (
                  <img alt="photo" src={user.photoURL} />
                ) : (
                  <img
                    alt="user avatar"
                    src="https://st3.depositphotos.com/23594922/31822/v/1600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
                  />
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 gap-1 rounded-box z-[1]  w-52 shadow">
              <li>
                <h2 className="font-bold">{user.displayName}</h2>
              </li>
              <li>
                <label className="swap swap-rotate bg-secondary my-1 py-1">
                  <input type="checkbox" className="theme-controller" value="dark" />

                  <svg
                    className="swap-off h-6 w-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                  </svg>

                  <svg
                    className="swap-on h-6 w-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                  </svg>
                </label>
              </li>
              <li>
                <button className="py-2 bg-primary text-center text-white" onClick={logOutProfile}>
                  Logout
                </button>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Navbar
