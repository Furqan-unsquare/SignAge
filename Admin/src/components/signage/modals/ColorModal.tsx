import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSignage } from '@/contexts/SignageContext';

const ColorModal = ({ isOpen, onClose, color }) => {
  const { addColor, updateColor } = useSignage();

  const [formData, setFormData] = useState({
    name: '',
    value: '#000000',
    rate: '',
  });

  useEffect(() => {
    if (color) {
      setFormData({
        name: color.name || '',
        value: color.value || '#000000',
        rate: color.rate?.toString() || '',
      });
    } else {
      setFormData({
        name: '',
        value: '#000000',
        rate: '',
      });
    }
  }, [color, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const rate = parseFloat(formData.rate);
    if (isNaN(rate) || rate < 0) {
      alert('Please enter a valid rate.');
      return;
    }

    const colorData = {
      name: formData.name.trim(),
      value: formData.value.trim(),
      rate,
    };

    try {
      if (color && color._id) {
        await updateColor(color._id, colorData); // ✅ Corrected _id
      } else {
        await addColor(colorData);
      }

      onClose();
    } catch (err) {
      console.error('Color submit failed:', err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='bg-gray-200 text-gray-800'>
        <DialogHeader>
          <DialogTitle>{color ? 'Edit Color' : 'Add New Color'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <Label htmlFor="name">Color Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </div>

          {/* Value */}
          <div>
            <Label htmlFor="value">Color Picker</Label>
            <div className="flex items-center gap-3">
              <Input
                id="value"
                type="color"
                value={formData.value}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, value: e.target.value }))
                }
                className="w-12 h-10 rounded border"
              />
              <Input
                value={formData.value}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, value: e.target.value }))
                }
                className="flex-1 font-mono"
              />
            </div>
          </div>

          {/* Rate */}
          <div>
            <Label htmlFor="rate">Rate (₹)</Label>
            <Input
              id="rate"
              type="number"
              min="0"
              step="0.01"
              value={formData.rate}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, rate: e.target.value }))
              }
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {color ? 'Update' : 'Add'} Color
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ColorModal;
