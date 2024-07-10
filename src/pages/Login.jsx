import { useEffect, useState } from 'react';
import { Form, Link, useActionData } from 'react-router-dom';

import { FormInput } from '../components';

import { useLogin } from '../hooks/useLogin';
import { useRegister } from '../hooks/useRegister';

//action
export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  return { email, password };
}

function Login() {
  const userData = useActionData();
  const { loginUser, isPending } = useLogin();
  const { isPending: isPendingUseRegister, registerWithGoogle } = useRegister();

  const [errorInput, setErrorInput] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (userData) {
      if (userData.email && userData.password) {
        loginUser(userData.email, userData.password);
      } else {
        if (userData.email || userData.password) {
          if (!userData.password) {
            let name = {
              email: "",
              password: "input-error",
            };
            setErrorInput(name);
          }
          if (!userData.email) {
            let name = {
              email: "input-error",
              password: "",
            };
            setErrorInput(name);
          }
          if (!userData.email) {
            let name = {
              email: "input-error",
              password: "",
            };
            setErrorInput(name);
          }
        } else {
          let name = {
            email: "input-error",
            password: "input-error",
          };
          setErrorInput(name);
        }
      }
    }
  }, [userData]);
  console.log(userData);
  return (
    <div className='grid lg:grid-cols-2 grid-cols-1 min-h-screen glass'>
      <div className="hidden lg:block h-full bg-[url('https://picsum.photos/1000/1800')] bg-cover bg-center"></div>
      <div className="h-full bg-slate-50 grid place-items-center lg:bg-none bg-[url('https://picsum.photos/1000/1800')] bg-cover bg-center">
        <div className='card bg-base-100 sm:w-96 shadow-xl p-8'>
          <Form method='post' className='flex flex-col items-center gap-5'>
            <h1 className='sm:text-3xl text-2xl font-semibold'>Login</h1>
            <FormInput type="email" label="email" name="email" placeholder="Enter your email" status={errorInput.email}/>
            <FormInput type="password" label="password" name="password" placeholder="Enter your password" status={errorInput.password} />

            <div className='w-full '>
              {!isPending && (<button className="btn btn-primary btn-block">Login</button>)}
              {isPending && (<button disabled className="btn btn-primary btn-block">Loading ...</button>)}
            </div>
          </Form>

          {!isPendingUseRegister && (
            <div className="w-full mt-5">
              <button
                onClick={registerWithGoogle}
                className="btn btn-neutral btn-block"
              >
                Google
              </button>
            </div>
          )}
          {isPendingUseRegister && (
            <div className="w-full mt-5">
              <button disabled className="btn btn-neutral btn-block">
                Loading...
              </button>
            </div>
          )}

          <Link to="/register" className='w-full mt-5 flex justify-between'>
            <h3>
              Dont have an Account?
            </h3>
            <span className='font-bold'>Register</span>
          </Link>

        </div>
      </div>
    </div>
  );
}

export default Login;
