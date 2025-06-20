import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Edit2, Trash2, Plus, Ruler } from 'lucide-react';

const API_URL = 'http://localhost:5000/api/sizes';

const SizeManager = () => {
  const [sizes, setSizes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    width: '',
    height: '',
    rate: '',
  });

  useEffect(() => {
    fetchSizes();
  }, []);

  const fetchSizes = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setSizes(data);
    } catch (err) {
      console.error('Error fetching sizes:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setSizes((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error('Error deleting size:', err);
    }
  };

  const handleEdit = (size) => {
    setEditingId(size._id);
    setFormData({
      name: size.name || '',
      width: size.width?.toString() || '',
      height: size.height?.toString() || '',
      rate: size.rate?.toString() || '',
    });
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({ name: '', width: '', height: '', rate: '' });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ name: '', width: '', height: '', rate: '' });
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      width: parseFloat(formData.width),
      height: parseFloat(formData.height),
      rate: parseFloat(formData.rate),
    };

    const url = editingId ? `${API_URL}/${editingId}` : API_URL;
    const method = editingId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to save');

      await fetchSizes();
      handleCancel();
    } catch (err) {
      console.error('Save failed:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-sm text-slate-600">{sizes.length} size{sizes.length !== 1 ? 's' : ''}</div>
        {!isEditing && (
          <Button onClick={handleAddNew} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Size
          </Button>
        )}
      </div>

      {isEditing && (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white border p-4 rounded shadow">
          <div>
            <label className="text-sm font-medium text-slate-600 block mb-1">Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600 block mb-1">Width (inches)</label>
            <Input
              type="number"
              value={formData.width}
              onChange={(e) => setFormData({ ...formData, width: e.target.value })}
              required
              min="0"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600 block mb-1">Height (inches)</label>
            <Input
              type="number"
              value={formData.height}
              onChange={(e) => setFormData({ ...formData, height: e.target.value })}
              required
              min="0"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600 block mb-1">Rate (₹)</label>
            <Input
              type="number"
              value={formData.rate}
              onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
              required
              min="0"
            />
          </div>

          <div className="col-span-full flex justify-end gap-2 mt-2">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {editingId ? 'Update Size' : 'Add Size'}
            </Button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sizes.map((size) => (
          <Card key={size._id} className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Ruler className="w-4 h-4 text-slate-500" />
                    <h4 className="font-semibold text-slate-800">{size.name}</h4>
                  </div>
                  <div className="text-sm text-slate-600 mb-2">
                    {size.width}" × {size.height}"
                  </div>
                  <Badge variant="secondary">₹{size.rate}</Badge>
                </div>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(size)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit2 className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(size._id)}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              <div className="bg-slate-100 rounded-md p-3">
                <div
                  className="bg-gradient-to-br from-purple-500 to-pink-500 rounded shadow-sm mx-auto"
                  style={{
                    width: `${Math.min(size.width * 4, 60)}px`,
                    height: `${Math.min(size.height * 3, 40)}px`,
                  }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SizeManager;
