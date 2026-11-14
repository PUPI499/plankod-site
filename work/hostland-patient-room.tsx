import { hydrateRoot } from "react-dom/client";
import { PatientRoom } from "../app/smart-systems/patient-room";

const container = document.getElementById("patient-room-demo");
if (container) hydrateRoot(container, <PatientRoom/>);
