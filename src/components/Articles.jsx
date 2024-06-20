import { useEffect, useState } from "react"
import { GetArticles } from "../api"
import { Link, useParams } from "react-router-dom"


const Articles =({isLoading, setIsLoading})=>{

const [articles, setArticles] = useState([])
const  {topic} = useParams()
useEffect(()=>{
    setIsLoading(true)
    GetArticles(topic).then(({articles})=>{
        setArticles(articles);
        setIsLoading(false);
        })
}, [topic])

if(isLoading){
    
    return (
    <>
    <img className="loader" src="/src/assets/BusinessAdam.png" alt="" />
    <h3>Give me a second... for christ sake...</h3>
    </>
)
    
}
    return (
        <div className="Articles">
            <h2>Coolest New Articles</h2>
            <section className="articleHolder">
                {articles.map((article)=>{
                    return(
                    <Link to={`/articles/${article.article_id}`}
                    key={article.article_id} 
                    className = "articleCard">
                        <img id={article.article_id} className="articleImg" src={article.article_img_url} alt={article.title} />
                        <h3 id={article.article_id} className="cardTitle">{article.title}</h3>
                        <p id={article.article_id} className="classTopic">{article.topic}</p>
                        
                    </Link>
                    )

                })
                }
            </section>
        </div>
)
}
export default Articles