import axios from 'axios';

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

const axiosClient = axios.create({ 
    baseURL: 'http://localhost:1337/api/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`    
    }
});

const CreateNewResume = (data) => axiosClient.post('/user-resumes', data);


const getUserResumes = (userEmail) => axiosClient.get('/user-resumes?filter[userEmail][$eq]='+userEmail);

const UpdateResumeData= (id,data) => axiosClient.put('/user-resumes/'+id, data);

const GetResumeById=(id)=> axiosClient.get('/user-resumes/'+id+"?populate=*");

const DeleteResumeById=(id)=> axiosClient.delete('/user-resumes/'+id);

export default {
    CreateNewResume,
    getUserResumes,
    UpdateResumeData,
    GetResumeById,
    DeleteResumeById
}