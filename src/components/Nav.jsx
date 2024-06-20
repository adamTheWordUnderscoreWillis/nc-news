import { useEffect, useState } from "react"
import { GetAllTopics } from "../api"
import { Link } from "react-router-dom"

export const Nav = ()=>{
    const [allTopics, setAllTopics] = useState([])
    useEffect(()=>{
        GetAllTopics().then(({topics})=>{
            setAllTopics(topics)
        })
        
    }, [])
    const handleTopicChange = (event)=>{
        setSelectedTopic(event.target.value)
        
    }
    return(
        <nav>
            <Link key="home"to="/">Home</Link>
            {allTopics.map((topic)=>{
                return(
                        <Link key={topic.slug} to={`/${topic.slug}`}>{topic.slug}</Link>
                )
            })}
            
        </nav>
    )
}