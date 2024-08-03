import { useState } from "react";
import { useCommentsStore } from "../store/store";
import { reply, SelfComment } from "../types";
import {toast} from "react-toastify";



type CommentProps = {
    comment: SelfComment | reply,
    replyintTo?: reply["replyingTo"]
}
function Comment({comment, replyintTo}: CommentProps) {
    const changeScore = useCommentsStore((state) => state.changeScore);
    const addReply = useCommentsStore((state) => state.addReply);
    const editComment = useCommentsStore((state) => state.editComment);
    const editReply = useCommentsStore((state) => state.editReply);
    const showModal = useCommentsStore((state) => state.showModal);
    const setID = useCommentsStore((state) => state.setID);
    const setReply = useCommentsStore((state) => state.setReplying);

    const currentUser = useCommentsStore((state) => state.currentUser);
    const darkTheme = useCommentsStore((state) => state.darkTheme);

    const [replying, setReplying] = useState(false); /* Valido si se esta respondiendo o no */
    const [editing, setEditing] = useState(false); /* Valido si se esta editando o no */
    


    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const validated = e.currentTarget.reply.value.trim();

        if(validated){
            const newReply: reply = {
                id: Math.random(),
                content: validated,
                score: 0,
                createdAt: new Date().toLocaleDateString(),
                user: currentUser,
                replyingTo: comment.user.username
            }
            addReply(newReply);
            toast.success("Reply posted", {type: "success", autoClose: 2000});

            setReplying(false);
        }
        else{
            toast.error("Reply can't be empty", {type: "error", autoClose: 2000});
        }
    }
    function handleReply(){

        if(replying){
            toast.error("You are already replying to this comment", {type: "error", autoClose: 2000});
        }
        else{
            setReplying(true);
        }
    }
    function handleScore(id: SelfComment["id"], score: SelfComment["score"], action:string){
        const isReply = replyintTo ? true : false;

        if(action === "add"){
            score += 1;
            changeScore(id, score, isReply);
        }
        else if(action === "sub" && score > 0){
            score -= 1;
            changeScore(id, score, isReply);
        }
    }
    function handleEditComment(){
        const newText = (document.getElementById("editingText") as HTMLTextAreaElement).value.trim();

        if(newText){
            editComment(comment.id, newText);
            setEditing(false);
            toast("Comment updated", {type: "success", autoClose: 2000});
        }
    }
    function handleEditReply(){
        const newText = (document.getElementById("editingText") as HTMLTextAreaElement).value.trim();
        if(newText){
            editReply(comment.id, newText);
            setEditing(false);
            toast("Reply updated", {type: "success", autoClose: 2000});
        }
    }
    async function handleDelete(){
        setID(comment.id);
        setReply(replyintTo ? true : false);
        showModal(true);

    }
    
