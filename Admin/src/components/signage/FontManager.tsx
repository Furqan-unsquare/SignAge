import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Edit2, Trash2, Plus } from 'lucide-react';
import FontModal from './modals/FontModal';

const API_URL = 'http://localhost:5000/api/fonts';

const FontManager = () => {
  const [fonts, setFonts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFont, setEditingFont] = useState(null);

  const fetchFonts = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setFonts(data);
    } catch (err) {
      console.error('Error fetching fonts:', err);
    }
  };

  useEffect(() => {
    fetchFonts();
  }, []);

  const handleAdd = () => {
    setEditingFont(null);
    setIsModalOpen(true);
  };

  const handleEdit = (font) => {
    setEditingFont(font);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchFonts();
    } catch (err) {
      console.error('Error deleting font:', err);
    }
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-sm text-slate-600">
            {fonts.length} font{fonts.length !== 1 ? 's' : ''} configured
          </div>
          <Button onClick={handleAdd} className="gap-2 bg-gray-100">
            <Plus className="w-4 h-4" />
            Add Font
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fonts.map((font) => (
            <Card key={font._id} className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-slate-800">{font.name}</h4>
                    <Badge variant="secondary" className="mt-1">
                      ₹{font.rate}/use
                    </Badge>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(font)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit2 className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(font._id)}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <FontModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        font={editingFont}
        refresh={fetchFonts}
      />
    </>
  );
};

export default FontManager;
