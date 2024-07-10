import { Link } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";

function TodoList({ data }) {
  console.log(data);
  return (
    <div>
      <div className="align-element px-5 mb-24 mt-8">
        {data.length > 0 ? (
          <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 place-items-center ">
            {
              data.map((todo) => (
                <div key={todo.id} className="card bg-base-100 max-w-96 shadow-xl sm:h-[550px] h-[50px] ">
                  <img src={todo?.images[0]} alt="image" className="object-cover w-96 h-60 rounded-2xl" />
                  <div className="card-body">
                    <h2 className="card-title capitalize font-bold">Name: {todo.title}</h2>
                    <p className="line-clamp-6"><span className="font-semibold">Description:</span> {todo.description}</p>
                    <p> Time: {todo.time}</p>
                    <div className="card-actions justify-end">
                      <Link to={`/retsepts/${todo.id}`}>
                        <button className="btn btn-secondary">See Retcept</button>
                      </Link>
                      <button onClick={() => {
                        deleteDoc(doc(db, "todos", todo.id))
                          .then(() => {
                            toast.success("Deleted");
                          })
                          .catch((error) => {
                            toast.error(error.message);
                          });
                      }} className="btn btn-secondary">delete</button>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        ) : (
          <div className="h-full flex flex-col md:mt-52 sm:mt-40 mt-20 items-center justify-center gap-5">
            <h1 className="font-bold sm:text-3xl text-xl ">Your Kitchen Recipes list is empty</h1>
            <Link to="/create">
              <button className="btn btn-primary w-72 font-bold text-xl">
                Create
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoList;
