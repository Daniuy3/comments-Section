import { motion } from "framer-motion";
import { useCommentsStore } from "../store/store";
import { reply } from "../types";
import Comment from "./Comment";

type RepliesProps = {
    replies: reply[];
}

function Replies({replies}: RepliesProps) {

  const darkTheme = useCommentsStore((state) => state.darkTheme);
  
  return (
    <motion.div 
      className="flex gap-4 pl-2"
      layout
    >
        <motion.div 
          className={`w-2 ${darkTheme? "bg-white" : "bg-grayishBlue"} opacity-10 min-h-max rounded-lg`}
          initial={{scaleY: 0}}
          animate={{scaleY: 1}}  
          transition={{duration: 0.5}}
        ></motion.div>
        <div className="grid gap-3">
        {replies.map((reply) => (
           <Comment key={reply.id} comment={reply} replyintTo={reply.replyingTo}/> 
        ))}
        </div>
    </motion.div>
  )
}

export default Replies