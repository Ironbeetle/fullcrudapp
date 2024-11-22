import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import prisma from "../lib/prisma";

export const useItems = () => {
  const queryClient = useQueryClient();

  const fetchItems = async () => {
    const { data } = await prisma.get("/api/items");
    return data;
  };

  const createItem = useMutation({
    mutationFn: async (formData: FormData) =>
      await prisma.post("/api/items", formData),
    onSuccess: () => queryClient.invalidateQueries(["items"]),
  });

  return { fetchItems, createItem };
};
