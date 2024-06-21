import { useEffect, useState } from "react"
import { GetAllTopics } from "../api"
import { Link} from "react-router-dom"
import Dropdown from 'react-bootstrap/Dropdown';

export const Nav = ({searchParams,setSearchParams})=>{
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
    const setSortOrder = (event) => {
        const direction = event.target.value
        const newParams = new URLSearchParams(searchParams);
        newParams.set('order', direction);
        setSearchParams(newParams);
      };
      const setSortBy = (event) => {
        const category = event.target.value
        const newParams = new URLSearchParams(searchParams);
        newParams.set('sort_by', category);
        setSearchParams(newParams);
      };
      

    return(
        <nav>
            <Link key="home"to="/">Home</Link>
            {allTopics.map((topic)=>{
                return(
                        <Link key={topic.slug} to={`/${topic.slug}`}>{topic.slug}</Link>
                )
            })}

            <select onChange={setSortBy} name="searchCriteria" id="">
                <option disabled>Sort By</option>  
                <option value="articles.article_id">Adam's picks</option>  
                <option value="created_at">Date</option>  
                <option value="votes">Votes</option>
                <option value="count">Top Comments</option>  
            </select>
            <select onChange={setSortOrder} name="order" id="">
                <option value="" disabled>Order</option>  
                <option value={"DESC"}>{orderDropdownLabels.ASC}</option>  
                <option value={"ASC"}>{orderDropdownLabels.DESC}</option>  
            </select>
            
        </nav>
    )
}