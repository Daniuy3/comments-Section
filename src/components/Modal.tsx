
import { useCommentsStore } from '../store/store';
import { toast } from 'react-toastify';

function Modal() {

    const showModal = useCommentsStore((state) => state.showModal);
    const removeComment = useCommentsStore((state) => state.removeComment);
    const removeReply = useCommentsStore((state) => state.removeReply);

    const isReply = useCommentsStore((state) => state.isReply);

    function handleDelete(){
        if(isReply){
            removeReply();
        }
        else{
            removeComment();
        }
        toast("Comment deleted", {type: "error", autoClose: 2000});
    }
  return (
    < div className='fixed inset-0 flex items-center justify-center'>
        <div className='bg-darkBlue opacity-50 fixed inset-0 grid items-center'>
        
        </div>
        <div className='bg-white z-10 w-11/12 md:w-1/2 lg:w-1/4 rounded-lg px-10 py-5 text-darkBlue'>
        <h2 className='font-semibold text-center text-2xl'>Delete comment</h2>
        <p className='text-xl mt-10'>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
        <div className='flex justify-between mt-10'>
            <button 
                className='text-white font-bold uppercase rounded-lg py-2 px-3 bg-darkBlue hover:opacity-85 transition-opacity duration-300'
                onClick={() => showModal(false)}    
            >No, Cancel</button>
            <button 
                className='text-white font-bold uppercase rounded-lg py-2 px-3 bg-softRed hover:opacity-85 transition-opacity duration-300'
                onClick={handleDelete}
                >Yes, Delete</button>
        </div>
        </div>
    </div>
  )
}

export default Modal