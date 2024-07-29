import { useEffect} from "react";
import { useCommentsStore } from "./store/store";
import Comment from "./components/Comment";
import Replies from "./components/Replies";
import Modal from "./components/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { reply } from "./types";

function App() {
  const fetchComments = useCommentsStore((state) => state.fetchComments);
  const addComment = useCommentsStore((state) => state.addComment);

  const data = useCommentsStore((state) => state.data);
  const currentUser = useCommentsStore((state) => state.currentUser);
  const modal = useCommentsStore((state) => state.modal);

  useEffect(() => {
    fetchComments();
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = document.getElementById("textSubmit") as HTMLInputElement;
    const validated = text.value.trim();

    if (validated) {

      const newComment = {
        id: Math.random(),
        content: validated,
        score: 0,
        createdAt: new Date().toLocaleDateString(),
        user: currentUser,
        replies: [] as reply[],
      };

      addComment(newComment);
      text.value = "";
    }
    else{
      toast("comment can't be empty", {type: "error", autoClose: 2000});
    }
  }

  return (
    <>
      <main className="container mt-10 mx-auto text-moderateBlue">
        <h1 className="text-center font-bold text-2xl">Comments Section</h1>
        <section className="flex flex-col gap-5 mt-10 w-full">
          {data.map((comment) => (
            <>
              <Comment key={comment.id} comment={comment} />
              <Replies key={comment.user.image.webp} replies={comment.replies} />
            </>
          ))}
        </section>
        <section className="mt-10">
          <form className="mt-5 cotainer mx-auto bg-white flex justify-between p-10 items-center rounded-lg" onSubmit={handleSubmit}>
            <textarea className="p-3 rounded-lg w-1/2 text-darkBlue" placeholder="Add a comment" id="textSubmit"></textarea>
            <input type="submit" className="bg-moderateBlue text-white font-semibold py-2 px-5 mt-5 rounded-lg" value="Post" />
          </form>
        </section>
        <ToastContainer />
        {modal && <Modal />}
      </main>
    </>
  );
}

export default App;
