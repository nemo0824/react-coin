import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";


function Router(){
    return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Coins></Coins>}/>
        <Route path="/:coinId" element={<Coin></Coin>}/>
    </Routes>
    </BrowserRouter>
    )
}
export default Router;