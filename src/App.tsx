import React, { useState, useEffect } from "react";
import { AppHeader } from "./components/layout/AppHeader";
import { Sidebar } from "./components/layout/Sidebar";
import { USER_ROLES } from "./types";
import { AppFooter } from "./components/layout/AppFooter";
import { LoginPage } from "./components/auth/LoginPage";
import { RealTimeEntryModal } from "./components/common/RealTimeEntryModal";
import { MaterialScanner } from "./components/scanner/MaterialScanner";
import { MaterialPassportView } from "./components/passport/MaterialPassportView";
import { PassportList } from "./components/passport/PassportList";
import { MarketplaceGrid } from "./components/marketplace/MarketplaceGrid";
import { MatchRecommendations } from "./components/matches/MatchRecommendations";
import { ImpactAnalyticsDashboard } from "./components/impact/ImpactAnalyticsDashboard";
import { OwnershipLedgerView } from "./components/ledger/OwnershipLedgerView";
import { IndiaComplianceHub } from "./components/compliance/IndiaComplianceHub";
import { CirculAiCopilot } from "./components/copilot/CirculAiCopilot";
import { DemoTourGuide } from "./components/demo/DemoTourGuide";

import { 
  MaterialPassport, 
  MarketplaceListing, 
  MatchRecommendation, 
  OwnershipEvent, 
  UserRole 
} from "./types";
import { findMatchesForListing } from "./lib/matching-engine";
import { generateSimpleRecordHash } from "./lib/ledger-adapter";
import { CheckCircle2 } from "lucide-react";

