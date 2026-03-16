import { useEffect, useState } from "react";
import './home.css'
import { useNavigate } from "react-router-dom";

function Homepage(){
    const [products, setProducts] = useState([])
    const [convertedData, setConvertedData] = useState([])
    const [productId,setProductId] = useState('')
    const [refresh, setRefresh] = useState(0)
    const navigate = useNavigate()
    const handleDelete = async (id)=>{
        const res =await fetch(`http://localhost:5000/api/products/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json'
            },
        })
        const data = res.json()
        setRefresh((refresh)=>refresh + 1)
    }
    const handleUpdate = async (id,name,price,image)=>{
        const res =await fetch(`http://localhost:5000/api/products/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body:{name:`${name}`, price:`${price}`, image:`${image}`}
        })
        const data = res.json()
        setRefresh((refresh)=>refresh + 1)
    }
    useEffect(()=>{
        const fetchAllPosts= async ()=>{
            try{
                const res = await fetch('http://localhost:5000/api/products')
                const data = await res.json()
                const arrObj =data.data
                setProducts(arrObj)
            }catch(error){
                console.error(error)
            }}
        fetchAllPosts()
},[refresh])
    
    return(
        
        <div className="box">
            <h1>Homepage</h1>
            <div className="product-card">
            {products.map((obj)=>
            <div key={obj._id}>
                <h3 style={{color:"black"}}> {obj.name}</h3>
                <h3 id="price"> {obj.price}$</h3>
                <hr/>
                <br/>
                <img src={obj.image} />
                <button onClick={()=>handleDelete(obj._id)} id="delete">Delete</button>
                <button onClick={()=>handleUpdate(obj._id,obj.name,obj.price,obj.image)} id="update">Update</button>
            </div>
            )}
            </div>
            
        </div>

    )
}

export default Homepage; 