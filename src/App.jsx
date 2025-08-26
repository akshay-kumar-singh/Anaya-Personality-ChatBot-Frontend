import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import AuthForms from './components/AuthForms/AuthForms';
import HomePage from './pages/HomePage';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import { ROUTES } from './utils/constants';

const AppContent = () => {
  const { user, loading, isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState(ROUTES.LANDING);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (isAuthenticated) {
    return <HomePage user={user} />;
  }

  const handleViewChange = (view) => setCurrentView(view);
  const handleSwitchAuthMode = () => {
    setCurrentView(currentView === ROUTES.LOGIN ? ROUTES.REGISTER : ROUTES.LOGIN);
  };
  const handleBackToLanding = () => setCurrentView(ROUTES.LANDING);

  switch (currentView) {
    case ROUTES.LOGIN:
    case ROUTES.REGISTER:
      return (
        <AuthForms
          mode={currentView}
          onBack={handleBackToLanding}
          onSwitchMode={handleSwitchAuthMode}
        />
      );
    case ROUTES.LANDING:
    default:
      return (
        <LandingPage
          onLogin={() => handleViewChange(ROUTES.LOGIN)}
          onRegister={() => handleViewChange(ROUTES.REGISTER)}
        />
      );
  }
};

const App = () => {
  return (
    <AuthProvider>
      <div className="App">
        <AppContent />
      </div>
    </AuthProvider>
  );
};

export default App;