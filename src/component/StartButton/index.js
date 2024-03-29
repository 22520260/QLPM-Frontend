import { Link } from "react-router-dom";

function StartButton({path, title, img}) {
    return (
        <>
            <Link to={path} class="card col-md-2" >
                <img src={img} class="card-img-top " alt="..." />
                <div class="card-body">
                    <h5 class="card-title">{title}</h5>
                </div>
            </Link>
        </>
    );
}

export default StartButton;