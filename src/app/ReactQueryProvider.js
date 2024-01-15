"use client";
import { QueryClient, QueryClientProvider } from "react-query";
//QueryClient:
//Purpose: Manages the state of data fetching in a React application.
//What it does: Keeps track of queries, caching, and provides a central interface for managing asynchronous data fetching.


//QueryClientProvider:
// Purpose: Makes the QueryClient accessible to components within a specific part of the component tree.
// What it does: Acts as a context provider, ensuring that any component within its subtree can access the shared QueryClient instance.

function ReactQueryProvider({ children }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default ReactQueryProvider;
