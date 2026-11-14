import { hydrateRoot } from "react-dom/client";
import { HotelDemo } from "../app/smart-systems/hotels/room/demo";

const container = document.getElementById("hotel-room-demo");
if (container) hydrateRoot(container, <HotelDemo/>);
