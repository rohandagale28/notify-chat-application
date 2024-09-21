import { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { NavLink, useNavigate } from 'react-router-dom';
import { validateEmail } from '@/utils/utils';
import { Button } from '../ui/button';
import ThemeToggle from '@/utils/Themetoggler';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'email') {
      const emailError = !value.trim() || !validateEmail(value) ? 'Please enter a valid email' : '';
      setErrors((prevErrors) => ({ ...prevErrors, email: emailError }));
    }

    if (name === 'password') {
      const passwordError =
        value.length === 0 ? '' : value.trim().length < 6 ? 'Password must be 6 characters long' : '';
      setErrors((prevErrors) => ({ ...prevErrors, password: passwordError }));
    }
  };

  //========== submit form ==========//
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { email, password } = formData;
    const emailError = !email.trim() || !validateEmail(email) ? 'Please enter a valid email' : '';
    const passwordError = password.trim().length < 6 ? 'Password must be 6 characters long' : '';

    setErrors({ email: emailError, password: passwordError });

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log(response);
      if (response.status == 200) {
        navigate('/dashboard');
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
      }
    } catch (error) {
      console.error('Login error', error);
    }
  };

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
