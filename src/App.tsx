import React, { useEffect, useState } from 'react';
import { ArrowRight, Smartphone, CheckCircle, AlertCircle } from 'lucide-react';

function App() {
  const [status, setStatus] = useState<'redirecting' | 'success' | 'fallback'>('redirecting');
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
  
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get('code');
    const state = urlParams.get('state');
    const error = urlParams.get('error');
    
    // Construct the mobile app URL with parameters
    let mobileAppUrl = 'vealthx://app/callback';
    const params = new URLSearchParams();
    
    if (authCode) params.append('code', authCode);
    if (state) params.append('state', state);
    if (error) params.append('error', error);
    
    if (params.toString()) {
      mobileAppUrl += '?' + params.toString();
    }

    const redirectTimer = setTimeout(() => {
      // Attempt to redirect to mobile app
      window.location.href = mobileAppUrl;
      setStatus('success');
      
      // Set up fallback timer
      const fallbackTimer = setTimeout(() => {
        setStatus('fallback');
      }, 2000);

      return () => clearTimeout(fallbackTimer);
    }, 2000);

    // Countdown timer
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(redirectTimer);
      clearInterval(countdownInterval);
    };
  }, []);

  const handleManualRedirect = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get('code');
    const state = urlParams.get('state');
    const error = urlParams.get('error');
    
    let mobileAppUrl = 'vealthx://vealthx/callback/';
    const params = new URLSearchParams();
    
    if (authCode) params.append('code', authCode);
    if (state) params.append('state', state);
    if (error) params.append('error', error);
    
    if (params.toString()) {
      mobileAppUrl += '?' + params.toString();
    }
    
    window.location.href = mobileAppUrl;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5"></div>
          
          {/* Content */}
          <div className="relative z-10">
            {/* Logo/Icon */}
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Status Content */}
            {status === 'redirecting' && (
              <>
                <h1 className="text-2xl font-bold text-gray-900 mb-3">
                  Authentication Successful
                </h1>
                <p className="text-gray-600 mb-6">
                  Redirecting to VealthX app in {countdown} seconds...
                </p>
                
                {/* Loading Animation */}
                <div className="flex justify-center mb-6">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${((3 - countdown) / 3) * 100}%` }}
                  ></div>
                </div>
              </>
            )}

            {status === 'success' && (
              <>
                <div className="mb-4">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-3">
                  Opening VealthX App
                </h1>
                <p className="text-gray-600">
                  Please wait while we open your mobile app...
                </p>
              </>
            )}

            {status === 'fallback' && (
              <>
                <div className="mb-4">
                  <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-3">
                  Manual Redirect Required
                </h1>
                <p className="text-gray-600 mb-6">
                  If the app didn't open automatically, please tap the button below:
                </p>
                
                <button
                  onClick={handleManualRedirect}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Open VealthX App</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500">
                    Make sure you have the VealthX app installed on your device.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Powered by VealthX • Secure OAuth Flow
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;