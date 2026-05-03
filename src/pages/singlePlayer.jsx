import { useState } from "react";
import {
  Users, User, Stethoscope, Dumbbell, Apple, ShieldCheck,
  ArrowLeft, ClipboardList, ChevronRight, AlertTriangle,
  CheckCircle2, Clock, Send, Calendar, FileText, X,
} from "lucide-react";

// ─── SHARED ───────────────────────────────────────────────────────────────────
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
const OBtn = ({ children, onClick, style = {} }) => (
  <button onClick={onClick} style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "9px 20px", backgroundColor: "#e87722", color: "#fff", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: "700", cursor: "pointer", boxShadow: "0 2px 8px rgba(232,119,34,0.28)", ...style }}
    onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#d06a18")}
    onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#e87722")}
  >{children}</button>
);

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const TEAMS = [
  {
    id: 1, name: "Kerala Cricket Academy", physio: "Dr. Arun", trainer: "Rahul", nutritionist: "Anjali", coach: "Suresh",
    members: [
      { id: "p1", name: "Arjun Menon", role: "Batsman", number: "01" },
      { id: "p2", name: "Rahul Das",   role: "Bowler",  number: "02" },
      { id: "p3", name: "Vivek Pillai", role: "All-rounder", number: "03" },
      { id: "p4", name: "Nikhil K",    role: "Wicket-keeper", number: "04" },
    ],
  },
];

const INFO_ROWS = [
  { icon: ShieldCheck, label: "Team",        value: TEAMS[0].name },
  { icon: Stethoscope, label: "Physio",      value: TEAMS[0].physio },
  { icon: Dumbbell,    label: "Trainer",     value: TEAMS[0].trainer },
  { icon: Apple,       label: "Nutritionist",value: TEAMS[0].nutritionist },
  { icon: User,        label: "Coach",       value: TEAMS[0].coach },
];

// Shared mock injuries store (in real app this would be global state / API)
const INITIAL_INJURIES = [
  {
    id: "inj1", playerId: "p2", playerName: "Rahul Das",
    type: "Shoulder Strain", bodyPart: "Right Shoulder",
    severity: "Moderate", dateReported: "2025-04-20",
    description: "Pain during bowling action, reduced range of motion.",
    status: "Active", // Active | ClearanceRequested | AppointmentScheduled | Cleared | Rejected
    clearanceRequest: null,
    appointment: null,
    clearanceStatus: null, // null | "Pending Secretary" | "Cleared" | "Rejected"
  },
  {
    id: "inj2", playerId: "p1", playerName: "Arjun Menon",
    type: "Hamstring Tightness", bodyPart: "Left Hamstring",
    severity: "Mild", dateReported: "2025-04-28",
    description: "Minor tightness after batting session.",
    status: "Active",
    clearanceRequest: null, appointment: null, clearanceStatus: null,
  },
];

const SEVERITY_CFG = {
  Mild:     { bg: "#fff8e1", color: "#f9a825", border: "#ffe082" },
  Moderate: { bg: "#fff3e8", color: "#e87722", border: "#ffd8b0" },
  Severe:   { bg: "#fff0f0", color: "#cc3333", border: "#ffc5c5" },
};
const STATUS_CFG = {
  Active:                { bg: "#fff0f0",  color: "#cc3333", border: "#ffc5c5",  label: "Active Injury" },
  ClearanceRequested:    { bg: "#fff8e1",  color: "#f9a825", border: "#ffe082",  label: "Clearance Requested" },
  AppointmentScheduled:  { bg: "#eff6ff",  color: "#3b82f6", border: "#bfdbfe",  label: "Appointment Scheduled" },
  "Pending Secretary":   { bg: "#f5f0ff",  color: "#7c3aed", border: "#ddd6fe",  label: "Pending Secretary" },
  Cleared:               { bg: "#f0faf0",  color: "#2e7d32", border: "#b8e6b8",  label: "✓ Cleared for Playing" },
  Rejected:              { bg: "#fff0f0",  color: "#cc3333", border: "#ffc5c5",  label: "Request Rejected" },
};

// Views
const V = { INFO: "info", TEAM: "team", FORM: "form", INJURIES: "injuries", INJ_DETAIL: "inj_detail" };

export default function Players() {
  const [view, setView] = useState(V.INFO);
  const [injuries, setInjuries] = useState(INITIAL_INJURIES);
  const [activeInj, setActiveInj] = useState(null);
  const [reqNote, setReqNote] = useState("");
  const [showReqModal, setShowReqModal] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const requestClearance = (injId) => {
    if (!reqNote.trim()) { alert("Please describe your current condition."); return; }
    setInjuries(prev => prev.map(inj =>
      inj.id === injId
        ? { ...inj, status: "ClearanceRequested", clearanceRequest: { note: reqNote, date: new Date().toLocaleDateString("en-IN") } }
        : inj
    ));
    setReqNote("");
    setShowReqModal(false);
    setActiveInj(prev => ({ ...prev, status: "ClearanceRequested", clearanceRequest: { note: reqNote, date: new Date().toLocaleDateString("en-IN") } }));
    showToast("Clearance request sent to Physio & Management.");
  };

  const openInjury = (inj) => { setActiveInj(inj); setView(V.INJ_DETAIL); };

  // My injuries (simulating logged-in player = Rahul Das p2, or show all for demo)
  const myInjuries = injuries; // In real app: filter by logged-in player

  // ── INJURY DETAIL ──
  if (view === V.INJ_DETAIL && activeInj) {
    const inj = injuries.find(i => i.id === activeInj.id) || activeInj;
    const sevCfg = SEVERITY_CFG[inj.severity] || SEVERITY_CFG.Mild;
    const stCfg = STATUS_CFG[inj.status] || STATUS_CFG.Active;
    const canRequest = inj.status === "Active";

    return (
      <div style={{ padding: "28px", maxWidth: "700px", margin: "0 auto" }}>
        <BackBtn label="My Injuries" onClick={() => setView(V.INJURIES)} />

        {/* Header */}
        <div style={card({ padding: "22px", marginBottom: "16px", borderLeft: "4px solid #e87722" })}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: "20px", fontWeight: "800", color: "#222", marginBottom: "4px" }}>{inj.type}</div>
              <div style={{ fontSize: "13px", color: "#888" }}>{inj.bodyPart} · Reported {inj.dateReported}</div>
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "11px", fontWeight: "700", padding: "3px 10px", borderRadius: "20px", backgroundColor: sevCfg.bg, color: sevCfg.color, border: `1px solid ${sevCfg.border}` }}>
                {inj.severity}
              </span>
              <span style={{ fontSize: "11px", fontWeight: "700", padding: "3px 10px", borderRadius: "20px", backgroundColor: stCfg.bg, color: stCfg.color, border: `1px solid ${stCfg.border}` }}>
                {stCfg.label}
              </span>
            </div>
          </div>
          {inj.description && (
            <div style={{ marginTop: "14px", fontSize: "13px", color: "#555", lineHeight: "1.6", padding: "12px 16px", backgroundColor: "#fafafa", borderRadius: "8px", border: "1px solid #f0f0f0" }}>
              {inj.description}
            </div>
          )}
        </div>

        {/* Appointment card */}
        {inj.appointment && (
          <div style={{ ...card({ padding: "18px 20px", marginBottom: "16px", backgroundColor: "#eff6ff", border: "1px solid #bfdbfe" }) }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <Calendar size={16} style={{ color: "#3b82f6" }} />
              <span style={{ fontSize: "14px", fontWeight: "700", color: "#1d4ed8" }}>Appointment Scheduled</span>
            </div>
            <div style={{ fontSize: "13px", color: "#3b82f6" }}>{inj.appointment.date} at {inj.appointment.time}</div>
            <div style={{ fontSize: "12px", color: "#60a5fa", marginTop: "2px" }}>With {inj.appointment.with}</div>
            <div style={{ marginTop: "8px", padding: "10px 12px", backgroundColor: "#fff", borderRadius: "7px", border: "1px solid #bfdbfe", fontSize: "12px", color: "#555" }}>
              📧 Email confirmation sent to you and management.
            </div>
          </div>
        )}

        {/* Clearance status */}
        {inj.clearanceStatus === "Cleared" && (
          <div style={{ ...card({ padding: "18px 20px", marginBottom: "16px", backgroundColor: "#f0faf0", border: "1px solid #b8e6b8", borderLeft: "4px solid #2e7d32" }) }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <CheckCircle2 size={18} style={{ color: "#2e7d32" }} />
              <span style={{ fontSize: "15px", fontWeight: "700", color: "#2e7d32" }}>Cleared & Ready for Playing</span>
            </div>
            <div style={{ fontSize: "12px", color: "#4caf50", marginTop: "4px" }}>Approved by Secretary · Notifications sent to management, physio and you.</div>
          </div>
        )}
        {inj.clearanceStatus === "Rejected" && (
          <div style={{ ...card({ padding: "18px 20px", marginBottom: "16px", backgroundColor: "#fff0f0", border: "1px solid #ffc5c5", borderLeft: "4px solid #cc3333" }) }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <X size={18} style={{ color: "#cc3333" }} />
              <span style={{ fontSize: "15px", fontWeight: "700", color: "#cc3333" }}>Clearance Rejected</span>
            </div>
            <div style={{ fontSize: "12px", color: "#e57373", marginTop: "4px" }}>Request has been rejected. Please consult your physio for next steps.</div>
          </div>
        )}

        {/* Clearance request form */}
        {canRequest && (
          <div style={card({ padding: "20px", marginBottom: "16px" })}>
            <div style={{ fontSize: "14px", fontWeight: "700", color: "#333", marginBottom: "12px", display: "flex", alignItems: "center", gap: "7px" }}>
              <Send size={15} style={{ color: "#e87722" }} /> Request Clearance for Playing
            </div>
            <p style={{ fontSize: "13px", color: "#666", marginBottom: "14px", lineHeight: "1.5" }}>
              Describe your current condition and why you feel ready to return to play. This request will be sent to your Physio and Management.
            </p>
            <textarea
              value={reqNote}
              onChange={e => setReqNote(e.target.value)}
              placeholder="e.g. Shoulder feels much better, no pain during light throwing. Ready to resume."
              rows={4}
              style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #e0e0e0", borderRadius: "8px", fontSize: "13px", color: "#333", outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit", backgroundColor: "#f9f9f9", marginBottom: "12px" }}
              onFocus={e => (e.target.style.borderColor = "#e87722")}
              onBlur={e => (e.target.style.borderColor = "#e0e0e0")}
            />
            <OBtn onClick={() => requestClearance(inj.id)} style={{ width: "100%", justifyContent: "center" }}>
              <Send size={15} /> Send Clearance Request
            </OBtn>
          </div>
        )}

        {/* Already requested */}
        {inj.status === "ClearanceRequested" && inj.clearanceRequest && (
          <div style={{ ...card({ padding: "16px 20px", backgroundColor: "#fff8e1", border: "1px solid #ffe082" }) }}>
            <div style={{ fontSize: "13px", fontWeight: "700", color: "#f9a825", marginBottom: "4px" }}>⏳ Clearance Request Pending</div>
            <div style={{ fontSize: "12px", color: "#666" }}>Submitted on {inj.clearanceRequest.date}</div>
            <div style={{ fontSize: "13px", color: "#555", marginTop: "6px", fontStyle: "italic" }}>"{inj.clearanceRequest.note}"</div>
          </div>
        )}
      </div>
    );
  }

  // ── INJURIES LIST ──
  if (view === V.INJURIES) {
    return (
      <div style={{ padding: "28px", maxWidth: "800px", margin: "0 auto" }}>
        <BackBtn label="Player Info" onClick={() => setView(V.INFO)} />
        <Heading title="My Injuries" sub="Track your injury status and request playing clearance" />

        {myInjuries.length === 0 ? (
          <div style={card({ padding: "48px", textAlign: "center" })}>
            <CheckCircle2 size={36} style={{ color: "#b8e6b8", margin: "0 auto 12px", display: "block" }} />
            <p style={{ fontSize: "15px", fontWeight: "700", color: "#555" }}>No active injuries</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {myInjuries.map(inj => {
              const sevCfg = SEVERITY_CFG[inj.severity] || SEVERITY_CFG.Mild;
              const stCfg = STATUS_CFG[inj.clearanceStatus || inj.status] || STATUS_CFG.Active;
              return (
                <div key={inj.id} onClick={() => openInjury(inj)}
                  style={card({ padding: "18px 20px", cursor: "pointer", transition: "all 0.15s", borderLeft: inj.clearanceStatus === "Cleared" ? "4px solid #2e7d32" : inj.status === "ClearanceRequested" ? "4px solid #f9a825" : "4px solid #cc3333" })}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.09)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.05)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "10px", flexWrap: "wrap" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                        <AlertTriangle size={15} style={{ color: "#cc3333", flexShrink: 0 }} />
                        <span style={{ fontSize: "15px", fontWeight: "700", color: "#222" }}>{inj.type}</span>
                      </div>
                      <div style={{ fontSize: "12px", color: "#888" }}>{inj.bodyPart} · {inj.playerName} · {inj.dateReported}</div>
                      {inj.appointment && <div style={{ fontSize: "11px", color: "#3b82f6", marginTop: "4px", fontWeight: "600" }}>📅 Appointment: {inj.appointment.date}</div>}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "flex-end" }}>
                      <span style={{ fontSize: "11px", fontWeight: "700", padding: "2px 9px", borderRadius: "20px", backgroundColor: sevCfg.bg, color: sevCfg.color, border: `1px solid ${sevCfg.border}` }}>{inj.severity}</span>
                      <span style={{ fontSize: "11px", fontWeight: "700", padding: "2px 9px", borderRadius: "20px", backgroundColor: stCfg.bg, color: stCfg.color, border: `1px solid ${stCfg.border}` }}>{stCfg.label}</span>
                    </div>
                    <ChevronRight size={15} style={{ color: "#ccc", flexShrink: 0, marginTop: "4px" }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Toast */}
        {toast && (
          <div style={{ position: "fixed", bottom: "28px", right: "28px", backgroundColor: toast.type === "success" ? "#2e7d32" : "#cc3333", color: "#fff", padding: "12px 20px", borderRadius: "10px", fontSize: "13px", fontWeight: "600", boxShadow: "0 4px 14px rgba(0,0,0,0.2)", zIndex: 999 }}>
            {toast.msg}
          </div>
        )}
      </div>
    );
  }

  // ── TEAM VIEW ──
  if (view === V.TEAM) {
    const team = TEAMS[0];
    return (
      <div style={{ padding: "28px", maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "22px" }}>
          <button onClick={() => setView(V.INFO)} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", backgroundColor: "#fff", border: "1.5px solid #e0e0e0", borderRadius: "8px", cursor: "pointer" }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "#e87722")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "#e0e0e0")}
          ><ArrowLeft size={17} style={{ color: "#555" }} /></button>
          <Heading title="Team Members" sub={null} />
        </div>
        <div style={card({ overflow: "hidden" })}>
          <div style={{ padding: "14px 24px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", gap: "8px" }}>
            <Users size={16} style={{ color: "#e87722" }} />
            <span style={{ fontSize: "14px", fontWeight: "700", color: "#333" }}>{team.members.length} Players</span>
          </div>
          {team.members.map((m, i) => (
            <div key={m.id}
              style={{ display: "flex", alignItems: "center", padding: "14px 24px", borderBottom: i < team.members.length - 1 ? "1px solid #f5f5f5" : "none", gap: "14px", transition: "background 0.12s" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#fdf8f4")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#fff3e8", border: "1.5px solid #ffd8b0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700", color: "#e87722", flexShrink: 0 }}>{m.number}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "#222" }}>{m.name}</div>
                <div style={{ fontSize: "12px", color: "#888", marginTop: "1px" }}>{m.role}</div>
              </div>
              <ChevronRight size={16} style={{ color: "#ccc" }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── MAIN INFO ──
  return (
    <div style={{ padding: "28px", maxWidth: "900px", margin: "0 auto" }}>
      <Heading title="Player Info" />

      {/* Info card */}
      <div style={card({ overflow: "hidden", marginBottom: "20px" })}>
        <div style={{ padding: "18px 24px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "38px", height: "38px", borderRadius: "9px", backgroundColor: "#fff3e8", border: "1.5px solid #ffd8b0", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ShieldCheck size={20} style={{ color: "#e87722" }} />
          </div>
          <div>
            <div style={{ fontSize: "15px", fontWeight: "700", color: "#222" }}>{TEAMS[0].name}</div>
            <div style={{ fontSize: "12px", color: "#888", marginTop: "1px" }}>Team Overview</div>
          </div>
        </div>
        {INFO_ROWS.map((row, i) => {
          const Icon = row.icon;
          return (
            <div key={row.label} style={{ display: "flex", alignItems: "center", padding: "14px 24px", borderBottom: i < INFO_ROWS.length - 1 ? "1px solid #f5f5f5" : "none", gap: "12px" }}>
              <Icon size={16} style={{ color: "#e87722", flexShrink: 0 }} />
              <span style={{ fontSize: "13px", color: "#888", width: "110px", fontWeight: "500" }}>{row.label}</span>
              <span style={{ fontSize: "14px", color: "#222", fontWeight: "600" }}>{row.value}</span>
            </div>
          );
        })}
      </div>

      {/* Active injury banner */}
      {myInjuries.filter(i => i.status !== "Cleared").length > 0 && (
        <div style={{ ...card({ padding: "14px 18px", marginBottom: "16px", backgroundColor: "#fff0f0", border: "1px solid #ffc5c5", borderLeft: "4px solid #cc3333" }), display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <AlertTriangle size={16} style={{ color: "#cc3333" }} />
            <span style={{ fontSize: "13px", fontWeight: "700", color: "#cc3333" }}>
              {myInjuries.filter(i => i.status !== "Cleared").length} active injur{myInjuries.filter(i => i.status !== "Cleared").length > 1 ? "ies" : "y"} on record
            </span>
          </div>
          <button onClick={() => setView(V.INJURIES)} style={{ fontSize: "12px", fontWeight: "700", color: "#e87722", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>View & Request Clearance →</button>
        </div>
      )}

      {/* Actions */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <button onClick={() => setView(V.TEAM)} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "11px 22px", backgroundColor: "#fff", color: "#333", border: "1.5px solid #e0e0e0", borderRadius: "8px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#e87722"; e.currentTarget.style.color = "#e87722"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "#e0e0e0"; e.currentTarget.style.color = "#333"; }}
        ><Users size={16} /> View Team</button>

        <OBtn onClick={() => setView(V.INJURIES)} style={{ backgroundColor: "#cc3333", boxShadow: "0 2px 8px rgba(204,51,51,0.3)" }}>
          <AlertTriangle size={15} /> My Injuries
        </OBtn>

        <OBtn onClick={() => alert("Opening Daily Progress Form...")}>
          <ClipboardList size={16} /> Daily Progress
        </OBtn>
      </div>
    </div>
  );
}