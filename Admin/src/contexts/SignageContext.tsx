
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import * as signageApi from '@/services/signageApi';

export interface Font {
  id: string;
  name: string;
  previewImage?: string;
  rate: number;
}

export interface Color {
  id: string;
  name: string;
  value: string;
  rate: number;
}

export interface Size {
  id: string;
  label: string;
  width: number;
  height: number;
  unit: 'inches' | 'cm';
  price: number;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export interface LetterCharge {
  pricePerLetter: number;
}

interface SignageContextType {
  // Data
  fonts: Font[];
  colors: Color[];
  sizes: Size[];
  addOns: AddOn[];
  letterCharge: LetterCharge;
  
  // Loading states
  isLoading: boolean;
  
  // Actions
  addFont: (font: Omit<Font, 'id'>) => Promise<void>;
  updateFont: (id: string, font: Partial<Font>) => Promise<void>;
  deleteFont: (id: string) => Promise<void>;
  
  addColor: (color: Omit<Color, 'id'>) => Promise<void>;
  updateColor: (id: string, color: Partial<Color>) => Promise<void>;
  deleteColor: (id: string) => Promise<void>;
  
  addSize: (size: Omit<Size, 'id'>) => Promise<void>;
  updateSize: (id: string, size: Partial<Size>) => Promise<void>;
  deleteSize: (id: string) => Promise<void>;
  
  addAddOn: (addOn: Omit<AddOn, 'id'>) => Promise<void>;
  updateAddOn: (id: string, addOn: Partial<AddOn>) => Promise<void>;
  deleteAddOn: (id: string) => Promise<void>;
  
