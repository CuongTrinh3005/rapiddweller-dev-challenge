import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CompilerEditor from './Components/CompilerEditor';
import NavBar from './Components/Navbar';
import TranslateEditor from './Components/TranslatorEditor';

function App() {
    return(
        <div>
            <NavBar/>
            <BrowserRouter>
                <Routes>
                    <Route exact path='/' element={<CompilerEditor/>}/>
                    <Route exact path='/compiler' element={<CompilerEditor/>}/>
                    <Route exact path='/translator' element={<TranslateEditor/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
 
export default App;