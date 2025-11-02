import axios from "axios";

let api = axios.create({
    baseURL : 'http://localhost:3000'
})

//get

 export const fetchData = async () => {
  return await api.get('/Students')
}



// post

export const postmethood = async (stud)=>{
    return await api.post('/Students',stud)
}


// delete 
 export const deletemethood = async(id)=>{
    return await api.delete(`/Students/${id}`)
 }

//  edit data

export const editmethod = async (id,data)=>{
    return await api.put(`Students/${id}`,data)
}