export default function App() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("circulus_auth") === "true";
  });
  
  // Navigation & Role
  const [activeTab, setActiveTab] = useState<string>("marketplace");
  const [activePassportId, setActivePassportId] = useState<string | null>(null);
  const [activeRole, setActiveRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem("circulus_role");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return USER_ROLES[0];
      }
    }
    return USER_ROLES[0];
  });
  
  // Clean Data entities (No prelisted scrap, empty initial state)
  const [passports, setPassports] = useState<MaterialPassport[]>(() => {
    try {
      const saved = localStorage.getItem("circulus_passports_v2");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [listings, setListings] = useState<MarketplaceListing[]>(() => {
    try {
      const saved = localStorage.getItem("circulus_listings_v2");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [matches, setMatches] = useState<MatchRecommendation[]>(() => {
    try {
      const saved = localStorage.getItem("circulus_matches_v2");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [events, setEvents] = useState<OwnershipEvent[]>(() => {
    try {
      const saved = localStorage.getItem("circulus_events_v2");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem("circulus_passports_v2", JSON.stringify(passports));
  }, [passports]);

  useEffect(() => {
    localStorage.setItem("circulus_listings_v2", JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem("circulus_matches_v2", JSON.stringify(matches));
  }, [matches]);

  useEffect(() => {
    localStorage.setItem("circulus_events_v2", JSON.stringify(events));
  }, [events]);

  // Modals & Drawers
  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(false);
  const [isDemoTourOpen, setIsDemoTourOpen] = useState<boolean>(false);
  const currentPassport = activePassportId
    ? passports.find((p) => p.id === activePassportId)
    : null;
  const [isRealTimeModalOpen, setIsRealTimeModalOpen] = useState<boolean>(false);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Auth Handlers
  const handleLoginSuccess = (user: UserRole) => {
    setActiveRole(user);
    setIsAuthenticated(true);
    localStorage.setItem("circulus_auth", "true");
    localStorage.setItem("circulus_role", JSON.stringify(user));
    showToast(`Welcome ${user.name} (${user.orgName})! Facility logged in.`);
  };

  
  const handleDeleteAccount = async () => {
    try {
      await fetch('/api/auth/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: activeRole.gstin })
      });
    } catch (e) {
      console.error(e);
    }
    
    setIsAuthenticated(false);
    localStorage.removeItem("circulus_auth");
    localStorage.removeItem("circulus_role");
    showToast("Account deleted and personal data anonymized.");
  };

  const handleGuestLogin = () => {
    const guestUser = USER_ROLES.find(r => r.id === "guest") || USER_ROLES[0];
    setActiveRole(guestUser);
    setIsAuthenticated(true);
    localStorage.setItem("circulus_auth", "true");
    localStorage.setItem("circulus_role", JSON.stringify(guestUser));
    showToast("Welcome! Exploring as Read-Only Guest.");
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("circulus_auth");
    showToast("Signed out from facility gateway.");
  };

  // Real-Time Entry Handler
  const handleRealTimeEntryCreated = (
    newPassport: MaterialPassport, 
    newListing: MarketplaceListing, 
    newEvent: OwnershipEvent
  ) => {
    const newMatches = findMatchesForListing(newListing);
    setPassports((prev) => [newPassport, ...prev]);
    setListings((prev) => [newListing, ...prev]);
    setEvents((prev) => [newEvent, ...prev]);
    setMatches((prev) => [...newMatches, ...prev]);
    
    setActivePassportId(newPassport.id);
    showToast(`Real-time scrap entry ${newPassport.id} broadcasted & Digital Aadhaar issued!`);
  };

  // Scanner Passport Mint Handler
  const handlePassportCreated = (newPassport: MaterialPassport) => {
    if (activeRole.role === "guest" || activeRole.id === "guest") {
      showToast("Action Forbidden: Guest mode is read-only.");
      return;
    }
    // Create a marketplace listing automatically
    const newListing: MarketplaceListing = {
      id: `LIST-${newPassport.id.replace("CUS-", "")}`,
      passportId: newPassport.id,
      title: newPassport.title,
      category: newPassport.category,
      materialType: newPassport.materialType,
      grade: newPassport.grade,
      quantityMT: newPassport.quantityMT,
      minimumOrderMT: Math.min(5, newPassport.quantityMT),
      pricePerMT: newPassport.valuation.basePricePerMT + newPassport.valuation.gradePremium,
      totalValueInr: newPassport.valuation.estimatedTotalInr,
      sellerOrg: newPassport.ownerOrg,
      sellerGstin: newPassport.ownerGstin || "24AAACA1234B1Z5",
      city: newPassport.locationCity,
      state: newPassport.locationState,
      spcbJurisdiction: newPassport.spcbJurisdiction,
      hsnCode: newPassport.hsnCode,
      reusabilityScore: newPassport.reusabilityScore,
      co2eAvoidedKg: newPassport.carbonImpact.co2eAvoidedKg,
      imageUrl: newPassport.imageUrl,
      verificationStatus: newPassport.verificationStatus,
      createdAt: newPassport.createdAt,
      eprEligible: newPassport.category === "plastic" || newPassport.category === "non_ferrous",
      status: "active",
    };

    // Add genesis mint event to ledger
    const mintEvent: OwnershipEvent = {
      id: `EVT-${Date.now()}`,
      passportId: newPassport.id,
      eventType: "PASSPORT_MINTED",
      timestamp: new Date().toISOString(),
      actor: newPassport.ownerOrg,
      actorRole: "supplier",
      location: `${newPassport.locationCity}, ${newPassport.locationState}`,
      notes: `Batch certified via AI scan. HSN: ${newPassport.hsnCode}. Landfill avoided: ${newPassport.quantityMT} MT.`,
      txHash: newPassport.ledgerTxHash,
      recordHash: newPassport.recordHash,
      blockNumber: 104835 + events.length,
    };

    const newMatches = findMatchesForListing(newListing);

    setPassports((prev) => [newPassport, ...prev]);
    setListings((prev) => [newListing, ...prev]);
    setEvents((prev) => [mintEvent, ...prev]);
    setMatches((prev) => [...newMatches, ...prev]);

    setActivePassportId(newPassport.id);
    setActiveTab("passports");
    showToast(`Material Passport ${newPassport.id} Minted & Digital Aadhaar Created!`);
  };

  const handleOpenPassport = (passportId: string) => {
    setActivePassportId(passportId);
    setActiveTab("passports");
  };

  const handleNavigateStep = (tab: string, passportId?: string) => {
    if (passportId) {
      setActivePassportId(passportId);
    }
    setActiveTab(tab);
  };

  const handleAddLedgerEvent = (event: OwnershipEvent) => {
    setEvents((prev) => [event, ...prev]);
    showToast(`Custody event "${event.eventType}" committed to Ledger!`);
  };

  const handleSubmitOffer = (listingId: string, offerDetails: any) => {
    const targetListing = listings.find((l) => l.id === listingId);
    if (targetListing) {
      const offerEvent: OwnershipEvent = {
        id: `EVT-${Date.now()}`,
        passportId: targetListing.passportId,
        eventType: "MATCH_OFFER_TRANSMITTED",
        timestamp: new Date().toISOString(),
        actor: activeRole.orgName,
        actorRole: activeRole.id,
        location: `${offerDetails.deliveryCity || targetListing.city}, ${targetListing.state}`,
        notes: `Commercial purchase offer dispatched for ${offerDetails.quantityMT} MT @ ₹${offerDetails.offerPricePerMT.toLocaleString("en-IN")}/MT.`,
        txHash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`,
        recordHash: generateSimpleRecordHash({ listingId, offerDetails, timestamp: new Date().toISOString() }),
        blockNumber: 104840 + events.length,
      };
      setEvents((prev) => [offerEvent, ...prev]);
      showToast(`Purchase offer dispatched to ${targetListing.sellerOrg}!`);
    }
  };

  // If user is not authenticated, render Login Page
  if (!isAuthenticated) {
    return (
      <LoginPage 
        onLoginSuccess={handleLoginSuccess}
        onExploreAsGuest={handleGuestLogin}
      />
    );
  }

  return (
    <div className="h-screen bg-primary text-ink flex overflow-hidden font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[60] bg-panel border border-white/10 text-ink px-4 py-3 rounded-lg shadow-xl flex items-center gap-2.5 text-xs font-mono font-semibold animate-fadeIn">
          <div className="w-5 h-5 rounded-full bg-moss/20 flex items-center justify-center text-moss shrink-0 border border-moss/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        activeRole={activeRole}
        onSignOut={handleSignOut}
        onDeleteAccount={handleDeleteAccount}
        onOpenRealTimeEntry={() => setIsRealTimeModalOpen(true)}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AppHeader
          activeRole={activeRole}
          onToggleCopilot={() => setIsCopilotOpen(!isCopilotOpen)}
          isCopilotOpen={isCopilotOpen}
          onOpenMobileMenu={() => setIsMobileOpen(true)}
        />
        
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-8">
          <div className="max-w-7xl mx-auto w-full">
            {/* Marketplace View */}

        {activeTab === "marketplace" && (
          <MarketplaceGrid
            listings={listings}
            passports={passports}
            events={events}
            onViewPassport={handleOpenPassport}
            onOpenMatches={(listingId) => {
              setActiveTab("matches");
            }}
            onOpenRealTimeEntryModal={() => setIsRealTimeModalOpen(true)}
            onRealTimeEntryCreated={handleRealTimeEntryCreated}
            activeRole={activeRole}
            onSubmitOffer={handleSubmitOffer}
          />
        )}

        {/* Material Scanner (Upload & AI) */}
        {activeTab === "scanner" && (
          <MaterialScanner
            onPassportCreated={handlePassportCreated}
            activeRole={activeRole}
            onOpenPassport={handleOpenPassport}
          />
        )}

        {/* Material Passports View */}
        {activeTab === "passports" && (
          currentPassport ? (
            <MaterialPassportView
              passport={currentPassport}
              onBackToList={() => setActivePassportId(null)}
              onFindMatches={(pid) => setActiveTab("matches")}
              onTransferCustody={(pid) => setActiveTab("ledger")}
              onAskCopilot={(p) => {
                setActivePassportId(p.id);
                setIsCopilotOpen(true);
              }}
              events={events.filter((e) => e.passportId === currentPassport.id)}
            />
          ) : (
            <PassportList
              passports={passports}
              onSelectPassport={(pid) => setActivePassportId(pid)}
              onNavigateToScanner={() => setActiveTab("scanner")}
            />
          )
        )}

        {/* AI Matches View */}
        {activeTab === "matches" && (
          <MatchRecommendations
            matches={matches}
            listings={listings}
            passports={passports}
            onViewPassport={handleOpenPassport}
            onInitiateTransfer={(listingId, buyerOrg) => {
              showToast(`Custody negotiation initiated with ${buyerOrg}!`);
              setActiveTab("ledger");
            }}
            activeRole={activeRole}
          />
        )}

        {/* Impact & BRSR Sustainability Dashboard */}
        {activeTab === "impact" && (
          <ImpactAnalyticsDashboard passports={passports} />
        )}

        {/* Trust Ledger View */}
        {activeTab === "ledger" && (
          <OwnershipLedgerView
            passports={passports}
            events={events}
            onAddEvent={handleAddLedgerEvent}
            activeRole={activeRole}
            onViewPassport={handleOpenPassport}
          />
        )}

        {/* India Compliance Hub */}
        {activeTab === "compliance" && (
          <IndiaComplianceHub />
        )}
                </div>
        </main>
      </div>

      {/* Real-Time Entry Modal */}
      <RealTimeEntryModal
        isOpen={isRealTimeModalOpen}
        onClose={() => setIsRealTimeModalOpen(false)}
        activeRole={activeRole}
        onEntryCreated={handleRealTimeEntryCreated}
      />

      {/* Floating CirculAI Copilot Drawer */}
      <CirculAiCopilot
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        activePassport={currentPassport || undefined}
        activeRole={activeRole}
      />

      {/* 3-Minute Judge Demo Tour Guide Modal */}
      <DemoTourGuide
        isOpen={isDemoTourOpen}
        onClose={() => setIsDemoTourOpen(false)}
        onNavigateStep={handleNavigateStep}
      />
    </div>
  );
}
