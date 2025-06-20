import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import LetterChargeManager from '../components/signage/LetterChargeManager';
import FontManager from '../components/signage/FontManager';
import ColorManager from '../components/signage/ColorManager';
import SizeManager from '../components/signage/SizeManager';
import AddOnManager from '../components/signage/AddOnManager';
import { SignageProvider } from '../contexts/SignageContext';
import Sidebar from '../components/Sidebar';

const ItemManagement = () => {
  const [activeTab, setActiveTab] = useState('neon');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const signageTypes = [
    { id: 'neon', name: 'Neon Signage', color: 'from-purple-500 to-pink-500' },
    { id: 'office', name: 'Office Signage', color: 'from-blue-500 to-indigo-500'},
    { id: 'restaurant', name: 'Restaurant', color: 'from-green-500 to-emerald-500', disabled: true },
  ];

  return (
    <SignageProvider>
      <div className="min-h-screen flex bg-gradient-to-br from-slate-50 to-slate-100">
          <Sidebar />

        {/* Main Content */}
        <div className="flex-1 overflow-auto text-gray-800">
          <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-2">
                Signage Configuration Panel
              </h1>
              <p className="text-slate-600 text-sm md:text-lg">
                Manage and configure different types of signage options
              </p>
            </div>

            {/* Chrome-style Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">

              {/* Tabs Neon */}
              <TabsList className="bg-white shadow-lg border-0 p-1 h-auto mb-6 rounded-xl overflow-x-auto">
                {signageTypes.map((type) => (
                  <TabsTrigger
                    key={type.id}
                    value={type.id}
                    disabled={type.disabled}
                    className={`
                      relative px-4 py-2 md:px-6 md:py-3 mx-1 rounded-lg font-medium transition-all duration-300 text-sm md:text-base
                      ${!type.disabled 
                        ? 'data-[state=active]:bg-gradient-to-r data-[state=active]:text-black hover:bg-slate-50' 
                        : 'opacity-50 cursor-not-allowed'
                      }
                    `}
                    style={{
                      background: activeTab === type.id && !type.disabled 
                        ? `linear-gradient(135deg, ${type.color.split(' ')[1]} 0%, ${type.color.split(' ')[3]} 100%)`
                        : undefined
                    }}
                  >
                    <span className="whitespace-nowrap">
                      {type.name}
                      {type.disabled && (
                        <span className="ml-1 md:ml-2 text-xs bg-slate-200 text-slate-600 px-1 md:px-2 py-0.5 rounded-full">
                          Soon
                        </span>
                      )}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Neon Signage Configuration */}
              <TabsContent value="neon" className="space-y-4 md:space-y-6">
                <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 md:gap-3">
                      <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                      Neon Signage Configuration
                    </CardTitle>
                    <CardDescription className="text-sm md:text-base">
                      Configure pricing, fonts, colors, sizes, and add-ons for neon signage
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 md:space-y-8">
                    {/* Letter Charge */}
                    <section>
                      <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-slate-800">Letter Pricing</h3>
                      <LetterChargeManager />
                    </section>

                    <Separator />

                    {/* Font Management */}
                    <section>
                      <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-slate-800">Font Management</h3>
                      <FontManager />
                    </section>

                    <Separator />

                    {/* Color Management */}
                    <section>
                      <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-slate-800">Color Management</h3>
                      <ColorManager />
                    </section>

                    <Separator />

                    {/* Size Management */}
                    <section>
                      <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-slate-800">Size Management</h3>
                      <SizeManager />
                    </section>

                    <Separator />

                    {/* Add-ons Management */}
                    <section>
                      <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-slate-800">Add-ons Management</h3>
                      <AddOnManager />
                    </section>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Placeholder for future tabs */}
              <TabsContent value="office" className="space-y-6">
                <Card className="border-0">
                  <CardContent className="py-12 text-center">
                    <h3 className="text-xl font-semibold text-slate-700 mb-2">Office Signage</h3>
                    <p className="text-slate-500">Configuration panel coming soon...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Placeholder for future tabs */}
              <TabsContent value="restaurant" className="space-y-6">
                <Card className="border-0">
                  <CardContent className="py-12 text-center">
                    <h3 className="text-xl font-semibold text-slate-700 mb-2">Restaurant Signage</h3>
                    <p className="text-slate-500">Configuration panel coming soon...</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </SignageProvider>
  );
};

export default ItemManagement;