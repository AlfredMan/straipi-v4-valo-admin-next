import { useAuth } from "../context/auth";

export const ProtectRoute = ({ children }: { children: any }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (
    isLoading ||
    (!isAuthenticated && window.location.pathname !== '/login')
  ) {
    // return <LoadingScreen />;
    return <div>loading...</div>;
  }
  return children;
};

export default ProtectRoute;
