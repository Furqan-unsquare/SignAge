import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSignage } from '@/contexts/SignageContext';
import { useToast } from '@/hooks/use-toast';

const LetterChargeManager = () => {
  const [letterCharges, setLetterCharges] = useState([]);
  const { letterCharge, updateLetterCharge } = useSignage();
  const { toast } = useToast();
  const [tempInitialCharge, setTempInitialCharge] = useState('');
  const [tempSubsequentCharge, setTempSubsequentCharge] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchLetterCharges();
  }, []);

  const fetchLetterCharges = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/letter-charges`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch letter charges: ${response.statusText}`);
      }

      const data = await response.json();
      if (!Array.isArray(data) || data.length === 0) {
        setError('No letter charges found.');
        setLetterCharges([]);
        toast({
          title: 'No Data',
          description: 'No letter charges available. Please create one.',
          variant: 'destructive',
        });
        return;
      }

      const currentCharge = selectedId
        ? data.find((c) => c._id === selectedId)
        : data[0];

      if (currentCharge) {
        updateLetterCharge(currentCharge);
        setSelectedId(currentCharge._id);
        setTempInitialCharge(currentCharge.initialCharge?.toString() || '0');
        setTempSubsequentCharge(currentCharge.subsequentCharge?.toString() || '0');
      }

      setLetterCharges(data);
    } catch (err) {
      console.error('Error fetching letter charges:', err);
      setError('Failed to load letter charges.');
      toast({
        title: 'Error',
        description: 'Failed to load letter charges. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    const initialCharge = parseFloat(tempInitialCharge);
    const subsequentCharge = parseFloat(tempSubsequentCharge);

    if (isNaN(initialCharge) || initialCharge < 0) {
      toast({
        title: 'Invalid Input',
        description: 'Initial charge must be a non-negative number.',
        variant: 'destructive',
      });
      return;
    }

    if (isNaN(subsequentCharge) || subsequentCharge < 0) {
      toast({
        title: 'Invalid Input',
        description: 'Subsequent charge must be a non-negative number.',
        variant: 'destructive',
      });
      return;
    }

    if (!selectedId) {
      toast({
        title: 'Error',
        description: 'No charge selected to update.',
        variant: 'destructive',
      });
      return;
    }

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
        const errorText = await response.text();
        throw new Error(`Failed to update charges: ${errorText}`);
      }

      const updated = await response.json();
      updateLetterCharge(updated);
      setTempInitialCharge(updated.initialCharge.toString());
      setTempSubsequentCharge(updated.subsequentCharge.toString());
      setLetterCharges((prev) =>
        prev.map((charge) => (charge._id === updated._id ? updated : charge))
      );
      setIsEditing(false);
      toast({
        title: 'Success',
        description: 'Letter charges updated successfully.',
      });

      // Refresh data to ensure consistency
      await fetchLetterCharges();
    } catch (err) {
      console.error('Error updating letter charges:', err);
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to update letter charges.',
        variant: 'destructive',
      });
    }
  };

  const handleCancel = () => {
    setTempInitialCharge(letterCharge.initialCharge?.toString() || '0');
    setTempSubsequentCharge(letterCharge.subsequentCharge?.toString() || '0');
    setIsEditing(false);
  };

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
      <CardContent className="p-4">
        {isLoading && <div className="text-center text-slate-600 text-sm">Loading...</div>}
        {error && <div className="text-center text-red-500 text-sm">{error}</div>}
        {!isLoading && !error && (
          <div className="flex items-center gap-3 flex-wrap">
            <Label className="text-sm font-medium text-slate-700 shrink-0">Letter Charges (₹):</Label>
            {isEditing ? (
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1">
                  <Label className="text-xs text-slate-600">First</Label>
                  <Input
                    type="number"
                    value={tempInitialCharge}
                    onChange={(e) => setTempInitialCharge(e.target.value)}
                    className="w-20 h-7 text-sm"
                    min="0"
                    step="0.01"
                    placeholder="First"
                    required
                  />
                </div>
                <div className="flex items-center gap-1">
                  <Label className="text-xs text-slate-600">Subsequent</Label>
                  <Input
                    type="number"
                    value={tempSubsequentCharge}
                    onChange={(e) => setTempSubsequentCharge(e.target.value)}
                    className="w-20 h-7 text-sm"
                    min="0"
                    step="0.01"
                    placeholder="Subsequent"
                    required
                  />
                </div>
                <div className="flex gap-1">
                  <Button size="sm" onClick={handleSave} disabled={isLoading} className="h-7 text-xs">
                    Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCancel} disabled={isLoading} className="h-7 text-xs">
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-slate-600">
                  First: ₹{letterCharge.initialCharge ?? 0} | Subsequent: ₹{letterCharge.subsequentCharge ?? 0}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  disabled={isLoading || !selectedId}
                  className="h-7 text-xs"
                >
                  Edit
                </Button>
              </div>
            )}
            <div className="text-sm text-slate-600 ml-auto">
              Rates: <span className="font-medium">Per Character</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LetterChargeManager;