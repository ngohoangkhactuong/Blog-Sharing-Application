import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/global/Button";
import Input from "../../components/global/Input";
import Message from "../../components/global/Message";
import Textarea from "../../components/global/Textarea";
import images from "../../constants/images";
import { HOME, LOGIN } from "../../constants/routes";
import { validateUserRegistrationForm } from "../../helpers/validateFormData";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
  prepareUserLogin,
  selectAuth,
} from "../../redux/features/login/loginSlice";
import {
  createUserSignup,
  selectRegistration,
} from "../../redux/features/registration/registrationSlice";
import { RegistrationFormData, RegistrationFormError } from "../../types/types";

const Registration = () => {
  const {
    error: signUpError,
    isError: isSignUpErr,
    isLoading: isSignUpLoading,
    user: newUser,
  } = useAppSelector(selectRegistration);

  const { error, isError, isLoading, token, user } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RegistrationFormData>({
    name: "",
    email: "",
    about: "",
    password: "",
    confirmPassword: "",
  });

  const [formError, setFormError] = useState<RegistrationFormError>({
    nameError: "",
    emailError: "",
    aboutError: "",
    passwordError: "",
    confirmPasswordError: "",
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleAboutElement: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handlerUserRegistration = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const getValidData = validateUserRegistrationForm(formData);
    setFormError(getValidData);

    if (Object.keys(getValidData).length === 0) {
      const reqData = {
        name: formData.name,
        email: formData.email,
        about: formData.about,
        password: formData.password,
      };

      await dispatch(createUserSignup(reqData));
    }
  };

  useEffect(() => {
    if (newUser?.id) {
      dispatch(
        prepareUserLogin({
          username: formData.email,
          password: formData.password,
        })
      );
    }
  }, [dispatch, formData.email, formData.password, newUser?.id]);

  useEffect(() => {
    if (user && token) {
      navigate(HOME);
    }
  }, [navigate, token, user]);

  return (
    <div className="relative min-h-screen bg-[#f7f7f7] flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-600 opacity-10"></div>

      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 relative z-10">
        <div className="text-center mb-8">
          <Link to={HOME}>
            <img alt="logo" className="w-32 mx-auto" src="/astavet-logo.png" />
          </Link>
          <h1 className="text-2xl font-extrabold text-gray-800">
            Create an Account
          </h1>
          <p className="text-gray-600 text-sm mt-2">
            Join our community of pet lovers today!
          </p>
        </div>

        {/* Form */}
        <div>
          <Input
            onChange={handleChange}
            message={formError.nameError}
            label="Name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
          />
          <Input
            onChange={handleChange}
            message={formError.emailError}
            label="Email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
          />
          <Textarea
            onChange={handleAboutElement}
            message={formError.aboutError}
            label="About"
            name="about"
            placeholder="Tell us about yourself"
            value={formData.about}
          />
          <Input
            onChange={handleChange}
            message={formError.passwordError}
            label="Password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            type="password"
          />
          <Input
            onChange={handleChange}
            message={formError.confirmPasswordError}
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            type="password"
          />

          {/* Forgot Password */}
          <div className="text-right mt-2">
            <button className="text-sm text-primary-500 hover:underline">
              Forgot Password?
            </button>
          </div>

          {/* Sign Up Button */}
          <Button
            onClick={handlerUserRegistration}
            title="Sign Up"
            loading={isLoading || isSignUpLoading}
            className="w-full bg-[#c2272f] hover:bg-red-700 text-white py-3 rounded-full shadow-none"
          />

          {/* Sign In Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate(LOGIN)}
                className="text-primary-500 font-bold hover:underline transition"
              >
                Sign In
              </button>
            </p>
          </div>

          {/* Error Message */}
          {isSignUpErr || isError ? (
            <div className="mt-4">
              <Message error message={signUpError || error} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Registration;
