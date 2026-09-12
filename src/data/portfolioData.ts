import { StudentInfo, Project } from '../types';

export const studentProfile: StudentInfo = {
  name: 'Aman Kumar',
  title: 'Front-End Web Developer',
  college: 'G.J. College Rambagh, Bihta',
  collegeShort: 'GJC Bihta',
  affiliation: 'Patliputra University, Patna',
  degree: 'Bachelor of Computer Applications (BCA)',
  year: '2nd Year',
  session: '2024 – 2027',
  rollNo: 'GJC-BCA-2024/082',
  location: 'Bihta, Bihar, Patna',
  city: 'Bihta, Patna',
  state: 'Bihar, India',
  email: 'amit15032003kumar@gmail.com',
  githubUsername: 'amit15032003kumar-cell',
  githubUrl: 'https://github.com/amit15032003kumar-cell',
  specialization: 'Front-End Development & Modern UI/UX',
  status: 'Active Full-Time Student (BCA Year 2)',
  bio: 'A passionate BCA 2nd year student from Bihta, Bihar, dedicated to building responsive, modern, and high-performance web applications with clean code, smooth animations, and user-centric designs.',
  photoUrl: '/avatar.png',
};

export const fallbackProjects: Project[] = [
  {
    id: 'nimbus-weather',
    name: 'nimbus-weather',
    title: 'Nimbus Weather Suite',
    description: 'Beautiful weather web application featuring real-time meteorological data, geolocation tracking, and dynamic climate animations.',
    detailedDescription: 'Engineered with responsive front-end components, geolocation lookups, multi-day forecasting, air quality indices, and clean dark/light mode visualization. Provides real-time weather analytics with intuitive visual feedback.',
    language: 'HTML/CSS/JS',
    languageColor: '#e34c26',
    stars: 2,
    forks: 0,
    repoUrl: 'https://github.com/amit15032003kumar-cell/nimbus-weather',
    liveUrl: 'https://github.com/amit15032003kumar-cell/nimbus-weather',
    topics: ['weather-app', 'geolocation', 'responsive-design', 'weather-api', 'frontend'],
    category: 'web',
    featured: true,
    highlights: [
      'Real-time OpenWeather API integration',
      'Dynamic weather condition animations',
      'Location auto-detection with fallback search',
      'Mobile-first responsive dashboard layout'
    ],
    previewGradient: 'from-cyan-950 via-slate-900 to-blue-950',
    updatedAt: '2026-06-30'
  },
  {
    id: 'song-identifier',
    name: 'song-identifier',
    title: 'SoundWave: Song Identifier',
    description: 'Interactive audio recognition and music identifier web interface designed for beat, pitch, and melody discovery.',
    detailedDescription: 'An interactive audio web interface enabling users to search and discover songs by singing, humming, or beat detection. Features modern Web Audio visualization, responsive audio controls, and an immersive sound spectrum UI.',
    language: 'HTML/JavaScript',
    languageColor: '#f1e05a',
    stars: 3,
    forks: 1,
    repoUrl: 'https://github.com/amit15032003kumar-cell/song-identifier',
    liveUrl: 'https://github.com/amit15032003kumar-cell/song-identifier',
    topics: ['audio-recognition', 'music-finder', 'web-audio', 'interactive-ui', 'sound-waves'],
    category: 'web',
    featured: true,
    highlights: [
      'Interactive visualizer canvas for audio waves',
      'Beat detection and microphone input processing',
      'Sleek glassmorphism media player card layout',
      'Instant search and track preview interface'
    ],
    previewGradient: 'from-emerald-950 via-slate-900 to-teal-950',
    updatedAt: '2026-06-30'
  },
  {
    id: 'DIET-BASED-QPP',
    name: 'DIET-BASED-QPP',
    title: 'NutriTrack: Diet & Hydration App',
    description: 'Comprehensive health application offering customized diet planning, calorie guidance, and daily water consumption tracking.',
    detailedDescription: 'Built to empower users in maintaining balanced nutritional habits. Features customizable daily meal schedules, automated hydration reminders, calorie intake calculators, and responsive progress statistics.',
    language: 'Kotlin',
    languageColor: '#A97BFF',
    stars: 1,
    forks: 0,
    repoUrl: 'https://github.com/amit15032003kumar-cell/DIET-BASED-QPP',
    liveUrl: 'https://github.com/amit15032003kumar-cell/DIET-BASED-QPP',
    topics: ['health-tech', 'diet-planner', 'hydration-tracker', 'kotlin', 'nutrition'],
    category: 'mobile',
    featured: true,
    highlights: [
      'Daily calorie and macro-nutrient breakdown',
      'Smart hydration counter with progress ring',
      'Custom dietary preference profiles',
      'Clean data persistence for daily logs'
    ],
    previewGradient: 'from-amber-950 via-slate-900 to-emerald-950',
    updatedAt: '2026-06-25'
  },
  {
    id: 'breath-mirror-main',
    name: 'breath-mirror-main',
    title: 'Breath Mirror: Zen Focus',
    description: 'Mindfulness and visual breathing pacer designed with rhythm-synced animations to promote relaxation and focus.',
    detailedDescription: 'A front-end mindfulness application designed to guide rhythmic diaphragmatic breathing. Features soothing visual pacing rings, customizable inhale-hold-exhale timers, and an ambient dark relaxation backdrop.',
    language: 'HTML/CSS/JS',
    languageColor: '#563d7c',
    stars: 1,
    forks: 0,
    repoUrl: 'https://github.com/amit15032003kumar-cell/breath-mirror-main',
    liveUrl: 'https://github.com/amit15032003kumar-cell/breath-mirror-main',
    topics: ['mindfulness', 'breathing-app', 'css-animations', 'zen-ui', 'wellness'],
    category: 'web',
    featured: false,
    highlights: [
      'Fluid CSS geometric breathing circle cycle',
      'Harmonic timing modes (Box breathing, 4-7-8)',
      'Minimalist distraction-free layout',
      'Accessible keyboard & touch controls'
    ],
    previewGradient: 'from-purple-950 via-slate-900 to-indigo-950',
    updatedAt: '2026-06-28'
  },
  {
    id: 'Weather-Info',
    name: 'Weather-Info',
    title: 'Weather-Info Data Explorer',
    description: 'Atmospheric data processing and analysis tool exploring climatic trends and meteorological metrics in CLI/Notebook environments.',
    detailedDescription: 'Developed to query and format weather metrics from public climate data sources. Explores temperature variance, precipitation statistics, and data cleaning workflows.',
    language: 'Jupyter Notebook',
    languageColor: '#DA5B0B',
    stars: 0,
    forks: 0,
    repoUrl: 'https://github.com/amit15032003kumar-cell/Weather-Info',
    liveUrl: 'https://github.com/amit15032003kumar-cell/Weather-Info',
    topics: ['data-analysis', 'jupyter-notebook', 'weather-data', 'python', 'analytics'],
    category: 'utility',
    featured: false,
    highlights: [
      'Climatic data cleaning and inspection',
      'Statistical temperature distribution plots',
      'API ingestion and tabular structuring',
      'Command-line data querying interface'
    ],
    previewGradient: 'from-blue-950 via-slate-900 to-cyan-950',
    updatedAt: '2026-06-29'
  },
  {
    id: 'calculator',
    name: 'calculator',
    title: 'CLI Arithmetic Calculator',
    description: 'Lightweight arithmetic calculation engine engineered with clear command-line prompts and reliable mathematical parsing.',
    detailedDescription: 'Created as an foundational programming exercise exploring control structures, algorithmic input validation, error handling for edge cases (divide by zero), and modular arithmetic functions.',
    language: 'C / Scripting',
    languageColor: '#555555',
    stars: 0,
    forks: 0,
    repoUrl: 'https://github.com/amit15032003kumar-cell/calculator',
    liveUrl: 'https://github.com/amit15032003kumar-cell/calculator',
    topics: ['calculator', 'algorithms', 'cmd-line', 'fundamentals'],
    category: 'tool',
    featured: false,
    highlights: [
      'Robust expression handling and evaluation',
      'Command line interface with interactive loops',
      'Input sanitization and division checks',
      'Lightweight memory footprint'
    ],
    previewGradient: 'from-slate-900 via-zinc-900 to-slate-950',
    updatedAt: '2026-01-10'
  }
];

