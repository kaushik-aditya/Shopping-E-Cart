import { Col, Row } from "react-bootstrap";
import { useState } from "react";
import ViewListIcon from '@mui/icons-material/ViewList';

import ProductDetails from "./productdetails";
import AppSideBar from "./appsidebar";

export default function WebPage() {
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        <Row>
            {/* Sidebar */}
            <Col sm="1" className="d-sm-none btn ">
                <button
                    onClick={toggleSidebar}

                >
                    <ViewListIcon />
                </button>
            </Col>
            <Col sm="2" className={`d-sm-block ${showSidebar ? "" : "d-none"}`}>

                <AppSideBar />
            </Col>

            {/* Content */}
            <Col sm="9">
                {/* Button to toggle the sidebar */}


                <ProductDetails />
            </Col>
        </Row>
    );
}
