"use client"


import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function SignUp() {

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const router = useRouter();
    
    return (
        <div className="text-center">
            <h1 className="bg-gray-200 py-2">Sign Up</h1> <br />
            <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Name" className="border p-2"/> <br />
            <input type="text" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" className="border p-2"/> <br /> <br />
            <button onClick={async() => {
                const response = await axios.post("http://localhost:3000/api/user",{
                    username : username,
                    password : password
                });

                router.push("/");

            }} className="border bg-gray-400 py-2 px-4 rounded-full">Sign Up</button>
        </div>
    );
}