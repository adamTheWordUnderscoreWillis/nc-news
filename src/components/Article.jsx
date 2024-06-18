import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { GetArticleById, UpdatevoteByCommentId, getCommentsByArticleID } from "../api"
const ArticleById =()=>{
const [selectedArticle , setSelectedArticle] = useState("")
const [articleComments, setArticleComments] = useState([])
const [articleVotes, setArticleVotes] = useState()
const [isLoading, setIsLoading] = useState(true)
let [isThumbUp, setisThumbUp] = useState()
let [voteButtonIsSelected, setVoteButtonIsSelected] = useState({
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
    getCommentsByArticleID(articleId)
    .then(({comments})=>{
        setArticleComments(comments)
    })
    setIsLoading(false)

}, [articleId])

if(isLoading){
    return (<h3>Give me a second... for christ sake...</h3>)
    
}
const setVotes = (userThumb)=>{
    setArticleVotes(articleVotes + userThumb)
    UpdatevoteByCommentId(articleId, userThumb)
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