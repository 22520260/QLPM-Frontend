function InOutLayout({ children }) {
    return (
        <div className="row align-items-center m-0" style={{ backgroundImage: 'url("https://images.pexels.com/photos/4226769/pexels-photo-4226769.jpeg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100vh', backgroundPosition: 'center' }}>
            <div class="d-grid col-4 mx-auto">
                {children}
            </div>
        </div>
    );
}

export default InOutLayout;