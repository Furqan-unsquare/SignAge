
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSignage } from '@/contexts/SignageContext';

const SizeModal = ({ isOpen, onClose, size }) => {
  const { addSize, updateSize } = useSignage();
  const [formData, setFormData] = useState({
    label: '',
    width: '',
    height: '',
    unit: 'inches',
    price: '',
  });

  useEffect(() => {
    if (size) {
      setFormData({
        label: size.label,
        width: size.width.toString(),
        height: size.height.toString(),
        unit: size.unit,
        price: size.price.toString(),
      });
    } else {
      setFormData({
        label: '',
        width: '',
        height: '',
        unit: 'inches',
        price: '',
      });
    }
  }, [size, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const width = parseFloat(formData.width);
    const height = parseFloat(formData.height);
    const price = parseFloat(formData.price);
    
    if (isNaN(width) || width <= 0 || isNaN(height) || height <= 0 || isNaN(price) || price < 0) {
      return;
    }

    const sizeData = {
      label: formData.label,
      width,
      height,
      unit: formData.unit as 'inches' | 'cm',
      price,
    };

    if (size) {
      await updateSize(size.id, sizeData);
    } else {
      await addSize(sizeData);
    }

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {size ? 'Edit Size' : 'Add New Size'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="label">Size Label</Label>
            <Input
              id="label"
              value={formData.label}
              onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))}
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
                onChange={(e) => setFormData(prev => ({ ...prev, width: e.target.value }))}
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
                onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                required
              />
            </div>
          </div>

          <div>
            <Label>Unit</Label>
            <Select value={formData.unit} onValueChange={(value) => setFormData(prev => ({ ...prev, unit: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inches">Inches</SelectItem>
                <SelectItem value="cm">Centimeters</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="price">Price (₹)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {size ? 'Update' : 'Add'} Size
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SizeModal;
