// import { Router } from "express";

// import {getFlights} from "../controllers/flight";

// const router: Router = Router();

// router.get("/", getFlights);

// export default router;

import { Router } from "express";
import { getFlights, createFlight } from "../controllers/flight";

const router: Router = Router();

router.get("/", getFlights);
router.post("/create", createFlight);

export default router;
