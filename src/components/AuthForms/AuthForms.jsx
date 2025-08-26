import React, { useState } from "react";
import { Eye, EyeOff, Heart, ArrowLeft, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const AuthForms = ({ mode, onBack, onSwitchMode }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const { login, register, loading, error, clearError } = useAuth();

  const isLogin = mode === "login";

  const validateForm = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!isLogin) {
      if (!formData.name || formData.name.trim().length < 2) {
        errors.name = "Name must be at least 2 characters";
      }

      if (!formData.confirmPassword) {
        errors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    clearError();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    let result;
    if (isLogin) {
      result = await login(formData.email, formData.password);
    } else {
      result = await register(formData.name, formData.email, formData.password);
    }

    if (!result.success) {
      console.error("Auth failed:", result.error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    if (error) {
      clearError();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex flex-col">
      <div className="flex items-center justify-between p-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Heart size={20} className="text-white" />
          </div>
          <span className="font-semibold text-white">Anaya</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700 p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                {isLogin ? "Welcome back!" : "Let's get started"}
              </h2>
              <p className="text-gray-300">
                {isLogin
                  ? "I'm excited to continue our conversation"
                  : "I can't wait to get to know you better"}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg backdrop-blur-sm">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    What should I call you?
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg bg-gray-700/50 backdrop-blur-sm text-white placeholder-gray-400 
                             focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all ${
                               formErrors.name
                                 ? "border-red-400"
                                 : "border-gray-600"
                             }`}
                    placeholder="Enter your name"
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-400">
                      {formErrors.name}
                    </p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg bg-gray-700/50 backdrop-blur-sm text-white placeholder-gray-400 
                           focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all ${
                             formErrors.email
                               ? "border-red-400"
                               : "border-gray-600"
                           }`}
                  placeholder="Enter your email"
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-400">
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 pr-12 border rounded-lg bg-gray-700/50 backdrop-blur-sm text-white placeholder-gray-400 
                             focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all ${
                               formErrors.password
                                 ? "border-red-400"
                                 : "border-gray-600"
                             }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 
                             hover:text-gray-200 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {formErrors.password && (
                  <p className="mt-1 text-sm text-red-400">
                    {formErrors.password}
                  </p>
                )}
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 pr-12 border rounded-lg bg-gray-700/50 backdrop-blur-sm text-white placeholder-gray-400 
                               focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all ${
                                 formErrors.confirmPassword
                                   ? "border-red-400"
                                   : "border-gray-600"
                               }`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 
                               hover:text-gray-200 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  {formErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-400">
                      {formErrors.confirmPassword}
                    </p>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-4 rounded-lg 
                         hover:from-pink-600 hover:to-purple-700 font-medium transition-all transform hover:scale-105
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                         flex items-center justify-center gap-2 shadow-lg"
              >
                {loading && <Loader2 size={20} className="animate-spin" />}
                {isLogin ? "Welcome Back" : "Start My Journey"}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-300">
                {isLogin ? "New here?" : "Already have an account?"}
                <button
                  onClick={onSwitchMode}
                  className="ml-2 text-pink-400 hover:text-pink-300 font-medium transition-colors"
                >
                  {isLogin ? "Join me" : "Welcome back"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForms;
