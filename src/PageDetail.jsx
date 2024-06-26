import React, { useEffect, useState } from 'react';
import {useParams,Link} from "react-router-dom";
import axios  from 'axios';
import { DotSpinner } from '@uiball/loaders';
const PageDetail = () => {
 const {id} = useParams();
 const [inidata,setdata] = useState({})
 const [showFullContent, setShowFullContent] = useState(false);
 const getdata = async()=>{
    try {
      const response = await axios.get("https://api.slingacademy.com/v1/sample-data/blog-posts?offset=5&limit=30");
      let result = response.data;
      result = result.blogs;
      const data = result[id];
      console.log(data)
      setdata(data)
    } catch (error) {
       alert(error);
    }
    }
    useEffect(()=>{
    
        getdata()
    },[])
    const toggleContent = () => {
      setShowFullContent(!showFullContent);
  };
  return (
    <>
    {(inidata === undefined || inidata === null)?(<>
        <div className="flex justify-evenly mx-auto">
        <DotSpinner size={100} speed={0.9} color="white" className="flex items-center   mx-auto" />
        </div>  
    </>):(<>

        <nav class=" sm:flex-row flex-col  sm:relative px-4 py-4 flex justify-between bg-blue-900 items-center ">
		<div className="flex justify-between w-full">
		<a class="text-lg sm:text-3xl text-white	  font-bold leading-none" href="#">
			News
		</a>
        <ul class=" absolute space-x-2 items-center top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6">
			<li><Link to={"/"} class="text-sm text-white hover:text-gray-500 whitespace-nowrap" href="#">Home</Link></li>
			<li class="text-gray-300 ">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" class="w-4 h-4 current-fill" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
				</svg>
			</li>
			<li><Link to={`/more/${id}`} class="text-sm text-white font-bold whitespace-nowrap" href="#">News</Link></li>

		</ul>
</div>
	</nav>
    <div className="w-full">
    <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-16">
      </main>
      <section className="px-12 py-14">
        <div className="container mx-auto flex px-5 md:flex-row flex-col items-center sm:items-start">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <img
              className="object-cover  rounded"
              alt="hero"
              src={inidata.photo_url}
            />
          </div>
          <div className='w-full flex flex-col '>
            <div className='lg:flex-grow mb-5 font-semibold lg:pl-24 text-white md:pl-16 underline text-3xl flex flex-col md:items-start md:text-left items-center text-center'>
                   {inidata.title}
            </div>
          <div className="lg:flex-grow mb-5 font-semibold lg:pl-24 text-white md:pl-16 text-xl flex flex-col md:items-start md:text-left items-center text-center">
                                   {(inidata.content_text === undefined)?(<>
                                    <div className="flex justify-evenly mx-auto">
        <DotSpinner size={100} speed={0.9} color="white" className="flex items-center   mx-auto" />
        </div>  
                                   </>):(<>
                                        {showFullContent ? inidata.content_text : `${inidata.content_text.substring(0, 100)}...`}
                                        
                                        {!showFullContent && (
                                            <button className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0 mt-2" onClick={toggleContent}>
                                                Read More
                                                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M5 12h14"></path>
                                                    <path d="M12 5l7 7-7 7"></path>
                                                </svg>
                                            </button>
                                        )}
                                        </>)}
                                    </div>
          </div>
        </div>
      </section>
    </div>
    </>)}
    </>
  );
};

export default PageDetail;