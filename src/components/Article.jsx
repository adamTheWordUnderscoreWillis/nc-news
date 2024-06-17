import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { GetArticleById } from "../api"
const ArticleById =()=>{
const [selectedArticle , setSelectedArticle] = useState("")
const {articleId} = useParams()
useEffect(()=>{
    GetArticleById(articleId).then(({article})=>{
        setSelectedArticle(article)
        })
}, [articleId])

console.log(selectedArticle)
    return (
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
)
}
export default ArticleById