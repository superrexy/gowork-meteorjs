import React from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState } from "recoil";
import { authenticated } from "../store/index";

export const OrderSuccess = () => {
    const [auth, setAuth] = useRecoilState(authenticated);
    return (
        <div className="bg-primary-500">
            <div className="flex flex-col justify-center items-center h-screen">
                <img src="http://api.elements.buildwithangga.com/storage/files/2/assets/Empty%20State/EmptyState3/Empty-3-4.png" className="object-cover mb-3" />
                <p className="text-white text-4xl font-semibold tracking-wide mb-3">Checkout Successful</p>
                <p className="text-gray-500 text-center leading-6">We've sent the receipt to your email<br />address is {auth?.user?.services?.google?.email}</p>
                <div className="mt-6">
                    <Link className="text-white px-8 py-3 bg-purple-700 hover:bg-purple-800 transition-colors duration-200 rounded-xl font-medium" to="/user">My Dashboard</Link>
                </div>
            </div>
        </div>
    )
}
