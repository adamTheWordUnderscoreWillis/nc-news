import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { GetArticleById, UpdatevoteByCommentId, addCommentbyArticleId, getCommentsByArticleID } from "../api"
import { Comments } from "./comments"
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
const ArticleById =({user, isLoading, setIsLoading})=>{
const [selectedArticle , setSelectedArticle] = useState("")
const [articleVotes, setArticleVotes] = useState()
const [err, setErr] = useState(null);
const [isWrongArticle, setIsWrongArticle]= useState()

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
        setIsWrongArticle(); 
        setArticleComments(comments)
        setIsLoading(false)
    })
    .catch(({response})=>{
        setIsWrongArticle(response.data.msg)
    })

},[articleId, commentCounter])

if(isWrongArticle){
    
    return (
    <div className="errorCard">
        <img className="madAdam" src="/images/grumpyAdam.png" alt="Adam's face but he's angry because you broke something" />
        <h3>{isWrongArticle}</h3>
    </div>
)
}
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
    return (
        <>
        <img className="loader" src="/images/BusinessAdam.png" alt="" />
        <h3>Give me a second... for christ sake...</h3>
        </>
    )
}
    return (
        <>
            <Container >
                <Row>
                    <Col>
                    <h1>{selectedArticle.title}</h1>
                    <h2> by {selectedArticle.author}</h2>
                    </Col>
                    <Col >
                    <Image id="articleImage" src={selectedArticle.article_img_url} fluid />
                    <p className="topicTag">{selectedArticle.topic}</p>
                    </Col>
                </Row>
                <Row id="articleHeader">
                    <Col>
                    <p className="articleText">{selectedArticle.body}</p>
                    </Col>

                </Row>
            </Container>
                <Container >
                    <Row className="voting">
                        <Col>
                        <Badge size="lg" bg="danger">Votes: {articleVotes}</Badge>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                    <button id="thumbUp" className={voteButtonIsSelected.thumbUp} onClick={handleArticleVoteChange} value="1">👍</button>
                    <button id="thumbDown" className={voteButtonIsSelected.thumbDown} onClick={handleArticleVoteChange} value="-1">👎</button>
                        </Col>
                    </Row>
               

                </Container>
           {<Comments err={err} setErr={setErr} user={user} isLoading={isLoading} setIsLoading={setIsLoading}/>}
        </>
)
}
export default ArticleById