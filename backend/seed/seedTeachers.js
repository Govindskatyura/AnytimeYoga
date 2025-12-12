const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Teacher = require('../models/Teacher')
const connectDB = require('../config/db')

// Load existing data from frontend constants
const teachers = [
    {
        id: 'TCH006',
        name: 'Abhay Pandey',
        email: 'abhaypandey567@gmail.com',
        phone: '+91 745 485 0412',
        specialization: ['Life Coaching', 'Counseling', 'Hatha', 'Vinyasa', 'Restorative', 'Meditation'],
        totalSessions: 25,
        rating: 5.0,
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
        title: 'Life Coach (Guide and Therapeutic Counselor for Young Adults)',
        bio: 'Specialized in helping young adults through evidence-based therapy combined with yoga and mindfulness practices.',
        about: {
            passion: 'In this age of social media information onslaught, the teenage young adults are subject to extreme degrees of change, growth, and discovery. The teenage years are a time of stress, anxiety, and confusion and adolescents face a range of challenges, including academic pressure, social issues, family, and relationship conflicts. I strongly believe that there should be formal training and exposure to tools and methods that teenagers can learn to help ensure they have power to control their emotional well-being and navigate through the phases of confusion and distress due to changing conditions in their lives.',
            approach: 'As a young adult counselor, I have created a secure and confidential program focused on spiritual growth, self-confidence, and emotional renewal through tailored yoga exercises, relaxation methods, healing affirmations, and self-guided practices. I have many years of experience providing health and wellness support counselling that provides an all-around holistic mind, body, and soul healing. I have witnessed many teenagers successfully overcoming phases of addiction, anxiety, depression, and trauma. My expertise lies in combining evidence-based therapeutic techniques with trauma-informed yoga and mindfulness practices to foster a loving environment that automatically facilitates healing, emotional regulation, and sustainable recovery.'
        },
        keySkills: [
            'Ability to create a loving non-judgmental space',
            'Leverage past experiences to tailor a customized approach',
            'Ability to be perceived more as a guide than a teacher',
            'Deep knowledge of Hatha, Vinyasa, and Restorative Yoga',
            'Years of experience and knowledge of pranayama techniques and meditation practices',
            'Skilled in Mindfulness & Somatic Awareness Techniques',
            'Naturally gifted Empathetic Communicator & Active Listener',
            'Strict adherence to Confidentiality & Ethical Practices'
        ],
        expertise: [
            'Client Assessment & Course of Action Planning',
            'Addiction Counseling & Recovery Support',
            'Group Therapy Sessions',
            'Cognitive Behavioral Therapy (CBT)',
            'Group Facilitation & Workshop Coordination',
            'Motivational Interviewing',
            'Trauma-Informed Care Planning',
            'Crisis Intervention & De-escalation',
            'Yoga for Anxiety & Depression',
            'Relapse Prevention Planning',
            'Individual & Group Class Instruction',
            'Interdisciplinary Collaboration',
            'Addiction Counseling', 'CBT', 'Trauma-Informed Care'
        ],
        education: [
            'Master of Science in Psychology / Counseling',
            'Registered Yoga Teacher - Yoga Alliance – The Yog Institute Mumbai'
        ],
        experience: [
            'Working as a freelance coach and counselor for various rehabilitation centers in India',
            'Served as a Yoga teacher in Convent school',
            'Conducted individual and group therapy sessions for a caseload of 25+ clients with substance use disorders and co-occurring mental health diagnoses',
            'Developed and implemented personalized treatment plans utilizing CBT and Motivational Interviewing to support clients\' recovery journeys',
            'Facilitated weekly psycho-educational groups on topics including relapse prevention, emotional regulation, and coping skills',
            'Designed and taught specialized yoga classes for individuals in addiction recovery, focusing on grounding, stress reduction, and reconnecting with the body',
            'Incorporated trauma-informed principles to ensure a safe and empowering environment for all participants',
            'Led guided meditation and pranayama (breathwork) sessions to help clients manage cravings and anxiety symptoms',
            'Tailored one-on-one yoga sessions for clients with specific physical or psychological needs',
            'Created and launched a unique 8-week program integrating yoga and mindfulness practices with cognitive-behavioral tools for mental wellness',
            'Managed all aspects of program delivery, including marketing, client intake, and session planning'
        ]
    },
    {
        id: 'TCH001',
        name: 'Emma Wilson',
        email: 'emma@anytimeyoga.com',
        title: 'Vinyasa & Hatha Specialist',
        specialization: ['Vinyasa', 'Hatha'],
        phone: '+91 98765 43210',
        totalSessions: 45,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
        bio: 'Expert in flowing sequences that build strength and flexibility while maintaining mindful breathing.',
        expertise: ['Vinyasa Flow', 'Hatha Yoga', 'Meditation']
    },
    {
        id: 'TCH002',
        name: 'David Lee',
        email: 'david@anytimeyoga.com',
        specialization: ['Power Yoga', 'Yin'],
        phone: '+91 98765 43211',
        totalSessions: 32,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
    },
    {
        id: 'TCH003',
        name: 'Sophie Martinez',
        email: 'sophie@anytimeyoga.com',
        specialization: ['Kundalini', 'Meditation'],
        phone: '+91 98765 43212',
        totalSessions: 0,
        rating: 0,
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop'
    },
    {
        id: 'TCH007',
        name: 'Priya Sharma',
        email: 'priya.sharma@anytimeyoga.com',
        title: 'Power Yoga Expert',
        specialization: ['Vinyasa', 'Power Yoga'],
        phone: '+91 98765 43210',
        totalSessions: 245,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
        bio: 'Dynamic instructor focusing on building strength, endurance, and inner peace through powerful practice.',
        expertise: ['Power Yoga', 'Advanced Asanas', 'Strength Building']
    },
    {
        id: 'TCH008',
        name: 'Teacher Demo',
        email: 'teacher@anytimeyoga.com',
        specialization: ['All Styles'],
        phone: '+91 98765 43213',
        totalSessions: 100,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop'
    }
]

dotenv.config({ path: '../.env' })

connectDB()

const importData = async () => {
    try {
        await Teacher.deleteMany()

        await Teacher.insertMany(teachers)

        console.log('Data Imported!')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Teacher.deleteMany()

        console.log('Data Destroyed!')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}
