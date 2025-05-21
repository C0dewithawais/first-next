import { NextResponse } from 'next/server';
import dbConnect from '@/dbConnect/dbConnect'; // Adjust the path to your dbConnect.js
import Blog from '@/models/Blog'; // Adjust the path to your Blog model

// GET: Fetch all blogs
export async function GET() {
  try {
    await dbConnect();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

// POST: Create a new blog
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body.title || !body.content) {
      return NextResponse.json({ error: 'Missing title or content' }, { status: 400 });
    }

    const newBlog = await Blog.create({
      title: body.title,
      content: body.content,
    });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json({ error: validationErrors.join(', ') }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}