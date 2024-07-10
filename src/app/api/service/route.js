import { getService } from '../../actions/Service';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;

    const result = await getService(page, limit);
    
    return NextResponse.json(result);
}