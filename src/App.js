import Container from "./components/Container";
import HeaderImg from "./components/HeaderImg";
import StoreProvider from "./context/Store";

function App() {
  return (
    <div className="App">
      <StoreProvider>
        {/* start */}
        <HeaderImg />
        <Container />
        {/* End */}
      </StoreProvider>
    </div>
  );
}

export default App;
