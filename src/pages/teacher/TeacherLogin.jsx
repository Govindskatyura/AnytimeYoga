import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import Header from '../../layouts/Header'
import Button from '../../components/ui/Button'

const TeacherLogin = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' })
        }
    }

    const validate = () => {
        const newErrors = {}

        if (!formData.email) newErrors.email = 'Email is required'
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format'

        if (!formData.password) newErrors.password = 'Password is required'
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validate()) return

        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            // Mock successful login - store auth and teacher email
            localStorage.setItem('teacherAuth', 'true')
            localStorage.setItem('teacherEmail', formData.email)
            navigate('/teacher/dashboard')
        }, 1500)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <section className="flex items-center justify-center py-12 pt-24 min-h-[calc(100vh-80px)]">
                <div className="container-custom max-w-md">
                    {/* Login Card */}
                    <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-xl p-8">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-gradient-to-br from-yoga-sage-400 to-yoga-lavender-400 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                                🧘‍♀️
                            </div>
                            <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                                Teacher Portal
                            </h1>
                            <p className="text-gray-600">Sign in to manage your sessions</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="teacher@anytimeyoga.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-yoga-sage-400`}
                                    />
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                </div>
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-12 py-3 rounded-xl border ${errors.password ? 'border-red-300 bg-red-50' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-yoga-sage-400`}
                                    />
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full justify-center"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="flex items-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Signing in...</span>
                                    </span>
                                ) : (
                                    <span>Login</span>
                                )}
                            </Button>
                        </form>

                        {/* Demo Credentials */}
                        <div className="mt-6 p-4 bg-yoga-lavender-50 rounded-xl border border-yoga-lavender-200">
                            <p className="text-xs text-gray-600 font-medium mb-2">Demo Credentials:</p>
                            <p className="text-xs text-gray-600">Email: teacher@anytimeyoga.com</p>
                            <p className="text-xs text-gray-600">Password: teacher123</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default TeacherLogin
