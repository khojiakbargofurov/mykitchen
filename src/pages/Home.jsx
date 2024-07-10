import { useSelector } from "react-redux";
import { Form, useActionData } from "react-router-dom";
import { FormInput } from "../components";
import TodoList from "../components/TodoList";
import { useCollection } from "../hooks/userCollection";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let title = formData.get("title");
  let completed = formData.get("completed");
  return { title, completed };
};

function Home() {
  const userData = useActionData();
  const { user } = useSelector((state) => state.user);
  const { data } = useCollection("todos", ["uid", "==", user.uid]);


  return (
    <div>
      <div>
        {data && <TodoList data={data} />}
      </div>
    </div>
  );
}

export default Home;
