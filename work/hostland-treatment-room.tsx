import { hydrateRoot } from "react-dom/client";
import { TreatmentRoom } from "../app/smart-systems/treatment-room";

const container = document.getElementById("treatment-room-demo");
if (container) hydrateRoot(container, <TreatmentRoom/>);
