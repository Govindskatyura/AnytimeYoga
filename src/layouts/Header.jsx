import React, { useState, useEffect } from 'react'
import { Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const [authState, setAuthState] = useState({ isLoggedIn: false, role: null, name: null })
    const location = useLocation()
    const navigate = useNavigate()

    // Pages with dark hero sections where header should be white at top
    const darkHeroPages = ['/', '/benefits', '/why-yoga', '/about', '/videos']
    const isDarkHeroPage = darkHeroPages.includes(location.pathname)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        // Check authentication status
        const userAuth = localStorage.getItem('userAuth')
        const teacherAuth = localStorage.getItem('teacherAuth')
        const adminAuth = localStorage.getItem('adminAuth')

        if (adminAuth) {
            setAuthState({ isLoggedIn: true, role: 'admin', name: 'Admin' })
        } else if (teacherAuth) {
            // Get teacher's actual name from email
            const teacherEmail = localStorage.getItem('teacherEmail')

            // Teacher database (same as in TeacherDashboard)
            const allTeachers = [
                { id: 'TCH001', name: 'Emma Wilson', email: 'emma@anytimeyoga.com' },
                { id: 'TCH002', name: 'David Lee', email: 'david@anytimeyoga.com' },
                { id: 'TCH003', name: 'Sophie Martinez', email: 'sophie@anytimeyoga.com' },
                { id: 'TCH006', name: 'Abhay Pandey', email: 'abhaypandey567@gmail.com' },
                { id: 'TCH007', name: 'Priya Sharma', email: 'priya.sharma@anytimeyoga.com' },
                { id: 'TCH008', name: 'Teacher Demo', email: 'teacher@anytimeyoga.com' }
            ]

            const currentTeacher = allTeachers.find(t => t.email === teacherEmail)
            const teacherName = currentTeacher ? currentTeacher.name : 'Teacher'

            setAuthState({ isLoggedIn: true, role: 'teacher', name: teacherName })
        } else if (userAuth) {
            setAuthState({ isLoggedIn: true, role: 'user', name: 'User' })
        } else {
            setAuthState({ isLoggedIn: false, role: null, name: null })
        }
    }, [location])

    const handleLogout = () => {
        // Clear all auth tokens
        localStorage.removeItem('userAuth')
        localStorage.removeItem('teacherAuth')
        localStorage.removeItem('adminAuth')
        setAuthState({ isLoggedIn: false, role: null, name: null })
        setIsUserMenuOpen(false)
        navigate('/login')
    }

    const getDashboardLink = () => {
        if (authState.role === 'admin') return '/admin/dashboard'
        if (authState.role === 'teacher') return '/teacher/dashboard'
        return '/dashboard'
    }

    const scrollToSection = (sectionId) => {
        if (location.pathname !== '/') {
            window.location.href = `/#${sectionId}`
        } else {
            const element = document.getElementById(sectionId)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            }
        }
        setIsMobileMenuOpen(false)
    }

    // Determine text color based on scroll and page type
    // If scrolled: always dark text (on white/glass background)
    // If not scrolled: white text on dark hero pages, dark text on others
    const textColorClass = isScrolled || !isDarkHeroPage ? 'text-gray-700 hover:text-yoga-sage-600' : 'text-white hover:text-yoga-sage-200'
    const logoTextClass = isScrolled || !isDarkHeroPage ? 'gradient-text' : 'text-white'
    const mobileButtonClass = isScrolled || !isDarkHeroPage ? 'text-gray-700' : 'text-white'

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-effect shadow-lg py-3' : 'bg-transparent py-5'
                }`}
        >
            <div className="container-custom">
                <div className="flex items-center justify-between px-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <img
                            src="/logo.jpg"
                            alt="AnyTime Yoga Logo"
                            className="w-12 h-12 rounded-full shadow-md group-hover:scale-110 transition-transform duration-300 object-cover"
                        />
                        <div>
                            <h1 className={`text-2xl font-bold font-display transition-colors duration-300 ${logoTextClass}`}>
                                Anytime Yoga
                            </h1>
                            <p className={`text-xs italic transition-colors duration-300 ${isScrolled || !isDarkHeroPage ? 'text-gray-500' : 'text-gray-300'}`}>
                                Your peace, anytime
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <button
                            onClick={() => scrollToSection('hero')}
                            className={`transition-colors font-medium ${textColorClass}`}
                        >
                            Home
                        </button>
                        <Link
                            to="/benefits"
                            className={`transition-colors font-medium ${textColorClass}`}
                        >
                            Benefits
                        </Link>
                        <Link
                            to="/why-yoga"
                            className={`transition-colors font-medium ${textColorClass}`}
                        >
                            Why Yoga
                        </Link>
                        <Link
                            to="/about"
                            className={`transition-colors font-medium ${textColorClass}`}
                        >
                            About
                        </Link>
                        <Link
                            to="/videos"
                            className={`transition-colors font-medium ${textColorClass}`}
                        >
                            Videos
                        </Link>
                        <Link
                            to="/health-counselor"
                            className={`transition-colors font-medium ${textColorClass}`}
                        >
                            Health Counselor
                        </Link>

                        {/* Auth Section */}
                        {authState.isLoggedIn ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${isScrolled || !isDarkHeroPage
                                        ? 'hover:bg-gray-100'
                                        : 'hover:bg-white/10 text-white'
                                        }`}
                                >
                                    <div className="w-8 h-8 bg-gradient-to-br from-yoga-sage-400 to-yoga-lavender-400 rounded-full flex items-center justify-center text-white font-bold shadow-sm">
                                        {authState.name[0]}
                                    </div>
                                    <span className={`font-medium ${isScrolled || !isDarkHeroPage ? 'text-gray-700' : 'text-white'}`}>
                                        {authState.name}
                                    </span>
                                </button>

                                {/* Dropdown Menu */}
                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 animate-fade-in">
                                        <Link
                                            to={getDashboardLink()}
                                            onClick={() => setIsUserMenuOpen(false)}
                                            className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 text-gray-700"
                                        >
                                            <LayoutDashboard size={18} />
                                            <span>Dashboard</span>
                                        </Link>
                                        <hr className="my-2" />
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-red-50 text-red-600"
                                        >
                                            <LogOut size={18} />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className={`transition-colors font-medium ${textColorClass}`}>
                                Login
                            </Link>
                        )}

                        <Link to="/schedule">
                            <Button size="small" className="shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                                Book Session
                            </Button>
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className={`md:hidden transition-colors ${mobileButtonClass}`}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden glass-effect rounded-b-2xl shadow-xl animate-slide-up border-t border-gray-100">
                        <nav className="flex flex-col space-y-4 p-6">
                            <button
                                onClick={() => scrollToSection('hero')}
                                className="text-gray-700 hover:text-yoga-sage-600 transition-colors font-medium text-left"
                            >
                                Home
                            </button>
                            <Link
                                to="/benefits"
                                className="text-gray-700 hover:text-yoga-sage-600 transition-colors font-medium text-left"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Benefits
                            </Link>
                            <Link
                                to="/why-yoga"
                                className="text-gray-700 hover:text-yoga-sage-600 transition-colors font-medium text-left"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Why Yoga
                            </Link>
                            <Link
                                to="/about"
                                className="text-gray-700 hover:text-yoga-sage-600 transition-colors font-medium text-left"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                About
                            </Link>
                            <Link
                                to="/videos"
                                className="text-gray-700 hover:text-yoga-sage-600 transition-colors font-medium text-left"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Videos
                            </Link>
                            <Link
                                to="/health-counselor"
                                className="text-gray-700 hover:text-yoga-sage-600 transition-colors font-medium text-left"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Health Counselor
                            </Link>

                            {/* Mobile Auth Section */}
                            {authState.isLoggedIn ? (
                                <>
                                    <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg">
                                        <div className="w-8 h-8 bg-gradient-to-br from-yoga-sage-400 to-yoga-lavender-400 rounded-full flex items-center justify-center text-white font-bold">
                                            {authState.name[0]}
                                        </div>
                                        <span className="font-medium text-gray-700">{authState.name}</span>
                                    </div>
                                    <Link
                                        to={getDashboardLink()}
                                        className="flex items-center space-x-2 text-gray-700 hover:text-yoga-sage-600 transition-colors font-medium text-left"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <LayoutDashboard size={18} />
                                        <span>Dashboard</span>
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors font-medium text-left"
                                    >
                                        <LogOut size={18} />
                                        <span>Logout</span>
                                    </button>
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    className="text-gray-700 hover:text-yoga-sage-600 transition-colors font-medium text-left"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Login
                                </Link>
                            )}

                            <Link to="/schedule" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button className="w-full">Book Session</Button>
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header
