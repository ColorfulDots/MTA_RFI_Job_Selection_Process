import * as React from 'react';

export interface Link {
  label: string;
  href?: string;
  children?: Array<{
    label: string;
    description?: string;
    href: string;
    icon?: React.ReactElement;
  }>;
}

export const links: Link[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Services',
    href: '/services',
  },
  {
    label: 'Clients',
    href: '/clients',
  },
  {
    label: 'Careers',
    href: '/careers',
    // children: [
    //   {
    //     label: 'Get Help',
    //     description: 'Read our documentation and FAQs, or get in touch.',
    //     href: '#',
    //     icon: <IoHelpBuoy />,
    //   },
    //   {
    //     label: 'Events & Meetups',
    //     description: 'Discover and join your local Sketch community.',
    //     href: '#',
    //     icon: <IoCalendar />,
    //   },
    //   {
    //     label: 'Extensions',
    //     description: 'Do even more with Assistants, plugins and integrations.',
    //     href: '#',
    //     icon: <IoGrid />,
    //   },
    //   {
    //     label: 'Blog',
    //     description: 'Get updates, articles and insights from the team.',
    //     href: '#',
    //     icon: <MdWeb />,
    //   },
    // ],
  },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];
