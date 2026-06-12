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

    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            if (
                error.response?.data?.message === "TOKEN_EXPIRED" ||
                error.response?.data?.message === "jwt expired"
            ) {
                localStorage.removeItem("companyToken");
                window.location.reload();
            }
            return Promise.reject(error);
        }
    );

    const [searchFilter, setSearchFilter] = useState({ title: '', location: '' })
    const [isSearched, setIsSearched] = useState(false)
    const [jobs, setJobs] = useState([])
    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)
    const [companyToken, setCompanyToken] = useState(null)
    const [companyData, setCompanyData] = useState(null)
    const [userData, setUserData] = useState(null)
    const [userApplications, setUserApplications] = useState([])
    const [isLoadingToken, setIsLoadingToken] = useState(true) // 👈 new

    const fetchJobs = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/jobs')
            if (data.success) {
                setJobs(data.jobs)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchCompanyData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/company/company', { headers: { token: companyToken } })
            if (data.success) {
                setCompanyData(data.company)
            } else {
                if (data.message === "TOKEN_EXPIRED") {
                    localStorage.removeItem("companyToken");
                    window.location.reload();
                    return;
                }
                toast.error(data.message)
            }
        } catch (error) {
            if (error.response?.data?.message === "TOKEN_EXPIRED") {
                localStorage.removeItem("companyToken");
                window.location.reload();
                return;
            }
            toast.error(error.message)
        }
    }

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
                setUserData(data.user)
            } else {
                console.error("Error creating user:", data.message)
            }
        } catch (error) {
            console.error("Error in createOrGetUser:", error.message)
        }
    }

    const fetchUserData = async () => {
        try {
            const token = await getToken();
            const { data } = await axios.get(backendUrl + '/api/users/user',
                { headers: { Authorization: `Bearer ${token}` } })
            if (data.success) {
                setUserData(data.user)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchUserApplications = async () => {
        try {
            const token = await getToken()
            const { data } = await axios.get(backendUrl + '/api/users/applications',
                { headers: { Authorization: `Bearer ${token}` } }
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
        setIsLoadingToken(false) // 👈 done reading localStorage
    }, [])

    useEffect(() => {
        if (companyToken) {
            fetchCompanyData()
        }
    }, [companyToken])

    useEffect(() => {
        if (user) {
            createOrGetUser().then(() => {
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
        createOrGetUser,
        isLoadingToken // 👈 expose it
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext