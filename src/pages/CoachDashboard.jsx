import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft, Plus, ChevronRight, ChevronLeft, MapPin,
  Calendar, Clock, Activity, User, Users, CheckCircle2,
  X, Edit2, Save, AlertCircle, Wifi, WifiOff, Navigation,
  FileText, MessageSquare, Star, Send, Eye, Shield,
  Target, TrendingUp, AlertTriangle,
} from "lucide-react";

// ─── SHARED HELPERS ───────────────────────────────────────────────────────────
const card = (x = {}) => ({
  backgroundColor: "#fff", borderRadius: "10px",
  border: "1px solid #e8e8e8", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", ...x,
});
const Heading = ({ title, sub }) => (
  <div style={{ marginBottom: "22px" }}>
    <h1 style={{ fontSize: "20px", fontWeight: "700", color: "#222", margin: 0 }}>{title}</h1>
    {sub && <p style={{ fontSize: "13px", color: "#888", marginTop: "4px" }}>{sub}</p>}
    <div style={{ width: "32px", height: "3px", backgroundColor: "#e87722", borderRadius: "2px", marginTop: "6px" }} />
  </div>
);
const BackBtn = ({ label, onClick }) => (
  <button onClick={onClick} style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none", color: "#888", fontSize: "13px", fontWeight: "600", cursor: "pointer", marginBottom: "18px", padding: "0" }}
    onMouseEnter={e => (e.currentTarget.style.color = "#e87722")}
    onMouseLeave={e => (e.currentTarget.style.color = "#888")}
  ><ArrowLeft size={15} /> {label}</button>
);
const OBtn = ({ children, onClick, style = {}, disabled = false }) => (
  <button onClick={onClick} disabled={disabled} style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "9px 20px", backgroundColor: disabled ? "#e0e0e0" : "#e87722", color: disabled ? "#aaa" : "#fff", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: "700", cursor: disabled ? "not-allowed" : "pointer", boxShadow: disabled ? "none" : "0 2px 8px rgba(232,119,34,0.28)", ...style }}
    onMouseEnter={e => { if (!disabled) e.currentTarget.style.backgroundColor = "#d06a18"; }}
    onMouseLeave={e => { if (!disabled) e.currentTarget.style.backgroundColor = "#e87722"; }}
  >{children}</button>
);
const inputStyle = { width: "100%", padding: "9px 12px", border: "1.5px solid #e0e0e0", borderRadius: "7px", fontSize: "13px", color: "#333", backgroundColor: "#f9f9f9", outline: "none", boxSizing: "border-box", fontFamily: "inherit" };
const InputF = ({ label, value, onChange, placeholder, type = "text" }) => (
  <div>
    <label style={{ fontSize: "11px", fontWeight: "700", color: "#888", display: "block", marginBottom: "4px", letterSpacing: "0.4px", textTransform: "uppercase" }}>{label}</label>
    <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={inputStyle}
      onFocus={e => (e.target.style.borderColor = "#e87722")} onBlur={e => (e.target.style.borderColor = "#e0e0e0")} />
  </div>
);

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const GEOFENCE = { lat: 10.0159, lng: 76.3419, radiusM: 200, name: "Palaestra Performance & Rehab" };

const INITIAL_COACHES = [
  {
    id: "c1", name: "Suresh Kumar", role: "Head Coach", phone: "+91 98765 10001",
    email: "suresh@palaestra.in", teams: ["Kerala Cricket Academy"],
    avatar: "SK", status: "Active",
    attendance: {
      "2025-05-01": { present: true,  checkin: "07:55 AM", checkout: "05:10 PM", location: "Inside Geofence" },
      "2025-05-02": { present: true,  checkin: "08:02 AM", checkout: "05:30 PM", location: "Inside Geofence" },
      "2025-05-03": { present: false, checkin: null,       checkout: null,       location: null },
      "2025-05-04": { present: true,  checkin: "07:48 AM", checkout: "04:55 PM", location: "Inside Geofence" },
      "2025-05-05": { present: true,  checkin: "08:10 AM", checkout: null,       location: "Inside Geofence" },
    },
    activities: {
      "2025-05-01": [
        { id: "a1", time: "09:00 AM", type: "Training", description: "Batting technique drills — front foot drive focus", players: ["Arjun Menon", "Rohit Sharma Jr."], duration: "90 min", feedback: null },
        { id: "a2", time: "11:30 AM", type: "Video Review", description: "Match footage analysis — bowling line-length", players: ["Full Squad"], duration: "45 min", feedback: "Great session, very insightful" },
        { id: "a3", time: "02:00 PM", type: "Fielding", description: "Catching and ground fielding drills", players: ["Full Squad"], duration: "60 min", feedback: null },
      ],
      "2025-05-02": [
        { id: "a4", time: "08:30 AM", type: "Fitness", description: "Pre-training warm-up and activation", players: ["Full Squad"], duration: "30 min", feedback: null },
        { id: "a5", time: "10:00 AM", type: "Net Practice", description: "Bowlers — new ball swing bowling", players: ["Rahul Das", "Aditya Kulkarni"], duration: "120 min", feedback: null },
      ],
      "2025-05-04": [
        { id: "a6", time: "09:00 AM", type: "Match Prep", description: "Team selection discussion and strategy", players: ["Management"], duration: "60 min", feedback: "Productive meeting" },
      ],
    },
    gpsHistory: [
      { ts: "2025-05-05 08:10", lat: 10.0160, lng: 76.3420, inGeofence: true },
      { ts: "2025-05-05 10:00", lat: 10.0158, lng: 76.3418, inGeofence: true },
    ],
    currentGps: { lat: 10.0160, lng: 76.3420, inGeofence: true, lastSeen: "2 min ago" },
  },
  {
    id: "c2", name: "Priya Nair", role: "Batting Coach", phone: "+91 98765 10002",
    email: "priya@palaestra.in", teams: ["Kerala Cricket Academy", "Mumbai Strikers"],
    avatar: "PN", status: "Active",
    attendance: {
      "2025-05-01": { present: true,  checkin: "08:15 AM", checkout: "04:45 PM", location: "Inside Geofence" },
      "2025-05-02": { present: true,  checkin: "08:00 AM", checkout: "05:00 PM", location: "Inside Geofence" },
      "2025-05-03": { present: true,  checkin: "09:00 AM", checkout: "03:30 PM", location: "Inside Geofence" },
      "2025-05-04": { present: false, checkin: null,       checkout: null,       location: null },
      "2025-05-05": { present: false, checkin: null,       checkout: null,       location: null },
    },
    activities: {
      "2025-05-01": [
        { id: "b1", time: "09:30 AM", type: "Batting", description: "Cover drive and cut shot refinement", players: ["Arjun Menon"], duration: "60 min", feedback: null },
        { id: "b2", time: "11:00 AM", type: "Video Analysis", description: "Stance and backlift correction session", players: ["Arjun Menon", "Vivek Pillai"], duration: "45 min", feedback: "Very helpful visual feedback" },
      ],
      "2025-05-02": [
        { id: "b3", time: "09:00 AM", type: "Batting", description: "T20 power play batting simulation", players: ["Full Squad"], duration: "90 min", feedback: null },
      ],
    },
    gpsHistory: [],
    currentGps: { lat: null, lng: null, inGeofence: false, lastSeen: "Not checked in" },
  },
  {
    id: "c3", name: "Amit Sharma", role: "Bowling Coach", phone: "+91 98765 10003",
    email: "amit@palaestra.in", teams: ["Delhi Dynamos"],
    avatar: "AS", status: "Active",
    attendance: {
      "2025-05-01": { present: false, checkin: null, checkout: null, location: null },
      "2025-05-02": { present: true, checkin: "07:30 AM", checkout: "06:00 PM", location: "Inside Geofence" },
      "2025-05-03": { present: true, checkin: "07:45 AM", checkout: "05:30 PM", location: "Inside Geofence" },
      "2025-05-04": { present: true, checkin: "08:00 AM", checkout: "05:00 PM", location: "Inside Geofence" },
      "2025-05-05": { present: true, checkin: "08:20 AM", checkout: null, location: "Inside Geofence" },
    },
    activities: {
      "2025-05-02": [
        { id: "d1", time: "09:00 AM", type: "Bowling", description: "Seam bowling — off-stump line discipline", players: ["Kartik Verma"], duration: "90 min", feedback: null },
      ],
    },
    gpsHistory: [],
    currentGps: { lat: 10.0162, lng: 76.3421, inGeofence: true, lastSeen: "5 min ago" },
  },
];

