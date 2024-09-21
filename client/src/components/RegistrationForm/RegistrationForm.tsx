import { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { NavLink, useNavigate } from 'react-router-dom';
import { validateEmail } from '@/utils/utils';
import { Button } from '../ui/button';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
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

    if (name === 'username') {
      const usernameError = value.trim().length === 0 ? 'Username is required' : '';
      setErrors((prevErrors) => ({ ...prevErrors, username: usernameError }));
    }

    if (name === 'email') {
      const emailError = !value.trim() || !validateEmail(value) ? 'Please enter a valid email' : '';
      setErrors((prevErrors) => ({ ...prevErrors, email: emailError }));
    }

    if (name === 'password') {
      const passwordError =
        value.length === 0 ? '' : value.trim().length < 6 ? 'Password must be at least 6 characters' : '';
      setErrors((prevErrors) => ({ ...prevErrors, password: passwordError }));
    }
  };

  //========== submit form ==========//
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { username, email, password } = formData;

    const usernameError = username.trim().length === 0 ? 'Username is required' : '';
    const emailError = !email.trim() || !validateEmail(email) ? 'Please enter a valid email' : '';
    const passwordError = password.trim().length < 6 ? 'Password must be at least 6 characters' : '';

    setErrors({ username: usernameError, email: emailError, password: passwordError });

    if (!usernameError && !emailError && !passwordError) {
      try {
        const response = await fetch('http://localhost:5000/register', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        console.log(response);
        if (response.status === 200) {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Registration error', error);
      }
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center flex-col gap-8">
      <form onSubmit={handleSubmit} className="min-w-[20rem] flex flex-col gap-4">
        <div className="mb-4">
          <Label>Username</Label>
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="block w-full"
            placeholder="Enter your username"
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
        </div>
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
          Register
        </Button>
      </form>
      <div className="flex flex-row text-sm">
        <p>Already have an account?</p>
        {'   '}
        <p>
          <NavLink to="/login">Login</NavLink>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