return (
    <>
        
        <div className={`${darkTheme?("bg-dark-mode-800") : ("bg-white")} px-5 rounded-lg p-5 w-full flex gap-5 transition-colors duration-300`}>
        <div className={` flex-col justify-center gap-2 items-center py-1 px-3  rounded-lg w-11 hidden md:flex ${darkTheme? "bg-dark-mode-600" : "bg-lightGray"}`}>
                    <img
                        src="/icon-plus.svg"
                        alt="+"
                        className="w-3 h-3 hover:cursor-pointer"
                        onClick={() => handleScore(comment.id, comment.score, "add")}
                    />
                    <p className={`font-semibold ${darkTheme? "text-white" : "text-moderateBlue"}`}>{comment.score}</p>
                    <img
                        src="/icon-minus.svg"
                        alt="-"
                        className="w-3 h-1 hover:cursor-pointer"
                        onClick={() => handleScore(comment.id, comment.score, "sub")}
                    />
        </div>
            <div className={darkTheme? "text-white" : "text-grayishBlue"}>
            <div className="flex gap-3 items-center">
                <img src={comment.user.image.png} alt="User" className="w-12 h-12" />
                <h2 className="font-bold text-lg">{comment.user.username}</h2>
                <p >{comment.createdAt}</p>
                {!replyintTo && (
                    <div className=" gap-2 items-center hidden md:flex hover:cursor-pointer hover:opacity-45 transition-opacity duration-300 ml-auto">
                        <img src="/icon-reply.svg" alt="Reply" className="w-3 h-3" />
                        <p className="text-moderateBlue font-semibold" onClick={handleReply}>
                            Reply
                        </p>
                    </div>
                )}
                {comment.user.username === currentUser.username && !editing && (
                    <div className=" gap-4 ml-auto hidden md:flex">
                        <div 
                            className="flex gap-2 items-center hover:cursor-pointer hover:opacity-45 transition-opacity duration-300"
                            onClick={() => setEditing(true)}
                        >
                            <img src="/icon-edit.svg" alt="Edit" className="w-3 h-3" />
                            <p className="text-moderateBlue font-semibold">Edit</p>
                        </div>
                        <div 
                            className="flex gap-2 items-center hover:cursor-pointer hover:opacity-45 transition-opacity duration-300"
                            onClick={handleDelete}
                        >
                            <img src="/icon-delete.svg" alt="Delete" className="w-3 h-3" />
                            <p className="text-softRed font-semibold">Delete</p>
                        </div>
                    </div>
                )}
            </div>
            <p className="mt-5 font-normal">
                <span className="font-semibold text-moderateBlue">
                    {replyintTo && `@${replyintTo} `}
                </span>
                {editing ? (
                    <>
                        <textarea id="editingText" placeholder="Edit your text here" className={`w-full ${darkTheme? "bg-dark-mode-800" : "bg-white"}`}>
                            {comment.content}
                        </textarea>
                    </>
                ) : comment.content}
                
            </p>
            <div className="flex justify-between mt-5">
                <div className={`flex gap-2 items-center py-1 px-3 ${darkTheme? "bg-dark-mode-600" : "bg-lightGray"} rounded-lg md:hidden`}>
                    <img
                        src="/icon-plus.svg"
                        alt="+"
                        className="w-3 h-3 hover:cursor-pointer"
                        onClick={() => handleScore(comment.id, comment.score, "add")}
                    />
                    <p className="font-semibold">{comment.score}</p>
                    <img
                        src="/icon-minus.svg"
                        alt="-"
                        className="w-3 h-1 hover:cursor-pointer"
                        onClick={() => handleScore(comment.id, comment.score, "sub")}
                    />
                </div>
                {!replyintTo && (
                    <div className="flex gap-2 items-center hover:cursor-pointer hover:opacity-45 transition-opacity duration-300 md:hidden">
                        <img src="/icon-reply.svg" alt="Reply" className="w-3 h-3" />
                        <p className="text-moderateBlue font-semibold" onClick={handleReply}>
                            Reply
                        </p>
                    </div>
                )}
                {comment.user.username === currentUser.username && !editing && (
                    <div className="flex gap-4 md:hidden">
                        <div 
                            className="flex gap-2 items-center hover:cursor-pointer hover:opacity-45 transition-opacity duration-300"
                            onClick={() => setEditing(true)}
                        >
                            <img src="/icon-edit.svg" alt="Edit" className="w-3 h-3" />
                            <p className="text-moderateBlue font-semibold">Edit</p>
                        </div>
                        <div 
                            className="flex gap-2 items-center hover:cursor-pointer hover:opacity-45 transition-opacity duration-300"
                            onClick={handleDelete}
                        >
                            <img src="/icon-delete.svg" alt="Delete" className="w-3 h-3" />
                            <p className="text-softRed font-semibold">Delete</p>
                        </div>
                    </div>
                )}
                {editing && (
                    <button 
                        className=" bg-moderateBlue font-semibold py-2 px-5 mt-5 rounded-lg hover:cursor-pointer text-white"
                        onClick={replyintTo? handleEditReply : handleEditComment}
                    >Update</button>
                )}
            </div>
            </div>
        </div>
        {replying && (
            <form className={`${darkTheme? "bg-dark-mode-800" : "bg-white"} px-5 rounded-lg p-5 flex justify-center items-center gap-5`} onSubmit={handleSubmit}>
                <textarea name="reply" placeholder="Reply..." className={`${darkTheme? "bg-dark-mode-800" : "bg-white"}  w-1/2 text-grayishBlue`}></textarea>
                <input type="submit" value="Reply" className=" bg-moderateBlue font-semibold py-2 px-5 mt-5 rounded-lg hover:cursor-pointer text-white" />
            </form>
        )}
    </>
);
}

export default Comment