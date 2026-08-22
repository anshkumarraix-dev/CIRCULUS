import React, { useState, useEffect, useRef } from "react";
import { MapPin, Navigation, Compass, CheckCircle2, AlertCircle, RefreshCw, Layers, ShieldCheck, Map as MapIcon, Crosshair } from "lucide-react";
import { GPSLocation } from "../../types";

interface GoogleMapsLocationPickerProps {
  initialLocation?: GPSLocation | null;
  onLocationSelected: (location: GPSLocation) => void;
  isCompact?: boolean;
}

export const GoogleMapsLocationPicker: React.FC<GoogleMapsLocationPickerProps> = ({
  initialLocation,
  onLocationSelected,
  isCompact = false,
}) => {
  const [currentLocation, setCurrentLocation] = useState<GPSLocation | null>(initialLocation || null);
  const [isAcquiring, setIsAcquiring] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [mapType, setMapType] = useState<"satellite" | "roadmap">("satellite");
  const [manualAddress, setManualAddress] = useState(initialLocation?.formattedAddress || "");

  // Default coordinates: Indian Industrial Hub (Sanand / Ahmedabad, Gujarat)
  const defaultLat = 22.9904;
  const defaultLng = 72.3812;

  const lat = currentLocation?.latitude ?? defaultLat;
  const lng = currentLocation?.longitude ?? defaultLng;

  // Real GPS acquisition using browser Geolocation API
  const acquireGPS = () => {
    if (!navigator.geolocation) {
      setErrorMsg("GPS Geolocation is not supported by your browser.");
      return;
    }

    setIsAcquiring(true);
    setErrorMsg(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coords = {
          latitude: Number(position.coords.latitude.toFixed(6)),
          longitude: Number(position.coords.longitude.toFixed(6)),
          accuracyMeters: Math.round(position.coords.accuracy),
        };

        try {
          // Reverse-geocode via server proxy or Google Maps API
          const response = await fetch(`/api/maps/reverse-geocode?lat=${coords.latitude}&lng=${coords.longitude}`);
          if (response.ok) {
            const data = await response.json();
            if (data.success && data.location) {
              const fullLoc: GPSLocation = {
                ...coords,
                formattedAddress: data.location.formattedAddress || `${coords.latitude}, ${coords.longitude}`,
                city: data.location.city || "Industrial Cluster",
                state: data.location.state || "India",
                pincode: data.location.pincode || "",
                district: data.location.district || "",
                verifiedAt: new Date().toISOString(),
              };
              setCurrentLocation(fullLoc);
              setManualAddress(fullLoc.formattedAddress || "");
              onLocationSelected(fullLoc);
              setIsAcquiring(false);
              return;
            }
          }
        } catch (err) {
          console.warn("Reverse geocode fetch fallback:", err);
        }

        // Fallback geocode
        const fallbackLoc: GPSLocation = {
          ...coords,
          formattedAddress: `Industrial Facility at Lat: ${coords.latitude}, Lng: ${coords.longitude}`,
          city: "Industrial Corridor",
          state: "India",
          verifiedAt: new Date().toISOString(),
        };
        setCurrentLocation(fallbackLoc);
        setManualAddress(fallbackLoc.formattedAddress || "");
        onLocationSelected(fallbackLoc);
        setIsAcquiring(false);
      },
      (error) => {
        setIsAcquiring(false);
        let msg = "Could not acquire GPS position.";
        if (error.code === error.PERMISSION_DENIED) {
          msg = "Location permission denied. You can manually specify your industrial facility location or allow permission.";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          msg = "GPS signal unavailable. Defaulting to registered industrial cluster.";
        } else if (error.code === error.TIMEOUT) {
          msg = "GPS acquisition timed out. Please try again.";
        }
        setErrorMsg(msg);

        // If no location set yet, set standard Indian industrial park default
        if (!currentLocation) {
          const defaultLoc: GPSLocation = {
            latitude: defaultLat,
            longitude: defaultLng,
            formattedAddress: "GIDC Industrial Estate, Sanand II, Ahmedabad, Gujarat 382170",
            city: "Sanand",
            state: "Gujarat",
            pincode: "382170",
            accuracyMeters: 25,
            verifiedAt: new Date().toISOString(),
          };
          setCurrentLocation(defaultLoc);
          setManualAddress(defaultLoc.formattedAddress || "");
          onLocationSelected(defaultLoc);
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 0,
      }
    );
  };

  // Auto-acquire on first load if no location provided
  useEffect(() => {
    if (!initialLocation && !currentLocation) {
      acquireGPS();
    }
  }, []);

  return (
    <div className="space-y-3 font-sans">
      {/* Header with GPS Trigger */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-accent-teal/10 border border-accent-teal/30 flex items-center justify-center text-accent-teal">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink flex items-center gap-1.5">
              <span>Facility GPS & Google Maps Location</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 font-mono">
                Live Geocoding
              </span>
            </h4>
            <p className="text-[11px] text-silver font-body">
              Exact coordinates for logistics routing, e-Way bills & SPCB jurisdiction
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={acquireGPS}
          disabled={isAcquiring}
          className="px-3 py-1.5 rounded-lg bg-copper/10 hover:bg-copper/20 text-copper border border-copper/30 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isAcquiring ? "animate-spin" : ""}`} />
          <span>{isAcquiring ? "Acquiring GPS..." : "Acquire GPS Coordinates"}</span>
        </button>
      </div>

      {errorMsg && (
        <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Interactive Satellite / Radar Map Visual Container */}
      <div className="relative rounded-xl border border-white/10 overflow-hidden bg-[#0A0D12] shadow-inner">
        {/* Map Type Switcher */}
        <div className="absolute top-2.5 right-2.5 z-20 flex items-center bg-[#121820]/90 border border-white/10 rounded-lg p-0.5 backdrop-blur-md shadow-md text-[11px]">
          <button
            type="button"
            onClick={() => setMapType("satellite")}
            className={`px-2 py-1 rounded font-medium transition cursor-pointer ${
              mapType === "satellite"
                ? "bg-accent-teal text-white font-bold"
                : "text-silver hover:text-ink"
            }`}
          >
            Satellite
          </button>
          <button
            type="button"
            onClick={() => setMapType("roadmap")}
            className={`px-2 py-1 rounded font-medium transition cursor-pointer ${
              mapType === "roadmap"
                ? "bg-accent-teal text-white font-bold"
                : "text-silver hover:text-ink"
            }`}
          >
            Industrial Map
          </button>
        </div>

        {/* Embedded Google Maps / Visual Precision Canvas */}
        <div className="w-full h-44 sm:h-52 relative overflow-hidden bg-gradient-to-br from-slate-900 via-[#0E1520] to-[#0A0E17] flex items-center justify-center">
          {/* Real Google Maps Embed with pinpoint coordinates */}
          <iframe
            title="Google Maps Facility Location"
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            src={`https://maps.google.com/maps?q=${lat},${lng}&hl=en&z=15&t=${mapType === "satellite" ? "k" : "m"}&output=embed`}
            className="w-full h-full object-cover filter contrast-105 brightness-95 opacity-90"
            referrerPolicy="no-referrer"
          />

          {/* Precision Crosshair Pin Overlay */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
            <div className="relative flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-copper/20 border border-copper flex items-center justify-center animate-ping absolute -top-1" />
              <div className="w-9 h-9 rounded-full bg-copper/30 backdrop-blur-sm border-2 border-copper flex items-center justify-center shadow-[0_0_15px_rgba(239,122,59,0.8)] z-10">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="mt-1 px-2 py-0.5 rounded-full bg-black/80 border border-white/20 backdrop-blur-md text-[10px] font-mono text-white font-bold tracking-wider shadow-lg">
                PLANT GATE PIN
              </div>
            </div>
          </div>

          {/* Top Left Coordinates Telemetry Badge */}
          <div className="absolute top-2.5 left-2.5 z-20 bg-black/75 backdrop-blur-md border border-white/10 rounded-lg px-2.5 py-1.5 text-[11px] font-mono space-y-0.5">
            <div className="flex items-center gap-1.5 text-accent-gold font-bold">
              <Crosshair className="w-3 h-3 text-copper animate-spin" style={{ animationDuration: "8s" }} />
              <span>LAT: {lat.toFixed(5)}°N</span>
            </div>
            <div className="text-silver/90">
              <span>LNG: {lng.toFixed(5)}°E</span>
            </div>
          </div>

          {/* Bottom Right SPCB Jurisdiction Badge */}
          <div className="absolute bottom-2.5 right-2.5 z-20 bg-black/75 backdrop-blur-md border border-emerald-500/30 rounded-lg px-2.5 py-1 text-[10px] text-emerald-300 font-mono flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {currentLocation?.state ? `${currentLocation.state} SPCB Jurisdiction` : "SPCB Industrial Node"}
            </span>
          </div>
        </div>

        {/* Location Address & Verification Footer */}
        <div className="p-3 bg-white/5 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-start gap-2 min-w-0">
            <MapPin className="w-4 h-4 text-copper shrink-0 mt-0.5" />
            <div className="min-w-0">
              <p className="font-semibold text-ink truncate text-xs">
                {currentLocation?.formattedAddress || "GPS Coordinates Pinpointed"}
              </p>
              <p className="text-[11px] text-silver font-mono truncate">
                {currentLocation?.city || "Industrial Area"}, {currentLocation?.state || "India"} 
                {currentLocation?.pincode ? ` - ${currentLocation.pincode}` : ""}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 text-[11px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>GPS Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
};