const ACTIVITY_TYPES = ["Training", "Batting", "Bowling", "Fielding", "Fitness", "Net Practice", "Video Review", "Video Analysis", "Match Prep", "Meeting", "Other"];

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS_SHORT = ["Su","Mo","Tu","We","Th","Fr","Sa"];

// Views
const V = {
  LIST: "list", DETAIL: "detail", ADD: "add", ATTENDANCE: "attendance",
  DAY_DETAIL: "day_detail", ACTIVITIES: "activities", GPS: "gps", ADD_ACTIVITY: "add_activity",
};

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}
function dateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

// ─── GPS MAP WIDGET ───────────────────────────────────────────────────────────
function GpsWidget({ coach }) {
  const [live, setLive] = useState(coach.currentGps);
  const [tracking, setTracking] = useState(false);
  const [watchId, setWatchId] = useState(null);
  const [geoError, setGeoError] = useState(null);

  const distanceTo = (lat1, lng1, lat2, lng2) => {
    const R = 6371000;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  const startTracking = () => {
    if (!navigator.geolocation) { setGeoError("Geolocation not supported."); return; }
    setTracking(true);
    const id = navigator.geolocation.watchPosition(
      pos => {
        const { latitude: lat, longitude: lng } = pos.coords;
        const dist = distanceTo(lat, lng, GEOFENCE.lat, GEOFENCE.lng);
        setLive({ lat, lng, inGeofence: dist <= GEOFENCE.radiusM, lastSeen: "Just now", dist: Math.round(dist) });
        setGeoError(null);
      },
      err => { setGeoError(err.message); setTracking(false); },
      { enableHighAccuracy: true, timeout: 10000 }
    );
    setWatchId(id);
  };

  const stopTracking = () => {
    if (watchId) navigator.geolocation.clearWatch(watchId);
    setTracking(false); setWatchId(null);
  };

  useEffect(() => () => { if (watchId) navigator.geolocation.clearWatch(watchId); }, [watchId]);

  return (
    <div style={card({ padding: "22px" })}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px", flexWrap: "wrap", gap: "10px" }}>
        <div style={{ fontSize: "14px", fontWeight: "700", color: "#333", display: "flex", alignItems: "center", gap: "7px" }}>
          <Navigation size={15} style={{ color: "#e87722" }} /> GPS Tracking & Geofencing
        </div>
        {!tracking ? (
          <OBtn onClick={startTracking} style={{ padding: "7px 14px", fontSize: "12px" }}>
            <Wifi size={13} /> Start Live Tracking
          </OBtn>
        ) : (
          <button onClick={stopTracking} style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "7px 14px", backgroundColor: "#fff0f0", color: "#cc3333", border: "1.5px solid #ffc5c5", borderRadius: "8px", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}>
            <WifiOff size={13} /> Stop Tracking
          </button>
        )}
      </div>

      {geoError && (
        <div style={{ padding: "10px 14px", backgroundColor: "#fff0f0", border: "1px solid #ffc5c5", borderRadius: "8px", fontSize: "12px", color: "#cc3333", marginBottom: "14px" }}>
          ⚠ {geoError}
        </div>
      )}

      {/* Geofence info */}
      <div style={{ padding: "14px 16px", backgroundColor: "#f9f9f9", borderRadius: "9px", border: "1px solid #e8e8e8", marginBottom: "14px" }}>
        <div style={{ fontSize: "12px", fontWeight: "700", color: "#888", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "6px" }}>Geofence Zone</div>
        <div style={{ fontSize: "14px", fontWeight: "700", color: "#222", marginBottom: "2px" }}>{GEOFENCE.name}</div>
        <div style={{ fontSize: "12px", color: "#888" }}>Radius: {GEOFENCE.radiusM}m · Lat {GEOFENCE.lat.toFixed(4)}, Lng {GEOFENCE.lng.toFixed(4)}</div>
      </div>

      {/* Status */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
        <div style={{ padding: "14px 16px", backgroundColor: live.inGeofence ? "#f0faf0" : "#fff0f0", border: `1px solid ${live.inGeofence ? "#b8e6b8" : "#ffc5c5"}`, borderRadius: "9px" }}>
          <div style={{ fontSize: "11px", fontWeight: "700", color: live.inGeofence ? "#2e7d32" : "#cc3333", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "4px" }}>
            {live.inGeofence ? "✓ Inside Geofence" : "✗ Outside Geofence"}
          </div>
          <div style={{ fontSize: "12px", color: "#666" }}>Last: {live.lastSeen}</div>
        </div>
        <div style={{ padding: "14px 16px", backgroundColor: "#f9f9f9", border: "1px solid #e8e8e8", borderRadius: "9px" }}>
          <div style={{ fontSize: "11px", fontWeight: "700", color: "#888", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "4px" }}>Coordinates</div>
          {live.lat ? (
            <div style={{ fontSize: "12px", color: "#333", fontFamily: "monospace" }}>{live.lat.toFixed(5)}, {live.lng.toFixed(5)}</div>
          ) : (
            <div style={{ fontSize: "12px", color: "#aaa" }}>Not available</div>
          )}
          {live.dist !== undefined && <div style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}>{live.dist}m from zone</div>}
        </div>
      </div>

      {/* Visual geofence map (SVG mock) */}
      <div style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid #e8e8e8", backgroundColor: "#e8f4f8", position: "relative", height: "180px" }}>
        <svg width="100%" height="180" style={{ display: "block" }}>
          {/* Grid lines */}
          {[0,1,2,3,4,5].map(i=><line key={`h${i}`} x1="0" y1={i*36} x2="100%" y2={i*36} stroke="#c8dde8" strokeWidth="0.5"/>)}
          {[0,1,2,3,4,5,6,7,8].map(i=><line key={`v${i}`} x1={`${i*12.5}%`} y1="0" x2={`${i*12.5}%`} y2="180" stroke="#c8dde8" strokeWidth="0.5"/>)}
          {/* Geofence zone */}
          <circle cx="50%" cy="90" r="60" fill="rgba(232,119,34,0.08)" stroke="#e87722" strokeWidth="2" strokeDasharray="6 3" />
          {/* Zone label */}
          <text x="50%" y="50" textAnchor="middle" fontSize="10" fill="#e87722" fontWeight="700">{GEOFENCE.name}</text>
          <text x="50%" y="62" textAnchor="middle" fontSize="9" fill="#888">{GEOFENCE.radiusM}m radius</text>
          {/* Center pin */}
          <circle cx="50%" cy="90" r="5" fill="#e87722" />
          <circle cx="50%" cy="90" r="12" fill="rgba(232,119,34,0.2)" />
          {/* Coach dot */}
          {live.lat && (
            <>
              <circle cx={live.inGeofence ? "52%" : "72%"} cy={live.inGeofence ? "88" : "55"} r="7" fill={live.inGeofence ? "#2e7d32" : "#cc3333"} />
              <circle cx={live.inGeofence ? "52%" : "72%"} cy={live.inGeofence ? "88" : "55"} r="14" fill={live.inGeofence ? "rgba(46,125,50,0.15)" : "rgba(204,51,51,0.15)"}>
                {tracking && <animate attributeName="r" values="7;18;7" dur="2s" repeatCount="indefinite" />}
              </circle>
              <text x={live.inGeofence ? "52%" : "72%"} y={live.inGeofence ? "108" : "75"} textAnchor="middle" fontSize="9" fill="#333" fontWeight="600">{coach.name.split(" ")[0]}</text>
            </>
          )}
        </svg>
        {tracking && (
          <div style={{ position: "absolute", top: "8px", right: "8px", display: "flex", alignItems: "center", gap: "5px", backgroundColor: "rgba(46,125,50,0.9)", color: "#fff", padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "700" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#fff" }}>
            </div>
            LIVE
          </div>
        )}
        {!live.lat && (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "6px" }}>
            <WifiOff size={20} style={{ color: "#aaa" }} />
            <span style={{ fontSize: "12px", color: "#aaa" }}>No GPS signal</span>
          </div>
        )}
      </div>

      {/* GPS History */}
      {coach.gpsHistory.length > 0 && (
        <div style={{ marginTop: "14px" }}>
          <div style={{ fontSize: "12px", fontWeight: "700", color: "#888", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "8px" }}>Recent Pings</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {coach.gpsHistory.slice(-3).reverse().map((g, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", backgroundColor: "#f9f9f9", borderRadius: "8px", border: "1px solid #f0f0f0" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: g.inGeofence ? "#2e7d32" : "#cc3333", flexShrink: 0 }} />
                <span style={{ fontSize: "11px", color: "#888", flex: 1, fontFamily: "monospace" }}>{g.ts}</span>
                <span style={{ fontSize: "11px", fontWeight: "600", color: g.inGeofence ? "#2e7d32" : "#cc3333" }}>{g.inGeofence ? "In Zone" : "Out of Zone"}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ATTENDANCE CALENDAR ──────────────────────────────────────────────────────
function AttendanceCalendar({ coach, onDayClick }) {
  const today = new Date();
  const [calYear,  setCalYear]  = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());

  const daysInMonth  = getDaysInMonth(calYear, calMonth);
  const firstDay     = getFirstDayOfMonth(calYear, calMonth);
  const prevMonth    = () => { if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11); } else setCalMonth(m => m - 1); };
  const nextMonth    = () => { if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0); } else setCalMonth(m => m + 1); };

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const presentDays = Object.values(coach.attendance).filter(a => a.present).length;
  const totalDays   = Object.keys(coach.attendance).length;

  return (
    <div style={card({ padding: "22px" })}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: "700", color: "#333", display: "flex", alignItems: "center", gap: "7px" }}>
          <Calendar size={15} style={{ color: "#e87722" }} /> Attendance Calendar
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <button onClick={prevMonth} style={{ width: "28px", height: "28px", borderRadius: "7px", border: "1px solid #e0e0e0", backgroundColor: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><ChevronLeft size={14} style={{ color: "#555" }} /></button>
          <span style={{ fontSize: "13px", fontWeight: "700", color: "#222", minWidth: "120px", textAlign: "center" }}>{MONTHS[calMonth]} {calYear}</span>
          <button onClick={nextMonth} style={{ width: "28px", height: "28px", borderRadius: "7px", border: "1px solid #e0e0e0", backgroundColor: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><ChevronRight size={14} style={{ color: "#555" }} /></button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
        {[
          { label: "Present",  value: presentDays, color: "#2e7d32", bg: "#f0faf0", border: "#b8e6b8" },
          { label: "Absent",   value: totalDays - presentDays, color: "#cc3333", bg: "#fff0f0", border: "#ffc5c5" },
          { label: "Rate",     value: totalDays > 0 ? Math.round((presentDays / totalDays) * 100) + "%" : "—", color: "#e87722", bg: "#fff3e8", border: "#ffd8b0" },
        ].map(s => (
          <div key={s.label} style={{ flex: 1, padding: "10px", backgroundColor: s.bg, border: `1px solid ${s.border}`, borderRadius: "8px", textAlign: "center" }}>
            <div style={{ fontSize: "18px", fontWeight: "800", color: s.color }}>{s.value}</div>
            <div style={{ fontSize: "11px", color: "#888", marginTop: "1px" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Day headers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "4px", marginBottom: "6px" }}>
        {DAYS_SHORT.map(d => (
          <div key={d} style={{ textAlign: "center", fontSize: "11px", fontWeight: "700", color: "#aaa", padding: "4px 0" }}>{d}</div>
        ))}
      </div>

      {/* Day cells */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "4px" }}>
        {cells.map((day, idx) => {
          if (!day) return <div key={idx} />;
          const key = dateKey(calYear, calMonth, day);
          const att = coach.attendance[key];
          const isToday = key === `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;
          const hasData = !!att;
          const isPresent = att?.present;
          const hasActivities = (coach.activities[key] || []).length > 0;

          return (
            <div key={day}
              onClick={() => hasData && onDayClick(key, att)}
              style={{
                aspectRatio: "1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                borderRadius: "8px", cursor: hasData ? "pointer" : "default",
                backgroundColor: isToday ? "#fff3e8" : isPresent ? "#f0faf0" : hasData ? "#fff0f0" : "#fafafa",
                border: `1.5px solid ${isToday ? "#e87722" : isPresent ? "#b8e6b8" : hasData ? "#ffc5c5" : "#f0f0f0"}`,
                transition: "all 0.12s", position: "relative",
              }}
              onMouseEnter={e => { if (hasData) e.currentTarget.style.transform = "scale(1.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
            >
              <span style={{ fontSize: "13px", fontWeight: isToday ? "800" : "600", color: isToday ? "#e87722" : isPresent ? "#2e7d32" : hasData ? "#cc3333" : "#bbb" }}>{day}</span>
              {hasActivities && isPresent && (
                <div style={{ position: "absolute", bottom: "3px", left: "50%", transform: "translateX(-50%)", width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#e87722" }} />
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: "14px", marginTop: "14px", flexWrap: "wrap" }}>
        {[
          { color: "#2e7d32", bg: "#f0faf0", label: "Present" },
          { color: "#cc3333", bg: "#fff0f0", label: "Absent" },
          { color: "#e87722", bg: "#fff3e8", label: "Today" },
          { color: "#e87722", bg: "#e87722", label: "Has activities", dot: true },
        ].map(l => (
          <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            {l.dot ? <div style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: l.color }} /> : <div style={{ width: "12px", height: "12px", borderRadius: "4px", backgroundColor: l.bg, border: `1.5px solid ${l.color}` }} />}
            <span style={{ fontSize: "11px", color: "#666" }}>{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ADD ACTIVITY FORM ────────────────────────────────────────────────────────
function AddActivityForm({ date, onSave, onCancel }) {
  const [form, setForm] = useState({ time: "09:00", type: "Training", description: "", players: "", duration: "" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div style={card({ padding: "22px" })}>
      <div style={{ fontSize: "14px", fontWeight: "700", color: "#333", marginBottom: "16px", display: "flex", alignItems: "center", gap: "7px" }}>
        <Plus size={14} style={{ color: "#e87722" }} /> Add Activity for {date}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
        <InputF label="Time" type="time" value={form.time} onChange={e => set("time", e.target.value)} />
        <div>
          <label style={{ fontSize: "11px", fontWeight: "700", color: "#888", display: "block", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.4px" }}>Type</label>
          <select value={form.type} onChange={e => set("type", e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}
            onFocus={e => (e.target.style.borderColor = "#e87722")} onBlur={e => (e.target.style.borderColor = "#e0e0e0")}>
            {ACTIVITY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>
      <div style={{ marginBottom: "12px" }}>
        <label style={{ fontSize: "11px", fontWeight: "700", color: "#888", display: "block", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.4px" }}>Description</label>
        <textarea value={form.description} onChange={e => set("description", e.target.value)} placeholder="What was covered in this session..." rows={3}
          style={{ ...inputStyle, resize: "none" }}
          onFocus={e => (e.target.style.borderColor = "#e87722")} onBlur={e => (e.target.style.borderColor = "#e0e0e0")} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
        <InputF label="Players / Group" value={form.players} onChange={e => set("players", e.target.value)} placeholder="e.g. Arjun Menon, Full Squad" />
        <InputF label="Duration" value={form.duration} onChange={e => set("duration", e.target.value)} placeholder="e.g. 60 min" />
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <OBtn onClick={() => { if (!form.description.trim()) { alert("Enter a description."); return; } onSave({ ...form, id: `act_${Date.now()}`, feedback: null }); }} style={{ flex: 1, justifyContent: "center" }}>
          <Save size={14} /> Save Activity
        </OBtn>
        <button onClick={onCancel} style={{ flex: 1, padding: "10px", backgroundColor: "#fff", color: "#555", border: "1.5px solid #e0e0e0", borderRadius: "8px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#e87722"; e.currentTarget.style.color = "#e87722"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "#e0e0e0"; e.currentTarget.style.color = "#555"; }}
        >Cancel</button>
      </div>
    </div>
  );
}

// ─── MAIN COACHES COMPONENT ───────────────────────────────────────────────────
export default function Coaches() {
  const [coaches,      setCoaches]      = useState(INITIAL_COACHES);
  const [view,         setView]         = useState(V.LIST);
  const [activeCoach,  setActiveCoach]  = useState(null);
  const [activeTab,    setActiveTab]    = useState("overview");
  const [selectedDay,  setSelectedDay]  = useState(null);
  const [selectedAtt,  setSelectedAtt]  = useState(null);
  const [showAddAct,   setShowAddAct]   = useState(false);
  const [feedbackMap,  setFeedbackMap]  = useState({});
  const [feedbackInput,setFeedbackInput]= useState("");
  const [feedbackFor,  setFeedbackFor]  = useState(null);
  const [toast,        setToast]        = useState(null);

  // Add coach form
  const [addForm, setAddForm] = useState({ name: "", role: "", phone: "", email: "", teams: "" });
  const setAF = (k, v) => setAddForm(f => ({ ...f, [k]: v }));

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3500); };

  const openCoach = (coach) => { setActiveCoach(coach); setActiveTab("overview"); setView(V.DETAIL); };

  const handleAddCoach = () => {
    if (!addForm.name.trim() || !addForm.role.trim()) { alert("Name and role are required."); return; }
    const nc = {
      id: `c${Date.now()}`, name: addForm.name, role: addForm.role,
      phone: addForm.phone, email: addForm.email,
      teams: addForm.teams ? addForm.teams.split(",").map(t => t.trim()) : [],
      avatar: addForm.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase(),
      status: "Active", attendance: {}, activities: {}, gpsHistory: [],
      currentGps: { lat: null, lng: null, inGeofence: false, lastSeen: "Not checked in" },
    };
    setCoaches(prev => [...prev, nc]);
    setAddForm({ name: "", role: "", phone: "", email: "", teams: "" });
    setView(V.LIST);
    showToast("✅ Coach added successfully.");
  };

  const handleDayClick = (key, att) => {
    setSelectedDay(key); setSelectedAtt(att); setShowAddAct(false); setView(V.DAY_DETAIL);
  };

  const handleAddActivity = (act) => {
    setCoaches(prev => prev.map(c => {
      if (c.id !== activeCoach.id) return c;
      const activities = { ...c.activities };
      activities[selectedDay] = [...(activities[selectedDay] || []), act];
      return { ...c, activities };
    }));
    setActiveCoach(prev => {
      const activities = { ...prev.activities };
      activities[selectedDay] = [...(activities[selectedDay] || []), act];
      return { ...prev, activities };
    });
    setShowAddAct(false);
    showToast("✅ Activity added.");
  };

  const submitFeedback = (actId) => {
    if (!feedbackInput.trim()) return;
    setFeedbackMap(prev => ({ ...prev, [actId]: feedbackInput }));
    setFeedbackInput(""); setFeedbackFor(null);
    showToast("✅ Feedback submitted.");
  };

  // ── ADD COACH ──
  if (view === V.ADD) return (
    <div style={{ padding: "28px", maxWidth: "700px", margin: "0 auto" }}>
      <BackBtn label="All Coaches" onClick={() => setView(V.LIST)} />
      <Heading title="Add New Coach" sub="Register a coach to the system" />
      <div style={card({ padding: "24px" })}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
          <InputF label="Full Name"   value={addForm.name}   onChange={e => setAF("name",   e.target.value)} placeholder="e.g. Suresh Kumar" />
          <InputF label="Role/Title"  value={addForm.role}   onChange={e => setAF("role",   e.target.value)} placeholder="e.g. Head Coach" />
          <InputF label="Phone"       value={addForm.phone}  onChange={e => setAF("phone",  e.target.value)} placeholder="+91 98765 00000" />
          <InputF label="Email"       value={addForm.email}  onChange={e => setAF("email",  e.target.value)} placeholder="coach@palaestra.in" type="email" />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <InputF label="Teams (comma separated)" value={addForm.teams} onChange={e => setAF("teams", e.target.value)} placeholder="e.g. Kerala Cricket Academy, Mumbai Strikers" />
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <OBtn onClick={handleAddCoach} style={{ flex: 1, justifyContent: "center" }}><Plus size={14} /> Add Coach</OBtn>
          <button onClick={() => setView(V.LIST)} style={{ flex: 1, padding: "10px", backgroundColor: "#fff", color: "#555", border: "1.5px solid #e0e0e0", borderRadius: "8px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#e87722"; e.currentTarget.style.color = "#e87722"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#e0e0e0"; e.currentTarget.style.color = "#555"; }}
          >Cancel</button>
        </div>
      </div>
    </div>
  );

  // ── DAY DETAIL ──
  if (view === V.DAY_DETAIL && selectedDay && activeCoach) {
    const c = coaches.find(x => x.id === activeCoach.id) || activeCoach;
    const dayActivities = c.activities[selectedDay] || [];
    const att = selectedAtt;
    const d = new Date(selectedDay);
    const label = d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

    return (
      <div style={{ padding: "28px", maxWidth: "800px", margin: "0 auto" }}>
        <BackBtn label="Attendance Calendar" onClick={() => setView(V.DETAIL)} />
        <Heading title={label} sub={`${c.name} · ${c.role}`} />

        {/* Attendance summary */}
        <div style={{ ...card({ padding: "18px 20px", marginBottom: "16px", borderLeft: att.present ? "4px solid #2e7d32" : "4px solid #cc3333" }), backgroundColor: att.present ? "#f0faf0" : "#fff0f0", border: `1px solid ${att.present ? "#b8e6b8" : "#ffc5c5"}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            {att.present ? <CheckCircle2 size={18} style={{ color: "#2e7d32" }} /> : <X size={18} style={{ color: "#cc3333" }} />}
            <span style={{ fontSize: "15px", fontWeight: "700", color: att.present ? "#2e7d32" : "#cc3333" }}>{att.present ? "Present" : "Absent"}</span>
            {att.checkin && <span style={{ fontSize: "12px", color: "#666" }}>Check-in: <b>{att.checkin}</b></span>}
            {att.checkout && <span style={{ fontSize: "12px", color: "#666" }}>Check-out: <b>{att.checkout}</b></span>}
            {att.location && <span style={{ fontSize: "12px", color: "#666" }}><MapPin size={11} style={{ display: "inline" }} /> {att.location}</span>}
          </div>
        </div>

        {/* Activities */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
          <div style={{ fontSize: "15px", fontWeight: "700", color: "#222" }}>Activities ({dayActivities.length})</div>
          {att.present && <OBtn onClick={() => setShowAddAct(v => !v)} style={{ padding: "7px 14px", fontSize: "12px" }}><Plus size={13} /> Add Activity</OBtn>}
        </div>

        {showAddAct && (
          <div style={{ marginBottom: "16px" }}>
            <AddActivityForm date={selectedDay} onSave={handleAddActivity} onCancel={() => setShowAddAct(false)} />
          </div>
        )}

        {dayActivities.length === 0 ? (
          <div style={card({ padding: "32px", textAlign: "center" })}>
            <Activity size={28} style={{ color: "#ddd", margin: "0 auto 10px", display: "block" }} />
            <p style={{ fontSize: "14px", fontWeight: "700", color: "#aaa" }}>No activities logged for this day</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {dayActivities.map((act, i) => {
              const fb = feedbackMap[act.id] || act.feedback;
              return (
                <div key={act.id} style={card({ padding: "18px 20px", borderLeft: "4px solid #e87722" })}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "10px", marginBottom: "8px" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                        <span style={{ fontSize: "15px", fontWeight: "700", color: "#222" }}>{act.type}</span>
                        <span style={{ fontSize: "11px", fontWeight: "700", padding: "2px 8px", borderRadius: "20px", backgroundColor: "#fff3e8", color: "#e87722", border: "1px solid #ffd8b0" }}>{act.time}</span>
                        {act.duration && <span style={{ fontSize: "11px", color: "#888" }}>{act.duration}</span>}
                      </div>
                      <div style={{ fontSize: "13px", color: "#444", lineHeight: "1.5" }}>{act.description}</div>
                      {act.players && <div style={{ fontSize: "12px", color: "#888", marginTop: "4px" }}>👥 {Array.isArray(act.players) ? act.players.join(", ") : act.players}</div>}
                    </div>
                  </div>

                  {/* Feedback */}
                  {fb ? (
                    <div style={{ marginTop: "10px", padding: "10px 14px", backgroundColor: "#f0faf0", border: "1px solid #b8e6b8", borderRadius: "8px", display: "flex", gap: "8px", alignItems: "flex-start" }}>
                      <MessageSquare size={14} style={{ color: "#2e7d32", flexShrink: 0, marginTop: "1px" }} />
                      <div>
                        <div style={{ fontSize: "11px", fontWeight: "700", color: "#2e7d32", marginBottom: "2px" }}>Client Feedback</div>
                        <div style={{ fontSize: "13px", color: "#444" }}>{fb}</div>
                      </div>
                    </div>
                  ) : (
                    feedbackFor === act.id ? (
                      <div style={{ marginTop: "10px" }}>
                        <textarea value={feedbackInput} onChange={e => setFeedbackInput(e.target.value)} placeholder="Enter client feedback..." rows={2}
                          style={{ ...inputStyle, resize: "none", marginBottom: "8px" }}
                          onFocus={e => (e.target.style.borderColor = "#e87722")} onBlur={e => (e.target.style.borderColor = "#e0e0e0")} />
                        <div style={{ display: "flex", gap: "8px" }}>
                          <OBtn onClick={() => submitFeedback(act.id)} style={{ flex: 1, justifyContent: "center", padding: "7px 14px", fontSize: "12px" }}>
                            <Send size={12} /> Submit Feedback
                          </OBtn>
                          <button onClick={() => { setFeedbackFor(null); setFeedbackInput(""); }} style={{ flex: 1, padding: "7px", backgroundColor: "#fff", color: "#555", border: "1.5px solid #e0e0e0", borderRadius: "8px", fontSize: "12px", cursor: "pointer" }}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <button onClick={() => setFeedbackFor(act.id)} style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "5px", background: "none", border: "none", color: "#e87722", fontSize: "12px", fontWeight: "600", cursor: "pointer", padding: "0" }}>
                        <MessageSquare size={13} /> Add Feedback from Client
                      </button>
                    )
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // ── COACH DETAIL ──
  if (view === V.DETAIL && activeCoach) {
    const c = coaches.find(x => x.id === activeCoach.id) || activeCoach;
    const presentCount = Object.values(c.attendance).filter(a => a.present).length;
    const totalCount   = Object.keys(c.attendance).length;
    const activityCount = Object.values(c.activities).reduce((sum, arr) => sum + arr.length, 0);

    const TABS = [
      { key: "overview",    label: "Overview",   icon: User },
      { key: "attendance",  label: "Attendance", icon: Calendar },
      { key: "activities",  label: "Activities", icon: Activity },
      { key: "gps",         label: "GPS",        icon: Navigation },
    ];

    return (
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* Hero */}
        <div style={{ background: "linear-gradient(135deg, #1a2340 0%, #2d3a5c 100%)", padding: "28px 28px 0", borderBottom: "1px solid #e8e8e8" }}>
          <button onClick={() => setView(V.LIST)} style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none", color: "rgba(255,255,255,0.7)", fontSize: "13px", fontWeight: "600", cursor: "pointer", marginBottom: "16px", padding: "0" }}>
            <ArrowLeft size={15} /> All Coaches
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
            <div style={{ width: "52px", height: "52px", borderRadius: "50%", backgroundColor: "#e87722", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: "800", color: "#fff", flexShrink: 0 }}>
              {c.avatar}
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#fff", margin: 0 }}>{c.name}</h2>
                <span style={{ fontSize: "11px", fontWeight: "700", padding: "3px 10px", borderRadius: "20px", backgroundColor: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }}>{c.status}</span>
                {c.currentGps.inGeofence && <span style={{ fontSize: "10px", fontWeight: "700", padding: "2px 8px", borderRadius: "20px", backgroundColor: "rgba(46,125,50,0.8)", color: "#fff" }}>📍 In Zone</span>}
              </div>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", marginTop: "3px" }}>{c.role} · {c.teams.join(", ")}</div>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            {TABS.map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                style={{ display: "flex", alignItems: "center", gap: "7px", padding: "12px 20px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: "700", backgroundColor: "transparent", color: activeTab === tab.key ? "#fff" : "rgba(255,255,255,0.5)", borderBottom: activeTab === tab.key ? "3px solid #e87722" : "3px solid transparent", transition: "all 0.15s" }}>
                <tab.icon size={15} /> {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div style={{ padding: "28px" }}>
            {/* Stat strip */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: "14px", marginBottom: "20px" }}>
              {[
                { label: "Attendance Rate", value: totalCount > 0 ? Math.round((presentCount / totalCount) * 100) + "%" : "—", color: "#e87722" },
                { label: "Days Present",    value: presentCount, color: "#2e7d32" },
                { label: "Activities",      value: activityCount, color: "#3b82f6" },
                { label: "GPS Status",      value: c.currentGps.inGeofence ? "In Zone" : "Out", color: c.currentGps.inGeofence ? "#2e7d32" : "#cc3333" },
              ].map(s => (
                <div key={s.label} style={card({ padding: "14px 18px", borderLeft: `4px solid ${s.color}` })}>
                  <span style={{ fontSize: "22px", fontWeight: "800", color: s.color, display: "block" }}>{s.value}</span>
                  <span style={{ fontSize: "12px", color: "#888", fontWeight: "500" }}>{s.label}</span>
                </div>
              ))}
            </div>

            {/* Contact */}
            <div style={card({ padding: "20px", marginBottom: "16px" })}>
              <div style={{ fontSize: "13px", fontWeight: "700", color: "#333", marginBottom: "14px", display: "flex", alignItems: "center", gap: "7px" }}><User size={14} style={{ color: "#e87722" }} /> Contact Details</div>
              {[
                { label: "Phone",  value: c.phone },
                { label: "Email",  value: c.email },
                { label: "Teams",  value: c.teams.join(", ") },
                { label: "Status", value: c.status },
              ].filter(r => r.value).map((row, i, arr) => (
                <div key={row.label} style={{ display: "flex", padding: "10px 0", borderBottom: i < arr.length - 1 ? "1px solid #f5f5f5" : "none", gap: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#888", width: "80px", flexShrink: 0 }}>{row.label}</span>
                  <span style={{ fontSize: "13px", color: "#222", fontWeight: "600" }}>{row.value}</span>
                </div>
              ))}
            </div>

            {/* Quick links */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <OBtn onClick={() => setActiveTab("attendance")} style={{ padding: "9px 16px", fontSize: "12px" }}><Calendar size={13} /> View Attendance</OBtn>
              <OBtn onClick={() => setActiveTab("activities")} style={{ padding: "9px 16px", fontSize: "12px" }}><Activity size={13} /> Activity Log</OBtn>
              <OBtn onClick={() => setActiveTab("gps")} style={{ padding: "9px 16px", fontSize: "12px", backgroundColor: "#2e7d32" }}><Navigation size={13} /> GPS Tracker</OBtn>
            </div>
          </div>
        )}

        {/* ATTENDANCE */}
        {activeTab === "attendance" && (
          <div style={{ padding: "28px" }}>
            <AttendanceCalendar coach={c} onDayClick={handleDayClick} />
          </div>
        )}

        {/* ACTIVITIES */}
        {activeTab === "activities" && (
          <div style={{ padding: "28px" }}>
            <Heading title="Activity Log" sub="All logged activities across all dates" />
            {Object.entries(c.activities).length === 0 ? (
              <div style={card({ padding: "48px", textAlign: "center" })}>
                <Activity size={36} style={{ color: "#ddd", margin: "0 auto 12px", display: "block" }} />
                <p style={{ fontSize: "15px", fontWeight: "700", color: "#555" }}>No activities logged yet</p>
              </div>
            ) : (
              Object.entries(c.activities).sort((a, b) => new Date(b[0]) - new Date(a[0])).map(([date, acts]) => {
                const d = new Date(date);
                return (
                  <div key={date} style={{ marginBottom: "20px" }}>
                    <div style={{ fontSize: "13px", fontWeight: "700", color: "#888", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "4px", height: "16px", backgroundColor: "#e87722", borderRadius: "2px" }} />
                      {d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "long", year: "numeric" })}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {acts.map(act => {
                        const fb = feedbackMap[act.id] || act.feedback;
                        return (
                          <div key={act.id} style={card({ padding: "14px 18px", borderLeft: "3px solid #e87722" })}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
                              <span style={{ fontSize: "14px", fontWeight: "700", color: "#222" }}>{act.type}</span>
                              <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "20px", backgroundColor: "#fff3e8", color: "#e87722", border: "1px solid #ffd8b0", fontWeight: "700" }}>{act.time}</span>
                              {act.duration && <span style={{ fontSize: "11px", color: "#888" }}>{act.duration}</span>}
                            </div>
                            <div style={{ fontSize: "13px", color: "#555" }}>{act.description}</div>
                            {act.players && <div style={{ fontSize: "11px", color: "#888", marginTop: "4px" }}>👥 {Array.isArray(act.players) ? act.players.join(", ") : act.players}</div>}
                            {fb && <div style={{ marginTop: "8px", padding: "8px 12px", backgroundColor: "#f0faf0", border: "1px solid #b8e6b8", borderRadius: "7px", fontSize: "12px", color: "#2e7d32" }}>💬 {fb}</div>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* GPS */}
        {activeTab === "gps" && (
          <div style={{ padding: "28px" }}>
            <GpsWidget coach={c} />
          </div>
        )}
      </div>
    );
  }

  // ── COACH LIST ──
  const inZoneCount = coaches.filter(c => c.currentGps.inGeofence).length;
  const presentToday = coaches.filter(c => {
    const today = new Date().toISOString().split("T")[0];
    return c.attendance[today]?.present;
  }).length;

  return (
    <div style={{ padding: "28px", maxWidth: "1000px", margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "22px", gap: "14px", flexWrap: "wrap" }}>
        <Heading title="Coaches" sub="Manage coaching staff, attendance and GPS tracking" />
        <OBtn onClick={() => setView(V.ADD)}><Plus size={14} /> Add Coach</OBtn>
      </div>

      {/* Summary strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(170px,1fr))", gap: "14px", marginBottom: "22px" }}>
        {[
          { label: "Total Coaches",  value: coaches.length,  color: "#e87722", icon: Users },
          { label: "Present Today",  value: presentToday,    color: "#2e7d32", icon: CheckCircle2 },
          { label: "In GPS Zone",    value: inZoneCount,     color: "#3b82f6", icon: Navigation },
          { label: "Absent Today",   value: coaches.length - presentToday, color: "#cc3333", icon: AlertCircle },
        ].map(s => (
          <div key={s.label} style={card({ padding: "14px 18px", borderLeft: `4px solid ${s.color}` })}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
              <span style={{ fontSize: "22px", fontWeight: "800", color: s.color }}>{s.value}</span>
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: s.color + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <s.icon size={15} style={{ color: s.color }} />
              </div>
            </div>
            <span style={{ fontSize: "12px", color: "#888", fontWeight: "500" }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Coach list */}
      <div style={card({ overflow: "hidden" })}>
        <div style={{ padding: "14px 22px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", gap: "8px" }}>
          <Users size={15} style={{ color: "#e87722" }} />
          <span style={{ fontSize: "14px", fontWeight: "700", color: "#333" }}>{coaches.length} Coaches</span>
        </div>

        {coaches.map((coach, i) => {
          const todayKey = new Date().toISOString().split("T")[0];
          const todayAtt = coach.attendance[todayKey];
          const isPresent = todayAtt?.present;
          const inZone = coach.currentGps.inGeofence;
          const actCount = Object.values(coach.activities).reduce((s, a) => s + a.length, 0);

          return (
            <div key={coach.id} onClick={() => openCoach(coach)}
              style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 22px", borderBottom: i < coaches.length - 1 ? "1px solid #f5f5f5" : "none", cursor: "pointer", transition: "background 0.12s" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#fdf8f4")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              {/* Avatar */}
              <div style={{ width: "44px", height: "44px", borderRadius: "50%", backgroundColor: "#fff3e8", border: "2px solid #ffd8b0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "800", color: "#e87722", flexShrink: 0, position: "relative" }}>
                {coach.avatar}
                {inZone && <div style={{ position: "absolute", bottom: 0, right: 0, width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#2e7d32", border: "2px solid #fff" }} />}
              </div>

              {/* Info */}
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "14px", fontWeight: "700", color: "#222" }}>{coach.name}</span>
                  <span style={{ fontSize: "11px", fontWeight: "600", padding: "2px 8px", borderRadius: "20px", backgroundColor: isPresent ? "#f0faf0" : "#fff0f0", color: isPresent ? "#2e7d32" : "#cc3333", border: `1px solid ${isPresent ? "#b8e6b8" : "#ffc5c5"}` }}>
                    {isPresent ? "Present" : todayAtt ? "Absent" : "No record"}
                  </span>
                  {inZone && <span style={{ fontSize: "10px", fontWeight: "700", padding: "2px 7px", borderRadius: "20px", backgroundColor: "#eff6ff", color: "#3b82f6", border: "1px solid #bfdbfe" }}>📍 In Zone</span>}
                </div>
                <div style={{ fontSize: "12px", color: "#888", marginTop: "2px" }}>
                  {coach.role} · {coach.teams.join(", ")}
                </div>
                {isPresent && todayAtt?.checkin && (
                  <div style={{ fontSize: "11px", color: "#aaa", marginTop: "2px" }}>
                    Check-in: {todayAtt.checkin}{todayAtt.checkout ? ` · Out: ${todayAtt.checkout}` : " · Still in"}
                  </div>
                )}
              </div>

              {/* Right stats */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px", flexShrink: 0 }}>
                <span style={{ fontSize: "11px", color: "#e87722", fontWeight: "700" }}>{actCount} activities</span>
                <span style={{ fontSize: "11px", color: "#888" }}>Last: {coach.currentGps.lastSeen}</span>
              </div>

              <ChevronRight size={15} style={{ color: "#ccc", flexShrink: 0 }} />
            </div>
          );
        })}
      </div>

      {toast && (
        <div style={{ position: "fixed", bottom: "28px", right: "28px", backgroundColor: "#2e7d32", color: "#fff", padding: "12px 20px", borderRadius: "10px", fontSize: "13px", fontWeight: "600", boxShadow: "0 4px 14px rgba(0,0,0,0.2)", zIndex: 999 }}>
          {toast}
        </div>
      )}
    </div>
  );
}