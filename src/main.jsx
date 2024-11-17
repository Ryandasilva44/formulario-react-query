import ReactDom from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import "./index.css";

const queryClient = new QueryClient();

ReactDom.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

export default App;
