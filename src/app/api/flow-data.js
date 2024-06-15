import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'public', '@app/(components)/main/flow-data.json'); // Path to your file

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const flowData = req.body; // Assuming flow data is sent as JSON in the request body
            fs.writeFileSync(dataFilePath, JSON.stringify(flowData));
            res.status(200).json({ message: 'Flow data saved successfully' });
        } catch (error) {
            console.error('Error saving flow data:', error);
            res.status(500).json({ error: 'Error saving flow data' });
        }
    } else if (req.method === 'GET') {
        try {
            const flowData = fs.readFileSync(dataFilePath, 'utf8');
            res.status(200).json(JSON.parse(flowData));
        } catch (error) {
            console.error('Error loading flow data:', error);
            res.status(500).json({ error: 'Error loading flow data' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}