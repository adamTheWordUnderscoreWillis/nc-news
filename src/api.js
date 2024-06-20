
import axios from "axios";


const newsApi = axios.create({
    baseURL: "https://adam-willis-cool-news-hub.onrender.com",
});

export const GetArticles = (topic)=> {
    return newsApi
    .get("/api/articles", {params: {topic : topic}})
    .then(({data})=>{
        return data;
    })
}

export const GetAllTopics = ()=> {
    return newsApi
    .get("/api/topics")
    .then(({data})=>{
        console.log
        return data;
    })
}
export const GetArticleById = (articleID)=> {
    return newsApi
    .get(`/api/articles/${articleID}`)
    .then(({data})=>{
        return data;
    })
}

export const getCommentsByArticleID = (articleID)=>{
    return newsApi
    .get(`/api/articles/${articleID}/comments`)
    .then(({data})=>{
        return data;
    })
}
export const UpdatevoteByCommentId = (articleID, userThumb)=>{
    const incrementValue = {inc_votes: userThumb}
    return newsApi
    .patch(`/api/articles/${articleID}`, incrementValue)
}
export const addCommentbyArticleId = (articleID, user, comment)=>{
    const commentRequest = {
        username: user,
        body: comment
    }

    return newsApi
    .post(`/api/articles/${articleID}/comments`, commentRequest)
}

export const removeCommentByCommentId = (commentId)=> {
    return newsApi
    .delete(`/api/comments/${commentId}`)
}

