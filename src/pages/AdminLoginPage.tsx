
import AdminLogin from '@/components/AdminAuth/AdminLogin';
import SEO from '@/components/SEO';

const AdminLoginPage = () => {
  return (
    <>
      <SEO 
        title="Admin Login - AI Leren"
        description="Secure admin access to AI Leren management dashboard"
        keywords="admin, login, dashboard, management"
      />
      <AdminLogin />
    </>
  );
};

export default AdminLoginPage;
