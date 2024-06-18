
import axios from "axios";


const newsApi = axios.create({
    baseURL: "https://adam-willis-cool-news-hub.onrender.com",
});

export const GetArticles = ()=> {
    return newsApi
    .get("/api/articles")
    .then((res)=>{
        return res.data;
    })
}
export const GetArticleById = (articleID)=> {
    return newsApi
    .get(`/api/articles/${articleID}`)
    .then((res)=>{
        return res.data;
    })
}

export const getCommentsByArticleID = (articleID)=>{
    return newsApi
    .get(`/api/articles/${articleID}/comments`)
    .then((res)=>{
        return res.data;
    })
}
export const UpdatevoteByCommentId = (articleID, userThumb)=>{
    const incrementValue = {inc_votes: userThumb}
    return newsApi
    .patch(`/api/articles/${articleID}`, incrementValue)
    .then((res)=>{
        console.log(res.data)
    })
}

