import { useAuth } from "@/providers/AuthProvider"

const Home = () => {
  const { user } = useAuth()

  return (
    <div className='font-titillium text-primary h-96'>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}

export default Home