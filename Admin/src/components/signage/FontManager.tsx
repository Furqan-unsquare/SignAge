import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Edit2, Trash2, Ban  } from 'lucide-react';
import FontModal from './modals/FontModal';
import { toast } from '../ui/use-toast';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_URL = `${API_BASE_URL}/api/font-files/files`;

const FontManager = () => {
  const [fonts, setFonts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFont, setEditingFont] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchFonts = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      console.log("Fetched fonts:", data);

      if (Array.isArray(data)) {
        setFonts(data);
      } else {
        console.error("Expected an array but got:", data);
        setFonts([]);
      }
    } catch (err) {
      console.error('Error fetching fonts:', err);
      setFonts([]);
      toast({ title: "Error", description: "Failed to load fonts", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFonts();
  }, []);

  const handleEdit = (font) => {
    setEditingFont({ ...font }); // Clone to avoid mutation
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to disable this font?")) {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Delete failed');
        fetchFonts();
        toast({ title: "Success", description: "Font deleted successfully" });
      } catch (err) {
        console.error('Error deleting font:', err);
        toast({ title: "Error", description: "Failed to delete font", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSave = async (fontData) => {
    setLoading(true);
    try {
      const url = editingFont && editingFont._id ? `${API_URL}/${editingFont._id}` : `${API_URL}`;
      const method = editingFont && editingFont._id ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fontData, filename: fontData.filename || editingFont?.filename }), // Preserve filename for updates
      });
      if (!res.ok) throw new Error(`${method} failed`);
      fetchFonts();
      toast({ title: "Success", description: `Font ${editingFont && editingFont._id ? 'updated' : 'created'} successfully` });
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error saving font:', err);
      toast({ title: "Error", description: `Failed to ${editingFont && editingFont._id ? 'update' : 'create'} font`, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-sm text-slate-600">
            {loading ? 'Loading...' : `${fonts.length} font${fonts.length !== 1 ? 's' : ''} configured`}
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fonts.map((font, index) => (
            <Card  key={font._id || font.filename || index}
              className={`transition-shadow duration-200 ${
                font.rate === 0 ? 'opacity-50 grayscale ' : 'hover:shadow-md'
              }`}>
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
                      className="h-8 w-8 p-0 z-50"
                      disabled={loading} // Only disable when globally loading
                    >
                      <Edit2 className="w-3 h-3" />
                    </Button>
                    {font.rate === 0 ? (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-gray-400 cursor-not-allowed"
                        disabled
                        title="Delete disabled for free fonts"
                      >
                        <Ban className="w-3 h-3" />
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(font._id)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        disabled={loading}
                        title="Delete font"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    )}
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
        onSave={handleSave}
        loading={loading}
      />
    </>
  );
};

export default FontManager;