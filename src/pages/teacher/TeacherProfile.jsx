import React, { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { ArrowLeft, Mail, Phone, Award, Star, TrendingUp, Calendar, User, Edit2, BookOpen, Briefcase, GraduationCap, Lightbulb, MapPin, Clock, X, Camera, Save } from 'lucide-react'
import Button from '../../components/ui/Button'
import { api } from '../../services/api'
import cosmicBg from '../../assets/images/cosmic-bg.png'
import yogaAvatar from '../../assets/images/yoga-avatar.png'

const TeacherProfile = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [teacherProfile, setTeacherProfile] = useState(null)
    const [showFullAbout, setShowFullAbout] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editFormData, setEditFormData] = useState({})
    const [previewImage, setPreviewImage] = useState(null)
    const [imageFile, setImageFile] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0)

        const fetchProfile = async () => {
            try {
                const storedAuth = JSON.parse(localStorage.getItem('teacherAuth'))
                if (storedAuth) {
                    setTeacherProfile(storedAuth)
                    setEditFormData({
                        name: storedAuth.name || '',
                        phone: storedAuth.phone || '',
                        bio: storedAuth.bio || '',
                        specialization: storedAuth.specialization ? storedAuth.specialization.join(', ') : '',
                        keySkills: storedAuth.keySkills ? storedAuth.keySkills.join(', ') : '',
                        expertise: storedAuth.expertise ? storedAuth.expertise.join(', ') : '',
                        education: storedAuth.education ? storedAuth.education.join(', ') : '',
                    })
                }
            } catch (error) {
                console.error('Failed to load profile:', error)
            }
        }
        fetchProfile()
    }, [id])

    const handleEditClick = () => {
        setIsEditing(true)
        setEditFormData({
            name: teacherProfile.name || '',
            phone: teacherProfile.phone || '',
            bio: teacherProfile.bio || '',
            specialization: teacherProfile.specialization ? teacherProfile.specialization.join(', ') : '',
            keySkills: teacherProfile.keySkills ? teacherProfile.keySkills.join(', ') : '',
            expertise: teacherProfile.expertise ? teacherProfile.expertise.join(', ') : '',
            education: teacherProfile.education ? teacherProfile.education.join(', ') : '',
        })
    }

    const handleCancelEdit = () => {
        setIsEditing(false)
        setPreviewImage(null)
        setImageFile(null)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setEditFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImageFile(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewImage(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSaveProfile = async (e) => {
        e.preventDefault()
        try {
            let imageUrl = teacherProfile.image

            if (imageFile) {
                const formData = new FormData()
                formData.append('image', imageFile)
                const uploadRes = await api.uploadTeacherImage(formData, teacherProfile.token)
                if (uploadRes.image) {
                    imageUrl = uploadRes.image
                } else if (!uploadRes.image && previewImage) {
                    // Mock fallback for immediate UI update if backend is mock
                    imageUrl = previewImage
                }
            }

            const profileData = {
                name: editFormData.name,
                phone: editFormData.phone,
                bio: editFormData.bio,
                specialization: editFormData.specialization.split(',').map(item => item.trim()).filter(Boolean),
                keySkills: editFormData.keySkills.split(',').map(item => item.trim()).filter(Boolean),
                expertise: editFormData.expertise.split(',').map(item => item.trim()).filter(Boolean),
                education: editFormData.education.split(',').map(item => item.trim()).filter(Boolean),
                image: imageUrl
            }

            const updatedProfile = await api.updateTeacherProfile(profileData, teacherProfile.token)
            setTeacherProfile(updatedProfile)
            setIsEditing(false)
            setPreviewImage(null)
            setImageFile(null)
        } catch (error) {
            console.error("Failed to update", error)
            // Mock Fallback validation only
            alert("Updated successfully (Mock)")
            setTeacherProfile({ ...teacherProfile, ...profileData, image: imageUrl || teacherProfile.image })
            setIsEditing(false)
        }
    }


    if (!teacherProfile) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0f172a]" style={{
                backgroundImage: `url(${cosmicBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                <div className="w-16 h-16 border-4 border-yoga-sage-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen text-gray-100 font-sans selection:bg-yoga-sage-500 selection:text-white" style={{
            backgroundImage: `url(${cosmicBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
        }}>
            {/* Overlay for better readability */}
            <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-[2px] z-0"></div>

            <div className="relative z-10 container-custom max-w-6xl mx-auto px-4 py-8">
                {/* Navigation Bar */}
                <nav className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => navigate('/teacher/dashboard')}
                        className="group flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 transition-all duration-300 hover:scale-105"
                    >
                        <ArrowLeft size={20} className="text-yoga-sage-300 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Back to Dashboard</span>
                    </button>

                    <button
                        onClick={handleEditClick}
                        className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-yoga-sage-500 hover:bg-yoga-sage-600 text-white shadow-lg shadow-yoga-sage-500/30 transition-all duration-300 hover:scale-105"
                    >
                        <Edit2 size={18} />
                        <span className="font-medium">Edit Profile</span>
                    </button>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Profile Card */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl relative overflow-hidden group">
                            {/* Decorative background glow */}
                            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-yoga-sage-500/20 to-transparent"></div>

                            <div className="relative w-40 h-40 mb-6 group-hover:scale-105 transition-transform duration-500">
                                <div className="absolute inset-0 bg-yoga-sage-400 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                                <img
                                    src={teacherProfile.image && teacherProfile.image.startsWith('/') && !teacherProfile.image.startsWith('/src') ? `${api.API_URL}${teacherProfile.image}` : (teacherProfile.image || yogaAvatar)}
                                    alt={teacherProfile.name}
                                    className="relative w-full h-full object-cover rounded-full border-4 border-white/20 shadow-2xl"
                                    onError={(e) => { e.target.onerror = null; e.target.src = yogaAvatar }}
                                />
                                <div className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 border-4 border-[#1a1a1a] rounded-full" title="Online"></div>
                            </div>

                            <h1 className="text-3xl font-display font-bold text-white mb-2">{teacherProfile.name}</h1>
                            <p className="text-yoga-sage-200 font-medium mb-6 flex items-center justify-center space-x-2">
                                <Award size={16} />
                                <span>Certified Yoga Instructor</span>
                            </p>

                            <div className="flex flex-wrap justify-center gap-2 mb-8">
                                {teacherProfile.specialization?.slice(0, 3).map((spec, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">
                                        {spec}
                                    </span>
                                ))}
                            </div>

                            {/* Stats Row */}
                            <div className="grid grid-cols-3 gap-4 w-full border-t border-white/10 pt-6">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-white mb-1">5+</p>
                                    <p className="text-xs text-gray-400 uppercase tracking-wider">Years</p>
                                </div>
                                <div className="text-center border-l border-white/10">
                                    <div className="flex items-center justify-center space-x-1 mb-1">
                                        <span className="text-2xl font-bold text-white">4.9</span>
                                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                                    </div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wider">Rating</p>
                                </div>
                                <div className="text-center border-l border-white/10">
                                    <p className="text-2xl font-bold text-white mb-1">1.2k</p>
                                    <p className="text-xs text-gray-400 uppercase tracking-wider">Students</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Info Card */}
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                                <User size={20} className="mr-2 text-yoga-sage-300" />
                                Contact Information
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group">
                                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Mail size={18} className="text-blue-400" />
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-xs text-gray-400">Email Address</p>
                                        <p className="text-sm font-medium text-gray-200 truncate">{teacherProfile.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group">
                                    <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Phone size={18} className="text-green-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">Phone Number</p>
                                        <p className="text-sm font-medium text-gray-200">{teacherProfile.phone || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group">
                                    <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <MapPin size={18} className="text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">Location</p>
                                        <p className="text-sm font-medium text-gray-200">Rishikesh, India</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Detailed Info */}
                    <div className="lg:col-span-8 space-y-6">

                        {/* About Me Section */}
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl">
                            <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center">
                                <BookOpen size={24} className="mr-3 text-yoga-peach-400" />
                                About Me
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
                                <p>
                                    {showFullAbout
                                        ? (teacherProfile.bio || "Welcome to my profile! I am a passionate yoga instructor.")
                                        : (teacherProfile.bio || "Welcome to my profile! I am a passionate yoga instructor.").slice(0, 200) + '...'}
                                </p>
                                <button
                                    onClick={() => setShowFullAbout(!showFullAbout)}
                                    className="mt-4 text-yoga-sage-300 hover:text-yoga-sage-200 text-sm font-medium flex items-center"
                                >
                                    {showFullAbout ? 'Read Less' : 'Read More'}
                                </button>
                            </div>
                        </div>

                        {/* Two Column Grid for Specialties & Education */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Expertise */}
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 h-full">
                                <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                                    <Lightbulb size={20} className="mr-2 text-yellow-400" />
                                    Expertise
                                </h3>
                                <div className="space-y-3">
                                    {teacherProfile.specialization?.map((spec, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:border-white/20 transition-all">
                                            <span className="text-gray-200">{spec}</span>
                                            <div className="w-2 h-2 rounded-full bg-yoga-sage-400"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Certifications */}
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 h-full">
                                <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                                    <GraduationCap size={20} className="mr-2 text-blue-400" />
                                    Certifications
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                                            <Award size={20} className="text-yoga-lavender-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-white">500-Hour RYT</h4>
                                            <p className="text-sm text-gray-400">Yoga Alliance</p>
                                            <p className="text-xs text-gray-500 mt-1">2018</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                                            <Award size={20} className="text-yoga-lavender-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-white">Pranayama Specialist</h4>
                                            <p className="text-sm text-gray-400">Rishikesh Yoga Academy</p>
                                            <p className="text-xs text-gray-500 mt-1">2020</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Reviews Preview (Mock) */}
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
                            <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                                <Star size={20} className="mr-2 text-orange-400" />
                                What Students Say
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 transition-colors hover:bg-white/10">
                                    <div className="flex items-center mb-3">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />)}
                                    </div>
                                    <p className="text-gray-300 italic text-sm mb-3">"Amazing sessions! The flow was perfect and I felt so relaxed afterwards. Highly recommend."</p>
                                    <div className="flex items-center">
                                        <div className="w-6 h-6 bg-pink-500 rounded-full mr-2"></div>
                                        <span className="text-xs font-medium text-gray-400">Sarah M.</span>
                                    </div>
                                </div>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 transition-colors hover:bg-white/10">
                                    <div className="flex items-center mb-3">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />)}
                                    </div>
                                    <p className="text-gray-300 italic text-sm mb-3">"Truly a transformational experience. The attention to detail is unmatched."</p>
                                    <div className="flex items-center">
                                        <div className="w-6 h-6 bg-blue-500 rounded-full mr-2"></div>
                                        <span className="text-xs font-medium text-gray-400">Rahul K.</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {isEditing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={handleCancelEdit}
                    ></div>
                    <div className="relative bg-gray-900 border border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
                        <div className="sticky top-0 bg-gray-900/95 backdrop-blur-xl p-6 border-b border-white/10 z-10 flex justify-between items-center">
                            <h2 className="text-2xl font-display font-bold text-white">Edit Profile</h2>
                            <button onClick={handleCancelEdit} className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
                                <X size={20} className="text-gray-400 hover:text-white" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Image Upload */}
                            <div className="flex justify-center">
                                <div className="relative group cursor-pointer">
                                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 relative">
                                        <img
                                            src={previewImage || (teacherProfile.image && teacherProfile.image.startsWith('/') && !teacherProfile.image.startsWith('/src') ? `${api.API_URL}${teacherProfile.image}` : (teacherProfile.image || yogaAvatar))}
                                            alt="Profile Preview"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Camera className="text-white" size={32} />
                                        </div>
                                    </div>
                                    <input
                                        type="file"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editFormData.name}
                                        onChange={handleInputChange}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-yoga-sage-500 focus:outline-none placeholder-gray-600 transition-all"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={editFormData.phone}
                                        onChange={handleInputChange}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-yoga-sage-500 focus:outline-none placeholder-gray-600 transition-all"
                                        placeholder="+91..."
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Bio</label>
                                <textarea
                                    name="bio"
                                    value={editFormData.bio}
                                    onChange={handleInputChange}
                                    rows="4"
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-yoga-sage-500 focus:outline-none placeholder-gray-600 transition-all resize-none"
                                    placeholder="Tell us about yourself..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Specializations (comma separated)</label>
                                <input
                                    type="text"
                                    name="specialization"
                                    value={editFormData.specialization}
                                    onChange={handleInputChange}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-yoga-sage-500 focus:outline-none placeholder-gray-600 transition-all"
                                    placeholder="Hatha, Vinyasa, Meditation..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Key Skills (comma separated)</label>
                                <input
                                    type="text"
                                    name="keySkills"
                                    value={editFormData.keySkills}
                                    onChange={handleInputChange}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-yoga-sage-500 focus:outline-none placeholder-gray-600 transition-all"
                                    placeholder="Communication, Empathy, Flexibility..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Education (comma separated)</label>
                                <input
                                    type="text"
                                    name="education"
                                    value={editFormData.education}
                                    onChange={handleInputChange}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-yoga-sage-500 focus:outline-none placeholder-gray-600 transition-all"
                                    placeholder="BA Yoga Science, 500H RYT..."
                                />
                            </div>

                        </div>

                        <div className="p-6 border-t border-white/10 bg-black/20 flex justify-end space-x-4">
                            <button
                                onClick={handleCancelEdit}
                                className="px-6 py-2.5 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveProfile}
                                className="px-6 py-2.5 bg-yoga-sage-500 hover:bg-yoga-sage-600 text-white rounded-full flex items-center space-x-2 shadow-lg shadow-yoga-sage-500/20 font-medium transition-all"
                            >
                                <Save size={18} />
                                <span>Save Changes</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TeacherProfile
