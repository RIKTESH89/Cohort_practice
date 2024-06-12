"use client"
import { useState,useEffect } from "react";
import { getUsersByFilter } from "@/app/actions/user"
import { UserCard } from "@/components/UserCard"
import { useSession } from "next-auth/react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { senderIdAtom } from "@/store/Atoms"

  export default function Home() {
    const [filter, setFilter] = useState(""); // Set initial state as string
    const [usersList,setusers] = useState([]);
    const [getUserdata,setUserdata] = useState([]);
    const session = useSession();
    const [sender,setSender] = useRecoilState(senderIdAtom)

    useEffect(() => {
        const getData = setTimeout(()=>{
      async function fetchData() {
        const users = await getUsersByFilter(filter);
        setusers(users);
        // Fetch data using session if needed
      }
      fetchData();
      setSender(session.data.user.id)
    },)
    return () => clearTimeout(getData)
    }, [filter]); 

    console.log(sender.id);

  return (
    <div>
      <div>{JSON.stringify(sender)}</div>

        <input onChange={function(e){setFilter(e.target.value)}} type="text" placeholder="filter"/>
        {usersList.map(function(value){
                return (
                    <div>
                        <UserCard value={value}/>
                    </div>
                )
            })}
    </div>
  );
}