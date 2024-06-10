import axios from "axios";
async function getUserdetails() {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const response = await axios.get("http://localhost:3000/api/user");
  return response.data;
}

export default async function Home() {
  const userData = await getUserdetails();

  return (
   <div>
    <div>{userData.email}</div>
    <div>{userData.username}</div>
   </div>
  );
}
