import { useState, useEffect } from "react";
import "./create.css"
import { Link, useNavigate } from "react-router-dom";



function CreatePage(){
    const [productObj,setProductObj] = useState({name:'', price:'', image:''})
    const [response,setResponse] = useState('')
    const navigate = useNavigate()
    const handleUpload= async ()=>{
        if(!productObj.name || !productObj.price || !productObj.image){
            alert('All the information must be provided!')
            return
        }
        try{
            const res = await fetch('http://localhost:5000/api/products',
                {
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(productObj)
                })
            const data = await res.json();
            if(data.success){
                setResponse(JSON.stringify(data.message))
                navigate('/')
            }else{
                alert('Error:',data.message)
            }
        }catch(error){
            alert(error)
        }
            
            

        }
    return(
        <div id='create-container'>
            <h1>Create a product</h1>
            <form id="form-container">
                <label htmlFor="name">Product Name:</label>
                <input required className="product" id="name" type="text" placeholder="Enter the product name" value={productObj.name} onChange={(e)=>setProductObj({...productObj,name:e.target.value})}/>
                <label htmlFor="price">Product price:</label>
                <input required min={0} className="product" id="price" type="number" placeholder="Enter the price" value={productObj.price} onChange={(e)=>{setProductObj({...productObj, price:e.target.value})}}/>
                <label htmlFor="image">Product Image URL:</label>
                <input required className="product" id="image" type="text" placeholder="Insert image url" value={productObj.image} onChange={(e)=>{setProductObj({...productObj, image:e.target.value})}}/>       
            </form>
            <button onClick={handleUpload} id="upload-btn" type="submit">Upload</button>
            <div>{response}</div>
        </div>
    )
}

export default CreatePage;