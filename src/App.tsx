import React, { useState, useEffect } from "react";
import { AppHeader, USER_ROLES } from "./components/layout/AppHeader";
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
  const [isRealTimeModalOpen, setIsRealTimeModalOpen] = useState<boolean>(false);
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
        onExploreAsGuest={() => setIsAuthenticated(true)}
      />
    );
  }

  const currentPassport = activePassportId
    ? passports.find((p) => p.id === activePassportId)
    : null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-blue-600 selection:text-white relative overflow-hidden font-sans">
      
      {/* Background architectural subtle accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-blue-100/40 via-emerald-50/20 to-transparent rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-sky-100/30 via-slate-100/20 to-transparent rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 right-6 z-50 bg-white border border-slate-200 text-slate-900 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-fadeIn">
          <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Clean Header with Real-Time Quick Entry & Sign Out */}
      <AppHeader
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
        }}
        activeRole={activeRole}
        setActiveRole={(r) => {
          setActiveRole(r);
          localStorage.setItem("circulus_role", JSON.stringify(r));
        }}
        onOpenDemoTour={() => setIsDemoTourOpen(true)}
        onToggleCopilot={() => setIsCopilotOpen(!isCopilotOpen)}
        onOpenRealTimeEntry={() => setIsRealTimeModalOpen(true)}
        onSignOut={handleSignOut}
        isCopilotOpen={isCopilotOpen}
        passportsCount={passports.length}
        listingsCount={listings.length}
      />

      {/* Main Content View Container - Spacious and Breathable */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 relative z-10">
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
      </main>

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

      {/* Footer */}
      <AppFooter />
    </div>
  );
}
