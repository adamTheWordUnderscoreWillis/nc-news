import axios from "axios";

const newsApi = axios.create({
    baseURL: "https://adam-willis-cool-news-hub.onrender.com",
});

export const GetArticles = ()=> {
    return newsApi.get("/api/articles").then((res)=>{
        return res.data;
    })
}

