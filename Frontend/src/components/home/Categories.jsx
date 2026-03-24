import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCategoriesService } from "../../services/categories.service";

const Categories = () => {

    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
    
      const fetchCategories = async () =>{
        try{
          const data = await getCategoriesService(1, 10, null);
    
          if(data.success){
            const mainCategories = data.categories.filter(cat => !cat.parentId);
            setCategories(mainCategories);
           // fetchSubCategories(mainCategories);
          }
    
        }catch(err){
          console.log(err);
        }
      };
    
      fetchCategories();
    
    },[]);
    
  
    

  return (

    <div className='flex flex-col justify-center items-center'>

        <h2 className=' text-5xl font-semibold text-zinc-800 mt-10 mb-10'>
          Popular categories
        </h2>

        <div className='flex gap-x-6'>

          {
            categories.map((cat)=>(
                <div key={cat._id}>

                <div onClick={()=>navigate(`/category/${cat._id}`)}
                  className='w-36 h-60 flex flex-col justify-start pt-5 rounded-[70px] items-center bg-amber-50 shadow-2xl hover:scale-105 transition duration-500'
                >

                    <img
                      className='w-32 h-32 rounded-full object-cover'
                      src={cat.image}
                    />

                    <p className='text-lg font-semibold text-zinc-800 py-5'>
                      {cat.name}
                    </p>

                </div>

                </div>
            )).reverse()
          }

        </div>

    </div>

  )
}

export default Categories