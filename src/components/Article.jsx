import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { GetArticleById, getCommentsByArticleID } from "../api"
const ArticleById =()=>{
const [selectedArticle , setSelectedArticle] = useState("")
const [articleComments, setArticleComments] = useState([])
const [isLoading, setIsLoading] = useState(true)
const {articleId} = useParams()
useEffect(()=>{
    setIsLoading(true)
    GetArticleById(articleId)
    .then(({article})=>{
        setSelectedArticle(article)
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
    return (
        <>
            <article >
                <div className="articleItem">
                    <h2>{selectedArticle.title}</h2>
                    <h3> by {selectedArticle.author}</h3>
                    <h4>{selectedArticle.topic}</h4>
                <p>{selectedArticle.body}</p>

                </div>
                <div className="articleItem">
                    <img src={selectedArticle.article_img_url} alt={selectedArticle.title} />
                </div>
            </article>
            <ul className="commentSection">
                {articleComments.map((comment)=>{
                    return (<li className="commentCard">
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