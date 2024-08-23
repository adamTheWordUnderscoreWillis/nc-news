import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { addCommentbyArticleId, getCommentsByArticleID, removeCommentByCommentId } from "../api"
import Toast from 'react-bootstrap/Toast';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
            console.log(event)
            const commentID = event.target.id
            setisDeleting(true)
            event.target.disabled = true
            removeCommentByCommentId(commentID).then(()=>{
                setisDeleting(false)
                event.target.disabled = false
            })
        

    }
    const formatDate = (date)=>{
        const event = new Date(date)
        return event.toDateString()
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
        

        <Form onSubmit={handleCommentSubmit}>
            <Form.Group>
            <Form.Control onChange={handleNewCommentChange} as="textarea"placeholder={`Tell us what you REALLY think, ${user}... `} rows={1} />
            </Form.Group>
            <Button variant="dark" type="submit" style={{marginTop:"10px"}}>
                Submit
            </Button>
        </Form>
        <ul className="commentSection">
            {isDeleting?<h3>Alright, I'll get rid of that for ya.</h3>: <></>}
        
        {
        articleComments.map((comment)=>{
            return (
            <li key={comment.comment_id} className="commentCard">
                {/* <header className="commentHeader">
                    <h5 className="commentHeaderAuthor">{comment.author}</h5>
                    <p className="commentHeaderDate">{comment.created_at}</p>
                </header>
                <p className="commentBody">{comment.body}</p>
                <p className="commentVote">Votes: {comment.votes}</p>
                {comment.author === user ? <button onClick={handleDelete} id={comment.comment_id} value={comment.author} className="deleteButton" type="button">X</button> : <></> } */}
                <Toast bg="dark" onClose={handleDelete}>
      <Toast.Header closeButton={false}>
        <strong className="me-auto">{comment.author}</strong>
        <small>{formatDate(comment.created_at)}</small>
      </Toast.Header>
      <Toast.Body>{comment.body}</Toast.Body>
    </Toast>
    <Badge bg="danger">Votes: {comment.votes}</Badge>
    {comment.author === user ? <Button variant="light" size= "sm" onClick={handleDelete} id={comment.comment_id} value={comment.author} className="deleteButton" type="button">Delete Comment</Button> : <></> }
            </li>)
        })}
        </ul>
    </div>
    )
}