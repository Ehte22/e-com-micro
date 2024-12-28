import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Navigate } from 'react-router-dom'

const AdminProtected = ({ compo }: { compo: JSX.Element }) => {
    const { user } = useSelector<RootState, any>(state => state.auth)

    return user && user.role === "admin" ? <>{compo}</> : <Navigate to="/product" />
}

export default AdminProtected