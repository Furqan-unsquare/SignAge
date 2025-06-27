
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSignage } from '@/contexts/SignageContext';

const FontModal = ({ isOpen, onClose, font }) => {
  const { addFont, updateFont } = useSignage();
  const [formData, setFormData] = useState({
    name: '',
    rate: '',
    previewImage: '',
  });

  useEffect(() => {
    if (font) {
      setFormData({
        name: font.name,
        rate: font.rate.toString(),
        previewImage: font.previewImage || '',
      });
    } else {
      setFormData({
        name: '',
        rate: '',
        previewImage: '',
      });
    }
  }, [font, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const rate = parseFloat(formData.rate);
    if (isNaN(rate) || rate < 0) {
      return;
    }

    const fontData = {
      name: formData.name,
      rate,
      previewImage: formData.previewImage || undefined,
    };

    if (font) {
      await updateFont(font.id, fontData);
    } else {
      await addFont(fontData);
    }

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='bg-gray-200 text-gray-800'>
        <DialogHeader>
          <DialogTitle>
            {font ? 'Edit Font' : 'Add New Font'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Font Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="rate">Rate (₹)</Label>
            <Input
              id="rate"
              type="number"
              step="0.01"
              min="0"
              value={formData.rate}
              onChange={(e) => setFormData(prev => ({ ...prev, rate: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="previewImage">Preview Image URL (Optional)</Label>
            <Input
              id="previewImage"
              type="url"
              value={formData.previewImage}
              onChange={(e) => setFormData(prev => ({ ...prev, previewImage: e.target.value }))}
              placeholder="https://example.com/font-preview.png"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {font ? 'Update' : 'Add'} Font
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FontModal;
