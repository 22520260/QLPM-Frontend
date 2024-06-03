import { Link } from "react-router-dom";

function StartButton({path, title, img}) {
    img = '../../assets/images/' + img + '.svg'
    return (
        <div className="row row-md-2 py-2">
            <Link to={path} class="card text-decoration-none border-2" >
                <img className="p-4 card-img-top" src={img} alt="..." />
                <div className="card-body text-center">
                    <h5 className="card-title">{title}</h5>
                </div>
            </Link>
        </div>
    );
}

export default StartButton;