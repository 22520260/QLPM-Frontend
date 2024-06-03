import Navbar from "./Navbar";

function DefaultLayout({ children }) {
    return (
        <div>
            <Navbar />
            <div className="content">
                {children}
            </div>
        </div>
    );
}

export default DefaultLayout;