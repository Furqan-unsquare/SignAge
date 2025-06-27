import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSignage } from '@/contexts/SignageContext';

const SizeModal = ({ isOpen, onClose, size, onSuccess }) => {
  const { addSize, updateSize } = useSignage();

  const [formData, setFormData] = useState({
    name: '',
    width: '',
    height: '',
    rate: '',
  });

useEffect(() => {
  if (size) {
    setFormData({
      name: size.name || '',
      width: size.width?.toString() || '',
      height: size.height?.toString() || '',
      rate: size.rate?.toString() || '',
    });
  } else {
    setFormData({
      name: '',
      width: '',
      height: '',
      rate: '',
    });
  }
}, [size, isOpen]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const width = parseFloat(formData.width);
    const height = parseFloat(formData.height);
    const price = parseFloat(formData.rate);

    if (isNaN(width) || width <= 0 || isNaN(height) || height <= 0 || isNaN(price) || price < 0) {
      return;
    }

    const sizeData = {
      name: formData.name,
      width,
      height,
      price,
    };

    try {
      if (size && size.id) {
        await updateSize(size.id, sizeData);
      } else {
        await addSize(sizeData);
      }

      onSuccess?.(); // fetch again and close modal
      onClose();
    } catch (error) {
      console.error('Failed to save size:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='bg-gray-200 text-gray-800'>
        <DialogHeader>
          <DialogTitle>{size ? 'Edit Size' : 'Add New Size'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="label">Size Label</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Small, Medium, Large"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                type="number"
                step="0.1"
                min="0.1"
                value={formData.width}
                onChange={(e) => setFormData((prev) => ({ ...prev, width: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                type="number"
                step="0.1"
                min="0.1"
                value={formData.height}
                onChange={(e) => setFormData((prev) => ({ ...prev, height: e.target.value }))}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="price">Price (₹)</Label>
          <Input
            id="rate"
            type="number"
            step="0.01"
            min="0"
            value={formData.rate}
            onChange={(e) => setFormData((prev) => ({ ...prev, rate: e.target.value }))}
            required
          />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{size ? 'Update' : 'Add'} Size</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SizeModal;
