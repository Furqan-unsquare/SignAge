"use client"
import React, { useState, useRef } from "react";
import { RefreshCw, CheckCircle, XCircle } from "lucide-react";

interface WhatsAppButtonProps {
  text: string;
  selectedFont: string;
  selectedColor: string;
  selectedSize: string;
  phoneNumber: string;
  totalPrice: number;
}

export const WhatsAppButton = ({
  text,
  selectedFont,
  selectedColor,
  selectedSize,
  phoneNumber,
  totalPrice
}: WhatsAppButtonProps) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOrderClick = async () => {
    // Clear any existing timers
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    
    setIsProcessing(true);
    setShowToast(true);
    setToastMessage("Processing your order...");
    setIsSuccess(false);

    // Validate inputs before API call
    if (!text || text.trim() === "") {
      setToastMessage("Text is required.");
      setIsSuccess(false);
      setIsProcessing(false);
      return;
    }

    if (!selectedFont) {
      setToastMessage("Please select a font.");
      setIsSuccess(false);
      setIsProcessing(false);
      return;
    }

    if (!selectedColor) {
      setToastMessage("Please select a color.");
      setIsSuccess(false);
      setIsProcessing(false);
      return;
    }

    if (!selectedSize) {
      setToastMessage("Please select a size.");
      setIsSuccess(false);
      setIsProcessing(false);
      return;
    }

    if (!phoneNumber || !/^\d{10}$/.test(phoneNumber)) {
      setToastMessage("Please enter a valid 10-digit phone number.");
      setIsSuccess(false);
      setIsProcessing(false);
      return;
    }

    if (!totalPrice || isNaN(totalPrice) || totalPrice <= 0) {
      setToastMessage("Invalid price detected.");
      setIsSuccess(false);
      setIsProcessing(false);
      return;
    }

    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const randomId = String(Math.floor(100 + Math.random() * 900)); // 3-digit
    let orderId = `NEO-${randomId}-${day}${month}`;

    // Step 1: Send order data to backend
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

      const res = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputText: text,
          font: selectedFont,
          color: selectedColor,
          size: selectedSize,
          type: "Neon",
          phoneNumber,
          totalPrice, 
          isPaid: false,
          orderId,
        }),
      });

      const responseBody = await res.json();

      if (!res.ok) {
        const serverMessage = responseBody?.message || "Failed to create order.";
        throw new Error(serverMessage);
      }

      orderId = responseBody.orderId; // Use actual Mongo ID if available
    
      setToastMessage("✅ Order sent successfully! We'll be in touch with you soon.");
      setIsSuccess(true); 
        setShowToast(true);
        setIsProcessing(false);
        
        const businessNumber = "919594274068";
        const message = `Hello! I want to order a custom neon sign:

🆔 Order ID: ${orderId}
📝 Text: ${text}
🔤 Font: ${selectedFont}
🎨 Color: ${selectedColor}
📏 Size: ${selectedSize}
📱 Phone Number: ${phoneNumber}

💰 Total Price: ₹${totalPrice}

Please confirm my order.`;

        const url = `https://wa.me/${businessNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    } catch (err: any) {
      console.error("Error sending order:", err);
      setToastMessage(err.message || "Something went wrong while placing the order.");
      setIsSuccess(false);
      
      // Auto-close error toast after 5 seconds
      timerRef.current = setTimeout(() => {
        setShowToast(false);
        setIsProcessing(false);
      }, 5000);
    }
  };

  const closeToast = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setShowToast(false);
    setIsProcessing(false);
  };

  return (
    <div className="relative">
      <button
        onClick={handleOrderClick}
        disabled={isProcessing}
        className={`w-full ${
          isProcessing 
            ? "bg-gray-500 cursor-not-allowed" 
            : "bg-green-600 hover:bg-green-700"
        } text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center`}
      >
        {isProcessing ? (
          <RefreshCw className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <span>Order on WhatsApp</span>
            <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </>
        )}
      </button>

      {/* Custom Toast Notification */}
      {showToast && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
            <div className="flex items-start">
              <div className={`flex-shrink-0 ${isSuccess ? 'text-green-500' : 'text-blue-500'}`}>
                {isSuccess ? (
                  <CheckCircle className="h-6 w-6" />
                ) : (
                  <RefreshCw className="h-6 w-6 animate-spin" />
                )}
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium ${isSuccess ? 'text-green-800' : 'text-gray-800'}`}>
                  {toastMessage}
                </p>
              </div>
            </div>
            
           <div className="mt-4 flex justify-end">
  <button
    onClick={closeToast}
    className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 text-sm font-medium"
  >
    Close
  </button>
</div>
          </div>
        </div>
      )}
    </div>
  );
};