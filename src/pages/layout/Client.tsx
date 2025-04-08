import { Layout, Menu } from "antd";
import { Outlet, Link } from "react-router-dom";
import { useUser } from "../contexts/userContext";

const { Header, Content } = Layout;

const ClientLayout = () => {
  const { user } = useUser();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Header>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1">
              <Link to="/">React Antd</Link>
            </Menu.Item>

            {!user ? (
              <>
                <Menu.Item key="2">
                  <Link to="/client/register">Register</Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to="/client/login">Login</Link>
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item key="4" disabled>
                  {user.email}
                </Menu.Item>
                <Menu.Item key="5">
                  <Link to="/admin">Admin</Link>
                </Menu.Item>
              </>
            )}
          </Menu>
        </Header>

        <Content style={{ margin: "16px", padding: 24, background: "#fff" }}>
          {user && <div>Email: {user.email}</div>}
          <Outlet /> {/* Render trang con */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ClientLayout;
