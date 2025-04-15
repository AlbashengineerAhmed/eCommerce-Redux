import { useState } from 'react'
import axios from 'axios'
import { baseURL } from '../Api/baseURL'

export const useDeleteData = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const deleteData = async (url) => {
        try {
            const { data } = await axios.delete(baseURL + url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            setLoading(false)
            return { data }
        } catch (error) {
            setError(error)
            setLoading(false)
            return { error }
        }
    }

    return { deleteData, loading, error }
} 