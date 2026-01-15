import { Category } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'social-media',
    title: 'Social Media',
    subtitle: 'Connect with me on these platforms',
    emoji: '📱',
    items: [
      { id: '1', title: 'Twitter / X', description: 'Tech thoughts & updates', url: '#', tag: 'Daily Updates' },
      { id: '2', title: 'LinkedIn', description: 'Professional network', url: '#', isPopular: true },
      { id: '3', title: 'Instagram', description: 'Behind the scenes', url: '#' },
      { id: '4', title: 'YouTube', description: 'Video tutorials & vlogs', url: '#', tag: 'Subscribe' },
      { id: '5', title: 'TikTok', description: 'Short form content', url: '#' },
    ]
  },
  {
    id: 'web-apps',
    title: 'Web Apps',
    subtitle: 'My custom built applications',
    emoji: '💻',
    items: [
      { id: '1', title: 'SaaS Dashboard', description: 'Analytics platform for creators', url: '#', isPopular: true },
      { id: '2', title: 'Task Master', description: 'Productivity application', url: '#' },
      { id: '3', title: 'Note Taker Pro', description: 'Markdown based note taking', url: '#' },
    ]
  },
  {
    id: 'landing-pages',
    title: 'Landing Pages',
    subtitle: 'High converting sales pages',
    emoji: '🛬',
    items: [
      { id: '1', title: 'Product Launch Alpha', description: 'Pre-launch waitlist page', url: '#' },
      { id: '2', title: 'E-book Sales Page', description: 'Direct response sales letter', url: '#', tag: 'High Conversion' },
      { id: '3', title: 'Webinar Registration', description: 'Event sign-up flow', url: '#' },
    ]
  },
  {
    id: 'websites-funnels',
    title: 'Websites & Funnels',
    subtitle: 'Complete marketing ecosystems',
    emoji: '🌪️',
    items: [
      { id: '1', title: 'Agency Corporate Site', description: 'Main business website', url: '#' },
      { id: '2', title: 'Consulting Funnel', description: 'Lead gen to call booking', url: '#', isPopular: true },
      { id: '3', title: 'Course Sales Funnel', description: 'Upsell and downsell flows', url: '#' },
    ]
  },
  {
    id: 'chrome-extensions',
    title: 'Chrome Extensions',
    subtitle: 'Browser tools for productivity',
    emoji: '🧩',
    items: [
      { id: '1', title: 'Color Picker Plus', description: 'Advanced hex code grabber', url: '#' },
      { id: '2', title: 'SEO Analyzer', description: 'On-page SEO metrics', url: '#' },
      { id: '3', title: 'Tab Manager', description: 'Organize your browser chaos', url: '#', tag: 'Utility' },
    ]
  },
  {
    id: 'video-editing',
    title: 'Video Editing',
    subtitle: 'Resources and portfolio',
    emoji: '🎬',
    items: [
      { id: '1', title: 'Premiere Pro Presets', description: 'My custom transition pack', url: '#' },
      { id: '2', title: 'Davinci Resolve Graded', description: 'Color grading showcase', url: '#' },
      { id: '3', title: 'Stock Footage Library', description: 'Curated assets', url: '#' },
    ]
  },
  {
    id: 'lead-magnets',
    title: 'Lead Magnets',
    subtitle: 'Free value for my audience',
    emoji: '🧲',
    items: [
      { id: '1', title: 'Ultimate SEO Checklist', description: 'PDF Guide', url: '#', isPopular: true },
      { id: '2', title: 'Email Marketing Swipes', description: 'Copy-paste templates', url: '#' },
      { id: '3', title: '5-Day Coding Challenge', description: 'Email course', url: '#' },
    ]
  },
  {
    id: 'education',
    title: 'Education',
    subtitle: 'Courses and learning materials',
    emoji: '🎓',
    items: [
      { id: '1', title: 'React Mastery', description: 'Full stack development course', url: '#' },
      { id: '2', title: 'Digital Marketing 101', description: 'Basics of online growth', url: '#' },
      { id: '3', title: 'UI/UX Design Principles', description: 'Design better apps', url: '#' },
    ]
  },
  {
    id: 'other-tools',
    title: 'Other Tools',
    subtitle: 'Miscellaneous utilities',
    emoji: '🛠️',
    items: [
      { id: '1', title: 'ROI Calculator', description: 'Financial planning tool', url: '#' },
      { id: '2', title: 'Placeholder Generator', description: 'Image asset tool', url: '#' },
      { id: '3', title: 'Lorem Ipsum Gen', description: 'Text generator', url: '#' },
    ]
  },
];