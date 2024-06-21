import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { addCommentbyArticleId, getCommentsByArticleID, removeCommentByCommentId } from "../api"

export const Comments = ({err, setErr, user, isLoading, setIsLoading})=>{
    const [articleComments, setArticleComments] = useState([])
    const [newComment, setNewComment] = useState("")
    const [isPosting, setIsPosting] = useState(false)
    const [isDeleting, setisDeleting] = useState(false)
    const {articleId} = useParams()

    useEffect(()=>{
        setIsLoading(true)
        getCommentsByArticleID(articleId)
        .then(({comments})=>{
            setArticleComments(comments)
        })
        setIsLoading(false)

    },[articleId, isPosting, isDeleting])

    const handleNewCommentChange = (event)=>{
        setNewComment(event.target.value)
    }
    const handleCommentSubmit = (event) =>{
        event.preventDefault()
        if(newComment === ""){
            setErr("You've not written anything,bud...")
        }
        else{
            setErr("")
            setIsPosting(true)
            event.target.disabled = true
            addCommentbyArticleId(articleId, user, newComment).then(()=>{
                event.target.disabled = false
                setIsPosting(false)
                setNewComment("")
            })
            .catch((err)=>{
                setErr("This shoddy thing's gone and broke...")
            })
        }
    }
    const handleDelete = (event)=>{
            const commentID = event.target.id
            setisDeleting(true)
            event.target.disabled = true
            removeCommentByCommentId(commentID).then(()=>{
                setisDeleting(false)
                event.target.disabled = false
            })
        

    }
        if(isLoading){
            return (
                <>
                <img className="loader" src="/src/assets/BusinessAdam.png" alt="" />
                <h3>Give me a second... for christ sake...</h3>
                </>
            )
        }
        if(isPosting){
            return(
                <>
                    <img className="loader" src="/src/assets/BusinessAdam.png" alt="" />
                    <h3>I'll let them know buddy, dont ya worry!</h3>
                </>
            )
        }
        return (
            <div>
        
        <form onSubmit={handleCommentSubmit}>
        <p className="Error">{err}</p>
        {isDeleting?<h3>Alright, I'll get rid of that for ya.</h3>: <></>}
        <label htmlFor="newComment">Write comment: </label>
        <textarea onChange={handleNewCommentChange} type="text" name="" id="newComment" />
        <button type="submit">Post comment</button>
        </form>
        <ul className="commentSection">
            {isDeleting?<h3>Alright, I'll get rid of that for ya.</h3>: <></>}
        
        {
        articleComments.map((comment)=>{
            return (<li key={comment.comment_id} className="commentCard">
                <header className="commentHeader">
                    <h5 className="commentHeaderAuthor">{comment.author}</h5>
                    <p className="commentHeaderDate">{comment.created_at}</p>
                </header>
                <p className="commentBody">{comment.body}</p>
                <p className="commentVote">Votes: {comment.votes}</p>
                {comment.author === user ? <button onClick={handleDelete} id={comment.comment_id} value={comment.author} className="deleteButton" type="button">X</button> : <></> }
                
            </li>)
        })}
        </ul>
    </div>
    )
}