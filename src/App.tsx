
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import Highlights from "./pages/Highlights";
import TrendAnalysis from "./pages/TrendAnalysis";
import RegionComparison from "./pages/RegionComparison";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";
import "./styles/App.css";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 3,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 6,
      },
    },
  });
  // future 설정 객체를 생성합니다
  const routerOptions = {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  };
  return (

    <QueryClientProvider client={queryClient}>
      <BrowserRouter {...routerOptions}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/highlights" element={<Highlights />} />
            <Route path="/trend-analysis" element={<TrendAnalysis />} />
            <Route
              path="/regional-climate/:id"
              element={<RegionComparison />}
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>

  );
}

export default App;
