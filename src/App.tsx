import "./index.css";
import store from "./redux/store";
import Todos from "./components/Todos";
import Layout from "./components/Layout";

const App = () => {
  return (
    <Layout>
      <Todos />
    </Layout>
  );
};

export default App;
