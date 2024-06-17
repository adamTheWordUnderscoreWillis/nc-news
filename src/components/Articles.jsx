import { useEffect, useState } from "react"
import { GetArticles } from "../api"
const Articles =()=>{
const [articles, setArticles] = useState([])
const [isLoading, setIsLoading] = useState(true)

useEffect(()=>{
    setIsLoading(true)
    GetArticles().then(({articles})=>{
        setArticles(articles);
        setIsLoading(false);
        })

}, [])
 console.log(articles)
    return (
        <div className="Articles">
            <h2>Coolest New Articles</h2>
            <section className="articleHolder">
                {articles.map((article)=>{
                    return(
                    <div key={article.article_id} className = "articleCard">
                        <img className="articleImg" src={article.article_img_url} alt={article.title} />
                        <h3 className="cardTitle">{article.title}</h3>
                        <p className="classTopic">{article.topic}</p>
                    </div>
                    )

                })
                }
            </section>
        </div>
)
}
export default Articles