import React, { useEffect, useRef, useState, useContext } from 'react'
import Quill from 'quill'
import Select from 'react-select'
import { JobCategories, JobLocations } from '../assets/assets'
import axios from 'axios'
import AppContext from '../context/AppContext'
import { toast } from 'react-toastify'

const AddJob = () => {

    const [title, setTitle] = useState('')
    const [location, setLocation] = useState('Bangalore')
    const [category, setCategory] = useState('Programming')
    const [level, setLevel] = useState('Beginner level')
    const [salary, setSalary] = useState(0)

    const editorRef = useRef(null)
    const quillRef = useRef(null)

    const { backendUrl, companyToken } = useContext(AppContext)

    const categoryOptions = JobCategories.map(category => ({
        value: category,
        label: category
    }))

    const locationOptions = JobLocations.map(location => ({
        value: location,
        label: location
    }))
    const levelOptions = [
    { value: "Beginner level", label: "Beginner level" },
    { value: "Intermediate level", label: "Intermediate level" },
    { value: "Senior level", label: "Senior level" }
];

    const onSubmitHandler = async (e) => {

        e.preventDefault()

        try {

            const description = quillRef.current.root.innerHTML

            const { data } = await axios.post(
                backendUrl + '/api/company/post-job',
                {
                    title,
                    description,
                    location,
                    salary,
                    category,
                    level
                },
                {
                    headers: { token: companyToken }
                }
            )

            if (data.success) {
                toast.success(data.message)
                setTitle('')
                setSalary(0)
                quillRef.current.root.innerHTML = ''
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
            })
        }
    }, [])

    return (
        <form
            onSubmit={onSubmitHandler}
            className='bg-white border border-gray-100 rounded-xl shadow-sm p-6 flex flex-col w-full max-w-3xl gap-5'
        >

            <div className='w-full'>
                <p className='mb-1.5 text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Job Title
                </p>

                <input
                    type="text"
                    placeholder='Type here'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                    className='w-full max-w-lg px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                />
            </div>

            <div className='w-full max-w-lg'>
                <p className='my-2'>Job Description</p>
                <div ref={editorRef}></div>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 sm:gap-8'>

                <div className='min-w-[220px]'>
                    <p className='mb-2'>Job Category</p>

                    <Select
                        options={categoryOptions}
                        defaultValue={categoryOptions[0]}
                        onChange={(selected) => setCategory(selected.value)}
                        maxMenuHeight={200}
                        menuPlacement="auto"
                    />
                </div>

                <div className='min-w-[220px]'>
                    <p className='mb-2'>Job Location</p>

                    <Select
                        options={locationOptions}
                        defaultValue={locationOptions[0]}
                        onChange={(selected) => setLocation(selected.value)}
                        maxMenuHeight={200}
                        menuPlacement="auto"
                    />
                </div>

                <div className='min-w-[220px]'>
    <p className='mb-2'>Job Level</p>

    <Select
        options={levelOptions}
        defaultValue={levelOptions[0]}
        onChange={(selected) => setLevel(selected.value)}
        maxMenuHeight={200}
        menuPlacement="auto"
    />
</div>

            </div>

            <div>
                <p className='mb-2'>Job Salary</p>

                <input
                    type="number"
                    min={0}
                    placeholder='2500'
                    onChange={e => setSalary(e.target.value)}
                    className='w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px]'
                />
            </div>

            <button
                className='w-28 mt-4 bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium py-2.5 px-6 rounded-lg transition-colors'
            >
                Post Job
            </button>

        </form>
    )
}

export default AddJob