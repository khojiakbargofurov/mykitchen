import { useState } from "react";
import { useCollection } from "../hooks/userCollection";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { addProduct } from "../app/userSlice";

import KitchenIcon from "/public/kitchen.svg"
import { BookType, CircleDollarSign, Clock, Minus, NotebookText, Plus, ShoppingBasket } from "lucide-react";
import { toast } from "react-hot-toast";

function Retsept() {
  const params = useParams();
  const { user } = useSelector((state) => state.user);
  const { data } = useCollection("todos", ["uid", "==", user.uid]);
  const dataId = data?.filter((id) => id.id == params.id)[0];
  const dispatch = useDispatch();

  const [productAmount, setProductAmount] = useState(1);

  const setAmount = (type) => {
    if (type == "decrease" && productAmount > 1) {
      setProductAmount((prev) => prev - 1);
    } else if (type == "increase") {
      setProductAmount((prev) => prev + 1);
    }
  };
  const addToBag = () => {
    const newProdact = {
      ...dataId,
      amount: productAmount,
    };
    toast.success("Add Retcept ")
    dispatch(addProduct(newProdact));
  };

  return (
    <>
      <main className="align-element ">
        <div className="">
          <div className="mb-20">
            <h2 className="my-5 text-2xl font-bold">Recipe details</h2>
            <div className="flex flex-col gap-10">
              <div className="carousel carousel-center space-x-4 rounded-box h-[272px] max-w-6xl bg-neutral p-4 mr-5 justify-between">
                {dataId &&
                  dataId?.images?.map((img) => {
                    return (
                      <div key={img} className="carousel-item">
                        <img src={img} className="w-96 h-60  object-cover " />
                      </div>
                    );
                  })}
              </div>
              <div>
                <h2 className="mb-5 text-2xl font-bold capitalize flex gap-2">
                  <img src={KitchenIcon} alt="kitchen icon" />Meal Name: {dataId?.title}
                </h2>
                <div className="mb-5 flex items-start gap-2">
                  <span className="font-semibold  text-xl  flex gap-2">
                    <ShoppingBasket />
                    Ingrediens: </span>
                  <ul className="flex flex-wrap gap-2">
                    {dataId &&
                      dataId?.Ingredients?.map((Ingredient) => {
                        return (
                          <li key={Ingredient}>
                            <div className="badge badge-ghost">
                              {Ingredient},
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                </div>
                <div className="mb-5">
                  <span className="font-semibold  text-xl  flex gap-2 items-center">
                    <Clock />
                    Cooking time:
                    <span className="ml-2 font-normal">
                      {dataId?.time} minutes
                    </span>
                  </span>
                </div>
                <div className="mb-5">
                  <span className="font-semibold  text-xl  flex gap-2">
                    <CircleDollarSign />
                    Prise:
                    <span className="ml-2 font-normal">{dataId?.price} so'm</span>
                  </span>
                </div>
                <div className="flex gap-2 items-top">
                  <h3 className="mb-2 font-semibold text-xl flex gap-2"><BookType /> Nation:</h3>
                  <p className="mb-5 text-xl">{dataId?.nation} meal</p>
                </div>
                <h3 className="mb-2 text-xl font-semibold flex gap-2 items-center"><NotebookText />Method:</h3>
                <p className="mb-5 text-xl text-justify pr-5">{dataId?.description}</p>
                <div className="sm:flex bleck items-center w-full justify-between">
                  <div className="flex items-center gap-2 sm:mb-0 mb-10">
                    <div className="flex items-center gap-2 text-center shadow-2xl">
                      <button
                        onClick={() => setAmount("increase")}
                        className="btn btn-square btn-secondary "
                      >
                        <Plus />
                      </button>
                      <h3 className="font-bold text-4xl w-full px-2 text-center">{productAmount}</h3>
                      <button
                        onClick={() => setAmount("decrease")}
                        className="btn btn-square btn-secondary "
                        disabled={productAmount == 1 ? true : false}
                      >
                        <Minus />
                      </button>
                    </div>
                    <button onClick={addToBag} className="btn btn-secondary">
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
                      Add to bag
                    </button>
                  </div>
                  <Link className="btn btn-primary w-24" to="/">
                    Back
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Retsept;