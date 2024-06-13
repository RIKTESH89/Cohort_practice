"use client"
import { useState,useEffect,useRef } from "react";
import { getUsersByFilter } from "@/app/actions/user"
import { UserCard } from "@/components/UserCard"
import { Drawer } from "@/components/Drawer"
import { useSession } from "next-auth/react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { senderIdAtom } from "@/store/Atoms"
import { useRouter } from 'next/navigation';

  export default function Home() {
    const [filter, setFilter] = useState(""); // Set initial state as string
    const [usersList,setusers] = useState([]);
    const [getUserdata,setUserdata] = useState([]);
    const [sender,setSender] = useRecoilState(senderIdAtom)
    const { data: session, status } = useSession();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter();
    const dropdownRef = useRef(null);

    useEffect(() => {
      if (status === "authenticated" && session?.user?.id) {
        setSender(session.user.id);
        console.log(session);
      } else if (status === "unauthenticated") {
        router.push("/signin");
      }
    }, [status, session, setSender, router]);

    useEffect(() => {
        const getData = setTimeout(()=>{
      async function fetchData() {
        const users = await getUsersByFilter(filter,session.user.username);
        
        setusers(users);
        // Fetch data using session if needed
      }
      fetchData();
    },)
    return () => clearTimeout(getData)
    }, [filter]); 
    
    useEffect(() => {
      // Close dropdown when clicking outside
      function handleClickOutside(event) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsDropdownOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  

  return (
    <div>
      <nav class="bg-white border-gray-200 dark:bg-gray-900 fixed w-full top-0 left-0">
        <div class="w-screen flex flex-row justify-between p-4">
        <div class="flex items-center space-x-3 rtl:space-x-reverse">
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Chatting</span>
        </div>
        <div className="flex flex-row text-center justify-between">
        <div className="flex flex-row items-center mr-4 text-white">
          {session.user.username}
        </div>
          <button id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" class="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button"
          onClick={()=> setIsDropdownOpen(!isDropdownOpen)}
          >
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
            </svg>
          </button>
          </div>
          {/* <!-- Dropdown menu --> */}
          {isDropdownOpen && (
            <div ref={dropdownRef} className="absolute right-0 mt-10 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                <li>
                  <button onClick={function(){router.push("/signin")}} className="block flex items-start px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Signout</button>
                </li>
              </ul>
              <div className="py-2 text-sm text-gray-700 dark:text-gray-200">
              <button onClick={function(){router.push("/signup")}} className="block flex items-start w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign Up</button>
              </div>
            </div>
          )}
          </div>
        </nav>
      {/* <div>{JSON.stringify(sender)}</div> */}
      <div class="flex items-center px-1.5 py-1.5 bg-gray-300 dark:bg-gray-300 mt-16 mb-10">        
        <input class="block mx-0.5 p-1.5 w-full text-sm text-black bg-white rounded-lg border border-gray-100" onChange={function(e){setFilter(e.target.value)}} type="text" placeholder="Search User"/>
      </div>
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