import { useSelector } from "react-redux";
import { Form, Link, useActionData, useNavigate } from "react-router-dom";
import { FormInput } from "../components";
import { useCollection } from "../hooks/userCollection";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let title = formData.get("title");
  let images = formData.get("images");
  let time = formData.get("time");
  let Ingredients = formData.get("Ingredients");
  let Method = formData.get("Method");
  let price = formData.get("price");
  let nation = formData.get("nation");
  let description = formData.get("description");
  return { title, images, time, Ingredients, Method, price, description, nation };
};

function Create() {
  const userData = useActionData();
  const { user } = useSelector((state) => state.user);
  const { data } = useCollection("todos", ["uid", "==", user.uid],);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [imagesList, setImagesList] = useState([]);
  const [images, setImages] = useState("");
  const [IngredientsList, setIngredientsList] = useState([]);
  const [Ingredients, setIngredients] = useState("");
  const [ingredientError, setIngredientError] = useState("");
  const [imageError, setImageError] = useState("");

  useEffect(() => {
    if (userData && user) {
      const addTodo = async () => {
        setLoading(true);
        const newTodo = {
          title: userData.title,
          images: imagesList,
          time: userData.time,
          description: userData.description,
          Ingredients: IngredientsList,
          uid: user.uid,
          price: +userData.price,
          nation: userData.nation,
        };

        try {
          await addDoc(collection(db, "todos"), newTodo);
          toast.success("New Todo Added");
          navigate("/"); // Redirect to home page after successful addition
        } catch (error) {
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
      };

      if (userData.title && userData.description) {
        addTodo();
      } else {
        toast.error("Please fill in all fields.");
      }
    }
  }, [userData, user, navigate]);

  const handleAddIngredient = () => {
    if (Ingredients) {
      if (IngredientsList.includes(Ingredients)) {
        setIngredientError("Ingredient already exists in the list.");
      } else {
        setIngredientsList((prevList) => [...prevList, Ingredients]);
        setIngredients("");
        setIngredientError("");
      }
    }
  };

  const handleAddImage = () => {
    if (images) {
      if (imagesList.includes(images)) {
        setImageError("Image already exists in the list.");
      } else {
        setImagesList((prevList) => [...prevList, images]);
        setImages("");
        setImageError("");
      }
    }
  };

  return (
    <div className="align-element mb-10">
      <div className="grid w-full justify-center">
        <div className="card bg-base-100 sm:w-96 w-80 shadow-xl p-8">
          <Form method="post" className="flex flex-col gap-5">
            <h2 className="text-3xl font-semibold">New Resipt</h2>
            <FormInput name="title" type="text" label="Meal name" placeholder="Enter your meal name" />

            <FormInput name="time" type="number" label="Meal preparation time (in minutes)" min="1" max="3600" placeholder="Enter Meal preparation time" />

            <FormInput name="price" type="number" label="Price (in sum)" placeholder="Enter meal's price " min="1" />

            <div className="max-w-xs flex flex-col">
              <label className="label-text capitalize mb-2">National Meal:</label>
              <select name="nation" className="select select-bordered w-full">
                <option>Uzbek</option>
                <option>Turkish</option>
                <option>French</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="label-text capitalize">Ingredients:</label>
              <div className="flex items-center gap-2 mt-2">
                <input
                  className="input input-bordered w-full"
                  type="text"
                  placeholder="Enter ingredients of meal"
                  name="Ingredients"
                  value={Ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  required={IngredientsList.length >= 3 ? false : true}
                />
                <button
                  type="button"
                  className="btn bg-primary text-white input-bordered w-20"
                  onClick={handleAddIngredient}
                >
                  +
                </button>
              </div>
              {ingredientError && <p className="text-red-500">{ingredientError}</p>}
              <h3 className="flex gap-2 py-2">
                Ingredients:
                <span className="flex text-sm">
                  {IngredientsList.length === 0 ? (
                    <h2>No Ingredients yet</h2>
                  ) : (
                    <ul className="flex flex-row flex-wrap  gap-1 ">
                      {IngredientsList.map((ingredient, index) => (
                        <li key={index} className=" flex max-w-xs">
                          <div>{ingredient},</div>
                        </li>
                      ))}
                    </ul>
                  )}
                </span>
              </h3>
            </div>

            <div>
              <label className="label-text capitalize">Image URL:</label>
              <div className="flex items-center gap-2 mt-2">
                <input
                  className="input input-bordered w-full"
                  type="url"
                  placeholder="Enter image URL"
                  name="images"
                  value={images}
                  onChange={(e) => setImages(e.target.value)}
                  required={imagesList.length >= 3 ? false : true}
                />
                <button
                  type="button"
                  className="btn bg-primary text-white input-bordered w-20"
                  onClick={handleAddImage}
                >
                  +
                </button>
              </div>
              {imageError && <p className="text-red-500">{imageError}</p>}
              <h3 className="flex flex-wrap items-center gap-2 py-2">
                Images:
                <span className="flex text-sm">
                  {imagesList.length === 0 ? (
                    <h2>No images yet</h2>
                  ) : (
                    <ul className="flex items-center gap-2">
                      {imagesList.map((img, index) => (
                        <li key={index} className="relative flex items-center">
                          <img className="w-20 rounded-md" src={img} alt="" />
                        </li>
                      ))}
                    </ul>
                  )}
                </span>
              </h3>
            </div>

            <div className="flex flex-col">
              <label className="label-text capitalize">Method:</label>
              <textarea
                required
                className="textarea textarea-bordered"
                name="description"
                minLength="50"
                placeholder="Enter meal's description"
              ></textarea>
            </div>

            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading ? "Adding..." : "Add"}
            </button>
            <Link to="/" className="btn btn-secondary btn-block">
              Cancel
            </Link>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Create;