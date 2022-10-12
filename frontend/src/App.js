import "./styles/App.scss";

//COMPONENTS
import PageContainer from "./components/Containers/PageContainer";
import Navbar from "./components/Navbar/Navbar";
import MobileNavbar from "./components/Navbar/MobileNavbar";
import { Route, Routes } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <PageContainer>
                <Navbar />
                <div className="mobileMenu">
                    {" "}
                    <MobileNavbar />
                </div>
                <Routes>
                    <Route></Route>
                </Routes>
            </PageContainer>
        </div>
    );
}

export default App;
