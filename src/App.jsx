import "./App.css";
import Footer from "./components/Footer";
import MainContainer from "./components/MainContainer";

function App() {
  return (
    <div className="bg-[url('./assets/bg_img.jpg')] absolute w-screen h-screen overflow-scroll bg-right">
      <div className="bg-cover h-screen w-screen backdrop-blur-lg bg-white/30 overflow-scroll">
        <div className="flex flex-col items-center grow-0">
          <MainContainer />
        </div>

        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default App;
