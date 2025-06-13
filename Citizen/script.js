// Initialize the waste map
function initWasteMap() {
  const map = L.map('waste-map').setView([18.5204, 73.8567], 15);
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Custom bin icons
  const greenBinIcon = L.divIcon({
      className: 'bin-icon green',
      html: '<div class="bin-marker"></div>',
      iconSize: [24, 24]
  });

  const yellowBinIcon = L.divIcon({
      className: 'bin-icon yellow',
      html: '<div class="bin-marker"></div>',
      iconSize: [24, 24]
  });

  const redBinIcon = L.divIcon({
      className: 'bin-icon red',
      html: '<div class="bin-marker"></div>',
      iconSize: [24, 24]
  });

  // Sample bin data
  const bins = [
      { id: 'B-001', lat: 51.505, lng: -0.09, status: 'green', lastCollected: '2h ago' },
      { id: 'B-002', lat: 51.51, lng: -0.1, status: 'yellow', lastCollected: '5h ago' },
      { id: 'B-003', lat: 51.515, lng: -0.09, status: 'red', lastCollected: '8h ago' },
      { id: 'B-004', lat: 51.52, lng: -0.095, status: 'green', lastCollected: '1h ago' }
  ];

  // Add bins to map
  bins.forEach(bin => {
      const icon = bin.status === 'green' ? greenBinIcon : 
                  bin.status === 'yellow' ? yellowBinIcon : redBinIcon;
      
      const marker = L.marker([bin.lat, bin.lng], { icon }).addTo(map);
      
      marker.on('click', () => {
          openReportModal(bin.id, bin.status);
      });
  });
}

// Modal control functions
function openReportModal(binId, status) {
  const modal = document.getElementById('report-modal');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeReportModal() {
  const modal = document.getElementById('report-modal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Handle form submission
function handleReportSubmission(e) {
  e.preventDefault();
  
  const status = document.getElementById('bin-status').value;
  const photo = document.getElementById('bin-photo').files[0];
  
  // In a real app, you would send this data to your backend
  console.log('Submitting report:', { status, photo });
  
  // Simulate API call
  setTimeout(() => {
      alert('Report submitted successfully! +10 Eco Points');
      closeReportModal();
  }, 1000);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  // Initialize the map
  initWasteMap();
  
  // Set up event listeners
  document.getElementById('report-bin-btn').addEventListener('click', () => {
      openReportModal('nearest', 'unknown');
  });
  
  document.getElementById('close-modal-btn').addEventListener('click', closeReportModal);
  document.getElementById('submit-report-btn').addEventListener('click', handleReportSubmission);
  
  // Close modal when clicking outside
  document.getElementById('report-modal').addEventListener('click', (e) => {
      if (e.target === document.getElementById('report-modal')) {
          closeReportModal();
      }
  });
  
  // Profile button
  document.getElementById('profile-btn').addEventListener('click', () => {
      alert('User profile would open here');
  });
  
  // Notifications button
  document.getElementById('notifications-btn').addEventListener('click', () => {
      alert('Notifications list would open here');
  });
});
function showSection(id) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(sec => sec.classList.remove('active'));

  document.getElementById(id).classList.add('active');
}



//report

document.addEventListener('DOMContentLoaded', function() {
  const photoInput = document.getElementById('bin-photo');
  const photoPreview = document.getElementById('photo-preview');
  const photoLabel = document.getElementById('photo-label');
  
  photoInput.addEventListener('change', function(e) {
      if (e.target.files.length > 0) {
          const file = e.target.files[0];
          const reader = new FileReader();
          
          reader.onload = function(event) {
              photoPreview.innerHTML = `<img src="${event.target.result}" alt="Bin Photo">`;
              photoPreview.style.display = 'block';
              photoLabel.textContent = 'Change photo';
          }
          
          reader.readAsDataURL(file);
      }
  });
  
  document.getElementById('report-form').addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Report submitted successfully! +10 Eco Points');
      // In real app: Send data to backend
  });
});



//reward//


document.addEventListener('DOMContentLoaded', function() {
  // Tab switching
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
      tab.addEventListener('click', () => {
          tabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          
          document.querySelectorAll('.tab-content').forEach(content => {
              content.classList.remove('active');
          });
          
          document.getElementById(tab.dataset.tab).classList.add('active');
      });
  });
  
  // Reward redemption
  document.querySelectorAll('.redeem-btn').forEach(btn => {
      btn.addEventListener('click', function() {
          const pointsAvailable = parseInt(document.querySelector('.points-display').textContent);
          const pointsRequired = parseInt(this.dataset.cost);
          
          if (pointsAvailable >= pointsRequired) {
              if (confirm(`Redeem this reward for ${pointsRequired} points?`)) {
                  alert('Reward redeemed successfully!');
                  this.disabled = true;
                  this.textContent = 'Redeemed';
              }
          } else {
              alert(`You need ${pointsRequired - pointsAvailable} more points to redeem this reward.`);
          }
      });
  });
});


///recycling

document.addEventListener('DOMContentLoaded', function() {
    // Initialize map
    const map = L.map('recycling-map').setView([18.5204, 73.8567], 11);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    
    // Add recycling centers
    const centers = [
        {
            name: "Green Recycling",
            coords: [18.5312, 73.8446],
            types: ["E-waste", "Batteries"],
            hours: "Open until 7PM"
        },
        {
            name: "EcoDrop Station",
            coords: [18.5074, 73.8077],
            types: ["Furniture", "Paint"],
            hours: "Closed (Opens 9AM)"
        }
    ];
    
    centers.forEach(center => {
        const marker = L.marker(center.coords).addTo(map);
        marker.bindPopup(`
            <b>${center.name}</b><br>
            ${center.types.join(", ")}<br>
            ${center.hours}
        `);
    });
    
    // Tab switching
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });
});