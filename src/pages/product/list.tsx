import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Image, message, Popconfirm, Table } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

function ProductList() {
  const queryClient = useQueryClient();

  // Lấy danh sách sản phẩm
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => (await axios.get("http://localhost:3000/products")).data,
  });

  // Xóa sản phẩm
  const { mutate } = useMutation({
    mutationFn: async (id: number) => axios.delete(`http://localhost:3000/products/${id}`),
    onSuccess: () => {
      message.success("Xóa sản phẩm thành công!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => message.error("Xóa thất bại!"),
  });

  const columns = [
    { title: "Tên sản phẩm", dataIndex: "name", key: "name" },
    { 
      title: "Giá", 
      dataIndex: "price", 
      key: "price",
      render: (price: number) => `${Math.round(price / 1_000_000)} triệu`

    },
    { 
      title: "Hình ảnh", 
      dataIndex: "image",   
      
      render: (src: string) => <Image src={src} width={100} />,
    },
    { title: "Mô tả", dataIndex: "desc", key: "desc" },
    {
      title: "Hành động",
      render: (product: any) => (
        <>
          <Button type="primary" style={{ marginRight: 8 }}>
            <Link to={`/product/${product.id}/edit`}>Sửa</Link>
          </Button>
          <Popconfirm title="Bạn có chắc muốn xóa?" onConfirm={() => mutate(product.id)} okText="Có" cancelText="Không">
            <Button type="primary" danger>Xóa</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return <Table dataSource={data} columns={columns} loading={isLoading} rowKey="id" />;
}

export default ProductList;
