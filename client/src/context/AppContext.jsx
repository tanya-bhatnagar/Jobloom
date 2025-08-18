import { useEffect } from "react";
import { createContext, useState } from "react";
import { jobsData } from "../assets/assets";
 
 const AppContext = createContext();

export const AppContextProvider = (props) => {

    const [searchFilter , setSearchFilter] = useState({
        title:'',
        location:''
    })

    const[isSearched,setIsSearched]=useState(false)

     const[jobs, setJobs] = useState([])

     //Function to fetch jobs data 
     const fetchJobs = async()=>{
       setJobs(jobsData)
     }
     useEffect(()=>{
        fetchJobs()
     },[])

    const value = {
      setSearchFilter,searchFilter,
       isSearched,setIsSearched,
       jobs, setJobs
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext