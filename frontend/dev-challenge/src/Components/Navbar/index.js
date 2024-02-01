import './style.css'

const NavBar = () => {
    return (
        <div>
            <nav id='navbar'>
                <ul>
                    <a href="/compiler"><li>Code Editor</li></a>
                    <a href="/translator"><li>Translate Editor</li></a>
                </ul>
            </nav>
        </div>
    );
}

export default NavBar;