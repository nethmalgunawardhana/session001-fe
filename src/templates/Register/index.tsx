import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
} from "components/shared";
import { Button } from "components/shared";
import { Link } from "react-router-dom";
import { axiosInstance } from "config";
import toast from "react-hot-toast";

interface Role {
  id: number;
  name: string;
  displayName: string;
}

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(100, "Username must not exceed 100 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  firstName: Yup.string()
    .max(100, "First name must not exceed 100 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .max(100, "Last name must not exceed 100 characters")
    .required("Last name is required"),
  role: Yup.number()
    .min(1, "Please select a role")
    .required("Role is required"),
});

export function RegisterForm({ onSubmit }: any) {
  // Default roles as fallback
  const defaultRoles: Role[] = [
    { id: 1, name: "Admin", displayName: "Admin" },
    { id: 2, name: "ProcurementOfficer", displayName: "Procurement Officer" },
    { id: 3, name: "WarehouseClerk", displayName: "Warehouse Clerk" },
    { id: 4, name: "QualityInspector", displayName: "Quality Inspector" },
    { id: 5, name: "ProjectManager", displayName: "Project Manager" },
    { id: 6, name: "Technician", displayName: "Technician" },
    { id: 7, name: "BillingClerk", displayName: "Billing Clerk" },
    { id: 8, name: "InventoryManager", displayName: "Inventory Manager" },
  ];

  const [roles, setRoles] = useState<Role[]>(defaultRoles);

  useEffect(() => {
    // Try to fetch roles from API, but use defaults if it fails
    axiosInstance
      .get("/auth/roles")
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setRoles(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching roles, using defaults:", error);
        // Keep using default roles
      });
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 py-8">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
          <CardDescription>Register to get started</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
              firstName: "",
              lastName: "",
              role: 0,
            }}
            validationSchema={RegisterSchema}
            onSubmit={(values, actions) => {
              const { confirmPassword, ...registerData } = values;
              onSubmit(registerData, actions);
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="firstName"
                      className="text-sm font-medium leading-none"
                    >
                      First Name
                    </label>
                    <Field
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Enter your first name"
                      className={`flex h-10 w-full rounded-md border ${
                        errors.firstName && touched.firstName
                          ? "border-red-500"
                          : "border-input"
                      } bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="lastName"
                      className="text-sm font-medium leading-none"
                    >
                      Last Name
                    </label>
                    <Field
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Enter your last name"
                      className={`flex h-10 w-full rounded-md border ${
                        errors.lastName && touched.lastName
                          ? "border-red-500"
                          : "border-input"
                      } bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="username"
                    className="text-sm font-medium leading-none"
                  >
                    Username
                  </label>
                  <Field
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Choose a username"
                    className={`flex h-10 w-full rounded-md border ${
                      errors.username && touched.username
                        ? "border-red-500"
                        : "border-input"
                    } bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium leading-none"
                  >
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className={`flex h-10 w-full rounded-md border ${
                      errors.email && touched.email
                        ? "border-red-500"
                        : "border-input"
                    } bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="role"
                    className="text-sm font-medium leading-none"
                  >
                    Role
                  </label>
                  <Field
                    as="select"
                    id="role"
                    name="role"
                    className={`flex h-10 w-full rounded-md border ${
                      errors.role && touched.role
                        ? "border-red-500"
                        : "border-input"
                    } bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                  >
                    <option value={0}>Select a role</option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.displayName}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="role"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium leading-none"
                    >
                      Password
                    </label>
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Create a password"
                      className={`flex h-10 w-full rounded-md border ${
                        errors.password && touched.password
                          ? "border-red-500"
                          : "border-input"
                      } bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="confirmPassword"
                      className="text-sm font-medium leading-none"
                    >
                      Confirm Password
                    </label>
                    <Field
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      className={`flex h-10 w-full rounded-md border ${
                        errors.confirmPassword && touched.confirmPassword
                          ? "border-red-500"
                          : "border-input"
                      } bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  name={isSubmitting ? "Creating account..." : "Register"}
                  variant="primary"
                  className="w-full"
                />

                <div className="text-center text-sm">
                  <span className="text-muted-foreground">
                    Already have an account?{" "}
                  </span>
                  <Link
                    to="/login"
                    className="text-primary hover:underline font-medium"
                  >
                    Sign in here
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
