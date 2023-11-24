import { useNavigate } from "react-router-dom";
import "./PageNotFound.css";
import NotFound from "../../../Assets/Images/pageNotFound.jpeg";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import PlaceIcon from '@mui/icons-material/Place';
import Link from '@mui/material/Link';

function PageNotFound(): JSX.Element {
    const navigate = useNavigate();
    function handleLocations(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        event.preventDefault();
        navigate("/locations")
      }
    return (
        <div className="PageNotFound">
			<img src={NotFound} alt="404" />
            <div className="ButtonAndText">
                
            <text> Go bake to the </text>
        <Breadcrumbs aria-label="breadcrumb" className="HomepageButton" onClick={handleLocations}>
        <Link
          className="ButtonLink"
          underline="none"
          color="ButtonFace"
          href="/" >
           Homepage
        </Link>
      </Breadcrumbs>
              </div>
        </div>
    );
}

export default PageNotFound;
