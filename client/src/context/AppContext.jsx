import { useEffect } from "react";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useUser, useAuth } from "@clerk/clerk-react";



const AppContext = createContext();

export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const { user } = useUser();
    const { getToken } = useAuth();


    const [searchFilter, setSearchFilter] = useState({
        title: '',
        location: ''
    })

    const [isSearched, setIsSearched] = useState(false)

    const [jobs, setJobs] = useState([])
    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)
    const [companyToken, setCompanyToken] = useState(null)
    const [companyData, setCompanyData] = useState(null)
    const [userData, setUserData] = useState(null)
    const [userApplications, setUserApplications] = useState([])

    //Function to fetch jobs 
    const fetchJobs = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/jobs')

            if (data.success) {
                setJobs(data.jobs)
                console.log("✅ Jobs fetched:", data.jobs);
            } else {
                toast.error(data.message)
            }

        } catch (error) {

            toast.error(error.message)

        }

    }

    //Function to fetch company data
    const fetchCompanyData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/company/company', { headers: { token: companyToken } })

            if (data.success) {
                setCompanyData(data.company)
                console.log("✅ Company data:", data);
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

     // NEW FUNCTION - Create or get user in MongoDB
    const createOrGetUser = async () => {
        try {
            const token = await getToken();
            const { data } = await axios.post(backendUrl + '/api/users/create-or-get-user', 
                {
                    name: user.fullName || `${user.firstName} ${user.lastName}`,
                    email: user.primaryEmailAddress?.emailAddress,
                    image: user.imageUrl
                },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            
            if (data.success) {
                console.log(" User created/found in MongoDB:", data.user);
                setUserData(data.user) // Set user data immediately
            } else {
                console.error(" Error creating user:", data.message)
            }
        } catch (error) {
            console.error(" Error in createOrGetUser:", error.message)
        }
    }


    //Function to fetch user data
    const fetchUserData = async () => {
        try {

            const token = await getToken();
            const { data } = await axios.get(backendUrl + '/api/users/user',
                { headers: { Authorization: `Bearer ${token}` } })
            if (data.success) {
                setUserData(data.user)
                console.log("✅ User data from backend:", data.user);
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //function get user applications data
    const fetchUserApplications = async ()=>{
        try {
            
            const token = await getToken()
            const {data} =await axios.get(backendUrl+'/api/users/applications',
                {headers: {Authorization:`Bearer ${token}`}}
            )
            if (data.success) {
                setUserApplications(data.applications)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchJobs()

        const storedCompanyToken = localStorage.getItem('companyToken')
        if (storedCompanyToken) {

            setCompanyToken(storedCompanyToken)

        }
    }, [])

    useEffect(() => {
        if (companyToken) {
            fetchCompanyData()
        }

    }, [companyToken])

    // useEffect(() => {
    //     if (user) {
    //         fetchUserData()
    //         fetchUserApplications()
    //     }
    // }, [user])
     useEffect(() => {
        if (user) {
            // First create/get user in MongoDB, then fetch other data
            createOrGetUser().then(() => {
                // After user is created/found, fetch applications
                fetchUserApplications()
            })
        }
    }, [user])


    const value = {
        setSearchFilter, searchFilter,
        isSearched, setIsSearched,
        jobs, setJobs,
        showRecruiterLogin, setShowRecruiterLogin,
        companyToken, setCompanyToken,
        companyData, setCompanyData,
        backendUrl,
        userData, setUserData,
        userApplications, setUserApplications,
        fetchUserData,
        fetchJobs,
        fetchUserApplications,
        createOrGetUser

    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext