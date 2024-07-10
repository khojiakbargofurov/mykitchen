import { useState } from 'react';
import { useEffect } from 'react';

import { Form, Link, useActionData } from 'react-router-dom';

import { FormInput } from '../components';

//custom hooks
import { useRegister } from '../hooks/useRegister';

//action
export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  let displayName = formData.get("displayName");
  let photoURL = formData.get("photoURL")
  return { email, password, displayName, photoURL };
}

function Register() {
  const userData = useActionData();
  const { register, isPending, registerWithGoogle } = useRegister();

  const [errorInput, setErrorInput] = useState({
    email: "",
    password: "",
    displayName: "",
    photoURL: "",
  });

  useEffect(() => {
    if (userData) {
      if (
        userData.displayName &&
        userData.photoURL &&
        userData.email &&
        userData.password
      ) {
        register(
          userData.email,
          userData.password,
          userData.displayName,
          userData.photoURL
        );
      } else {
        if (
          userData.displayName ||
          userData.photoURL ||
          userData.email ||
          userData.password
        ) {
          if (!userData.password) {
            let name = {
              email: "",
              password: "input-error",
              displayName: "",
              photoURL: "",
            };
            setErrorInput(name);
          }
          if (!userData.photoURL) {
            let name = {
              email: "",
              password: "",
              displayName: "",
              photoURL: "input-error",
            };
            setErrorInput(name);
          }
          if (!userData.email) {
            let name = {
              email: "input-error",
              password: "",
              displayName: "",
              photoURL: "",
            };
            setErrorInput(name);
          }
          if (!userData.displayName) {
            let name = {
              email: "",
              password: "",
              displayName: "input-error",
              photoURL: "",
            };
            setErrorInput(name);
          }
        } else {
          let name = {
            email: "input-error",
            password: "input-error",
            displayName: "input-error",
            photoURL: "input-error",
          };
          setErrorInput(name);
        }
      }
    }
  }, [userData]);

  console.log(userData);
  return (
    <div className='grid lg:grid-cols-2 grid-cols-1 min-h-screen'>
      <div className="hidden lg:block h-full bg-[url('https://picsum.photos/1000/1800')] bg-cover bg-center"></div>
      <div className="h-full bg-slate-50 grid place-items-center lg:bg-none bg-[url('https://picsum.photos/1000/1800')] bg-cover bg-center">
        <div className='card bg-base-100 sm:w-96 shadow-xl p-8'>
          <Form method='post' className='flex flex-col items-center gap-5'>
            <h1 className='sm:text-3xl text-2xl font-semibold'>Register</h1>
            <FormInput
              type="name"
              label="displayName"
              name="displayName"
              placeholder="Enter your name"
              status={errorInput.displayName}
            />

            <FormInput
              type="url"
              label="photoURL"
              name="photoURL"
              placeholder="Enter your photo url"
              status={errorInput.photoURL}
            />


            <FormInput
              type="email"
              label="email"
              name="email"
              placeholder="Enter your email"

              status={errorInput.email}
            />

            <FormInput
              type="password"
              label="password"
              name="password"
              placeholder="Enter your password"
              status={errorInput.password}
            />

            <div className='w-full '>
              {!isPending && (<button className="btn btn-primary btn-block">Register</button>)}
              {isPending && (<button disabled className="btn btn-primary btn-block">Loading ...</button>)}
            </div>
          </Form>

          {!isPending && (
            <div className="w-full mt-5">
              <button
                onClick={registerWithGoogle}
                className="btn btn-neutral btn-block"
              >
                Google
              </button>
            </div>
          )}
          {isPending && (
            <div className="w-full mt-5">
              <button disabled className="btn btn-neutral btn-block">
                Loading...
              </button>
            </div>
          )}

          <Link to="/login" className='w-full mt-5 flex justify-between'>
            <h3>
              Have an Account?
            </h3>
            <span className='font-bold'>Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