  updateLetterCharge: (charge: LetterCharge) => Promise<void>;
}

const SignageContext = createContext<SignageContextType | undefined>(undefined);

export const useSignage = () => {
  const context = useContext(SignageContext);
  if (!context) {
    throw new Error('useSignage must be used within a SignageProvider');
  }
  return context;
};

export const SignageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fonts, setFonts] = useState<Font[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [letterCharge, setLetterCharge] = useState<LetterCharge>({ pricePerLetter: 50 });
  const [isLoading, setIsLoading] = useState(false);

  // Initialize with sample data (will be replaced with API calls)
  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    setIsLoading(true);
    try {
      // Sample data - in production, these would be API calls
      setFonts([
        { id: '1', name: 'Modern Sans', rate: 10, previewImage: '/placeholder.svg' },
        { id: '2', name: 'Classic Serif', rate: 15, previewImage: '/placeholder.svg' },
        { id: '3', name: 'Neon Glow', rate: 25, previewImage: '/placeholder.svg' },
      ]);
      
      setColors([
        { id: '1', name: 'Electric Blue', value: '#0066ff', rate: 5 },
        { id: '2', name: 'Hot Pink', value: '#ff0066', rate: 8 },
        { id: '3', name: 'Lime Green', value: '#66ff00', rate: 6 },
      ]);
      
      setSizes([
        { id: '1', label: 'Small', width: 6, height: 10, unit: 'inches', price: 100 },
        { id: '2', label: 'Medium', width: 8, height: 13, unit: 'inches', price: 150 },
        { id: '3', label: 'Large', width: 12, height: 18, unit: 'inches', price: 250 },
      ]);
      
      setAddOns([
        { id: '1', name: 'Remote Control', price: 50, description: 'Wireless remote for easy control' },
        { id: '2', name: 'Acrylic Back', price: 30, description: 'Clear acrylic backing panel' },
        { id: '3', name: 'Hanging Kit', price: 25, description: 'Complete hanging hardware set' },
      ]);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load initial data',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Font actions
  const addFont = async (font: Omit<Font, 'id'>) => {
    try {
      const newFont = { ...font, id: Date.now().toString() };
      setFonts(prev => [...prev, newFont]);
      toast({ title: 'Success', description: 'Font added successfully' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to add font', variant: 'destructive' });
    }
  };

  const updateFont = async (id: string, font: Partial<Font>) => {
    try {
      setFonts(prev => prev.map(f => f.id === id ? { ...f, ...font } : f));
      toast({ title: 'Success', description: 'Font updated successfully' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update font', variant: 'destructive' });
    }
  };

  const deleteFont = async (id: string) => {
    try {
      setFonts(prev => prev.filter(f => f.id !== id));
      toast({ title: 'Success', description: 'Font deleted successfully' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete font', variant: 'destructive' });
    }
  };

  // Color actions
  const addColor = async (color: Omit<Color, 'id'>) => {
    try {
      const newColor = { ...color, id: Date.now().toString() };
      setColors(prev => [...prev, newColor]);
      toast({ title: 'Success', description: 'Color added successfully' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to add color', variant: 'destructive' });
    }
  };

  const updateColor = async (id: string, color: Partial<Color>) => {
    try {
      setColors(prev => prev.map(c => c.id === id ? { ...c, ...color } : c));
      toast({ title: 'Success', description: 'Color updated successfully' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update color', variant: 'destructive' });
    }
  };

  const deleteColor = async (id: string) => {
    try {
      setColors(prev => prev.filter(c => c.id !== id));
      toast({ title: 'Success', description: 'Color deleted successfully' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete color', variant: 'destructive' });
    }
  };

  // Size actions
  const addSize = async (size: Omit<Size, 'id'>) => {
    try {
      const newSize = { ...size, id: Date.now().toString() };
      setSizes(prev => [...prev, newSize]);
      toast({ title: 'Success', description: 'Size added successfully' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to add size', variant: 'destructive' });
    }
  };

  const updateSize = async (id: string, size: Partial<Size>) => {
    try {
      setSizes(prev => prev.map(s => s.id === id ? { ...s, ...size } : s));
      toast({ title: 'Success', description: 'Size updated successfully' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update size', variant: 'destructive' });
    }
  };

  const deleteSize = async (id: string) => {
    try {
      setSizes(prev => prev.filter(s => s.id !== id));
      toast({ title: 'Success', description: 'Size deleted successfully' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete size', variant: 'destructive' });
    }
  };

  // AddOn actions
  const addAddOn = async (addOn: Omit<AddOn, 'id'>) => {
    try {
      const newAddOn = { ...addOn, id: Date.now().toString() };
      setAddOns(prev => [...prev, newAddOn]);
      toast({ title: 'Success', description: 'Add-on added successfully' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to add add-on', variant: 'destructive' });
    }
  };

  const updateAddOn = async (id: string, addOn: Partial<AddOn>) => {
    try {
      setAddOns(prev => prev.map(a => a.id === id ? { ...a, ...addOn } : a));
      toast({ title: 'Success', description: 'Add-on updated successfully' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update add-on', variant: 'destructive' });
    }
  };

  const deleteAddOn = async (id: string) => {
    try {
      setAddOns(prev => prev.filter(a => a.id !== id));
      toast({ title: 'Success', description: 'Add-on deleted successfully' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete add-on', variant: 'destructive' });
    }
  };

  // Letter charge actions
  const updateLetterCharge = async (charge: LetterCharge) => {
    try {
      setLetterCharge(charge);
      toast({ title: 'Success', description: 'Letter charge updated successfully' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update letter charge', variant: 'destructive' });
    }
  };

  const value: SignageContextType = {
    fonts,
    colors,
    sizes,
    addOns,
    letterCharge,
    isLoading,
    addFont,
    updateFont,
    deleteFont,
    addColor,
    updateColor,
    deleteColor,
    addSize,
    updateSize,
    deleteSize,
    addAddOn,
    updateAddOn,
    deleteAddOn,
    updateLetterCharge,
  };

  return (
    <SignageContext.Provider value={value}>
      {children}
    </SignageContext.Provider>
  );
};
