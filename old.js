const apiUrl = '/api/labours?status=old';

const labourTableBody = document.querySelector('#labour-table tbody');

async function fetchOldLabours() {
  try {
    const response = await fetch(apiUrl);
    const labours = await response.json();
    renderLabourTable(labours);
  } catch (error) {
    console.error('Failed to fetch old labours:', error);
  }
}

function renderLabourTable(labours) {
  labourTableBody.innerHTML = '';
  labours.forEach(labour => {
    const tr = document.createElement('tr');

    const workDateFormatted = labour.workDate ? new Date(labour.workDate).toLocaleDateString() : '';

    tr.innerHTML = `
      <td>${labour.name}</td>
      <td>${labour.age || ''}</td>
      <td>${labour.gender || ''}</td>
      <td>${labour.contact || ''}</td>
      <td>${labour.workType || ''}</td>
      <td>${labour.wage || ''}</td>
      <td>${workDateFormatted}</td>
      <td>${labour.crop || ''}</td>
    `;

    labourTableBody.appendChild(tr);
  });
}

fetchOldLabours();
