import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Table, Select, Button, message } from "antd";
import { useState } from "react";

const ListOrder = () => {
  const queryClient = useQueryClient();
  const [statuses, setStatuses] = useState<{ [key: number]: string }>({});

  // Fetch danh sách đơn hàng
  const getOrders = async () => {
    const { data } = await axios.get("http://localhost:3000/order");
    return data;
  };

  // Fetch danh sách sản phẩm để lấy giá sản phẩm
  const getProducts = async () => {
    const { data } = await axios.get("http://localhost:3000/products");
    return data;
  };

  // Sử dụng useQuery để lấy dữ liệu
  const { data: orders, isLoading } = useQuery({ queryKey: ["order"], queryFn: getOrders });
  const { data: products } = useQuery({ queryKey: ["products"], queryFn: getProducts });

  // Hàm tính tổng số tiền của đơn hàng
  const calculateTotalPrice = (productId: number, quantity: number) => {
    const product = products?.find((p: any) => p.id === productId);
    return product ? product.price * quantity : 0;
  };

  // Mutation cập nhật trạng thái đơn hàng
  const updateOrderStatus = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const order = orders?.find((order: { id: number; }) => order.id === id);
      const totalPrice = order ? calculateTotalPrice(order.productId, order.quantity) : 0;
      
      await axios.patch(`http://localhost:3000/order/${id}`, { status, totalPrice });
    },
    onSuccess: () => {
      message.success("Cập nhật trạng thái thành công!");
      queryClient.invalidateQueries({ queryKey: ["order"] }); // Cập nhật lại danh sách đơn hàng
    },
    onError: () => {
      message.error("Lỗi khi cập nhật trạng thái!");
    },
  });

  // Xử lý khi chọn trạng thái
  const handleStatusChange = (id: number, value: string) => {
    setStatuses((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Xử lý khi nhấn "Xác nhận"
  const handleConfirm = (id: number) => {
    const status = statuses[id] || "pending"; // Nếu chưa chọn, giữ nguyên trạng thái
    updateOrderStatus.mutate({ id, status });
  };

  // Cấu hình cột cho bảng
  const columns = [
    {
      title: "ID Đơn hàng",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Product ID",
      dataIndex: "productId",
      key: "productId",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Tổng tiền",
      key: "totalPrice",
      render: (_: any, record: any) => {
        const totalPrice = calculateTotalPrice(record.productId, record.quantity);
        return totalPrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: any) => (
        <Select
          defaultValue={status || "pending"}
          onChange={(value) => handleStatusChange(record.id, value)}
          style={{ width: 120 }}
          disabled={status === "canceled"} // Không thể thay đổi nếu trạng thái là "canceled"
        >
          <Select.Option value="pending">Pending</Select.Option>
          <Select.Option value="success">Success</Select.Option>
          <Select.Option value="canceled">Canceled</Select.Option>
        </Select>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: any) => (
        <Button 
          type="primary" 
          onClick={() => handleConfirm(record.id)}
          disabled={record.status === "canceled"} // Không thể nhấn nếu đã "canceled"
        >
          Xác nhận
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Danh sách đơn hàng</h2>
      <Table dataSource={orders} columns={columns} loading={isLoading} rowKey="id" />
    </div>
  );
};

export default ListOrder;
