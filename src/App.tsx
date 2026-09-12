import "./index.css";
import store from "./redux/store";
import Todos from "./components/Todos";
import Layout from "./components/Layout";
import Users from "./components/Users";

const App = () => {
  return (
    <Layout>
      <Todos />
      <Users />
    </Layout>
  );
};

export default App;
