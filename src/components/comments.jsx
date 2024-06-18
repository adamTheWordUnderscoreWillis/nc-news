import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { addCommentbyArticleId, getCommentsByArticleID } from "../api"

export const Comments = ({err, setErr, user, isLoading, setIsLoading})=>{
    const [articleComments, setArticleComments] = useState([])
    const [newComment, setNewComment] = useState("")
    const [commentCounter, setCommentCounter] = useState(0)
    const {articleId} = useParams()

    useEffect(()=>{
        getCommentsByArticleID(articleId)
        .then(({comments})=>{
            setArticleComments(comments)
        })
        setIsLoading(false)

    },[articleId, commentCounter])

    const handleNewCommentChange = (event)=>{
        setNewComment(event.target.value)
    }
    const handleCommentSubmit = (event) =>{
        event.preventDefault()

        const newCommentSubmit = {
            comment_id: "new",
            body: newComment,
            username: user,
            created_at: "Just Now",
            votes: 0
        }
        setArticleComments([...articleComments, newCommentSubmit])
        addCommentbyArticleId(articleId, user, newComment).then(()=>{
            setCommentCounter(commentCounter+1)
        })
        .catch((err)=>{
            setErr("This shoddy thing's gone and broke...")
        })
    }
    return (
    <div>
        <form onSubmit={handleCommentSubmit}>
        <p className="Error">{err}</p>
        <label htmlFor="newComment">Write comment: </label>
        <input onChange={handleNewCommentChange} type="text" name="" id="newComment" />
        <button type="submit">Post comment</button>
        </form>
        <ul className="commentSection">
        {articleComments.map((comment)=>{
            return (<li key={comment.comment_id} className="commentCard">
                <header className="commentHeader">
                    <h5 className="commentHeaderAuthor">{comment.author}</h5>
                    <p className="commentHeaderDate">{comment.created_at}</p>
                </header>
                <p className="commentBody">{comment.body}</p>
                <p className="commentVote">Votes: {comment.votes}</p>
            </li>)
        })}
        </ul>
    </div>
    )
}