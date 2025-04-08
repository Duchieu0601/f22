import { Table } from "antd";
import { useQuery } from "@tanstack/react-query";

export function useList({ resource = "products" }) {
  return useQuery({
    queryKey: [resource],
    queryFn: () => getList({ resource }),
  });
}

function UserList() {
  const { data, isLoading } = useList({ resource: "users" });

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  return (
    <Table
      dataSource={data}
      columns={columns}
      loading={isLoading}
      rowKey="id"
    />
  );
}

export default UserList;

async function getList({ resource }: { resource: string }) {
  const res = await fetch(`http://localhost:3000/${resource}`);
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  const data = await res.json();
  return data;
}
