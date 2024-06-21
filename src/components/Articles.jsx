import { useEffect, useState } from "react"
import { GetArticles } from "../api"
import { Link, useParams} from "react-router-dom"


const Articles =({isLoading, setIsLoading, searchParams})=>{

const [articles, setArticles] = useState([])
const [isWrongTopic, setIsWrongTopic] = useState()
const  {topic} = useParams()
const sortBy = searchParams.get("sort_by")
const orderBy = searchParams.get("order")
useEffect(()=>{
    setIsLoading(true)
    GetArticles(topic, sortBy, orderBy)
    .then(({articles})=>{
        setIsWrongTopic();
        setArticles(articles);
        setIsLoading(false);   
    })
    .catch(({response})=>{
        setIsWrongTopic(response.data.msg);
    })  
}, [topic, sortBy, orderBy])

if(isWrongTopic){
    
    return (
    <div className="errorCard">
        <img className="madAdam" src="/src/assets/grumpyAdam.png" alt="Adam's face but he's angry because you broke something" />
        <h3>{isWrongTopic}</h3>
    </div>
)
}
else if(isLoading){
    
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