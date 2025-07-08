import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Edit2, Trash2, Plus, X } from 'lucide-react';
import { Label } from '../ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_URL = `${API_BASE_URL}/api/colors`;


const ColorManager = () => {
  const [colors, setColors] = useState([]);
  const [formData, setFormData] = useState({ name: '', value: '#000000', rate: '' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchColors();
  }, []);

  const fetchColors = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setColors(data);
    } catch (err) {
      console.error('Error fetching colors:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name.trim(),
      value: formData.value,
      rate: parseFloat(formData.rate),
    };

    if (!payload.name || isNaN(payload.rate)) return;

    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;

      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(payload),
      });

      resetForm();
      fetchColors();
    } catch (err) {
      console.error('Error saving color:', err);
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
      fetchColors();
    } catch (err) {
      console.error('Error deleting color:', err);
    }
  };

  const handleEdit = (color) => {
    setFormData({ 
      name: color.name, 
      value: color.value, 
      rate: color.rate.toString() 
    });
    setEditingId(color._id);
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({ name: '', value: '#000000', rate: '' });
    setEditingId(null);
    setIsDialogOpen(false);
  };

  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6 ">
      {/* Add Color Button */}
      <div className="flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()} className='bg-gray-100'>
              <Plus className="w-4 h-4 mr-2 " /> Add Color
            </Button>
          </DialogTrigger>
          <DialogContent className='bg-gray-100 text-gray-800'>
            <DialogHeader>
              <DialogTitle>
                {editingId ? 'Edit Color' : 'Add New Color'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4 ">
              <div>
                <Label>Color Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div className="flex items-center gap-4">
                <div>
                  <Label>Color Picker</Label>
                  <Input
                    type="color"
                    value={formData.value}
                    onChange={(e) => setFormData((prev) => ({ ...prev, value: e.target.value }))}
                    className="w-16 h-10 p-1"
                  />
                </div>

                <div className="flex-1">
                  <Label>Color Value</Label>
                  <Input
                    value={formData.value}
                    onChange={(e) => setFormData((prev) => ({ ...prev, value: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label>Rate (₹)</Label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.rate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, rate: e.target.value }))}
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={resetForm}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingId ? 'Update' : 'Add'} Color
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Color List */}
      {colors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {colors.map((color) => (
            <Card key={color._id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full border shadow flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: color.value }}
                      title={color.value}
                    >
                      {getInitials(color.name)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">{color.name}</h4>
                      <Badge variant="secondary" className="mt-1">
                        ₹{color.rate}/use
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(color)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(color._id)}
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
      ) : (
        <Card className="border-dashed border-2 border-slate-300">
          <CardContent className="py-12 text-center">
            <p className="text-slate-500 mb-4">No colors configured yet</p>
            <Button 
              onClick={() => setIsDialogOpen(true)} 
              variant="outline"
            >
              Add Your First Color
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ColorManager;