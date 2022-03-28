// Hello World
import { Home } from "./containers/Home";
import "./App.css";
const App = () => {
  return (
    <div className="container-fluid" id="app-div" style={{ height: "100vh" }}>
      <Home />
    </div>
  );
};
export default App;
