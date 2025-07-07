import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const FontModal = ({ isOpen, onClose, font, onSave, loading }) => {
  const [name, setName] = useState(font?.name || '');
  const [rate, setRate] = useState(font?.rate || 0);
  const [filename, setFilename] = useState(font?.filename || '');

  const handleSave = () => {
    onSave({ name, rate, filename });
  };

  useEffect(() => {
  if (font) {
    setName(font.name || '');
    setRate(font.rate || 0);
    setFilename(font.filename || '');
  } else {
    // Reset fields when adding new font
    setName('');
    setRate(0);
    setFilename('');
  }
}, [font]);


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='bg-white text-gray-900'>
        <DialogHeader>
          <DialogTitle>{font ? 'Edit Font' : 'Add Font'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="rate">Rate (₹/use)</Label>
            <Input id="rate" type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
          </div>
          <div>
            <Label htmlFor="filename">Filename</Label>
            <Input id="filename" value={filename} onChange={(e) => setFilename(e.target.value)} disabled={!!font} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? 'Saving...' : font ? 'Update' : 'Add'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FontModal;
