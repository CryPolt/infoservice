import pool from '../../../lib/db';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Утилита для преобразования ReadableStream в текст
async function readableStreamToText(stream) {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let result = '';
  let done = false;
  while (!done) {
    const { value, done: streamDone } = await reader.read();
    done = streamDone;
    result += decoder.decode(value, { stream: !done });
  }
  return result;
}

// Утилита для парсинга FormData из текста
function parseFormData(text) {
  const boundary = text.split('\r\n')[0].replace('--', '');
  const parts = text.split(new RegExp(`--${boundary}(\r\n|\r|\n)?`)).filter(part => part);
  const fields = {};
  const files = {};

  for (let part of parts) {
    if (part.includes('Content-Disposition')) {
      const nameMatch = part.match(/name="([^"]+)"/);
      const name = nameMatch ? nameMatch[1] : null;

      if (name) {
        const fileMatch = part.match(/filename="([^"]+)"/);
        if (fileMatch) {
          const filename = fileMatch[1];
          const content = part.split('\r\n\r\n')[1].split('\r\n--')[0];
          const data = Buffer.from(content, 'binary');
          files[name] = { filename, data };
        } else {
          const value = part.split('\r\n\r\n')[1].split('\r\n--')[0];
          fields[name] = value.trim();
        }
      }
    }
  }
  return { fields, files };
}

export async function POST(req) {
  console.log("Received a POST request");

  if (req.method !== 'POST') {
    console.log("Method Not Allowed");
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }

  try {
    const text = await readableStreamToText(req.body);
    const { fields, files } = parseFormData(text);

    const { name, role, socialLinks: socialLinksString } = fields;
    const socialLinks = socialLinksString ? JSON.parse(socialLinksString) : {};

    if (!name || !role) {
      console.log("Invalid request format:", { name, role });
      return NextResponse.json({ error: 'Name and role are required fields' }, { status: 400 });
    }

    let imageUrl = ''; 

    if (files.image) {
      const image = files.image;
      const imageFileName = `${Date.now()}_${image.filename}`;
      const imagePath = path.join(process.cwd(), 'public', 'uploads', imageFileName);

      await fs.promises.mkdir(path.dirname(imagePath), { recursive: true });
      await fs.promises.writeFile(imagePath, image.data);

      imageUrl = `/uploads/${imageFileName}`;
    }

    const connection = await pool.getConnection();

    console.log("Inserting new team member");
    const [result] = await connection.query(
      'INSERT INTO team (name, role, imageUrl, socialLinks) VALUES (?, ?, ?, ?)',
      [name, role, imageUrl, JSON.stringify(socialLinks)]
    );
    connection.release();

    console.log("Team member created with ID:", result.insertId);

    return NextResponse.json({
      success: true,
      id: result.insertId,
      name,
      role,
      imageUrl,
      socialLinks
    }, { status: 201 });

  } catch (error) {
    console.error('Error adding team member:', error);
    return NextResponse.json({ error: 'Error adding team member' }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
