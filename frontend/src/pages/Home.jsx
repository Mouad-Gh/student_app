import { useEffect, useState } from "react";
import Table from "../components/TableStudents";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";

const Home = () => {
    
    //page number 
    const [pageNumber, setPageNumber] = useState(0);
    //filter by name
    const [query, setQuery] = useState("");

    //call the useFetch hook
    const { loading, error, list , nbPages } = useFetch('students', query, pageNumber);
    
    //
    const pages = new Array(nbPages).fill(null).map((v,i)=>i);
    
    //search bar
    let timer;
    const handleChange = (e) => {
        if(timer){
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          setQuery(e.target.value);
          setPageNumber(0);
        }, 1000);
    }
    // next & previous pagination buttons
    const handleNextPage = () => {
        if(pageNumber < nbPages-1) {
            setPageNumber(pageNumber+1)
        }
    }
    const handlePreviousPage = () => {
        if(pageNumber > 0) {
            setPageNumber(pageNumber-1)
        }
    }

    return ( 
        <section className="flex flex-col gap-y-5">
            <div className="flex justify-between ">
                <input type="search" placeholder="Search..." onChange={handleChange} className="bg-transparent w-full max-w-md outline-none border-black border-b" />
                <Link to="/create" className="">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                </Link>
            </div>
            <Table students={list} />
            <div className="flex mt-4 justify-center items-center"> 
                
                <button className="p-1 " onClick={handlePreviousPage}>&laquo;</button>
                {pages.map((pageIndex)=> (
                    <button key={pageIndex} className="p-1 " onClick={()=>setPageNumber(pageIndex)}>{pageIndex + 1}</button>
                ))}
                <button className="p-1 " onClick={handleNextPage}>&raquo;</button>
                 
            </div>
        </section>
     );
}
 
export default Home;