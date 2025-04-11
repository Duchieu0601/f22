// Hook
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  auth,
  create,
  deleteOne,
  getList,
  getOne,
  Props,
  update,
} from "../providers";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

export const useList = ({ resource = "products" }) => {
  return useQuery({
    queryKey: [resource],
    queryFn: () => getList({ resource }),
  });
};

// useOne -> getOne

export const useOne = ({ resource = "products", id }: Props) => {
  return useQuery({
    queryKey: [resource, id],
    queryFn: () => getOne({ resource, id }),
  });
};
// useCreate: addData
export const useCreate = ({ resource = "products" }) => {
  const nav = useNavigate();
  return useMutation({
    mutationFn: (values: any) => create({ resource, values }),
    onSuccess: () => {
      message.success("them thanh cong");
      // chuyen sang trang list: /products
      nav(`/${resource}`);
    },
  });
};

// useUpdate: updateData
export const useUpdate = ({ resource = "products", id }: Props) => {
  const nav = useNavigate();
  return useMutation({
    mutationFn: (values: any) => update({ resource, id, values }),
    onSuccess: () => {
      message.success("update thanh cong");
      // chuyen sang trang list: /products
      nav(`/${resource}`);
    },
  });
};
// useDelete -> deleteOne
export const useDelete = ({ resource = "products" }: Props) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id?: string | number) => deleteOne({ resource, id }),
    onSuccess: () => {
      message.success("Xoa thanh cong");
      qc.invalidateQueries({ queryKey: [resource] });
    },
  });
};

// useAuth
export const useAuth = ({ resource = "register" }) => {
  const nav = useNavigate();
  return useMutation({
    mutationFn: (values: any) => auth({ resource, values }),
    onSuccess: (data) => {
      message.success("thanh cong");
      if (resource == "register") {
        nav("/login");
        return;
      }
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      nav("/products");
    },
  });
};
