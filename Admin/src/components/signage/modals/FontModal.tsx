import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const googleFonts = [
  "Poppins", "Roboto", "Montserrat", "Open Sans", "Lato", "Oswald", "Raleway", "Playfair Display",
  "Merriweather", "DM Sans", "Inter", "Kanit", "Prompt", "Bebas Neue", "Pacifico"
];

const FontModal = ({ isOpen, onClose, font, refresh }) => {
  const [formData, setFormData] = useState({ name: '', rate: '' });
  const [filteredFonts, setFilteredFonts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (font) {
      setFormData({ name: font.name, rate: font.rate.toString() });
      loadGoogleFont(font.name);
    } else {
      setFormData({ name: '', rate: '' });
    }
  }, [font, isOpen]);

  const loadGoogleFont = (fontName) => {
    const formatted = fontName.replace(/ /g, '+');
    const url = `https://fonts.googleapis.com/css2?family=${formatted}&display=swap`;
    if (!document.querySelector(`link[href="${url}"]`)) {
      const link = document.createElement('link');
      link.href = url;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  };

  const handleFontChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, name: value }));
    if (value.trim().length >= 2) {
      setFilteredFonts(googleFonts.filter((f) => f.toLowerCase().includes(value.toLowerCase())));
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleFontSelect = (name) => {
    setFormData((prev) => ({ ...prev, name }));
    setShowDropdown(false);
    loadGoogleFont(name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const rate = parseFloat(formData.rate);
    if (isNaN(rate) || rate < 0) return;

    const payload = { name: formData.name, rate };

    try {
      const res = await fetch(
        font ? `http://localhost:5000/api/fonts/${font._id}` : `http://localhost:5000/api/fonts`,
        {
          method: font ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error('Failed to save');

      refresh?.();
      onClose();
    } catch (err) {
      console.error('Error saving font:', err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-200 text-gray-800">
        <DialogHeader>
          <DialogTitle>{font ? 'Edit Font' : 'Add New Font'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Label htmlFor="name">Google Font Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleFontChange}
              onFocus={() => formData.name.length >= 2 && setShowDropdown(true)}
              autoComplete="off"
              required
            />
            {showDropdown && filteredFonts.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow max-h-60 overflow-y-auto">
                {filteredFonts.map((fontOption) => (
                  <div
                    key={fontOption}
                    onClick={() => handleFontSelect(fontOption)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    {fontOption}
                  </div>
                ))}
              </div>
            )}
            {formData.name && (
              <div className="mt-3 p-2 text-center border border-gray-300 rounded text-base bg-white">
                <p style={{ fontFamily: formData.name }}>Ansh Enterprises</p>
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="rate">Rate (₹)</Label>
            <Input
              id="rate"
              type="number"
              step="0.01"
              min="0"
              value={formData.rate}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, rate: e.target.value }))
              }
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{font ? 'Update' : 'Add'} Font</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FontModal;
