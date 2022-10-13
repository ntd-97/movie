import Main from "./components/Main";
import MenuSideBar from "./components/MenuSideBar/MenuSideBar";
import SearchSideBar from "./components/SearchSideBar/SearchSideBar";
import FDTrailerModal from "./components/FilmDetails/FDTrailerModal";

import { createContext, useEffect, useState } from "react";

// export context
export const TrailerModalContext = createContext();
export const LoginContext = createContext();
export const AccountStateContext = createContext();

function App() {
  const [loadTrailer, setloadTrailer] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  const [trailerKey, setTrailerKey] = useState();

  const [accountState, setAccountState] = useState({});

  const [loginInfo, setLoginInfo] = useState({});

  useEffect(() => {
    // get login info from local storage
    if (localStorage.getItem("session_id")) {
      setLoginInfo({
        session_id: localStorage.getItem("session_id"),
        user_id: localStorage.getItem("user_id"),
        user_name: localStorage.getItem("user_name"),
        avatar:
          localStorage.getItem("avatar") === "null"
            ? null
            : localStorage.getItem("avatar"),
      });
    }
  }, []);

  return (
    <LoginContext.Provider value={{ loginInfo, setLoginInfo }}>
      <div className="App relative mx-auto flex max-w-[1920px]">
        {/* <div className="App relative mx-auto grid max-w-[1920px] grid-cols-1 lg:grid-cols-12"> */}
        <AccountStateContext.Provider value={{ accountState, setAccountState }}>
          <MenuSideBar />

          <TrailerModalContext.Provider value={{ setOpenModal, setTrailerKey }}>
            <Main></Main>
          </TrailerModalContext.Provider>

          <SearchSideBar />
        </AccountStateContext.Provider>

        {/* Trailer modal */}
        <FDTrailerModal
          visible={openModal}
          onClose={() => setOpenModal(false)}
          bodyClassName="w-[90%] h-[30%] lg:w-1/2 lg:h-1/2 bg-black flex items-center relative"
        >
          {/* loader */}
          <div
            className={`${
              loadTrailer ? "visible opacity-100" : "hidden opacity-0"
            } absolute inset-0 m-auto h-[30px] w-[30px] animate-spin rounded-full border-[4px] border-primary border-r-transparent`}
          ></div>

          {/* iframe for youtube video */}
          <iframe
            className={`${
              loadTrailer ? "opacity-0" : "opacity-100"
            } h-full w-full`}
            onLoad={() => {
              setloadTrailer(false);
            }}
            loading="lazy"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="YouTube video player"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </FDTrailerModal>
      </div>
    </LoginContext.Provider>
  );
}

export default App;
