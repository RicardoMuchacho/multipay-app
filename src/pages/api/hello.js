// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req, res) {
  // Get data from your database
  res.status(200).json({ msg: 'works' })
}
