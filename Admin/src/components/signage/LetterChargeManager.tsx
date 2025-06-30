import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSignage } from '@/contexts/SignageContext';

const LetterChargeManager = () => {
  const [letterCharges, setLetterCharges] = useState([]);
  const { letterCharge, updateLetterCharge } = useSignage();
  const [tempPrice, setTempPrice] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLetterCharges();
  }, []);

const fetchLetterCharges = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/letter-charges', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) throw new Error('Failed to fetch letter charges');

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) return;

    const currentCharge = selectedId
      ? data.find((c) => c._id === selectedId)
      : data[0];

    if (currentCharge) {
      updateLetterCharge(currentCharge);
      setSelectedId(currentCharge._id);
      setTempPrice(currentCharge.charge.toString());
    }

    setLetterCharges(data);
  } catch (err) {
    console.error('Error fetching letter charges:', err);
  } finally {
    setIsLoading(false); // ✅ ensure this always runs
  }
};



const handleSave = async () => {
  const price = parseFloat(tempPrice);
  if (isNaN(price) || price < 0 || !selectedId) return;

  try {
    const response = await fetch(`http://localhost:5000/api/letter-charges/${selectedId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ charge: price }), // 👈 FIXED here
    });

    if (!response.ok) {
      console.error('Failed to update. Status:', response.status);
      return;
    }

    const updated = await response.json();
    updateLetterCharge(updated);
    setTempPrice(updated.charge.toString()); // 👈 charge, not pricePerLetter
    setIsEditing(false);
  } catch (err) {
    console.error('Update failed:', err);
  }
};


  const handleCancel = () => {
    setTempPrice(letterCharge.charge?.toString() || '');
    setIsEditing(false);
  };

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-2">
            <Label className="text-sm font-medium text-slate-700 mb-2 block">
              Price Per Letter (₹)
            </Label>
            {isEditing ? (
              <div className="md:flex items-center gap-3">
                <Input
                  type="number"
                  value={tempPrice}
                  onChange={(e) => setTempPrice(e.target.value)}
                  className="w-32 "
                  min="0"
                  step="0.01"
                />
                <div className="flex gap-2 pt-2">
                  <Button size="sm" onClick={handleSave}>
                    Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-slate-800">
                  ₹{isLoading ? '...' : letterCharge.charge || 0}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
              </div>
            )}
          </div>
          <div className="text-right text-sm text-slate-600">
            <div>Current Rate</div>
            <div className="font-medium">Per Character</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LetterChargeManager;
