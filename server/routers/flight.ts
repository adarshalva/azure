// import { Router } from "express";

// import {getFlights} from "../controllers/flight";

// const router: Router = Router();

// router.get("/", getFlights);

// export default router;

import { Router } from "express";
import { getFlights, createFlight } from "../controllers/flight";

const router: Router = Router();

// To fetch flights (either from external API or DB)
router.get("/", getFlights);

// To create a new flight and store it in your database
router.post("/", createFlight);

export default router;
