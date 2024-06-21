import { useEffect, useState } from "react"
import { GetArticles } from "../api"
import { Link, useParams} from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


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
        <img className="madAdam" src="/images/grumpyAdam.png" alt="Adam's face but he's angry because you broke something" />
        <h3>{isWrongTopic}</h3>
    </div>
)
}
else if(isLoading){
    
    return (
    <>
    <img className="loader" src="/images/BusinessAdam.png" alt="" />
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
                    <Link to={`/articles/${article.article_id}`}>
                    <Card style={{ width: '8rem'}}
                            className="articleCard"
                            
                            bg="dark"
                            key="dark"
                            text='white'
                            border="light">
                        <Card.Img variant="top" src={article.article_img_url} />
                        <Card.Body >
                            <Card.Title className="cardTitle">{article.title}</Card.Title>
                        </Card.Body >
                        <Card.Footer className="cardFooter"> {article.topic}</Card.Footer>
                    </Card>
                    </Link> 
                    )
                })
                }
            </section>
        </div>
)
}
export default Articles