import projectsImg from '../assets/images/projects.png';

export const projects = [
  {
    id: 1,
    title: 'JUNO Website Development',
    description: 'Designed and developed the official JUNO Robotics website to showcase products, services, and learning resources. Integrated product catalog, SEO optimization, and fast loading components.',
    tech: ['HTML', 'CSS', 'JavaScript', 'React', 'Vercel'],
    category: 'Web Development',
    github: 'https://github.com/barath2005-dotcom',
    demo: 'https://juno-robotics.vercel.app/', // Placeholders if they have one, leaving null if not
    featured: true,
    status: 'completed',
    image: projectsImg,
    imagePosition: '0% 10%'
  },
  {
    id: 2,
    title: '3D Developer Portfolio',
    description: 'Designed and developed a 3D interactive portfolio website to showcase projects and skills. Built using modern UI/UX principles, fully responsive and optimized for performance.',
    tech: ['React', 'Three.js', 'Tailwind CSS', 'Vercel'],
    category: 'Web Development',
    github: 'https://github.com/barath2005-dotcom/Personal-Portfolio',
    demo: 'https://barath2005-dotcom.github.io/Personal-Portfolio/',
    featured: true,
    status: 'completed',
    image: projectsImg,
    imagePosition: '50% 10%'
  },
  {
    id: 3,
    title: 'Exploratory Data Analysis Dashboard',
    description: 'Performed in-depth EDA on datasets to uncover trends and insights. Identified patterns, correlations, and key business insights and presented them in an interactive dashboard.',
    tech: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
    category: 'Data Science',
    github: 'https://github.com/barath2005-dotcom',
    demo: null,
    featured: true,
    status: 'completed',
    image: projectsImg,
    imagePosition: '100% 10%'
  }
];
