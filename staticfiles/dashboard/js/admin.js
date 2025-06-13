document.addEventListener("DOMContentLoaded", () => {
    // Highlight active nav link based on URL
    const currentPage = location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".sidebar nav a");
    navLinks.forEach(link => {
      if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  
    // Sidebar toggle functionality
    const sidebar = document.querySelector(".sidebar");
    const toggleBtn = document.querySelector("#toggleSidebar");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
      });
    }
  
    // Animate notification badge pop
    const badge = document.querySelector(".notification-badge");
    if (badge) {
      badge.classList.add("pop");
      setTimeout(() => badge.classList.remove("pop"), 1000);
    }
  
    // Animate metric cards on load
    document.querySelectorAll(".metric-card").forEach((card, index) => {
      card.style.animationDelay = `${index * 100}ms`;
      card.classList.add("fade-in-up");
    });
  
    // Animate progress bars
    document.querySelectorAll(".progress-fill").forEach(bar => {
      const width = bar.style.width;
      bar.style.width = "0";
      setTimeout(() => {
        bar.style.transition = "width 1s ease-out";
        bar.style.width = width;
      }, 300);
    });
  });

  


//Reports


 // Sample report data
const reports = [
    { id: 'REP001', date: '2025-04-24', binId: 'BIN001', issue: 'Overflowing', status: 'Resolved' },
    { id: 'REP002', date: '2025-04-22', binId: 'BIN003', issue: 'Sensor error', status: 'Pending' },
    { id: 'REP003', date: '2025-04-19', binId: 'BIN002', issue: 'Blocked path', status: 'Resolved' },
    { id: 'REP004', date: '2025-04-10', binId: 'BIN004', issue: 'Odor issue', status: 'In Progress' }
  ];
  
  // Display reports
  function displayReports(filteredReports) {
    const tableBody = document.getElementById('reportTableBody');
    if (!tableBody) return; // Prevents error if not on reports page
  
    tableBody.innerHTML = '';
    filteredReports.forEach(report => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${report.id}</td>
        <td>${report.date}</td>
        <td>${report.binId}</td>
        <td>${report.issue}</td>
        <td>${report.status}</td>
        <td><button class="action-btn">View</button></td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  // Filter reports
  function filterReports(option) {
    const today = new Date();
    let filtered;
  
    if (option === 'today') {
      filtered = reports.filter(r => new Date(r.date).toDateString() === today.toDateString());
    } else if (option === 'week') {
      const lastWeek = new Date();
      lastWeek.setDate(today.getDate() - 7);
      filtered = reports.filter(r => new Date(r.date) >= lastWeek);
    } else if (option === 'month') {
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      filtered = reports.filter(r => new Date(r.date) >= firstDayOfMonth);
    } else {
      filtered = reports;
    }
  
    displayReports(filtered);
  }
  
  // Listen for filter change
  document.addEventListener('DOMContentLoaded', () => {
    const filterSelect = document.getElementById('reportFilter');
    if (filterSelect) {
      filterReports('all'); // Default
      filterSelect.addEventListener('change', (e) => {
        filterReports(e.target.value);
      });
    }
  });
  

// users-Managemant



  document.addEventListener('DOMContentLoaded', () => {
    const users = [
      { id: 'U001', name: 'Riya Sharma', role: 'Citizen', contact: '9876543210' },
      { id: 'U002', name: 'Ankit Mehta', role: 'Driver', contact: '9812345678' },
      { id: 'U003', name: 'Admin Rakesh', role: 'Admin', contact: '9123456789' },
      { id: 'U004', name: 'Meena Rao', role: 'Citizen', contact: '9765432109' }
    ];
  
    const userTableBody = document.getElementById('userTableBody');
    const userSearch = document.getElementById('userSearch');
  
    function displayUsers(data) {
      if (!userTableBody) return;
      userTableBody.innerHTML = '';
      data.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td><span class="priority-tag ${user.role.toLowerCase()}">${user.role}</span></td>
          <td>${user.contact}</td>
          <td>
            <button class="action-btn">View</button>
          </td>
        `;
        userTableBody.appendChild(row);
      });
    }
  
    if (userSearch) {
      userSearch.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase();
        const filtered = users.filter(u => 
          u.name.toLowerCase().includes(val) || 
          u.role.toLowerCase().includes(val)
        );
        displayUsers(filtered);
      });
    }
  
    if (userTableBody) displayUsers(users);
  });
  // Function to track the location of the driver
function trackLocation(driverId) {
    // Here, implement the logic to show the real-time location
    // For now, we will log a message for demo purposes
    alert(`Tracking location for Driver #${driverId}...`);
}

// Additional JS can be added to enhance functionality as needed



//bins-management


document.addEventListener('DOMContentLoaded', () => {
  const binData = [
    {
      id: 'BIN001',
      location: 'Sector 5, Main Street',
      status: 'Full',
      capacity: '100%',
      lastCleaned: '2025-04-20',
    },
    {
      id: 'BIN002',
      location: 'Sector 7, Park Avenue',
      status: 'Half Full',
      capacity: '50%',
      lastCleaned: '2025-04-23',
    },
    {
      id: 'BIN003',
      location: 'Sector 3, School Road',
      status: 'Empty',
      capacity: '0%',
      lastCleaned: '2025-04-24',
    },
  ];

  const binTableBody = document.getElementById('binTableBody');

  binData.forEach((bin) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td style="padding: 12px;">${bin.id}</td>
      <td style="padding: 12px;">${bin.location}</td>
      <td style="padding: 12px;">${bin.status}</td>
      <td style="padding: 12px;">${bin.capacity}</td>
      <td style="padding: 12px;">${bin.lastCleaned}</td>
      <td style="padding: 12px;">
        <button class="btn small-btn">Edit</button>
        <button class="btn small-btn danger">Delete</button>
      </td>
    `;

    binTableBody.appendChild(row);
  });
});

//setting

function saveSettings() {
    const fullThreshold = document.getElementById('fullAlert').value;
    const rewardPoints = document.getElementById('pointsPerKg').value;
    const theme = document.getElementById('themeSelect').value;
  
    alert(`Settings Saved:\n\nFull Threshold: ${fullThreshold}%\nPoints/Kg: ${rewardPoints}\nTheme: ${theme}`);
  
    // You can later connect this to your backend or localStorage.
  }
  
  