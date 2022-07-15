import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Main, PersonalArea } from './pages';
import { Header, Footer } from './components';

import './App.css';

function App() {
  let [authorizedUserData, setAuthorizedUserData] = useState({
    id: '',
    email: '',
    surname: '',
    name: '',
    userIconURL: '',
  });
  let [loginOpened, setloginOpened] = useState(false);
  let [signUpOpened, setSignUpOpened] = useState(false);

  const openLogin = () => {
    setloginOpened(!loginOpened);
  };

  const openSignUp = () => {
    setSignUpOpened(!signUpOpened);
  };

  return (
    <div className="App">
      <Header
        authorizedUserData={authorizedUserData}
        openLogin={openLogin}
        openSignUp={openSignUp}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Main
              authorizedUserData={authorizedUserData}
              openLogin={openLogin}
              openSignUp={openSignUp}
              signUpOpened={signUpOpened}
              loginOpened={loginOpened}
              setAuthorizedUserData={setAuthorizedUserData}
            />
          }
        />
        <Route
          path="/personal"
          element={<PersonalArea authorizedUserData={authorizedUserData} />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
