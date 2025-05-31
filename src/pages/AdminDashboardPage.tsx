
import AdminDashboard from '@/components/PromptEngineering/AdminDashboard';
import SEO from '@/components/SEO';

const AdminDashboardPage = () => {
  return (
    <>
      <SEO 
        title="Admin Dashboard - AI Leren"
        description="Beheer je AI Leren platform met uitgebreide analytics en content management tools"
        keywords="admin, dashboard, content management, analytics, AI platform beheer"
      />
      <AdminDashboard />
    </>
  );
};

export default AdminDashboardPage;
