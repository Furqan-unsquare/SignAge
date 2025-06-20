
import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { useSignage } from '../../contexts/SignageContext';
import FontModal from './modals/FontModal';

const FontManager = () => {
  const { fonts, deleteFont } = useSignage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFont, setEditingFont] = useState(null);

  const handleEdit = (font) => {
    setEditingFont(font);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingFont(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingFont(null);
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-sm text-slate-600">
            {fonts.length} font{fonts.length !== 1 ? 's' : ''} configured
          </div>
          <Button onClick={handleAdd} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Font
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fonts.map((font) => (
            <Card key={font.id} className="hover:shadow-md transition-shadow duration-200">
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
                      onClick={() => deleteFont(font.id)}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                
                {font.previewImage && (
                  <div className="bg-slate-100 rounded-md p-3 text-center">
                    <img 
                      src={font.previewImage} 
                      alt={`${font.name} preview`}
                      className="w-full h-12 object-contain"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {fonts.length === 0 && (
          <Card className="border-dashed border-2 border-slate-300">
            <CardContent className="py-12 text-center">
              <p className="text-slate-500 mb-4">No fonts configured yet</p>
              <Button onClick={handleAdd} variant="outline">
                Add Your First Font
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <FontModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        font={editingFont}
      />
    </>
  );
};

export default FontManager;
