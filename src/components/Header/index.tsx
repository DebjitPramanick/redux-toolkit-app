import { useSelector } from "react-redux";
import "./index.css";
import { StoreState } from "../../types";

const Header = () => {
  const { total: nTotalTodos } = useSelector(
    (state: StoreState) => state.todosStore,
  );
  return (
    <div className="header-container">
      <h1 className="header-title">RTK App</h1>
      <div className="header-chip">Todos Added: {nTotalTodos}</div>
    </div>
  );
};

export default Header;