export const skillsData = [
  {
    category: 'Front-End Core',
    skills: [
      { name: 'HTML5 Semantic Markup', level: 'Advanced', percent: 92, icon: 'code' },
      { name: 'Modern CSS3 & Animations', level: 'Advanced', percent: 90, icon: 'palette' },
      { name: 'JavaScript (ES6+)', level: 'Advanced', percent: 88, icon: 'file-code' },
      { name: 'TypeScript', level: 'Intermediate', percent: 78, icon: 'shield-check' },
    ]
  },
  {
    category: 'Frameworks & Styling',
    skills: [
      { name: 'React.js', level: 'Proficient', percent: 85, icon: 'atom' },
      { name: 'Tailwind CSS', level: 'Advanced', percent: 94, icon: 'wind' },
      { name: 'Responsive Layouts & Mobile UI', level: 'Expert', percent: 95, icon: 'smartphone' },
      { name: 'Framer Motion (Animations)', level: 'Proficient', percent: 82, icon: 'sparkles' },
    ]
  },
  {
    category: 'Tools & Workflows',
    skills: [
      { name: 'Git & GitHub Version Control', level: 'Proficient', percent: 86, icon: 'git-branch' },
      { name: 'Vite & Modern Build Tools', level: 'Proficient', percent: 84, icon: 'zap' },
      { name: 'RESTful APIs Integration', level: 'Proficient', percent: 82, icon: 'network' },
      { name: 'UI/UX Wireframing & Design', level: 'Advanced', percent: 88, icon: 'layout' },
    ]
  },
  {
    category: 'Academic BCA Modules',
    skills: [
      { name: 'Data Structures & Algorithms', level: 'Academic', percent: 80, icon: 'binary' },
      { name: 'Database Management (DBMS/SQL)', level: 'Academic', percent: 78, icon: 'database' },
      { name: 'Object-Oriented Programming (C++/Java)', level: 'Academic', percent: 82, icon: 'cpu' },
      { name: 'Computer Networks & Web Architecture', level: 'Academic', percent: 80, icon: 'globe' },
    ]
  }
];

export const academicTimeline = [
  {
    period: '2024 – 2027 (Current)',
    degree: 'Bachelor of Computer Applications (BCA) - 2nd Year',
    institution: 'G.J. College Rambagh, Bihta',
    university: 'Patliputra University (PPU), Patna, Bihar',
    status: 'In Progress • 2nd Year Enrolled',
    description: 'Focusing on Computer Applications, Advanced Data Structures, Web Systems, Database Architecture, and modern Software Engineering practices.',
    highlights: [
      'Top performer in Web Technologies and Programming coursework',
      'Leading front-end development projects and practical labs',
      'Actively exploring modern React ecosystem and cloud tools'
    ]
  },
  {
    period: '2022 – 2024',
    degree: 'Higher Secondary / Intermediate Education',
    institution: 'BSEB, Bihar',
    university: 'State Board of Education, Patna, Bihar',
    status: 'Completed with First Division',
    description: 'Built strong foundational discipline in Mathematics, Physics, and Logic which paved the passion for Computer Science and UI/UX design.',
    highlights: [
      'Consistent academic standing and problem-solving focus',
      'Initiated self-directed web development and coding studies'
    ]
  }
];
