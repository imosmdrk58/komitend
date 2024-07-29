import { useAuth } from "@/providers/AuthProvider"

const Home = () => {
  const { user } = useAuth()

  return (
    <div className='font-titillium text-primary h-96'>
      <pre>{user ? JSON.stringify(user, null, 2) : "Unauthorized"}</pre>
    </div>
  )
}

export default Home