import "./App.css";
import Header from "./components/Header";
import MainContainer from "./components/MainContainer";

function App() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full">
        <Header />
      </div>

      <MainContainer />
    </div>
  );
}

export default App;
