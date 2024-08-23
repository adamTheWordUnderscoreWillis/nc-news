import { useEffect, useState } from "react";
import { GetArticles } from "../api";
import { Link, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Articles = ({ isLoading, setIsLoading, searchParams }) => {
  const [articles, setArticles] = useState([]);
  const [isWrongTopic, setIsWrongTopic] = useState();
  const { topic } = useParams();
  const sortBy = searchParams.get("sort_by");
  const orderBy = searchParams.get("order");
  useEffect(() => {
    setIsLoading(true);
    GetArticles(topic, sortBy, orderBy)
      .then(({ articles }) => {
        setIsWrongTopic();
        setArticles(articles);
        setIsLoading(false);
      })
      .catch(({ response }) => {
        setIsWrongTopic(response.data.msg);
      });
  }, [topic, sortBy, orderBy]);

  if (isWrongTopic) {
    return (
      <div className="errorCard">
        <img
          className="madAdam"
          src="/images/grumpyAdam.png"
          alt="Adam's face but he's angry because you broke something"
        />
        <h3>{isWrongTopic}</h3>
      </div>
    );
  } else if (isLoading) {
    return (
      <>
        <img className="loader" src="/images/BusinessAdam.png" alt="" />
        <h3>Give me a second... for christ sake...</h3>
      </>
    );
  }
  return (
    <div className="Articles">

      <Container fluid>
        <Row>
          {articles.map((article) => {
            return (
                <Col id="cardCol">
                  <Card
                    style={{ width: "12rem" }}
                    className="articleCard"
                    key="dark"
                    text="white"
                    border="light"
                  >
                  <Link to={`/articles/${article.article_id}`}>
                    <Card.Img variant="top" src={article.article_img_url} />
                    <Card.Body className="cardBody">
                      <Card.Title className="cardTitle">
                        {article.title}
                      </Card.Title>
                    </Card.Body>
                    <Card.Footer className="cardFooter">
                      {" "}
                      {article.topic}
                    </Card.Footer>
              </Link>
                  </Card>
                </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};
export default Articles;
