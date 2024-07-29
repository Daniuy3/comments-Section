
import { create } from "zustand";
import axios from "axios";
import { arrayComment, reply, SelfComment, user } from "../types";
import { dataSchema } from "../schema/schema";
import { devtools } from "zustand/middleware";

type useCommentsStoreProps = {
    fetchComments: () => Promise<void>,
    data: arrayComment,
    currentUser: user,
    modal: boolean,
    activeId: SelfComment["id"],
    isReply: boolean,
    orderData: () => void,
    changeScore: (id: SelfComment["score"], score: SelfComment["score"], isReply:boolean) => void,
    addReply: (newReply: reply) => void,
    addComment: (newComment: SelfComment) => void,
    editComment: (id: SelfComment["id"], content: SelfComment["content"]) => void,
    editReply: (id: reply["id"], content: reply["content"]) => void,
    showModal: (status: boolean) => void,
    removeComment: () => void,
    removeReply: () => void,
    setID: (id: SelfComment["id"]) => void,
    setReplying: (status: boolean) => void
}
export const useCommentsStore = create<useCommentsStoreProps>()(devtools(((set) =>({
    data: [] as arrayComment,
    currentUser: {} as user,
    modal: false,
    isReply: false,
    activeId: 0,
    fetchComments: async () => {
        const url = "../data.json";
        const {data} = await axios(url);
        
        const result = dataSchema.safeParse(data);

        
        if(result.success){
            set({currentUser: result.data.currentUser, data: result.data.comments});
        }
    },
    orderData : () =>{
        set((state) => {

            const newData = state.data.sort((a,b) => {
                return b.score - a.score;
            })
            return {data: newData}
        })
    },
    changeScore:(id: SelfComment["score"], score: SelfComment["score"], isReply: boolean) => {
        set((state) => {
            const newData = state.data.map((comment) => {
                if(comment.id === id){
                    return {...comment, score}
                }
                else if(isReply){
                    const newReplies = comment.replies.map((reply) => {
                        if(reply.id === id){
                            return {...reply, score}
                        }
                        return reply
                    })
                    return {...comment, replies: newReplies}
                }
                return comment
            })
            return {data: newData}
        })  
    },
    addReply: (newReply: reply) => {
        set((state) => {
            const newData = state.data.map((comment) => {
                if(comment.user.username === newReply.replyingTo){
                    return {...comment, replies: [...comment.replies, newReply]}
                }
                return comment
            })
            return {data: newData}
        })
    },
    addComment: (newComment: SelfComment) => {
        set((state) => {
            const newData = [...state.data, newComment];
            return {data: newData}
        })
    },
    editComment: (id: SelfComment["id"], content: SelfComment["content"]) => {
        set((state) => {
            const newData = state.data.map(comment =>{
                if(comment.id === id){
                    return {...comment, content}
                }
                return comment
            })
            return {data: newData}
        })
    },
    editReply: (id: reply["id"], content: reply["content"]) => {
        set((state) => {
            const newData = state.data.map(comment => {
                const newReplies = comment.replies.map(reply => {
                    if(reply.id === id){
                        return {...reply, content}
                    }
                    return reply
                })
                return {...comment, replies: newReplies}
            })
            return {data: newData}
        })
    },
    removeComment: () => {
        console.log("remove comment")
        set(state => {
            console.log(state.activeId)
            const newData = state.data.filter(comment => comment.id !== state.activeId);
            return {data: newData, modal: false}
        }) 

    },
    removeReply: () => {
        console.log("remove reply")
        set(state => {
            console.log(state.activeId)
            const newData = state.data.map(comment => {
                const newReplies = comment.replies  .filter(reply => reply.id !== state.activeId);
                return {...comment, replies: newReplies}
            })
            return {data: newData, modal: false}
        })
    },
    showModal: (status : boolean) => {
        set({modal: status})
    },
    setID: (id: SelfComment["id"]) => {
        set({activeId: id})
    },
    setReplying: (status: boolean) => {
        set({isReply: status})
    }
}))))