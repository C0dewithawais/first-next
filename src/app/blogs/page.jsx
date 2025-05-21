'use client';

import { useState, useEffect } from 'react';
import BlogForm from '@/components/BlogForm'; // Adjust the path

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs');
      if (!res.ok) {
        throw new Error('Failed to fetch blogs');
      }
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const handleAdd = async (blogData) => {
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogData),
      });

      if (!res.ok) {
        const errMsg = await res.json();
        console.error('Error creating blog:', errMsg);
        return;
      }

      const newBlog = await res.json();
      setBlogs([...blogs, newBlog]);
    } catch (error) {
      console.error('Failed to create blog:', error);
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
  };

  const handleUpdate = async (updatedBlog) => {
    try {
      const res = await fetch(`/api/blogs/${editingBlog._id}`, {
        // Use _id instead of id
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBlog),
      });

      if (!res.ok) {
        const errMsg = await res.json();
        console.error('Error updating blog:', errMsg);
        return;
      }

      const updated = await res.json();
      setBlogs((prev) =>
        prev.map((b) => (b._id === updated._id ? updated : b)) // Use _id
      );
      setEditingBlog(null);
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errMsg = await res.json();
        console.error('Error deleting blog:', errMsg);
        return;
      }

      setBlogs((prev) => prev.filter((b) => b._id !== id)); // Use _id
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Blogs</h1>

      <BlogForm
        onSubmit={editingBlog ? handleUpdate : handleAdd}
        initialData={editingBlog}
      />

      <ul className="mt-6 space-y-4">
        {blogs.map((blog) => (
          <li key={blog._id} className="border p-4 rounded">
            <h2 className="text-xl">{blog.title}</h2>
            <p>{blog.content}</p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => handleEdit(blog)}
                className="px-3 py-1 bg-yellow-400 text-white"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog._id)} // Use _id
                className="px-3 py-1 bg-red-500 text-white"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}