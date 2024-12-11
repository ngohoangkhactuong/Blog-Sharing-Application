import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/global/Button";
import Input from "../../components/global/Input";
import Message from "../../components/global/Message";
import { HOME, REGISTRATION } from "../../constants/routes";
import { validateUserLoginForm } from "../../helpers/validateFormData";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
  prepareUserLogin,
  selectAuth,
} from "../../redux/features/login/loginSlice";
import { LoginFormData, LoginFormError } from "../../types/types";

const Login = () => {
  const navigate = useNavigate();
  const { error, isError, isLoading, token, user } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState<LoginFormError>({
    emailError: "",
    passwordError: "",
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUserLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const validationErrors = validateUserLoginForm(formData);
    setFormError(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const loginData = {
        username: formData.email,
        password: formData.password,
      };

      dispatch(prepareUserLogin(loginData));
    }
  };

  let showError = null;
  if (isError) {
    showError = <Message error={isError} message={error} />;
  }

  useEffect(() => {
    if (user && token) {
      navigate(HOME);
    }
  }, [navigate, token, user]);

  return (
    <div className="relative min-h-screen bg-[#f7f7f7] flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-600 opacity-10"></div>

      <div className="w-full sm:w-96 bg-white shadow-lg rounded-lg p-8 relative z-10">
        <div className="text-center mb-6">
          <Link to={HOME}>
            <img alt="logo" className="w-40 mx-auto" src="/astavet-logo.png" />
          </Link>
        </div>

        <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
          Log In
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Sign in to manage your account and stay connected.
        </p>

        {/* Form đăng nhập */}
        <div>
          <Input
            onChange={handleChange}
            name="email"
            message={formError.emailError}
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
          />
          <Input
            onChange={handleChange}
            name="password"
            message={formError.passwordError}
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            type="password"
          />
          <div className="flex justify-end mb-4">
            <button className="text-primary-600 hover:underline text-sm">
              Forgot Password?
            </button>
          </div>

          <Button
            onClick={handleUserLogin}
            title="Sign In"
            loading={isLoading}
            className="w-full bg-[#c2272f] hover:bg-red-700 text-white py-3 rounded-full shadow-none"
          />
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate(REGISTRATION)}
              className="text-primary-600 hover:underline font-semibold"
            >
              Sign up
            </button>
          </p>
        </div>
        {showError && <div className="mt-4">{showError}</div>}
      </div>
    </div>
  );
};

export default Login;
