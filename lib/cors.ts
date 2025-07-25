import Cors from "cors"
import type { NextApiRequest, NextApiResponse } from "next"

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
  origin: process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000",
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export { cors, runMiddleware }

