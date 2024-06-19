import React, { useEffect, useState } from "react";
import { DotSpinner } from '@uiball/loaders';
import { useNavigate } from "react-router-dom";
const Home = ()=>{
	const navigate = useNavigate();
   const [iniName,finName] =  useState("");
   const [initial,final] = useState([{
    id:"",
    photo_url:"",
    title:"",
    category:"",
    content_text:"",
	detailUrl:""
   }])

const getdata = async()=>{
try {
	const response = await fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=fa82250edaad4a78977a82e841b0185b");
 let result = await response.json();
 console.log(result)
  result = result.articles;
  result.map((info,index)=>{
    final((data)=>[
      ...data,{
       photo_url : info.urlToImage,
       title : info.title,
       category : info.source.name	   ,
       content_text : info.content_text,
       detailUrl : info.url,
       id : index,
      }
    ])
  })
} catch (error) {

	console.error(error);
}
}

useEffect(()=>{

    getdata()
},[])
    return(
        <>
		<div className="flex flex-col">
        <nav class=" sm:flex-row flex-col  sm:relative px-4 py-4 flex justify-between bg-blue-900 items-center ">
		<div className="flex justify-between w-full">
		<a class="text-lg sm:text-3xl text-white	  font-bold leading-none" href="#">
			News
		</a>

<select onChange={(e)=>finName(e.target.value)} className="bg-transparent border-2 rounded-lg text-white">
	<option value="all" className="bg-black">All</option>
	{initial.map((info,index)=>{
        if(!info.id) return null;
		
        return(
          <>
    	 <option value={info.category} className="bg-black">{info.category}</option>
          </>
        )
      })}
</select>
</div>
<ul class=" mt-5 sm:mt-0	 sm:absolute space-x-2 items-center sm:top-1/2 sm:left-1/2 transform sm:-translate-y-1/2 sm:-translate-x-1/2 flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6">
		<label for="default-search" class="mb-2 text-sm font-medium text-gray-900  sr-only dark:text-white">Search</label>
    <div class="relative ">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input onChange={(e)=>finName(e.target.value)} type="search" id="default-search" class="block w-[90vw] sm:w-full p-4 ps-10 text-sm text-gray-900 border rounded-lg  focus:ring-blue-500 focus:border-blue-500  h-6 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search By Full Name..." required />
    </div>
	

		</ul>
	</nav>
	<div>
	<section class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex text-black justify-evenly flex-wrap -m-4">
      {(initial.length==1)?(<>
      <div className="flex justify-evenly mx-auto">
        <DotSpinner size={100} speed={0.9} color="white" className="flex items-center   mx-auto" />
        </div>     
      </>):(<>
        {initial.map((info)=>{
        if(!info.id) return null;
		if(iniName === "all" || iniName === ""){
			return(
				<>
					<div class="p-4 sm:w-1/2  lg:w-1/3">
			  <div class="h-full bg-white border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
				<img class="h-42 lg:h-64  w-full object-cover object-center" src={info.photo_url} alt="News"/>
				<div class="p-6">
				  <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{info.category}</h2>
				  <h1 class="title-font text-lg font-medium text-gray-900 mb-3">{info.title}</h1>
				  <p class="leading-relaxed overflow-hidden max-h-20 md:max-h-12 mb-3">{info.content_text}</p>
				  <div class="flex items-center flex-wrap ">
					<button onClick={()=>navigate(`/more/${info.id}`)}  class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Read More
					  <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
						<path d="M5 12h14"></path>
						<path d="M12 5l7 7-7 7"></path>
					  </svg>
					</button>	
				  </div>
				</div>
			  </div>
			</div>
				</>
			  )
		}
        else{
			if(info.category !== iniName) return null;
			return(
				<>
				<div class="p-4 sm:w-1/2  lg:w-1/3">
			  <div class="h-full bg-white border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
				<img class="h-42 lg:h-64  w-full object-cover object-center" src={info.photo_url} alt="blog"/>
				<div class="p-6">
				  <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{info.category}</h2>
				  <h1 class="title-font text-lg font-medium text-gray-900 mb-3">{info.title}</h1>
				  <p class="leading-relaxed overflow-hidden max-h-20 md:max-h-12 mb-3">{info.content_text}</p>
				  <div class="flex items-center flex-wrap ">
					<a href={info.detailUrl} target="_main" class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Read More
					  <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
						<path d="M5 12h14"></path>
						<path d="M12 5l7 7-7 7"></path>
					  </svg>
					</a>	
				  </div>
				</div>
			  </div>
			</div>
				</>
			  )
		}
      })}
      </>)}
   

    </div>
  </div>
</section>
	</div>
	</div>
        </>
    )
}
export default Home;