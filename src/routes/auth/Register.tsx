import RegisterForm from '@/components/forms/RegisterForm'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className="flex items-center justify-center my-24">
      <div className="bg-white text-[#444444] dark:bg-[#3b3c4c] dark:text-[#9ca9b9] p-8 border-l-[15px] border-[#6e6dfb] w-full max-w-2xl mx-10 flex flex-col gap-8 rounded-sm shadow">
        <h1 className="text-3xl font-bold">
          <span className="text-[#6e6dfb]">REG</span>ISTER
        </h1>

        <RegisterForm />

        <div className="w-full flex justify-center gap-1">
          <span>Already Registered?</span>
          <Link to="/login" className="font-bold">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register