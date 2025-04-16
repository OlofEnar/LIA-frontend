import { QueryClient } from '@tanstack/react-query';

const defaultQueryConfig = {
  staleTime: Infinity,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
};

export const queryClient = new QueryClient({
  defaultOptions: { queries: defaultQueryConfig },
});
