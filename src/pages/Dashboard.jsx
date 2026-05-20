import "./Dashboard.css";

function Dashboard() {
  const weeklyData = [
    { day: "Mon", hours: 2.1 },
    { day: "Tue", hours: 2.8 },
    { day: "Wed", hours: 1.7 },
    { day: "Thu", hours: 3.5 },
    { day: "Fri", hours: 2.4 },
    { day: "Sat", hours: 3.8 },
    { day: "Sun", hours: 3.0 },
  ];

  return (
    <main className="dashboard-page">
      <section className="dashboard-top">
        <div className="dashboard-card screen-time-card">
          <h1>Dashboard</h1>
          <h2>Today's Screen Time</h2>
          <p className="screen-time-number">3.5 hours</p>
          <p>1.5 hours remaining today</p>

          <div className="progress-bar" aria-label="Screen time progress">
            <div className="progress-fill"></div>
          </div>
        </div>

        <div className="dashboard-card warning card">
          <p className="warning-message">
            ⚠️ Screen time exceeded recommended limit
          </p>
        </div>
      </section>

      <section className="dashboard-card">
        <h2>Weekly Screen Time</h2>
        <div className="weekly-chart" aria-label="Weekly screen time chart">
          {weeklyData.map((item) => (
            <div className="chart-column" key={item.day}>
              <div 
                className="chart-bar"
                style={{ height : `${item.hours * 35}px` }}
              ></div>
              <p>{item.day}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="dashboard-card reward-card">
        <h2>Reward Points</h2>
        <p>120 ⭐</p>
      </section>

      <button className="suggestions-button" type="button">
        View Suggestions
      </button>
    </main>
  );
}

export default Dashboard;
