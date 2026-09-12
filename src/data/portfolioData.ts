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
  instagramUsername: 'darky__here',
  instagramUrl: 'https://instagram.com/darky__here',
  linkedinUsername: 'aman-aryan-kumar',
  linkedinUrl: 'https://www.linkedin.com/in/aman-aryan-kumar?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  specialization: 'Front-End Development & Modern Web Apps',
  status: 'BCA 2nd Year Student • Open for Internships',
  bio: 'Hey! I am Aman Kumar, a 2nd-year BCA student at G.J. College in Bihta, Patna. I love building web apps, crafting clean user interfaces in React and Tailwind, and putting my code on GitHub. Always learning something new every day.',
  photoUrl: '/avatar.png',
};

export const fallbackProjects: Project[] = [
  {
    id: 'nimbus-weather',
    name: 'nimbus-weather',
    title: 'Nimbus Weather',
    description: 'A clean weather web app that fetches real-time forecasts and weather conditions based on your current location or city search.',
    detailedDescription: 'Built with JavaScript, OpenWeather API, and CSS. I wanted a simple, distraction-free weather dashboard that automatically detects user location and shows 5-day forecasts with clean responsive visuals.',
    language: 'JavaScript / HTML',
    languageColor: '#e4e4e7',
    stars: 2,
    forks: 0,
    repoUrl: 'https://github.com/amit15032003kumar-cell/nimbus-weather',
    liveUrl: 'https://github.com/amit15032003kumar-cell/nimbus-weather',
    topics: ['weather-app', 'geolocation', 'vanilla-js', 'weather-api'],
    category: 'web',
    featured: true,
    highlights: [
      'Live OpenWeather API integration',
      'Automatic geolocation lookup with search fallback',
      'Responsive design that works on mobile and desktop',
      'Custom weather condition icons and temperature toggle'
    ],
    previewGradient: 'from-zinc-900 to-black',
    updatedAt: '2026-06-30'
  },
  {
    id: 'song-identifier',
    name: 'song-identifier',
    title: 'Song Identifier',
    description: 'A web tool that visualizes audio frequencies and helps identify tracks through microphone input and sound patterns.',
    detailedDescription: 'An experiment with the Web Audio API and audio spectrum analysis in the browser. Features real-time frequency bar animations, beat detection, and track search.',
    language: 'JavaScript',
    languageColor: '#a1a1aa',
    stars: 3,
    forks: 1,
    repoUrl: 'https://github.com/amit15032003kumar-cell/song-identifier',
    liveUrl: 'https://github.com/amit15032003kumar-cell/song-identifier',
    topics: ['audio-analysis', 'web-audio-api', 'music-finder', 'canvas-visualizer'],
    category: 'web',
    featured: true,
    highlights: [
      'Real-time frequency visualizer rendered on HTML5 canvas',
      'Microphone stream capture and pitch detection',
      'Minimalist dark media player interface',
      'Quick search and preview playback'
    ],
    previewGradient: 'from-zinc-900 to-black',
    updatedAt: '2026-06-30'
  },
  {
    id: 'DIET-BASED-QPP',
    name: 'DIET-BASED-QPP',
    title: 'Diet & Hydration App',
    description: 'An Android app built with Kotlin to log daily meals, track water intake, and stay on top of personal nutrition goals.',
    detailedDescription: 'Developed in Kotlin for Android to help students and friends monitor daily calories and water intake. Keeps a local record of meal history and provides helpful reminders.',
    language: 'Kotlin',
    languageColor: '#71717a',
    stars: 1,
    forks: 0,
    repoUrl: 'https://github.com/amit15032003kumar-cell/DIET-BASED-QPP',
    liveUrl: 'https://github.com/amit15032003kumar-cell/DIET-BASED-QPP',
    topics: ['android', 'kotlin', 'diet-tracker', 'water-reminder'],
    category: 'mobile',
    featured: true,
    highlights: [
      'Daily meal calorie counter and macro estimations',
      'Water intake tracking ring with reminder alerts',
      'Offline local data storage for daily logs',
      'Clean Material Design UI'
    ],
    previewGradient: 'from-zinc-900 to-black',
    updatedAt: '2026-06-25'
  },
  {
    id: 'breath-mirror-main',
    name: 'breath-mirror-main',
    title: 'Breath Mirror',
    description: 'A peaceful breathing exercise app with rhythmic visual animations to help take calm breathing breaks while coding.',
    detailedDescription: 'I built this small web app for myself when I needed quick stress-relief breaks during long coding sessions. It guides your breathing with smooth expanding/contracting circles.',
    language: 'HTML & CSS',
    languageColor: '#d4d4d8',
    stars: 1,
    forks: 0,
    repoUrl: 'https://github.com/amit15032003kumar-cell/breath-mirror-main',
    liveUrl: 'https://github.com/amit15032003kumar-cell/breath-mirror-main',
    topics: ['mindfulness', 'breathing-exercise', 'css-keyframes', 'relaxation'],
    category: 'web',
    featured: false,
    highlights: [
      'Smooth CSS keyframe expansion and contraction cycle',
      'Standard 4-4-4 box breathing pacing mode',
      'Completely distraction-free black background',
      'Zero dependencies, fast load time'
    ],
    previewGradient: 'from-zinc-900 to-black',
    updatedAt: '2026-06-28'
  },
  {
    id: 'Weather-Info',
    name: 'Weather-Info',
    title: 'Weather Data Scripts',
    description: 'Python and Jupyter notebooks for fetching historical weather metrics and testing data visualization plots.',
    detailedDescription: 'Exploratory scripts written during my BCA coursework to practice data handling, REST APIs, and basic graphing using Python.',
    language: 'Python',
    languageColor: '#a1a1aa',
    stars: 0,
    forks: 0,
    repoUrl: 'https://github.com/amit15032003kumar-cell/Weather-Info',
    liveUrl: 'https://github.com/amit15032003kumar-cell/Weather-Info',
    topics: ['python', 'data-analysis', 'weather-data', 'jupyter'],
    category: 'utility',
    featured: false,
    highlights: [
      'Public weather API data extraction',
      'Temperature and rainfall data parsing',
      'Clean data formatting in Jupyter Notebook',
      'Simple statistical summaries'
    ],
    previewGradient: 'from-zinc-900 to-black',
    updatedAt: '2026-06-29'
  },
  {
    id: 'calculator',
    name: 'calculator',
    title: 'CLI Calculator',
    description: 'A command-line arithmetic calculator written in C to practice algorithmic fundamentals and error handling.',
    detailedDescription: 'One of my early college programming exercises in C. Parses arithmetic inputs, handles operator precedence, and prevents divide-by-zero errors.',
    language: 'C',
    languageColor: '#555555',
    stars: 0,
    forks: 0,
    repoUrl: 'https://github.com/amit15032003kumar-cell/calculator',
    liveUrl: 'https://github.com/amit15032003kumar-cell/calculator',
    topics: ['c-programming', 'algorithms', 'college-fundamentals', 'cli'],
    category: 'tool',
    featured: false,
    highlights: [
      'Basic arithmetic: addition, subtraction, multiplication, division',
      'Input validation and edge case prevention',
      'Terminal-based menu and continuous loop',
      'Clear, commented source code'
    ],
    previewGradient: 'from-zinc-900 to-black',
    updatedAt: '2026-01-10'
  }
];

