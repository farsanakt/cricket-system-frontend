import { useState } from "react";
import DailyReportForm from "../components/DailyReportForm";
import {
  Users,
  User,
  Stethoscope,
  Dumbbell,
  Apple,
  ShieldCheck,
  ArrowLeft,
  ClipboardList,
  ChevronRight,
} from "lucide-react";

const team = {
  name: "Kerala Cricket Academy",
  physio: "Dr. Arun",
  trainer: "Rahul",
  nutritionist: "Anjali",
  coach: "Suresh",
  members: [
    { name: "Arjun", role: "Batsman", number: "01" },
    { name: "Rahul", role: "Bowler", number: "02" },
    { name: "Vivek", role: "All-rounder", number: "03" },
    { name: "Nikhil", role: "Wicket-keeper", number: "04" },
  ],
};

const INFO_ROWS = [
  { icon: ShieldCheck, label: "Team", value: team.name },
  { icon: Stethoscope, label: "Physio", value: team.physio },
  { icon: Dumbbell, label: "Trainer", value: team.trainer },
  { icon: Apple, label: "Nutritionist", value: team.nutritionist },
  { icon: User, label: "Coach", value: team.coach },
];

/* ── view constants ── */
const VIEW_INFO = "info";
const VIEW_TEAM = "team";
const VIEW_FORM = "form";

const Players = () => {
  const [view, setView] = useState(VIEW_INFO);

  if (view === VIEW_FORM) {
    return <DailyReportForm onBack={() => setView(VIEW_INFO)} />;
  }

  return (
    <div style={{ padding: "28px", maxWidth: "900px", margin: "0 auto" }}>
      {/* ── PLAYER INFO ── */}
      {view === VIEW_INFO && (
        <>
          {/* Page heading */}
          <div style={{ marginBottom: "22px" }}>
            <h1
              style={{ fontSize: "20px", fontWeight: "700", color: "#222", marginBottom: "2px" }}
            >
              Player Info
            </h1>
            <div
              style={{ width: "32px", height: "3px", backgroundColor: "#e87722", borderRadius: "2px" }}
            />
          </div>

          {/* Info card */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              border: "1px solid #e8e8e8",
              overflow: "hidden",
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
              marginBottom: "20px",
            }}
          >
            {/* Card header */}
            <div
              style={{
                padding: "18px 24px",
                borderBottom: "1px solid #f0f0f0",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "9px",
                  backgroundColor: "#fff3e8",
                  border: "1.5px solid #ffd8b0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ShieldCheck size={20} style={{ color: "#e87722" }} />
              </div>
              <div>
                <div style={{ fontSize: "15px", fontWeight: "700", color: "#222" }}>
                  {team.name}
                </div>
                <div style={{ fontSize: "12px", color: "#888", marginTop: "1px" }}>
                  Team Overview
                </div>
              </div>
            </div>

            {/* Info rows */}
            {INFO_ROWS.map((row, i) => {
              const Icon = row.icon;
              return (
                <div
                  key={row.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "14px 24px",
                    borderBottom: i < INFO_ROWS.length - 1 ? "1px solid #f5f5f5" : "none",
                    gap: "12px",
                  }}
                >
                  <Icon size={16} style={{ color: "#e87722", flexShrink: 0 }} />
                  <span style={{ fontSize: "13px", color: "#888", width: "110px", fontWeight: "500" }}>
                    {row.label}
                  </span>
                  <span style={{ fontSize: "14px", color: "#222", fontWeight: "600" }}>
                    {row.value}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              onClick={() => setView(VIEW_TEAM)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "11px 22px",
                backgroundColor: "#ffffff",
                color: "#333",
                border: "1.5px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#e87722";
                e.currentTarget.style.color = "#e87722";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e0e0e0";
                e.currentTarget.style.color = "#333";
              }}
            >
              <Users size={16} />
              View Team
            </button>

            <button
              onClick={() => setView(VIEW_FORM)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "11px 22px",
                backgroundColor: "#e87722",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "700",
                cursor: "pointer",
                transition: "background 0.15s",
                boxShadow: "0 2px 8px rgba(232,119,34,0.3)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d06a18")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#e87722")}
            >
              <ClipboardList size={16} />
              Daily Progress
            </button>
          </div>
        </>
      )}

      {/* ── TEAM MEMBERS ── */}
      {view === VIEW_TEAM && (
        <>
          {/* Back + title */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              marginBottom: "22px",
            }}
          >
            <button
              onClick={() => setView(VIEW_INFO)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
                backgroundColor: "#ffffff",
                border: "1.5px solid #e0e0e0",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#e87722")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#e0e0e0")}
            >
              <ArrowLeft size={17} style={{ color: "#555" }} />
            </button>
            <div>
              <h1 style={{ fontSize: "20px", fontWeight: "700", color: "#222", marginBottom: "2px" }}>
                Team Members
              </h1>
              <div style={{ width: "32px", height: "3px", backgroundColor: "#e87722", borderRadius: "2px" }} />
            </div>
          </div>

          {/* Members list */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              border: "1px solid #e8e8e8",
              overflow: "hidden",
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "14px 24px",
                borderBottom: "1px solid #f0f0f0",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Users size={16} style={{ color: "#e87722" }} />
              <span style={{ fontSize: "14px", fontWeight: "700", color: "#333" }}>
                {team.members.length} Players
              </span>
            </div>

            {team.members.map((m, i) => (
              <div
                key={m.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "14px 24px",
                  borderBottom: i < team.members.length - 1 ? "1px solid #f5f5f5" : "none",
                  gap: "14px",
                  transition: "background 0.12s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fdf8f4")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                {/* Number badge */}
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor: "#fff3e8",
                    border: "1.5px solid #ffd8b0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: "700",
                    color: "#e87722",
                    flexShrink: 0,
                  }}
                >
                  {m.number}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "14px", fontWeight: "700", color: "#222" }}>
                    {m.name}
                  </div>
                  <div style={{ fontSize: "12px", color: "#888", marginTop: "1px" }}>
                    {m.role}
                  </div>
                </div>

                <ChevronRight size={16} style={{ color: "#ccc" }} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Players;
