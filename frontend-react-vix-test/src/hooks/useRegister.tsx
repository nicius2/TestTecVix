import { useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


interface IUserRegisterResponse {
  message: string;
}

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const goRegister = async ({
    username,
    email,
    password,
    confirmPassword,
  }: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    setIsLoading(true);

    if (!username || !email || !password || !confirmPassword) {
      setIsLoading(false);
      toast.error("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setIsLoading(false);
      toast.error("Passwords do not match.");
      return;
    }

    const response = await api.post<IUserRegisterResponse>({
      url: "/auth/register",
      data: {
        username,
        email,
        password,
        confirmPassword,
      },
      tryRefetch: false, // Registration is a one-time attempt
    });

    setIsLoading(false);
    if (response.error) {
      console.error("Registration error:", response.err); // Log for debugging
      toast.error(response.message);
      return;
    }

    toast.success(response.data.message || "Registration successful!");
    // After successful registration, navigate to the login page
    navigate("/login");
  };

  return { goRegister, isLoading };
};
