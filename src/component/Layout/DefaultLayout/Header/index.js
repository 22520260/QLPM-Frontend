import NavIcon from "../../../NavIcon";

function Header() {
    return (
        <>
            <nav className="navbar bg-primary navbar-expand-md">
                <div className="container-fluid px-4">
                    <a className="navbar-brand" href="">BCarefull</a>
                    <NavIcon />
                </div>
            </nav>

        </>
    );
}

export default Header;