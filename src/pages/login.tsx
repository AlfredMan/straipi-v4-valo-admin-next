import Layout from "../components/layout/Layout";
import { LoginForm } from "../components/LoginForm";

export const LoginPage = () => {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      {/* <Seo /> */}
      <main>
        <section className="flex flex-col items-center justify-center layout min-h-screen text-center">
          <LoginForm />
        </section>
      </main>
    </Layout>
  );
};

export default LoginPage;
