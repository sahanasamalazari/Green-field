const apiUrl = '/api/labours';

const labourForm = document.getElementById('labour-form');
const labourIdInput = document.getElementById('labour-id');
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const genderInput = document.getElementById('gender');
const contactInput = document.getElementById('contact');
const workTypeInput = document.getElementById('workType');
const wageInput = document.getElementById('wage');
const workDateInput = document.getElementById('workDate');
const cropInput = document.getElementById('crop');
const seasonInput = document.getElementById('season');
const balanceInput = document.getElementById('balance');
const statusInput = document.getElementById('status');
const cancelBtn = document.getElementById('cancel-btn');
const labourTableBody = document.querySelector('#labour-table tbody');
const hamburger = document.getElementById('hamburger');

let labours = [];

async function fetchLabours() {
  const response = await fetch(apiUrl);
  labours = await response.json();
  renderLabourTable();
}

function renderLabourTable() {
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
      <td>${labour.season || ''}</td>
      <td>${labour.balance != null ? labour.balance.toFixed(2) : ''}</td>
      <td>${labour.status || ''}</td>
      <td class="actions">
        <button onclick="editLabour('${labour._id}')">Edit</button>
        <button class="delete" onclick="deleteLabour('${labour._id}')">Delete</button>
      </td>
    `;

    labourTableBody.appendChild(tr);
  });
}

function clearForm() {
  labourIdInput.value = '';
  nameInput.value = '';
  ageInput.value = '';
  genderInput.value = '';
  contactInput.value = '';
  workTypeInput.value = '';
  wageInput.value = '';
  workDateInput.value = '';
  cropInput.value = '';
  seasonInput.value = '';
  balanceInput.value = '';
  statusInput.value = 'current';
  cancelBtn.style.display = 'none';
}

function fillForm(labour) {
  labourIdInput.value = labour._id;
  nameInput.value = labour.name;
  ageInput.value = labour.age || '';
  genderInput.value = labour.gender || '';
  contactInput.value = labour.contact || '';
  workTypeInput.value = labour.workType || '';
  wageInput.value = labour.wage || '';
  workDateInput.value = labour.workDate ? new Date(labour.workDate).toISOString().substr(0,10) : '';
  cropInput.value = labour.crop || '';
  seasonInput.value = labour.season || '';
  balanceInput.value = labour.balance != null ? labour.balance.toFixed(2) : '';
  statusInput.value = labour.status || 'current';
  cancelBtn.style.display = 'inline-block';
}

labourForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const labourData = {
    name: nameInput.value,
    age: ageInput.value ? parseInt(ageInput.value) : null,
    gender: genderInput.value,
    contact: contactInput.value,
    workType: workTypeInput.value,
    wage: wageInput.value ? parseFloat(wageInput.value) : null,
    workDate: workDateInput.value,
    crop: cropInput.value,
    season: seasonInput.value,
    balance: balanceInput.value ? parseFloat(balanceInput.value) : null,
    status: statusInput.value,
  };

  const labourId = labourIdInput.value;

  if (labourId) {
    // Update existing labour
    const response = await fetch(`${apiUrl}/${labourId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(labourData),
    });
    if (response.ok) {
      await fetchLabours();
      clearForm();
    } else {
      alert('Failed to update labour');
    }
  } else {
    // Create new labour
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(labourData),
    });
    if (response.ok) {
      await fetchLabours();
      clearForm();
    } else if (response.status === 409) {
      const data = await response.json();
      alert(data.message || 'Labour details already present in this section');
    } else {
      alert('Failed to add labour');
    }
  }
});

cancelBtn.addEventListener('click', () => {
  clearForm();
});

window.editLabour = function(id) {
  const labour = labours.find(l => l._id === id);
  if (labour) {
    fillForm(labour);
  }
};

window.deleteLabour = async function(id) {
  if (confirm('Are you sure you want to delete this labour?')) {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      await fetchLabours();
    } else {
      alert('Failed to delete labour');
    }
  }
};

const calculatorButton = document.getElementById('calc-btn');

function openCalculator() {
  // Full featured calculator popup
  const calculatorWindow = window.open('', 'Calculator', 'width=350,height=450');
  calculatorWindow.document.write(`
    <html>
    <head>
      <title>Calculator</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 10px; }
        #calc-container { width: 320px; }
        #calc-display { width: 100%; height: 50px; font-size: 1.8em; text-align: right; margin-bottom: 10px; padding: 5px; }
        .calc-row { display: flex; }
        button {
          flex: 1;
          height: 60px;
          font-size: 1.4em;
          margin: 3px;
          cursor: pointer;
          border-radius: 5px;
          border: 1px solid #ccc;
          background-color: #f9f9f9;
          transition: background-color 0.3s;
        }
        button:hover {
          background-color: #e6e6e6;
        }
        button.operator { background-color: #f0ad4e; color: white; }
        button.equals { background-color: #5cb85c; color: white; flex: 2; }
        button.clear { background-color: #d9534f; color: white; }
      </style>
    </head>
    <body>
      <div id="calc-container">
        <input type="text" id="calc-display" readonly />
        <div class="calc-row">
          <button class="clear" onclick="clearDisplay()">C</button>
          <button onclick="appendValue('(')">(</button>
          <button onclick="appendValue(')')">)</button>
          <button class="operator" onclick="appendValue('/')">÷</button>
        </div>
        <div class="calc-row">
          <button onclick="appendValue('7')">7</button>
          <button onclick="appendValue('8')">8</button>
          <button onclick="appendValue('9')">9</button>
          <button class="operator" onclick="appendValue('*')">×</button>
        </div>
        <div class="calc-row">
          <button onclick="appendValue('4')">4</button>
          <button onclick="appendValue('5')">5</button>
          <button onclick="appendValue('6')">6</button>
          <button class="operator" onclick="appendValue('-')">−</button>
        </div>
        <div class="calc-row">
          <button onclick="appendValue('1')">1</button>
          <button onclick="appendValue('2')">2</button>
          <button onclick="appendValue('3')">3</button>
          <button class="operator" onclick="appendValue('+')">+</button>
        </div>
        <div class="calc-row">
          <button onclick="appendValue('0')">0</button>
          <button onclick="appendValue('.')">.</button>
          <button class="equals" onclick="calculateResult()">=</button>
        </div>
        <button onclick="sendResult()">Send Result</button>
      </div>
      <script>
        const display = document.getElementById('calc-display');
        function appendValue(val) {
          display.value += val;
        }
        function clearDisplay() {
          display.value = '';
        }
        function calculateResult() {
          try {
            display.value = eval(display.value) || '';
          } catch {
            display.value = 'Error';
          }
        }
        function sendResult() {
          if (window.opener) {
            const val = display.value;
            if (!isNaN(val) && val !== '') {
              window.opener.document.getElementById('balance').value = val;
              window.close();
            } else {
              alert('Please enter a valid number before sending.');
            }
          }
        }
      </script>
    </body>
    </html>
  `);
}

calculatorButton.addEventListener('click', openCalculator);

// Initial fetch of labours
fetchLabours();

