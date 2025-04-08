import { Layout, Menu } from "antd";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const navigate = useNavigate();
  
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const isAdmin = localStorage.getItem("isAdmin");
  //   if (!token || isAdmin !== "true") {
  //     navigate("/client/login");
  //   }
  // }, [navigate]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider collapsible>
        <div
          className="logo"
          style={{
            height: 64,
            textAlign: "center",
            color: "white",
            fontSize: 20,
            lineHeight: "64px",
          }}
        >
          Admin 
        </div>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="revenuereport" icon={<DashboardOutlined />}>
            <Link to="/admin/revenuereport">Revenuereport</Link>
          </Menu.Item>
          <Menu.Item key="products" icon={<UserOutlined />}>
            <Link to="/admin/products">Products</Link>
          </Menu.Item>
          <Menu.Item key="product-add" icon={<UserOutlined />}>
            <Link to="/admin/product/add">Add Products</Link>
          </Menu.Item>
          <Menu.Item key="users" icon={<UserOutlined />}>
            <Link to="/admin/users">Users</Link>
          </Menu.Item>
          <Menu.Item key="orders" icon={<ShoppingCartOutlined />}>
            <Link to="/admin/order">Orders</Link>
          </Menu.Item>
          <Menu.Item
            key="logout"
            icon={<LogoutOutlined />}
            danger
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("isAdmin");
              navigate("/client/login");
            }}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Main Content */}
      <Layout>
        <Header
          style={{ background: "#fff", padding: "0 20px", textAlign: "right" }}
        >
          <span>Admin Dashboard</span>
        </Header>
        <Content style={{ margin: "16px", padding: 24, background: "#fff" }}>
          <Outlet /> {/* Render nội dung trang con */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
