import Header from "./Header";
import Navbar from "./Navbar";

function DefaultLayout({children}) {
    return ( 
        <div>
            <Header />
            <div>
                <Navbar />
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
     );
}

export default DefaultLayout;