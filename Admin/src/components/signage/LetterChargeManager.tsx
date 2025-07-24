import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSignage } from '@/contexts/SignageContext';

const LetterChargeManager = () => {
  const [letterCharges, setLetterCharges] = useState([]);
  const { letterCharge, updateLetterCharge } = useSignage();
  const [tempInitialCharge, setTempInitialCharge] = useState('');
  const [tempSubsequentCharge, setTempSubsequentCharge] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetchLetterCharges();
  }, []);

  const fetchLetterCharges = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/letter-charges`, {
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
        setTempInitialCharge(currentCharge.initialCharge.toString());
        setTempSubsequentCharge(currentCharge.subsequentCharge.toString());
      }

      setLetterCharges(data);
    } catch (err) {
      console.error('Error fetching letter charges:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    const initialCharge = parseFloat(tempInitialCharge);
    const subsequentCharge = parseFloat(tempSubsequentCharge);
    if (isNaN(initialCharge) || initialCharge < 0 || isNaN(subsequentCharge) || subsequentCharge < 0 || !selectedId) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/letter-charges/${selectedId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ initialCharge, subsequentCharge }),
      });

      if (!response.ok) {
        console.error('Failed to update. Status:', response.status);
        return;
      }

      const updated = await response.json();
      updateLetterCharge(updated);
      setTempInitialCharge(updated.initialCharge.toString());
      setTempSubsequentCharge(updated.subsequentCharge.toString());
      setIsEditing(false);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const handleCancel = () => {
    setTempInitialCharge(letterCharge.initialCharge?.toString() || '1000');
    setTempSubsequentCharge(letterCharge.subsequentCharge?.toString() || '');
    setIsEditing(false);
  };

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-2">
            <Label className="text-sm font-medium text-slate-700 mb-2 block">
              Letter Charges (₹)
            </Label>
            {isEditing ? (
              <div className="md:flex items-center gap-3">
                <div className="flex flex-col gap-2">
                  <div>
                    <Label className="text-sm text-slate-600">First Letter</Label>
                    <Input
                      type="number"
                      value={tempInitialCharge}
                      onChange={(e) => setTempInitialCharge(e.target.value)}
                      className="w-32"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-slate-600">Subsequent Letters</Label>
                    <Input
                      type="number"
                      value={tempSubsequentCharge}
                      onChange={(e) => setTempSubsequentCharge(e.target.value)}
                      className="w-32"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
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
                <div>
                  <div className="text-sm text-slate-600">First Letter: ₹{isLoading ? '...' : letterCharge.initialCharge || 1000}</div>
                  <div className="text-sm text-slate-600">Subsequent Letters: ₹{isLoading ? '...' : letterCharge.subsequentCharge || 0}</div>
                </div>
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
            <div>Current Rates</div>
            <div className="font-medium">Per Character</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LetterChargeManager;