export const skillsData = [
  {
    category: 'Front-End Development',
    skills: [
      { name: 'HTML5 & Semantic Structure', level: 'Comfortable', percent: 90, icon: 'code' },
      { name: 'CSS3, Flexbox & Grid', level: 'Comfortable', percent: 92, icon: 'palette' },
      { name: 'JavaScript (ES6+)', level: 'Comfortable', percent: 85, icon: 'file-code' },
      { name: 'React.js', level: 'Active focus', percent: 84, icon: 'atom' },
      { name: 'Tailwind CSS', level: 'Daily driver', percent: 94, icon: 'wind' },
      { name: 'TypeScript', level: 'Learning & Building', percent: 75, icon: 'shield-check' },
    ]
  },
  {
    category: 'Tools & Workflow',
    skills: [
      { name: 'Git & GitHub', level: 'Daily driver', percent: 88, icon: 'git-branch' },
      { name: 'VS Code', level: 'Daily driver', percent: 95, icon: 'code' },
      { name: 'Vite & npm', level: 'Comfortable', percent: 85, icon: 'zap' },
      { name: 'Responsive Web Design', level: 'Comfortable', percent: 92, icon: 'smartphone' },
      { name: 'Browser DevTools & Debugging', level: 'Comfortable', percent: 85, icon: 'layout' },
      { name: 'REST APIs & Fetch', level: 'Comfortable', percent: 82, icon: 'network' },
    ]
  },
  {
    category: 'BCA Coursework & Basics',
    skills: [
      { name: 'C / C++ Basics', level: 'College Syllabus', percent: 80, icon: 'cpu' },
      { name: 'Data Structures', level: 'College Syllabus', percent: 78, icon: 'binary' },
      { name: 'Database & SQL Basics', level: 'College Syllabus', percent: 76, icon: 'database' },
      { name: 'Computer Networks', level: 'College Syllabus', percent: 80, icon: 'globe' },
    ]
  }
];

export const academicTimeline = [
  {
    period: '2024 – 2027',
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'G.J. College Rambagh, Bihta (Patna, Bihar)',
    university: 'Affiliated to Patliputra University (PPU), Patna',
    status: 'Currently in 2nd Year',
    description: 'Pursuing my degree in Computer Applications with coursework in Programming, Web Technologies, Data Structures, and Database Systems.',
    highlights: [
      'Regular student at G.J. College Rambagh Bihta',
      'Focusing spare time on modern React and front-end development',
      'Actively publishing projects to GitHub'
    ]
  },
  {
    period: '2022 – 2024',
    degree: 'Intermediate / 12th Standard',
    institution: 'BSEB Board, Patna, Bihar',
    university: 'Bihar School Examination Board',
    status: 'Completed',
    description: 'Completed higher secondary education in Science stream, laying the foundation for computer science and logical problem solving.',
    highlights: [
      'Science and mathematics background',
      'Developed early interest in web programming and computers'
    ]
  }
];
