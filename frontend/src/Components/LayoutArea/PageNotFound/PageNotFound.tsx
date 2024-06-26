import "./PageNotFound.css";
import { useNavigate } from "react-router-dom";
import Link from '@mui/material/Link';
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NotFound from "../../../Assets/Images/pageNotFound.jpeg";

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
        <sup> Go bake to the </sup>
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
