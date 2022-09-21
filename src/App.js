import Main from "./components/Main";
import MenuSideBar from "./components/MenuSideBar";
import SearchSideBar from "./components/SearchSideBar";

function App() {
  return (
    <div className="App grid grid-cols-8">
      <MenuSideBar></MenuSideBar>
      <Main></Main>
      <SearchSideBar></SearchSideBar>
    </div>
  );
}

export default App;
