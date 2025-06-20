import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Edit2, Trash2, Plus, Package } from 'lucide-react';

const API_URL = 'http://localhost:5000/api/addons';

const AddOnManager = () => {
  const [addOns, setAddOns] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    rate: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAddOns();
  }, []);

  const fetchAddOns = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setAddOns(data);
    } catch (err) {
      console.error('Error fetching add-ons:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setAddOns((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleEdit = (addOn) => {
    setEditingId(addOn._id);
    setFormData({
      name: addOn.name || '',
      description: addOn.description || '',
      rate: addOn.rate?.toString() || '',
    });
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({ name: '', description: '', rate: '' });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ name: '', description: '', rate: '' });
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      description: formData.description,
      rate: parseFloat(formData.rate),
    };

    const url = editingId ? `${API_URL}/${editingId}` : API_URL;
    const method = editingId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to save add-on');

      await fetchAddOns();
      handleCancel();
    } catch (err) {
      console.error('Save failed:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-sm text-slate-600">
          {addOns.length} add-on{addOns.length !== 1 ? 's' : ''} available
        </div>
        {!isEditing && (
          <Button onClick={handleAddNew} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Add-on
          </Button>
        )}
      </div>

      {isEditing && (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white border p-4 rounded shadow"
        >
          <div className="col-span-full">
            <label className="block text-sm font-medium mb-1 text-slate-700">Add-on Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="col-span-full">
            <label className="block text-sm font-medium mb-1 text-slate-700">Description</label>
            <Textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="col-span-full">
            <label className="block text-sm font-medium mb-1 text-slate-700">Rate (₹)</label>
            <Input
              type="number"
              min="0"
              step="0.01"
              value={formData.rate}
              onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
              required
            />
          </div>

          <div className="col-span-full flex justify-end gap-2 mt-2">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">{editingId ? 'Update' : 'Add'} Add-on</Button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {addOns.map((addOn) => (
          <Card key={addOn._id} className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-4 h-4 text-slate-500" />
                    <h4 className="font-semibold text-slate-800">{addOn.name}</h4>
                  </div>
                  {addOn.description && (
                    <p className="text-sm text-slate-600 mb-2">{addOn.description}</p>
                  )}
                  <Badge variant="secondary">₹{addOn.rate}</Badge>
                </div>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(addOn)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(addOn._id)}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AddOnManager;
