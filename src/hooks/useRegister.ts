import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthService, RegisterUserDto } from "services/authService";

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: number;
}

export const useRegister = () => {
  const navigate = useNavigate();

  const onRegister = async (values: RegisterFormValues, actions: any) => {
    try {
      // Map form values to RegisterUserDto format
      const registerData: RegisterUserDto = {
        fullName: `${values.firstName} ${values.lastName}`,
        email: values.email,
        password: values.password,
        role: values.role.toString(),
      };

      await AuthService.register(registerData);

      toast.success("Registration successful! Please login to continue.");
      actions.setSubmitting(false);
      navigate("/login");
    } catch (error: any) {
      actions.setSubmitting(false);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Registration failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  return { onRegister };
};
