import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Header from './layouts/Header'
import Footer from './layouts/Footer'
import Home from './pages/Home'
import WhyYoga from './pages/WhyYoga'
import FitnessBenefits from './pages/FitnessBenefits'
import AboutUs from './pages/AboutUs'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ScheduleSlot from './pages/ScheduleSlot'
import Payment from './pages/Payment'
import Invoice from './pages/Invoice'
import YogaDetail from './pages/YogaDetail'
import BenefitDetail from './pages/BenefitDetail'
import FreeTrial from './pages/FreeTrial'
import WatchDemo from './pages/WatchDemo'
import Feedback from './pages/Feedback'
import TeacherDashboard from './pages/teacher/TeacherDashboard'
import TeacherProfile from './pages/teacher/TeacherProfile'
import AdminDashboard from './pages/admin/AdminDashboard'
import UserManagement from './pages/admin/UserManagement'
import TeacherManagement from './pages/admin/TeacherManagement'
import AllSchedules from './pages/admin/AllSchedules'
import PaymentHistory from './pages/admin/PaymentHistory'
import FeedbackManagement from './pages/admin/FeedbackManagement'
import ComponentDemo from './pages/ComponentDemo'
import HealthCounselor from './pages/HealthCounselor'
import TestTeacherData from './pages/TestTeacherData'
import YogaVideos from './pages/YogaVideos'

function AppContent() {
    const location = useLocation()

    // Hide header and footer for admin, teacher, and user dashboard routes
    const hideLayout = location.pathname.startsWith('/admin') ||
        location.pathname.startsWith('/teacher') ||
        location.pathname === '/dashboard'

    return (
        <div className="flex flex-col min-h-screen">
            {!hideLayout && <Header />}
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/why-yoga" element={<WhyYoga />} />
                    <Route path="/benefits" element={<FitnessBenefits />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/videos" element={<YogaVideos />} />
                    <Route path="/health-counselor" element={<HealthCounselor />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/schedule" element={<ScheduleSlot />} />
                    <Route path="/practice/:id" element={<YogaDetail />} />
                    <Route path="/benefit/:id" element={<BenefitDetail />} />
                    <Route path="/free-trial" element={<FreeTrial />} />
                    <Route path="/watch-demo" element={<WatchDemo />} />
                    <Route path="/payment/:bookingId" element={<Payment />} />
                    <Route path="/invoice/:invoiceId" element={<Invoice />} />
                    <Route path="/feedback" element={<Feedback />} />
                    <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
                    <Route path="/teacher/profile" element={<TeacherProfile />} />
                    <Route path="/teacher/:id" element={<TeacherProfile />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/users" element={<UserManagement />} />
                    <Route path="/admin/teachers" element={<TeacherManagement />} />
                    <Route path="/admin/schedules" element={<AllSchedules />} />
                    <Route path="/admin/payments" element={<PaymentHistory />} />
                    <Route path="/admin/feedback" element={<FeedbackManagement />} />
                    <Route path="/components" element={<ComponentDemo />} />
                    <Route path="/test-teacher-data" element={<TestTeacherData />} />
                </Routes>
            </main>
            {!hideLayout && <Footer />}
        </div>
    )
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    )
}

export default App
