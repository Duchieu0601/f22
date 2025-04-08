import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const RevenueReport = () => {
  // Lấy dữ liệu đơn hàng
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => (await axios.get("http://localhost:3000/order")).data,
  });

  if (isLoading) return <p>Đang tải...</p>;

  if (!orders || orders.length === 0) return <p>Không có đơn hàng nào</p>;

  // Tính toán thống kê
  const totalRevenue = orders.reduce((sum: number, order: { totalPrice: any; }) => {
    const price = Number(order.totalPrice) || 0; // Chuyển thành số, nếu lỗi thì dùng 0
    return sum + price;
  }, 0);
  
  const totalOrders = orders.length;
  const statusCounts = {
    success: orders.filter((o: { status: string; }) => o.status === "success").length,
    pending: orders.filter((o: { status: string; }) => o.status === "pending").length,
    canceled: orders.filter((o: { status: string; }) => o.status === "canceled").length,
  };

  // Tính sản phẩm bán chạy nhất
  const productSales: { [key: string]: number } = {};
  orders.forEach((order: { productId: string | number; quantity: number; }) => {
    if (productSales[order.productId]) {
      productSales[order.productId] += order.quantity;
    } else {
      productSales[order.productId] = order.quantity;
    }
  });

  const bestSellingProduct = Object.entries(productSales).reduce((top, current) =>
    current[1] > (top[1] || 0) ? current : top, ["Không có", 0]
  );

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4">Thống kê đơn hàng</h2>
      <p><strong>Tổng doanh thu:</strong> {totalRevenue.toLocaleString()} VNĐ</p>
      <p><strong>Tổng số đơn hàng:</strong> {totalOrders}</p>
      <p><strong>Đơn đã hoàn thành:</strong> {statusCounts.success}</p>
      <p><strong>Đơn đang chờ:</strong> {statusCounts.pending}</p>
      <p><strong>Đơn bị hủy:</strong> {statusCounts.canceled}</p>
      <p><strong>Sản phẩm bán chạy nhất:</strong> {bestSellingProduct[0]} ({bestSellingProduct[1]} sản phẩm)</p>
    </div>
  );
};

export default RevenueReport;
