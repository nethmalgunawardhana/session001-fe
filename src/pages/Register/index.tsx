import React, { useEffect } from "react";
import { useRegister } from "hooks";
import { RegisterForm } from "templates/Register";

export const Register: React.FC = () => {
  const { onRegister } = useRegister();

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div>
      <RegisterForm onSubmit={onRegister} />
    </div>
  );
};

export default Register;
