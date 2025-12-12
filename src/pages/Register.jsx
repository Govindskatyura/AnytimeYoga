import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react'
import Button from '../components/ui/Button'
import Header from '../layouts/Header'
import { api } from '../services/api'

const Register = () => {
    const navigate = useNavigate()
    const [role, setRole] = useState('user') // 'user' or 'teacher'
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        // Clear error when user types
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' })
        }
        if (errors.api) {
            setErrors({ ...errors, api: '' })
        }
    }

    const validate = () => {
        const newErrors = {}
        if (!formData.fullName) newErrors.fullName = 'Full Name is required'
        if (!formData.email) newErrors.email = 'Email is required'
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'

        if (!formData.phone) newErrors.phone = 'Phone Number is required'

        if (!formData.password) newErrors.password = 'Password is required'
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'

        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (validate()) {
            setIsLoading(true)
            try {
                if (role === 'user') {
                    const userData = {
                        name: formData.fullName,
                        email: formData.email,
                        password: formData.password,
                        phone: formData.phone
                    }
                    const data = await api.registerUser(userData)
                    localStorage.setItem('userAuth', JSON.stringify(data))
                    navigate('/dashboard')
                } else if (role === 'teacher') {
                    const teacherData = {
                        name: formData.fullName,
                        email: formData.email,
                        password: formData.password,
                        phone: formData.phone,
                        // Defaults for new teacher signup
                        specialization: ['General Yoga'],
                        id: `TCH${Date.now().toString().slice(-4)}`
                    }
                    const data = await api.registerTeacher(teacherData)
                    localStorage.setItem('teacherAuth', JSON.stringify(data))
                    localStorage.setItem('teacherEmail', data.email)
                    navigate('/teacher/dashboard')
                }
            } catch (error) {
                console.error('Registration failed:', error)
                setErrors({ ...errors, api: error.message })
            } finally {
                setIsLoading(false)
            }
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <div className="flex-grow flex items-center justify-center py-24 px-4 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2070&auto=format&fit=crop"
                        alt="Background"
                        className="w-full h-full object-cover opacity-10"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-yoga-sage-50/80 to-yoga-lavender-50/80 backdrop-blur-sm"></div>
                </div>

                <div className="bg-white/80 backdrop-blur-xl border border-white/50 p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md relative z-10 animate-slide-up">
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">Create Account</h2>
                        <p className="text-gray-600">Join our global community of wellness</p>
                    </div>

                    {/* Role Selector */}
                    <div className="flex space-x-2 mb-6 p-1 bg-gray-100 rounded-xl">
                        <button
                            type="button"
                            onClick={() => setRole('user')}
                            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${role === 'user'
                                    ? 'bg-white text-yoga-sage-600 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            I'm a Student
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('teacher')}
                            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${role === 'teacher'
                                    ? 'bg-white text-purple-600 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            I'm a Teacher
                        </button>
                    </div>

                    {errors.api && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center">
                            {errors.api}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Full Name */}
                        <div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <User size={18} />
                                </div>
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Full Name"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.fullName ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white/50'} focus:outline-none focus:ring-2 focus:ring-yoga-sage-400 transition-all`}
                                />
                            </div>
                            {errors.fullName && <p className="text-red-500 text-xs mt-1 ml-1">{errors.fullName}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white/50'} focus:outline-none focus:ring-2 focus:ring-yoga-sage-400 transition-all`}
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
                        </div>

                        {/* Phone */}
                        <div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Phone size={18} />
                                </div>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white/50'} focus:outline-none focus:ring-2 focus:ring-yoga-sage-400 transition-all`}
                                />
                            </div>
                            {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-10 py-3 rounded-xl border ${errors.password ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white/50'} focus:outline-none focus:ring-2 focus:ring-yoga-sage-400 transition-all`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white/50'} focus:outline-none focus:ring-2 focus:ring-yoga-sage-400 transition-all`}
                                />
                            </div>
                            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 ml-1">{errors.confirmPassword}</p>}
                        </div>

                        <Button
                            className="w-full justify-center mt-6 shadow-lg shadow-yoga-sage-200"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center space-x-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Creating Account...</span>
                                </span>
                            ) : (
                                <span>Create {role === 'teacher' ? 'Teacher' : 'Student'} Account</span>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 text-center bg-white/50 rounded-xl p-4">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="text-yoga-sage-600 font-bold hover:text-yoga-sage-700 transition-colors">
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
