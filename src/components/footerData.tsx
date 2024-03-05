import * as React from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaMedium,
  FaDribbble,
  FaApple,
} from 'react-icons/fa';

export interface LinkGroupData {
  title: string;
  links: Array<{
    label: string;
    href: string;
    badge?: React.ReactElement;
  }>;
}

export const links: LinkGroupData[] = [
  {
    title: 'Company',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Legal', href: '/legal' },
      { label: 'FAQs', href: '/faqs' },
    ],
  },
  {
    title: 'Technology',
    links: [
      { label: 'Technologies', href: '/technologies' },
      { label: 'Partnerships', href: '/partnerships' },
      { label: 'Glossary', href: '/technology-glossary' },
      { label: 'Colors', href: '/colors' },
      { label: 'Labs', href: '/labs' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'All Services', href: '/services' },
      { label: 'Development', href: '/development' },
      { label: 'Design', href: '/design' },
    ],
  },

  {
    title: 'Government',
    links: [
      { label: 'Contracting', href: '/government-contracting' },
      { label: 'Acronyms', href: '/government-acronyms' },
      { label: 'IT Staffing', href: '/it-staff-augmentation' },
    ],
  },
];

interface SocialLink {
  label: string;
  icon: React.ReactElement;
  href: string;
}

export const socialLinks: SocialLink[] = [
  {
    label: 'Medium',
    icon: <FaMedium />,
    href: 'https://medium.com/colorful-dots',
  },
  {
    label: 'Facebook',
    icon: <FaFacebook />,
    href: 'https://www.facebook.com/colorfuldotsHQ',
  },
  {
    label: 'Twitter',
    icon: <FaTwitter />,
    href: 'https://twitter.com/colorfuldotsHQ?lang=en',
  },
  {
    label: 'LinkedIn',
    icon: <FaLinkedin />,
    href: 'https://www.linkedin.com/company/colorful-dots',
  },
  {
    label: 'Instagram',
    icon: <FaInstagram />,
    href: 'https://www.instagram.com/colorfuldotsHQ/',
  },

  {
    label: 'Dribbble',
    icon: <FaDribbble />,
    href: 'https://dribbble.com/colorfuldotsHQ',
  },
  {
    label: 'Apple',
    icon: <FaApple />,
    href: 'https://apps.apple.com/us/developer/colorful-dots-llc/id1234009358',
  },
];

interface FooterLink {
  label: string;
  href: string;
}

export const footerLinks: FooterLink[] = [
  { label: 'Terms of Service', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Offer terms', href: '#' },
  { label: 'Legal notice', href: '#' },
  { label: 'Sitemap', href: '#' },
];
