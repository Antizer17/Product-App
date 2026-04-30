import { useEffect, useState } from "react";
import './home.css'
import { useNavigate,Link } from "react-router-dom";
import Footer from "./footer";

function Homepage(){
    const [products, setProducts] = useState([])
    const [convertedData, setConvertedData] = useState([])
    const [productId,setProductId] = useState('')
    const [refresh, setRefresh] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [editingId, setEditingId] = useState(null)
    const [editForm, setEditForm] = useState({name:'', price:'', image:''})
    const navigate = useNavigate()
    const handleEdit = (product)=>{
        setEditingId(product._id)
        setEditForm({name: product.name, price: product.price, image: product.image})
    }
    const handleSave = async (id)=>{
        const res = await fetch(`http://localhost:5000/api/products/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(editForm)
        })
        const data = await res.json()
        setRefresh((refresh)=>refresh + 1)
        setEditingId(null)
    }  
    const handleDelete = async (id)=>{
        const res = await fetch(`http://localhost:5000/api/products/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json'
            },
        })
        const data = res.json()
        setRefresh((refresh)=>refresh + 1)
    }
    const handleUpdate = async (id, name, price, image)=>{
        console.log(id)
        const newName = prompt("Enter new name",name)
        const newPrice = prompt("Enter new price",price)
        const newImage = prompt("Enter new image URL",image)    
    
        const res =await fetch(`http://localhost:5000/api/products/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({name:`${newName}`, price:`${newPrice}`, image:`${newImage}`})
        })
        const data = await res.json()
        setRefresh((refresh)=>refresh + 1)
    }
    useEffect(()=>{
        const fetchAllPosts= async ()=>{
            try{
                const res = await fetch('http://localhost:5000/api/products')
                const data = await res.json()
                if(data.success){
                    const arrObj =data.data
                    setProducts(arrObj)
                    setIsLoading(false)
                }else{
                    return navigate('/login')
                }


            }catch(error){
                console.error(error)
            }}
        fetchAllPosts()
},[refresh])

        if(isLoading){
            return(
                <div>Checking Authentication...</div>
            )
        }
        return(
        
        <div className="box">
            <h1 id="all-products">All Products</h1>
            <div className="product-card">
            {products.map((obj)=>
            <div key={obj._id}>
                {obj._id === editingId ? (<div className="edit-form" style={{backgroundColor:'white', width:'100%',height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'Space-around'}}>
                            <input style={{padding:'0.5rem', borderRadius:'5px', border:'1px solid #E2E8F0'}}
                                value={editForm.name} 
                                onChange={(e) => setEditForm({...editForm, name: e.target.value})} 
                            />
                            <input 

                                type="number"
                                value={editForm.price} 
                                onChange={(e) => setEditForm({...editForm, price: e.target.value})} 
                            />
                            <input 
                                style={{padding:'0.5rem', borderRadius:'5px', border:'1px solid #E2E8F0'}}  
                                value={editForm.image} 
                                onChange={(e) => setEditForm({...editForm, image: e.target.value})} 
                            />
                            <button onClick={() => handleSave(obj._id)} style={{ color:'whitesmoke',width:'60px' ,padding:'0.5rem', borderRadius:'10px'}} id="save" className="editButton">Save</button>
                            <button onClick={() => setEditingId(null)} style={{ color:'whitesmoke', width:'60px', padding:'0.5rem', borderRadius:'10px'}} id="cancel" className="editButton">Cancel</button>
                        </div>
                    ) : (<div  style={{backgroundColor:'white', width:'100%',height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                        <h3 style={{color:"black"}}> {obj.name}</h3>
                        <h3 id="price"> {obj.price}$</h3>
                        <hr/>

                        <br/>
                        <img src={obj.image} />
                        <button onClick={()=>handleDelete(obj._id)}  id="delete">Delete</button>
                        <button onClick={()=>handleEdit(obj)}  id="update">Update</button>
                    </div>)}
                
            </div>
            )}
        </div>
        </div>

    )
    }
    


export default Homepage; 