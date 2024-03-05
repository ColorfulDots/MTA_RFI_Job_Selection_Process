import dynamic from 'next/dynamic';
import { useDashboardUser } from '@/hooks/useDashboardUser';
import { Meta } from '@/components/Meta';

const Navbar = dynamic<any>(
  () => import('./Navbar').then((mod) => mod.Navbar),
  { ssr: false },
);

const Footer = dynamic<any>(
  () => import('./Footer').then((mod) => mod.Footer),
  { ssr: false },
);

const MainWrapper = dynamic<any>(
  () => import('./MainWrapper').then((mod) => mod.MainWrapper),
  { ssr: false },
);

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  color?: string;
  bg?: string;
}

export const LayoutDashboard: React.FC<LayoutProps> = ({
  children,
  title,
  color,
  bg,
}) => {
  const { auth, user, userData, userLoading } = useDashboardUser();

  return (
    <>
      {auth && user && userData && (
        <>
          <Meta title={title} />
          <Navbar
            color={color}
            bg={bg}
            userLoading={userLoading}
            user={userData}
          />

          <MainWrapper as="main" color={color} bg={bg} user={userData}>
            {children}
          </MainWrapper>

          <Footer color={color} bg={bg} />
        </>
      )}
    </>
  );
};
