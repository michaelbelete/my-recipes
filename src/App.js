import './App.css';
import { QueryClient, QueryClientProvider } from "react-query";
import Recipes from "./components/Recipes.js";
import Headers from "./components/Header.js";
import Footers from "./components/Footer.js";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Headers />
      <Recipes />
      <Footers />
    </QueryClientProvider>
  );
}

export default App;
