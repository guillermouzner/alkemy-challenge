import "./styles/App.scss";
import { Route, Routes } from "react-router-dom";

//COMPONENTS
import PageContainer from "./components/Containers/PageContainer";
import Navbar from "./components/Navbar/Navbar";
import MobileNavbar from "./components/Navbar/MobileNavbar";

//PAGES
import Auth from "./pages/Auth";

function App() {
    return (
        <div className="App">
            <PageContainer optionClass={"pageContainer"}>
                <Navbar />
                <div className="mobileMenu">
                    {" "}
                    <MobileNavbar />
                </div>
                <Routes>
                    <Route>
                        {/* AUTH PAGE */}
                        <Route path="/auth" element={<Auth />} />
                    </Route>
                </Routes>
            </PageContainer>
        </div>
    );
}

export default App;
