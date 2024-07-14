import Dashboard from "@/components/Dashboard/Dashboard";
import { useEnsureUserIsAuthenticated } from "@/utils/auth";
import { useFetchProducts } from "@/utils/fetchProducts";

interface DashboardPageProps {
  showAlert: (alert: { message: string; type: string }) => void;
}

export const DashboardPage = (props: DashboardPageProps) => {
  const auth = useEnsureUserIsAuthenticated();
  const fetchedProducts = useFetchProducts(auth.userIsAuthenticated);

  return (
    <Dashboard
      {...props}
      loadingContent={fetchedProducts.loadingContent}
      fetchedProducts={fetchedProducts}
      auth={auth}
    />
  );
};

export default DashboardPage;
