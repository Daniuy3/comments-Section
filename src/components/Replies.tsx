import { reply } from "../types";
import Comment from "./Comment";

type RepliesProps = {
    replies: reply[];
}
function Replies({replies}: RepliesProps) {
  return (
    <div className="flex gap-4 pl-2">
        <div className="w-1 bg-grayishBlue opacity-10 min-h-max rounded-lg"></div>
        <div className="grid gap-3">
        {replies.map((reply) => (
           <Comment key={reply.id} comment={reply} replyintTo={reply.replyingTo}/> 
        ))}
        </div>
    </div>
  )
}

export default Replies