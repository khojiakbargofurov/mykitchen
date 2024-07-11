import { Minus, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { changeAmount, removeAll, removeProduct } from "../app/userSlice";
import { FormInput } from "../components";
import TrashIcon from "/public/trash.svg"
function Cart() {
  const { calculator } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  if (calculator.products.length == 0) {
    return (
      <>
        <div className="m-auto flex justify-center items-center h-[500px] max-w-[1220px]">
          <div className="flex flex-col text-center justify-center items-center">
            <img src="" alt="" />
            <h1 className="font-semibold text-[34px]">
              Your cart is empty and sad :{`(`}
            </h1>
            <p className="text-[16px] font-normal text-[#807D7E]">
              Add something to make it happy!
            </p>
            <Link to="/">
              <button className="mt-[50px] text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 hover:text-white duration-300 font-bold w-[250px] h-[61px] bg-[#8A33FD] rounded-[8px]">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="align-element mt-10">
        <h1 className="text-4xl font-bold pb-4">Shopping Cart</h1>
        <div className="grid lg:grid-cols-2 grid-cols-1">
          <div className="overflow-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Img</th>
                  <th>Name</th>
                  <th>Count</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {calculator.products.map((product) => {
                  return (
                    <tr key={product.id} >
                      <td>
                        <div className="avatar">
                          <div className="mask mask-squircle sm:h-12 w-10 sm:w-12 h-10">
                            <img
                              src={product?.images[0]}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="sm:w-20 w-16 font-bold  text-xl capitalize">{product.title}</div>
                        <div className="text-sm opacity-50">
                          {product.price} so'm
                        </div>
                      </td>
                      {/* {setPrises(prises + product.prise)} */}
                      <td>
                        <div className="flex items-center gap-2">
                          <button
                            className=" text-white btn-sm  btn btn-square btn-primary "
                            onClick={() =>
                              dispatch(
                                changeAmount({
                                  id: product.id,
                                  type: "increase",
                                })
                              )
                            }
                          >
                            <Plus/>
                          </button>
                          <h1 className=" text-indigo-950 btn-sm text-xl bg-teal-100 btn btn-square">
                            {product.amount}
                          </h1>
                          <button
                            className=" text-white btn-sm btn-secondary  btn-square btn"
                            onClick={() =>
                              dispatch(
                                changeAmount({
                                  id: product.id,
                                  type: "decrease",
                                })
                              )
                            }
                            disabled={product.amount == 1 ? true : false}
                          >
                            <Minus/>
                          </button>
                        </div>
                      </td>
                      <th>
                        <button
                          onClick={() => dispatch(removeProduct(product.id))}
                          className="btn btn-ghost btn-sm"
                        >
                          <Trash2 />
                        </button>
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="lg:mt-1 mt-10 mx-5 md:mr-10">
            <h3 className="text-xl">Order Summary</h3>
            <div className=" flex items-center gap-5 ">
              <FormInput placeholder="enter promocode" />
              <button className="btn mt-4 btn-primary sm:px-16">Apply</button>
            </div>
            <div>
              <div className="flex justify-between px-2 items-center py-2 mt-5 border-y-2 border-indigo-500">
                <h4 className="text-lg">Item {calculator.products.length}</h4>
                <h4>{calculator.price} so'm</h4>
              </div>
              <div className="">
                <div className="flex justify-between items-center px-2 pt-2">
                  <h5>Subtotal: </h5>
                  <h4>{calculator.price} so'm</h4>
                </div>
                <div className="flex justify-between items-center px-2  mt-5">
                  <h2 className="text-lg">Total:</h2>
                  <h4>{calculator.price} so'm</h4>
                </div>
              </div>
            </div>
            <button
              className="btn w-full mt-2"
              onClick={() => dispatch(removeAll(), toast.success("Thank you for your purchase"))}
              
            >
              Check out
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;