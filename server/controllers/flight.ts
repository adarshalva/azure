// import asyncHandler from 'express-async-handler';
// import { Request, Response, NextFunction } from 'express';

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
import fetch from "node-fetch"; // Ensure node-fetch is installed if using fetch in Node
import Flight from "../models/flight";

// GET /api/flights
export const getFlights = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // To decide whether to fetch from your DB or the external API,
  // you might include a query parameter such as ?source=db or ?source=api.
  const { source, airline, route, sort, filterMode, scheduleDate } = req.query;

  if (source === "db") {
    // Fetch from your own database
    const flights = await Flight.find();
    return res.status(200).json({ flights });
  } else {
    // Default: fetch from external Schiphol API

    if (!scheduleDate) {
      return res.status(400).json({ error: "scheduleDate is required" });
    }

    let url = `${process.env.FLIGHTS_API_URL}/flights?includedelays=false&sort=${sort}&scheduleDate=${scheduleDate}`;

    if (filterMode === "true") {
      if (airline) url += `&airline=${airline}`;
      if (route) url += `&route=${route}`;
    }

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "ResourceVersion": "v4",
        app_id: process.env.FLIGHTS_APP_ID as string,
        app_key: process.env.FLIGHTS_APP_KEY as string,
      },
    });

    if (!response.ok) {
      return res.status(502).json({ error: "Error fetching data from external API" });
    }

    const data = await response.json();

    res.status(200).json({
      flights: data.flights || [],
    });
  }
});

// POST /api/flights
export const createFlight = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // Create a new flight using the Flight model
  const newFlight = new Flight(req.body);
  await newFlight.save();
  res.status(201).json(newFlight);
});
