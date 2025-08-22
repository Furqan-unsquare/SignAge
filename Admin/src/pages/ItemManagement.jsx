import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import LetterChargeManager from '../components/signage/LetterChargeManager';
import FontManager from '../components/signage/FontManager';
import ColorManager from '../components/signage/ColorManager';
import SizeManager from '../components/signage/SizeManager';
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
            <div className="mb-6 md:mb-8 mt-6 md:mt-0">
              <h1 className="text-2xl md:text-4xl font-bold mb-2">
                Neon Signage Configuration Panel
              </h1>
              <p className="text-slate-600 text-sm md:text-lg">
                Configure pricing, fonts, colors, sizes, and add-ons for neon signage
              </p>
            </div>

            {/* Chrome-style Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">

              {/* Tabs Neon */}
             {/* <div className="w-full overflow-x-auto">
                <TabsList className="flex bg-white shadow-md border-0 p-1 h-auto mb-6 rounded-xl min-w-max sm:min-w-full justify-start">
                  {signageTypes.map((type) => (
                    <TabsTrigger
                      key={type.id}
                      value={type.id}
                      disabled={type.disabled}
                      className={`
                        relative px-4 py-2 md:px-6 md:py-3 mx-1 font-medium transition-all duration-300 text-sm md:text-base whitespace-nowrap
                        ${!type.disabled 
                          ? 'data-[state=active]:bg-gradient-to-r data-[state=active]:text-black hover:bg-slate-50' 
                          : 'opacity-50 cursor-not-allowed'
                        }
                      `}
                      style={{
                        background:
                          activeTab === type.id && !type.disabled
                            ? `linear-gradient(135deg, ${type.color.split(' ')[1]} 0%, ${type.color.split(' ')[3]} 100%)`
                            : undefined,
                      }}
                    >
                      <span>
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
              </div> */}

              {/* Neon Signage Configuration */}
              <TabsContent value="neon" className="space-y-4 md:space-y-6">
                <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm ">
                  <CardContent className="space-y-4 md:space-y-8">
                    {/* Letter Charge */}
                    <section className=''>
                      <h3 className="text-base pt-4 md:text-lg font-semibold mb-3 md:mb-4 text-slate-800">Letter Pricing</h3>
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