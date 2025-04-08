import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, Select, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type RegisterForm = {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
};

const Register = () => {
  const nav = useNavigate();

  // API đăng ký
  const registerUser = async (data: RegisterForm) => {
    await axios.post("http://localhost:3000/users", data);
  };

  const { mutate } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      message.success("Đăng ký thành công!");
      nav("/login");
    },
    onError: () => {
      message.error("Đăng ký thất bại!");
    },
  });

  const onFinish = (values: RegisterForm) => {
    mutate(values);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
      <Form onFinish={onFinish} layout="vertical" style={{ width: 400 }}>
        <h2 style={{ textAlign: "center" }}>Đăng Ký</h2>
        <Form.Item label="Tên đăng nhập" name="username" rules={[{ required: true, message: "Vui lòng nhập tên" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Email không hợp lệ" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Mật khẩu" name="password" rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item label="Vai trò" name="role" rules={[{ required: true, message: "Chọn vai trò" }]}>
          <Select>
            <Select.Option value="user">User</Select.Option>
            <Select.Option value="admin">Admin</Select.Option>
          </Select>
        </Form.Item>
        <Button type="primary" htmlType="submit" block>Đăng Ký</Button>
      </Form>
    </div>
  );
};

export default Register;
