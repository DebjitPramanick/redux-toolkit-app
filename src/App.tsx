import "./index.css";
import store from "./redux/store";
import Layout from "./components/Layout";
import CakeShop from "./components/CakeShop";

const App = () => {
  return (
    <Layout>
      <CakeShop />
      <div></div>
      {/* <Todos />
      <Users /> */}
    </Layout>
  );
};

export default App;
