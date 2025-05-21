'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify'; // Add react-toastify for notifications
import 'react-toastify/dist/ReactToastify.css';

export default function BlogForm({ onSubmit, initialData }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setContent(initialData.content || '');
    } else {
      setTitle('');
      setContent('');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error('Title and content are required');
      return;
    }

    if (title.length < 3) {
      toast.error('Title must be at least 3 characters');
      return;
    }

    onSubmit({ title, content });

    if (!initialData) {
      setTitle('');
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {initialData ? 'Update Blog' : 'Add Blog'}
      </button>
    </form>
  );
}