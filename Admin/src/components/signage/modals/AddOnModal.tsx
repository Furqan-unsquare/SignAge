
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useSignage } from '@/contexts/SignageContext';

const AddOnModal = ({ isOpen, onClose, addOn }) => {
  const { addAddOn, updateAddOn } = useSignage();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
  });

  useEffect(() => {
    if (addOn) {
      setFormData({
        name: addOn.name,
        price: addOn.price.toString(),
        description: addOn.description || '',
      });
    } else {
      setFormData({
        name: '',
        price: '',
        description: '',
      });
    }
  }, [addOn, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const price = parseFloat(formData.price);
    if (isNaN(price) || price < 0) {
      return;
    }

    const addOnData = {
      name: formData.name,
      price,
      description: formData.description || undefined,
    };

    if (addOn) {
      await updateAddOn(addOn.id, addOnData);
    } else {
      await addAddOn(addOnData);
    }

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {addOn ? 'Edit Add-on' : 'Add New Add-on'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Add-on Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Remote Control, Hanging Kit"
              required
            />
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

          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of the add-on"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {addOn ? 'Update' : 'Add'} Add-on
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddOnModal;
