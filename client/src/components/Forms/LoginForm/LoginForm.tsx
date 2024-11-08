import { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import ThemeToggle from '@/utils/Themetoggler'
import { useToast } from '@/hooks/use-toast'
import { getUser, loginUser } from '@/services/authService'
import { validateField, validateFormData } from './formValidation'
import { ToastAction } from '@/components/ui/toast'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CardTitle } from '@/components/ui/card'

interface FormData {
  email: string
  password: string
}

interface Errors {
  email: string
  password: string
}

const LoginForm = () => {
  const { toast } = useToast()
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' })
  const [errors, setErrors] = useState<Errors>({ email: '', password: '' })
  const navigate = useNavigate()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    const fieldError = validateField(name, value)
    setErrors((prevErrors) => ({ ...prevErrors, [name]: fieldError }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const validationErrors = validateFormData(formData)
    setErrors(validationErrors)

    if (Object.values(validationErrors).some((error) => error)) return

    try {
      const response: any = await loginUser(formData)

      if (response.status === 200) {
        toast({
          title: 'Login successful',
          description: 'You have successfully logged in.',
        })
        navigate('/dashboard')
      } else if (response.status === 404) {
        toast({
          title: 'User not registered',
          description: 'Please sign up.',
          action: (
            <ToastAction altText="Sign up" onClick={() => navigate('/register')}>
              Sign up
            </ToastAction>
          ),
        })
      } else if (response.status === 401) {
        toast({
          title: 'Invalid credentials',
          description: 'Please check your email or password and try again.',
        })
      }
    } catch (error) {
      console.error('Login error', error)
      toast({
        title: 'An error occurred',
        description: 'Unable to login, please try again later.',
      })
    }
  }

  useEffect(() => {
    const checkUserSession = async () => {
      const response = await getUser()
      if (response.status === 200) {
        navigate('/dashboard')
      }
    }
    checkUserSession()
  }, [navigate])

  return (
    <div className="flex h-screen w-full items-center justify-center flex-col gap-8">
      <CardTitle className="w-full text-center text-[1.8rem]">Welcome back to Notify</CardTitle>
      <form
        onSubmit={handleSubmit}
        className="flex h-auto  flex-col items-center justify-center w-[20rem] position-relative box-border "
      >
        <div className="mb-4 w-full flex flex-col gap-[6px]">
          <Label className="px-[2px]">Email</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="block w-full"
            placeholder="example@gmail.com"
          />
          <div>
            {errors.email && (
              <p className="text-xs px-1 text-destructive min-h-4">{errors.email}</p>
            )}
          </div>
        </div>
        <div className="mb-4 w-full flex flex-col gap-[6px]">
          <Label className="px-[2px]">Password</Label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="block w-full"
            placeholder="••••••••"
          />
          <div>
            {errors.password && (
              <p className="text-xs px-1 text-destructive min-h-4">{errors.password}</p>
            )}
          </div>
        </div>
        <div className="py-6 w-full">
          <Button type="submit" className="w-full bg-secondary-foreground">
            Login
          </Button>
        </div>
      </form>
      <div className="flex flex-row text-sm">
        <Link to="/register">
          <div className="text-muted-foreground  text-xs hover:underline">
            Don&#39;t have an account?{' '}
            <span className="text-muted-foreground hover:text-secondary-foreground">Sign up</span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default LoginForm
