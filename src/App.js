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
      <div className="App grid grid-cols-8 max-w-screen-[1920px] mx-auto">
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
          bodyClassName="w-1/2 h-1/2 bg-black flex items-center relative"
        >
          {/* loader */}
          <div
            className={`${
              loadTrailer ? "opacity-100 visible" : "opacity-0 hidden"
            } border-[4px] w-[30px] h-[30px] border-primary rounded-full border-r-transparent animate-spin m-auto absolute inset-0`}
          ></div>

          {/* iframe for youtube video */}
          <iframe
            className={`${
              loadTrailer ? "opacity-0" : "opacity-100"
            } w-full h-full`}
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
