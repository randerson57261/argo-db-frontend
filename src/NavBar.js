import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "./img/logo.png";
import logosm from "./img/logo_sm_30.png";

const NavBar = (props) => {
  return (
    <Navbar fixed="top" variant="dark" className="px-5" expand="md">
      <Container fluid>
        <Navbar.Brand href="#home">
          <picture>
            <source media="(max-width: 769px)" srcSet={logosm} />
            <img src={logo} alt="Logo" />
          </picture>
        </Navbar.Brand>
        <Navbar.Brand>Argo Database</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Nav>
            <NavDropdown align="end" title="Floats" id="collapsable-nav-dropdown">
              <NavDropdown.Item href="/">Deployed</NavDropdown.Item>
              <NavDropdown.Item href="floats_predeployment">Predeployment</NavDropdown.Item>
              <NavDropdown.Item href="floats_tracking">Tracking</NavDropdown.Item>
              <NavDropdown.Item href="sensor_qc">Sensor QC</NavDropdown.Item>
              <NavDropdown.Item href="floats_serial_no">Serial Numbers</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown align="end" title="Data" id="collapsable-nav-dropdown">
              <NavDropdown.Item href="profile_explorer">Profile Explorer</NavDropdown.Item>
              <NavDropdown.Item href="map">Map</NavDropdown.Item>
              <NavDropdown.Item href="latest_profiles">Latest Profiles</NavDropdown.Item>
              <NavDropdown.Item href="all_profiles">All Profiles</NavDropdown.Item>
              <NavDropdown.Item href="compare_latest_profiles">
                Compare Latest Profiles
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
