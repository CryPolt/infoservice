import fs from 'fs';
import path from 'path';
import { parseStringPromise } from 'xml2js';

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'src/app/api/test/scheme.xml');
        const xmlData = fs.readFileSync(filePath, 'utf8');
        const jsonData = await parseStringPromise(xmlData);
        return new Response(JSON.stringify(jsonData), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: 'Failed to read XML file' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

