import { useUser } from '@/hooks/useUser';
import dynamic from 'next/dynamic';
import { Skeleton } from '@chakra-ui/react';

const Meta = dynamic<any>(
  () => import('@/components/Meta').then((mod) => mod.Meta),
  {
    ssr: true,
    loading: () => null,
  },
);

const Navbar = dynamic<any>(
  () => import('@/components/Navbar').then((mod) => mod.Navbar),
  {
    ssr: false,
    loading: () => <Skeleton height="80px" />,
  },
);

const Footer = dynamic<any>(
  () => import('@/components/Footer').then((mod) => mod.Footer),
  {
    ssr: false,
    loading: () => <Skeleton height="1963px" />,
  },
);

const MainWrapper = dynamic<any>(
  () => import('@/components/MainWrapper').then((mod) => mod.MainWrapper),
  {
    ssr: false,
    loading: () => <Skeleton minH="500px" />,
  },
);

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  structuredData?: string;
  hasFooter?: boolean;
  hasNavbar?: boolean;
  hasTestimonials?: boolean;
  isBanned?: boolean;
  isActive?: boolean;
  color?: string;
  bg?: string;
  userLoading?: boolean;
  postImage?: any;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  description,
  structuredData,
  hasFooter = true,
  hasNavbar = true,
  color,
  bg,
  postImage,
}) => {
  const { userData, userLoading } = useUser();

  return (
    <>
      <Meta
        title={title}
        description={description}
        postImage={postImage}
        structuredData={structuredData}
      />

      {hasNavbar && (
        <Navbar
          color={color}
          bg={bg}
          userLoading={userLoading}
          user={userData}
        />
      )}

      <MainWrapper as="main" color={color} bg={bg}>
        {children}
      </MainWrapper>

      {hasFooter && <Footer color={color} bg={bg} />}
    </>
  );
};
