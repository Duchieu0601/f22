import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, InputNumber, message } from "antd";
import { useNavigate } from "react-router-dom";
import { create } from "../../providers";

type ProductForm = {
  name: string;
  price: number;
};

function ProductAdd() {
  const nav = useNavigate();

  const { mutate } = useMutation({
    mutationFn: (values: any) => create({ resource: "products", values }),
    onSuccess: () => {
      message.success("them thanh cong");
      nav("/product/list");
    },
    onError: () => {},
  });

  function onFinish(values: ProductForm) {
    mutate(values);
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 30,
        marginTop: 30,
      }}
    >
      ProductAdd
      <Form onFinish={onFinish}>
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true }, { type: "number", min: 0 }]}
        >
          <InputNumber />
        </Form.Item>
        <Button htmlType="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default ProductAdd;
