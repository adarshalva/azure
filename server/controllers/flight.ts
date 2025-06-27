// import asyncHandler from 'express-async-handler';
// import { Request, Response, NextFunction } from 'express';
// //import fetch from "node-fetch"; // Ensure node-fetch is installed if using fetch in Node
// import Flight from "../models/flight";

// const getFlights = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

//     const { airline, route, sort, filterMode, scheduleDate } = req.query;

//     console.log(req.query)

//     let url = '';

//     if (filterMode === "true") {
//         url = `${process.env.FLIGHTS_API_URL}/flights?airline=${airline}&route=${route}&includedelays=false&sort=${sort}&scheduleDate=${scheduleDate}`;
//     }
//     else {
//         url = `${process.env.FLIGHTS_API_URL}/flights?includedelays=false&sort=${sort}&scheduleDate=${scheduleDate}`;
//     }


//     const response = await fetch(url, {
//         headers: {
//             'Content-Type': 'application/json',
//             'ResourceVersion': 'v4',
//             'app_id': process.env.FLIGHTS_APP_ID as string,
//             'app_key': process.env.FLIGHTS_APP_KEY as string
//         }
//     });
//     const data: any = await response.json();

//     res.status(200).json({
//         flights: data.flights
//     });

// })
// export { getFlights }

import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import fetch from "node-fetch";
import Flight from "../models/flight"; // if using DB later

// GET /api/flights
export const getFlights = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { source, airline, route, sort, filterMode, scheduleDate } = req.query;

  console.log("Incoming query:", req.query);

  let url = `${process.env.FLIGHTS_API_URL}/flights?includedelays=false`;

  if (filterMode === "true") {
    url += `&airline=${airline}&route=${route}`;
  }

  if (sort) url += `&sort=${sort}`;
  if (scheduleDate) url += `&scheduleDate=${scheduleDate}`;

  console.log("Requesting URL:", url);

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "ResourceVersion": "v4",
      "app_id": process.env.FLIGHTS_APP_ID as string,
      "app_key": process.env.FLIGHTS_APP_KEY as string,
    },
  });

  const data: any = await response.json();
  console.log("External API Response:", JSON.stringify(data, null, 2));

  res.status(200).json({ flights: Array.isArray(data.flights) ? data.flights : [] });
});

// POST /api/flights
export const createFlight = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // Create a new flight using the Flight model
  const newFlight = new Flight(req.body);
  await newFlight.save();
  res.status(201).json(newFlight);
});
