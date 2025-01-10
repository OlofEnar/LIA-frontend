import { QueryClient } from "@tanstack/react-query";

const defaultQueryConfig = { staleTime: Infinity};

export const queryClient = new QueryClient({
  defaultOptions: { queries: defaultQueryConfig },
});