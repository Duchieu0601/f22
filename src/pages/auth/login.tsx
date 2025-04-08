import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const nav = useNavigate();

  // Hàm gọi API kiểm tra tài khoản
  const loginUser = async (data: LoginForm) => {
    const res = await axios.get(`http://localhost:3000/users?email=${data.email}`);
    return res.data[0]; // Trả về thông tin user
  };

  // Xử lý đăng nhập với React Query
  const { mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: (user) => {
      message.success("Đăng nhập thành công!");
      // Chuyển hướng theo quyền
      if (user.role === "admin") {
        nav("/admin/products");
      } else {
        nav("/"); 
      }
    },
    onError: () => {
      message.error("Tài khoản hoặc mật khẩu không đúng!");
    },
  });

  // Gửi form
  const onFinish = (values: LoginForm) => {
    mutate(values);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
      <Form onFinish={onFinish} layout="vertical" style={{ width: 400 }}>
        <h2 style={{ textAlign: "center" }}>Đăng Nhập</h2>
        <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Email không hợp lệ" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Mật khẩu" name="password" rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}>
          <Input.Password />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>Đăng Nhập</Button>
      </Form>
    </div>
  );
};

export default Login;
