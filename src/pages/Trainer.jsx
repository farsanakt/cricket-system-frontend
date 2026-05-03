import { useState } from "react";
import WorkoutBuilder from "../components/WorkoutBuilder";
import {
  User,
  AlertTriangle,
  Dumbbell,
  CheckCircle2,
  Calendar,
  ArrowLeft,
  Search,
} from "lucide-react";

const Trainer = () => {
  const [reports, setReports] = useState([
    {
      id: 1,
      player: "Rahul Kumar",
      activity: "Bowling drills",
      injury: true,
      status: "referred",
      workout: "",
    },
    {
      id: 2,
      player: "Virat Singh",
      activity: "Batting practice",
      injury: false,
      status: "referred",
      workout: "",
    },
    {
      id: 3,
      player: "Arjun Patel",
      activity: "Fielding training",
      injury: true,
      status: "referred",
      workout: "",
    },
  ]);

  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [savedPlans, setSavedPlans] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReports = reports.filter((report) =>
    report.player.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSavePlan = (selectedExercises) => {
    if (!selectedPlayer) return;
    const planSummary = selectedExercises.map((ex) => ex.name).join(", ");
    setSavedPlans((prev) => ({
      ...prev,
      [selectedPlayer.id]: {
        exercises: selectedExercises,
        summary: planSummary,
        date: new Date().toLocaleDateString("en-IN"),
      },
    }));
    setReports((prev) =>
      prev.map((report) =>
        report.id === selectedPlayer.id
          ? { ...report, workout: planSummary }
          : report
      )
    );
    alert("✅ Workout Plan Saved Successfully!");
  };

  /* ─── PLAYER LIST ─── */
  if (!selectedPlayer) {
    return (
      <div style={{ padding: "28px", maxWidth: "1100px", margin: "0 auto" }}>
        {/* Page header card */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            border: "1px solid #e8e8e8",
            padding: "22px 24px",
            marginBottom: "22px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "18px",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#222",
                  marginBottom: "2px",
                }}
              >
                Referred Cases
              </h1>
              <p style={{ fontSize: "13px", color: "#888", fontWeight: "500" }}>
                Manage and create personalised training plans
              </p>
            </div>

            {/* Date pill */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#fff3e8",
                border: "1px solid #ffd8b0",
                borderRadius: "8px",
                padding: "8px 14px",
              }}
            >
              <Calendar size={16} style={{ color: "#e87722" }} />
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "700",
                  color: "#e87722",
                }}
              >
                {new Date().toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Search */}
          <div style={{ position: "relative" }}>
            <Search
              size={16}
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#aaa",
              }}
            />
            <input
              type="text"
              placeholder="Search players..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                paddingLeft: "40px",
                paddingRight: "14px",
                paddingTop: "10px",
                paddingBottom: "10px",
                border: "1.5px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "13px",
                color: "#333",
                backgroundColor: "#f9f9f9",
                outline: "none",
                boxSizing: "border-box",
                fontWeight: "500",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#e87722")}
              onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
            />
          </div>
        </div>

        {/* Player cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          {filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <div
                key={report.id}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "10px",
                  border: "1.5px solid #e8e8e8",
                  padding: "20px",
                  cursor: "pointer",
                  transition: "all 0.18s ease",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#e87722";
                  e.currentTarget.style.boxShadow =
                    "0 4px 14px rgba(232,119,34,0.12)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e8e8e8";
                  e.currentTarget.style.boxShadow =
                    "0 1px 4px rgba(0,0,0,0.05)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
                onClick={() => setSelectedPlayer(report)}
              >
                {/* Top row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    marginBottom: "14px",
                  }}
                >
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "50%",
                      backgroundColor: "#fff3e8",
                      border: "1.5px solid #ffd8b0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <User size={20} style={{ color: "#e87722" }} />
                  </div>
                  {report.injury && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        backgroundColor: "#fff0f0",
                        border: "1px solid #ffc5c5",
                        borderRadius: "20px",
                        padding: "3px 10px",
                        fontSize: "11px",
                        fontWeight: "700",
                        color: "#cc3333",
                      }}
                    >
                      <AlertTriangle size={12} />
                      Injury
                    </div>
                  )}
                </div>

                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    color: "#222",
                    marginBottom: "2px",
                  }}
                >
                  {report.player}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#888",
                    marginBottom: "14px",
                    fontWeight: "500",
                  }}
                >
                  {report.activity}
                </div>

                {/* Plan status */}
                {savedPlans[report.id] ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      backgroundColor: "#f0faf0",
                      border: "1px solid #b8e6b8",
                      borderRadius: "8px",
                      padding: "8px 12px",
                      marginBottom: "14px",
                    }}
                  >
                    <CheckCircle2 size={16} style={{ color: "#2e7d32" }} />
                    <div>
                      <div
                        style={{
                          fontSize: "11px",
                          fontWeight: "700",
                          color: "#2e7d32",
                          textTransform: "uppercase",
                          letterSpacing: "0.4px",
                        }}
                      >
                        Plan Saved
                      </div>
                      <div style={{ fontSize: "11px", color: "#4caf50" }}>
                        {savedPlans[report.id].date}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "9px",
                      backgroundColor: "#f9f9f9",
                      borderRadius: "8px",
                      border: "1px solid #ebebeb",
                      fontSize: "12px",
                      color: "#aaa",
                      fontWeight: "500",
                      marginBottom: "14px",
                    }}
                  >
                    No plan yet
                  </div>
                )}

                <button
                  style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#e87722",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: "700",
                    cursor: "pointer",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#d06a18")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#e87722")
                  }
                >
                  Create Plan
                </button>
              </div>
            ))
          ) : (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "60px 20px",
                backgroundColor: "#ffffff",
                borderRadius: "10px",
                border: "1.5px dashed #e0e0e0",
              }}
            >
              <Search
                size={36}
                style={{ color: "#ddd", margin: "0 auto 12px" }}
              />
              <p
                style={{ fontSize: "15px", fontWeight: "700", color: "#555" }}
              >
                No players found
              </p>
              <p style={{ fontSize: "13px", color: "#aaa", marginTop: "4px" }}>
                Try adjusting your search
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ─── PLAYER DETAIL + WORKOUT ─── */
  return (
    <div style={{ padding: "28px", maxWidth: "1100px", margin: "0 auto" }}>
      {/* Header bar */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          border: "1px solid #e8e8e8",
          padding: "18px 24px",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        }}
      >
        <button
          onClick={() => setSelectedPlayer(null)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "36px",
            height: "36px",
            backgroundColor: "#f4f4f4",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            cursor: "pointer",
            flexShrink: 0,
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#ffe8d4")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#f4f4f4")
          }
        >
          <ArrowLeft size={18} style={{ color: "#555" }} />
        </button>

        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "#fff3e8",
            border: "1.5px solid #ffd8b0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <User size={20} style={{ color: "#e87722" }} />
        </div>

        <div style={{ flex: 1 }}>
          <div
            style={{ fontSize: "17px", fontWeight: "700", color: "#222" }}
          >
            {selectedPlayer.player}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "2px",
            }}
          >
            <span style={{ fontSize: "12px", color: "#888", fontWeight: "500" }}>
              {selectedPlayer.activity}
            </span>
            {selectedPlayer.injury && (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "11px",
                  fontWeight: "700",
                  color: "#cc3333",
                  backgroundColor: "#fff0f0",
                  border: "1px solid #ffc5c5",
                  borderRadius: "20px",
                  padding: "2px 9px",
                }}
              >
                <AlertTriangle size={11} /> Injury Case
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Workout Builder Card */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          border: "1px solid #e8e8e8",
          padding: "24px",
          marginBottom: "20px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        }}
      >
        {/* Section title */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "9px",
              backgroundColor: "#e87722",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 2px 8px rgba(232,119,34,0.3)",
            }}
          >
            <Dumbbell size={20} style={{ color: "#ffffff" }} />
          </div>
          <div>
            <div
              style={{ fontSize: "16px", fontWeight: "700", color: "#222" }}
            >
              Build Workout Plan
            </div>
            <div style={{ fontSize: "12px", color: "#888", marginTop: "1px" }}>
              Select exercises for optimal training
            </div>
          </div>
        </div>

        <WorkoutBuilder onSave={handleSavePlan} />
      </div>

      {/* Saved Plan Summary */}
      {savedPlans[selectedPlayer.id] && (
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            border: "1px solid #e8e8e8",
            padding: "22px 24px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "#f0faf0",
                border: "1.5px solid #b8e6b8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CheckCircle2 size={18} style={{ color: "#2e7d32" }} />
            </div>
            <span
              style={{ fontSize: "15px", fontWeight: "700", color: "#222" }}
            >
              Saved Workout Plan
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            {savedPlans[selectedPlayer.id].exercises.map((ex, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  backgroundColor: "#fff3e8",
                  border: "1px solid #ffd8b0",
                  borderRadius: "8px",
                  padding: "7px 14px",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#b05a00",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "#e87722",
                    flexShrink: 0,
                  }}
                />
                {ex.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Trainer;
