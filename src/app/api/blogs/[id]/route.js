import { NextResponse } from 'next/server';
import dbConnect from '@/dbConnect/dbConnect'; // Adjust the path
import Blog from '@/models/Blog'; // Adjust the path
import mongoose from 'mongoose';

// PUT: Update a blog by ID
export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const updated = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid blog ID' }, { status: 400 });
    }

    if (!updated.title || !updated.content) {
      return NextResponse.json({ error: 'Missing title or content' }, { status: 400 });
    }

    const blog = await Blog.findByIdAndUpdate(
      id,
      { title: updated.title, content: updated.content },
      { new: true, runValidators: true }
    );

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json({ error: validationErrors.join(', ') }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}

// DELETE: Delete a blog by ID
export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid blog ID' }, { status: 400 });
    }

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}