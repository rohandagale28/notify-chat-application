import { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import ThemeToggle from '@/utils/Themetoggler';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '../ui/toast';
import { loginUser } from '@/services/authApi';
import { validateField, validateFormData } from './formValidation';
import { getUser } from '@/services/userApi';

const LoginForm = () => {
  const { toast } = useToast();

  const [formData, setFormData] = useState({ email: '', password: '' });

  const [errors, setErrors] = useState({ email: '', password: '' });

  const navigate = useNavigate();

  const handleInputChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    const fieldError = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: fieldError }));
  };

  //========== submit form ==========//
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const validationErrors = validateFormData(formData);
    setErrors(validationErrors);

    try {
      const response: any = await loginUser(formData);

      if (response.status === 200) {
        toast({
          title: "Login successfull",
          description: "Friday, February 10, 2023 at 5:57 PM",
        });
        navigate("/dashboard");
      } else if (response.status === 404) {
        toast({
          title: "User not registered",
          description: "Friday, February 10, 2023 at 5:57 PM",
          action: (
            <ToastAction
              altText="Goto schedule to undo"
              onClick={() => {
                navigate("/register");
              }}
            >
              Sign up
            </ToastAction>
          ),
        });
      } else if (response.status === 401) {
        toast({
          title: "Wrong password",
          description: "Friday, February 10, 2023 at 5:57 PM",
        });
      }
    } catch (error) {
      console.error("Login error", error);
    }
  };

  useEffect(() => {
    const userExist = async () => {
      const response = await getUser();
      if (response.status === 200) {
        navigate("/dashboard")
      }
    }
    userExist()
  }, [])

  return (
    <div className="flex h-screen w-full items-center justify-center flex-col gap-8">
      <ThemeToggle />
      <form onSubmit={handleSubmit} className="min-w-[20rem] flex flex-col gap-4">
        <div className="mb-4">
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="block w-full"
            placeholder="example@gmail.com"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="block w-full"
            placeholder="••••••••"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        <Button type="submit" className="px-4 py-2 w-full">
          Login
        </Button>
      </form>
      <div className="flex flex-row text-sm">
        <p>not a user</p>
        {'   '}
        <p>
          <NavLink to="/register">sign up</NavLink>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
