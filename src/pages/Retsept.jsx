import { useState } from "react";
import { useCollection } from "../hooks/userCollection";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useParams } from "react-router-dom";
import { addProduct } from "../app/userSlice";

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

    dispatch(addProduct(newProdact));
  };
  return (
    <>
      <main className="align-element">
        <div className="">
          <div className="mb-20">
            <h2 className="mb-5 text-2xl font-semibold">Recipe elements</h2>
            <div className="flex flex-col gap-10">
              <div className="carousel carousel-center space-x-4 rounded-box bg-neutral p-4 mr-5  justify-between">
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
                <h2 className="mb-5 text-2xl font-semibold">{dataId?.title}</h2>
                <div className="mb-5 flex items-start gap-2">
                  <span className="font-semibold">Ingrediens: </span>
                  <ul className="flex flex-wrap gap-2">
                    {dataId &&
                      dataId?.Ingredients?.map((Ingredient) => {
                        return (
                          <li key={Ingredient}>
                            <div className="badge badge-neutral">
                              {Ingredient}
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                </div>
                <div className="mb-5">
                  <span className="font-semibold">
                    Cooking time:
                    <span className="ml-2 font-normal">
                      {dataId?.time} minutes
                    </span>
                  </span>
                </div>
                <div className="mb-5">
                  <span className="font-semibold">
                    Prise:
                    <span className="ml-2 font-normal">{dataId?.price} so'm</span>
                  </span>
                </div>
                <div className="flex gap-5 items-start">
                  <h3 className="mb-2 font-semibold">Nation:</h3>
                  <p className="mb-5">{dataId?.nation}</p>
                </div>
                <div className="flex gap-5 items-start">
                  <h3 className="mb-2 text-xl font-semibold">Method:</h3>
                  <p className="mb-5">{dataId?.Method}</p>
                </div>
                <div className="sm:flex bleck items-center w-full justify-between">
                  <div className="flex items-center gap-2 sm:mb-0 mb-10">
                    <button
                      onClick={() => setAmount("increase")}
                      className="btn btn-secondary"
                    >
                      +
                    </button>
                    <h3>{productAmount}</h3>
                    <button
                      onClick={() => setAmount("decrease")}
                      className="btn btn-secondary "
                      disabled={productAmount == 1 ? true : false}
                    >
                      -
                    </button>
                    <button onClick={addToBag} className="btn btn-primary">
                      ad to bag
                    </button>
                  </div>
                  <a className="btn btn-secondary ml-auto" href="/">
                    Back
                  </a>
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