import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import Header from '../layouts/Header'
import Button from '../components/ui/Button'
import { api } from '../services/api'


const Login = () => {
    const navigate = useNavigate()
    const [role, setRole] = useState(null)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)

        // Auto-redirect if already logged in
        if (localStorage.getItem('userAuth')) {
            navigate('/')
        } else if (localStorage.getItem('teacherAuth')) {
            navigate('/teacher/dashboard')
        } else if (localStorage.getItem('adminAuth')) {
            navigate('/admin/dashboard')
        }
    }, [navigate])

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
        setErrors({})

        try {
            let data
            if (role === 'user') {
                data = await api.loginUser(formData)
                localStorage.setItem('userAuth', JSON.stringify(data))
                navigate('/')
            } else if (role === 'teacher') {
                data = await api.loginTeacher(formData)
                localStorage.setItem('teacherAuth', JSON.stringify(data))
                localStorage.setItem('teacherEmail', data.email) // Keep for legacy support if needed
                navigate('/teacher/dashboard')
            } else if (role === 'admin') {
                data = await api.loginUser(formData)
                if (data.role !== 'admin' && !data.isAdmin) {
                    throw new Error('Not authorized as admin')
                }
                localStorage.setItem('adminAuth', JSON.stringify(data))
                navigate('/admin/dashboard')
            }
        } catch (error) {
            console.error('Login error:', error)
            setErrors({ ...errors, api: error.message })
            // Show error in a general error field or alert (demo purpose: alert or set error)
            // Ideally add an error message display in the UI
        } finally {
            setIsLoading(false)
        }
    }

    const roleConfig = {
        user: {
            title: 'User Login',
            subtitle: 'Access your yoga sessions',
            icon: '🧘',
            color: 'from-yoga-sage-400 to-yoga-lavender-400',
            demo: { email: 'user@example.com', password: 'user123' }
        },
        teacher: {
            title: 'Teacher Portal',
            subtitle: 'Manage your sessions',
            icon: '🧘‍♀️',
            color: 'from-purple-400 to-pink-400',
            demo: { email: 'teacher@anytimeyoga.com', password: 'teacher123' }
        },
        admin: {
            title: 'Admin Panel',
            subtitle: 'Full platform control',
            icon: '👑',
            color: 'from-orange-400 to-red-400',
            demo: { email: 'admin@anytimeyoga.com', password: 'admin123' }
        }
    }

    const config = role ? roleConfig[role] : {
        color: 'from-gray-400 to-gray-500',
        icon: '🔒',
        demo: { email: '', password: '' }
    }

    return (
        <div className="min-h-screen relative">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/login-background.png"
                    alt="Chakra Meditation by Ocean"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-white/60 to-white/80"></div>
            </div>

            <div className="relative z-10">
                <Header />

                <section className="flex items-center justify-center py-12 pt-24 min-h-[calc(100vh-80px)]">
                    <div className="container-custom max-w-md">
                        {/* Role Selector */}
                        <div className="flex space-x-2 mb-6">
                            <button
                                onClick={() => setRole('user')}
                                className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${role === 'user'
                                    ? 'bg-yoga-sage-600 text-white shadow-lg scale-105'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                User
                            </button>
                            <button
                                onClick={() => setRole('teacher')}
                                className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${role === 'teacher'
                                    ? 'bg-purple-600 text-white shadow-lg scale-105'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                Teacher
                            </button>
                            <button
                                onClick={() => setRole('admin')}
                                className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${role === 'admin'
                                    ? 'bg-orange-600 text-white shadow-lg scale-105'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                Admin
                            </button>
                        </div>

                        {/* Login Card */}
                        <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-xl p-8">
                            <div className="text-center mb-8">
                                <div className={`w-16 h-16 bg-gradient-to-br ${config.color} rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4`}>
                                    {config.icon}
                                </div>
                                <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                                    {role ? roleConfig[role].title : 'Welcome Back'}
                                </h1>
                                <p className="text-gray-600">
                                    {role ? roleConfig[role].subtitle : 'Please select your role to login'}
                                </p>
                            </div>

                            {!role ? (
                                <div className="text-center py-8 text-gray-500">
                                    Select User, Teacher, or Admin to continue
                                </div>
                            ) : (
                                <>
                                    {errors.api && (
                                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center">
                                            {errors.api}
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Email */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder={config.demo.email}
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
                                                <span>Login as {role.charAt(0).toUpperCase() + role.slice(1)}</span>
                                            )}
                                        </Button>
                                    </form>
                                </>
                            )}


                            <div className="mt-6 text-center">
                                <p className="text-gray-600">
                                    Don't have an account?{' '}
                                    <Link to="/register" className="text-yoga-sage-600 font-bold hover:text-yoga-sage-700 transition-colors">
                                        Sign up
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div >
        </div >
    )
}

export default Login
