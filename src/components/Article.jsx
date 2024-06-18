import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { GetArticleById, UpdatevoteByCommentId, addCommentbyArticleId, getCommentsByArticleID } from "../api"
const ArticleById =({user})=>{
const [selectedArticle , setSelectedArticle] = useState("")
const [articleVotes, setArticleVotes] = useState()
const [isLoading, setIsLoading] = useState(true)
const [err, setErr] = useState(null);

const [articleComments, setArticleComments] = useState([])
const [newComment, setNewComment] = useState("")
const [commentCounter, setCommentCounter] = useState(0)
const [isThumbUp, setisThumbUp] = useState()
const [voteButtonIsSelected, setVoteButtonIsSelected] = useState({
    thumbUp: "unselected",
    thumbDown: "unselected"
})
const {articleId} = useParams()
useEffect(()=>{
    setIsLoading(true)
    GetArticleById(articleId)
    .then(({article})=>{
        setSelectedArticle(article)
        setArticleVotes(+article.votes)
        })
}, [articleId])
useEffect(()=>{
    getCommentsByArticleID(articleId)
    .then(({comments})=>{
        setArticleComments(comments)
    })
    setIsLoading(false)

},[articleId, commentCounter])

if(isLoading){
    return (<h3>Give me a second... for christ sake...</h3>)
    
}
const setVotes = (userThumb)=>{
    setArticleVotes(articleVotes + userThumb)
    UpdatevoteByCommentId(articleId, userThumb)
    .catch((err)=>{
        selectedArticle(articleVotes - userThumb)
    })
}

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

const handleArticleVoteChange = (event) => {
        const userThumb = +event.target.value
        if(userThumb === 1){
            if(isThumbUp === false){
                setVotes(userThumb+1)
                setisThumbUp(true)
                setVoteButtonIsSelected({
                    thumbUp: "selected",
                    thumbDown: "unselected"
                })
            }
            else if(isThumbUp === true){
                setisThumbUp()
                setVotes(-userThumb)
                setVoteButtonIsSelected({
                    thumbUp: "unselected",
                    thumbDown: voteButtonIsSelected.thumbDown
                })

                
            }
            else {
                setVotes(userThumb)
                setisThumbUp(true)
                setVoteButtonIsSelected({
                    thumbUp: "selected",
                    thumbDown: voteButtonIsSelected.thumbDown
                })
            }
        }
        else if(userThumb === -1){
            
            if(isThumbUp === false){
                setisThumbUp()
                setVotes(-userThumb)
                setVoteButtonIsSelected({
                    thumbUp: voteButtonIsSelected.thumbUp,
                    thumbDown: "unselected"
                })
            }
            else if(isThumbUp === true){
                setisThumbUp(false)
                setVotes(userThumb -1)
                setVoteButtonIsSelected({
                    thumbUp: "unselected",
                    thumbDown: "selected"
                })
            }
            else {
                setisThumbUp(false)
                setVotes(userThumb)
                setVoteButtonIsSelected({
                    thumbUp: voteButtonIsSelected.thumbUp,
                    thumbDown: "selected"
                })

            }
        }
}
    
    if(isLoading){
        return (<h3>Give me a second... for christ sake...</h3>)
    }
    return (
        <>
            <article >
                <div className="articleItem">
                    <h2>{selectedArticle.title}</h2>
                    <h3> by {selectedArticle.author}</h3>
                    <h4>{selectedArticle.topic}</h4>
                <p>{selectedArticle.body}</p>
                <div className="voting">
                    <button className={voteButtonIsSelected.thumbUp} onClick={handleArticleVoteChange} value="1">👍</button>
                    <button className={voteButtonIsSelected.thumbDown} onClick={handleArticleVoteChange} value="-1">👎</button>
                    <p>votes: {articleVotes}</p>
                </div>

                </div>
                <div className="articleItem">
                    <img src={selectedArticle.article_img_url} alt={selectedArticle.title} />
                </div>
            </article>
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
        </>
)
}
export default ArticleById