import { Link, useRouteError } from "react-router-dom";
import { Navbar } from "../components";
import Footer from "../components/Footer";

function Error() {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <>
      <Navbar/>
        <main className="grid min-h-[51.8vh] place-items-center px-8">
          <div className="text-center">
            <p className="text-9xl font-semibold text-primary">404</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
              Page not found
            </h1>
            <p className="mt-6 text-lg leading-7">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className="mt-10">
              <Link to="/">
                <button className="btn text-white hover:bg-[#4C4C4C] w-40 h-12 bg-black border-none rounded-lg">
                  Go back home
                </button>
              </Link>
            </div>
          </div>
        </main>
        <Footer/>
      </>
    );
  }

  return (
    <>
    <Navbar/>
      <main className="grid min-h-[51.8vh] place-items-center px-8">
        <h4 className="text-center font-bold text-4xl">
          There was an error...
        </h4>
        <div className="mt-10">
          <Link to="/">
            <button className="btn text-white hover:bg-[#4C4C4C] w-40 h-12 bg-black border-none rounded-lg">
              Go back home
            </button>
          </Link>
        </div>
      </main>
      <Footer/>
    </>
  );
}

export default Error;
