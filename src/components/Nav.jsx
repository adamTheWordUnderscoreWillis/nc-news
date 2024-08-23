import { useEffect, useState } from "react"
import { GetAllTopics } from "../api"
import { Link} from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export const Navigator = ({searchParams,setSearchParams})=>{
    const [allTopics, setAllTopics] = useState([])
    const [orderDropdownLabels, setOrderDropdownLabels] = useState({
        ASC: "Hot",
        DESC: "Lame"
    })

    const sort_by = searchParams.get("sort_by")

    useEffect(()=>{
        if(!sort_by || sort_by === "articles.article_id"){
            setOrderDropdownLabels(
                {
                    ASC:"Coolest",
                    DESC: "Lamest"}
            )
        }
        else if(sort_by === "created_at"){
            setOrderDropdownLabels(
                {
                    ASC:"Most Recent",
                    DESC: "Most Ancient"}
            )
        }
        if(!sort_by || sort_by === "votes"){
            setOrderDropdownLabels(
                {
                    ASC:"Most Loved",
                    DESC: "Most hated"}
            )
        }
        if(!sort_by || sort_by === "count"){
            setOrderDropdownLabels(
                {
                    ASC:"Most comments",
                    DESC: "Least Comments"}
            )
        }
        
    },[sort_by])

    useEffect(()=>{
        GetAllTopics().then(({topics})=>{
            setAllTopics(topics)
        })
    }, [])
    const setSortOrder = (selectedKey) => {
        const direction = selectedKey
        const newParams = new URLSearchParams(searchParams);
        newParams.set('order', direction);
        setSearchParams(newParams);
      };
      const setSortBy = (selectedKey) => {
        const category = selectedKey
        const newParams = new URLSearchParams(searchParams);
        newParams.set('sort_by', category);
        setSearchParams(newParams);
      };
      

    return(
        <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
        <Container>
        <Navbar.Brand href="/">
              <img
                alt=""
                src="/images/branding.png"
                height="30"
                className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link key="home" href="/">home</Nav.Link>
        {allTopics.map((topic)=>{
                return(
                        <Nav.Link key={topic.slug} href={`/${topic.slug}`}>{topic.slug}</Nav.Link>
                )
            })}
              <NavDropdown title="sort by" id="sort by" activeKey={"articles.article_id"} onSelect={setSortBy}>
                <NavDropdown.Item eventKey={"articles.article_id"}>Adam's Picks</NavDropdown.Item>
                <NavDropdown.Item eventKey={"created_at"}>Date</NavDropdown.Item>
                <NavDropdown.Item eventKey={"votes"}>Votes</NavDropdown.Item>
                <NavDropdown.Item eventKey={"count"}>Top Comments</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="order" id="order" activeKey={"DESC"} onSelect={setSortOrder}>
                <NavDropdown.Item eventKey={"DESC"}>{orderDropdownLabels.ASC}</NavDropdown.Item>
                <NavDropdown.Item eventKey={"ASC"}>{orderDropdownLabels.DESC}</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}