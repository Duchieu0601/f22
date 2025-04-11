import { Layout, Menu } from "antd";
import { Outlet, Link } from "react-router-dom";
import { useUser } from "../contexts/userContext";

const { Header, Content } = Layout;

const ClientLayout = () => {
  // lay user tu context
  const { user } = useUser();
  console.log(user);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Main Content */}
      <Layout>
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link to="/">React Antd</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/register">Register</Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to="/login">Login</Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to="/admin">Admin</Link>
            </Menu.Item>
            <Menu.Item key="6">{user?.email}</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ margin: "16px", padding: 24, background: "#fff" }}>
          Email: {user?.email}
          <Outlet /> {/* Render nội dung trang con */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ClientLayout;
