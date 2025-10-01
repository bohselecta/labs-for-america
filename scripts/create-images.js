// Generate placeholder images for labs
const fs = require('fs');
const path = require('path');

const images = [
  { name: 'wildfire-detection.jpg', title: 'AI Wildfire Detection', color: '#FF6B35' },
  { name: 'aviation-fuel.jpg', title: 'Aviation Fuels', color: '#4ECDC4' },
  { name: 'telehealth.jpg', title: 'Telehealth', color: '#45B7D1' },
  { name: 'flood-prediction.jpg', title: 'Flood Prediction', color: '#96CEB4' },
  { name: 'cybersecurity.jpg', title: 'Cybersecurity', color: '#FFEAA7' },
  { name: 'space-materials.jpg', title: 'Space Materials', color: '#DDA0DD' },
  { name: 'accessible-edtech.jpg', title: 'Accessible EdTech', color: '#98D8C8' },
  { name: 'lake-cleanup.jpg', title: 'Lake Cleanup', color: '#87CEEB' },
  { name: 'safer-crosswalks.jpg', title: 'Safer Crosswalks', color: '#F0E68C' },
  { name: 'smart-lighting.jpg', title: 'Smart Lighting', color: '#FFB6C1' },
  { name: 'cold-case.jpg', title: 'Cold Case', color: '#D3D3D3' },
  { name: 'missing-person.jpg', title: 'Missing Person', color: '#FFA07A' }
];

const imagesDir = path.join(__dirname, '..', 'public', 'images');

// Create SVG placeholder images
images.forEach(({ name, title, color }) => {
  const svg = `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="300" fill="${color}" opacity="0.8"/>
    <rect x="20" y="20" width="360" height="260" fill="white" opacity="0.9" rx="10"/>
    <text x="200" y="150" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#333">
      ${title}
    </text>
    <text x="200" y="180" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#666">
      Placeholder Image
    </text>
  </svg>`;
  
  const svgPath = path.join(imagesDir, name.replace('.jpg', '.svg'));
  fs.writeFileSync(svgPath, svg);
  console.log(`Created ${svgPath}`);
});

console.log('All placeholder images created!');
