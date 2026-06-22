// document
//     .getElementById("register")
//     .addEventListener("click", registerUser);

// document
//     .getElementById("login")
//     .addEventListener("click", login);

// document
//     .getElementById("dashboard")
//     .addEventListener("click", loadDashboard);

// document
//     .getElementById("add_subscription")
//     .addEventListener("click", addSubscription);

// async function registerUser() {

//     const username =
//         document.getElementById(
//             "register_username"
//         ).value;

//     const email =
//         document.getElementById(
//             "register_email"
//         ).value;

//     const password =
//         document.getElementById(
//             "register_password"
//         ).value;

//     const response =
//         await fetch(

//             "http://127.0.0.1:8000/api/v1/register/",

//             {
//                 method: "POST",

//                 headers: {
//                     "Content-Type":
//                         "application/json"
//                 },

//                 body: JSON.stringify({

//                     username,
//                     email,
//                     password

//                 })

//             }

//         );

//     await response.json();

//     document
//         .getElementById("result")
//         .innerHTML =
//         "Registration Successful";

// }

// async function login() {

//     const username =
//         document.getElementById(
//             "username"
//         ).value;

//     const password =
//         document.getElementById(
//             "password"
//         ).value;

//     const response =
//         await fetch(

//             "http://127.0.0.1:8000/api/v1/login/",

//             {
//                 method: "POST",

//                 headers: {
//                     "Content-Type":
//                         "application/json"
//                 },

//                 body: JSON.stringify({

//                     username,
//                     password

//                 })

//             }

//         );

//     const data =
//         await response.json();

//     chrome.storage.local.set({

//         access:
//             data.access

//     });

//     document
//         .getElementById("result")
//         .innerHTML =
//         "Login Successful";

// }

// async function addSubscription() {

//     const service_name =
//         document.getElementById(
//             "service_name"
//         ).value;

//     const amount =
//         document.getElementById(
//             "amount"
//         ).value;

//     const renewal_date =
//         document.getElementById(
//             "renewal_date"
//         ).value;

//     const billing_cycle =
//         document.getElementById(
//             "billing_cycle"
//         ).value;

//     const category =
//         document.getElementById(
//             "category"
//         ).value;

//     const is_trial =
//         document.getElementById(
//             "is_trial"
//         ).checked;

//     const trial_end_date =
//         document.getElementById(
//             "trial_end_date"
//         ).value;

//     chrome.storage.local.get(

//         ["access"],

//         async (result) => {

//             const response =
//                 await fetch(

//                     "http://127.0.0.1:8000/api/v1/subscriptions/",

//                     {
//                         method: "POST",

//                         headers: {

//                             "Content-Type":
//                                 "application/json",

//                             Authorization:
//                                 `Bearer ${result.access}`

//                         },

//                         body: JSON.stringify({

//                             service_name,
//                             amount,
//                             renewal_date,
//                             billing_cycle,
//                             category,
//                             is_trial,
//                             trial_end_date

//                         })

//                     }

//                 );

//             await response.json();

//             document
//                 .getElementById("result")
//                 .innerHTML =
//                 "Subscription Added";

//         }

//     );

// }

// async function loadDashboard() {

//     chrome.storage.local.get(

//         ["access"],

//         async (result) => {

//             const response =
//                 await fetch(

//                     "http://127.0.0.1:8000/api/v1/dashboard/",

//                     {
//                         headers: {

//                             Authorization:
//                                 `Bearer ${result.access}`

//                         }

//                     }

//                 );

//             const data =
//                 await response.json();

//             document
//                 .getElementById("monthly_spend")
//                 .innerText =
//                 data.monthly_spend;

//             document
//                 .getElementById("yearly_spend")
//                 .innerText =
//                 data.yearly_spend;

//             document
//                 .getElementById("total_subscriptions")
//                 .innerText =
//                 data.total_subscriptions;

//             document
//                 .getElementById("unused_subscriptions")
//                 .innerText =
//                 data.unused_subscriptions;

//             document
//                 .getElementById("monthly_savings")
//                 .innerText =
//                 data.monthly_savings;

//             document
//                 .getElementById("yearly_savings")
//                 .innerText =
//                 data.yearly_savings;

//             let renewalHtml =
//                 "<h4>Upcoming Renewals</h4>";

//             data.upcoming_renewals.forEach(

//                 item => {

//                     renewalHtml +=
//                         `<p>${item.service_name}
//                         (${item.days_left} days)</p>`;

//                 }

//             );

//             document
//                 .getElementById("renewals")
//                 .innerHTML =
//                 renewalHtml;

//             let trialHtml =
//                 "<h4>Expiring Trials</h4>";

//             data.expiring_trials.forEach(

//                 item => {

//                     trialHtml +=
//                         `<p>${item.service_name}
//                         (${item.days_left} days)</p>`;

//                 }

//             );

//             document
//                 .getElementById("trials")
//                 .innerHTML =
//                 trialHtml;

//         }

//     );

// }

/* ============================================================
   HELPERS
============================================================ */

// function formatCurrency(val) {
//   var num = parseFloat(val) || 0;
//   return '\u20B9' + num.toLocaleString('en-IN');
// }

// function showResult(id, message, type) {
//   var el = document.getElementById(id);
//   if (!el) return;
//   el.textContent = message;
//   el.className = 'result ' + (type || 'success');
//   setTimeout(function () {
//     el.className = 'result hidden';
//   }, 3000);
// }

// function showView(name) {
//   var views = document.querySelectorAll('.view');
//   for (var i = 0; i < views.length; i++) {
//     views[i].classList.remove('active');
//   }
//   var target = document.getElementById('view-' + name);
//   if (target) target.classList.add('active');
//   if (name === 'dashboard') loadDashboard();
// }

// function switchTab(tabName) {
//   var tabs = document.querySelectorAll('.tab');
//   for (var i = 0; i < tabs.length; i++) {
//     tabs[i].classList.remove('active');
//   }
//   var panels = document.querySelectorAll('.panel');
//   for (var i = 0; i < panels.length; i++) {
//     panels[i].classList.remove('active');
//   }
//   var activeTab = document.getElementById('tab-' + tabName);
//   if (activeTab) activeTab.classList.add('active');
//   var activePanel = document.getElementById('panel-' + tabName);
//   if (activePanel) activePanel.classList.add('active');
// }

// function logout() {
//   chrome.storage.local.remove(['access'], function () {
//     showView('auth');
//   });
// }

// /* ============================================================
//    DASHBOARD LOADER
// ============================================================ */

// function loadDashboard() {
//   chrome.storage.local.get(['access'], function (stored) {
//     if (!stored.access) {
//       showView('auth');
//       return;
//     }

//     fetch('http://127.0.0.1:8000/api/v1/dashboard/', {
//       method: 'GET',
//       headers: {
//         'Authorization': 'Bearer ' + stored.access
//       }
//     })
//     .then(function (res) {
//       if (res.status === 401) {
//         logout();
//         return null;
//       }
//       return res.json();
//     })
//     .then(function (data) {
//       if (!data) return;

//       document.getElementById('monthly_spend').textContent   = formatCurrency(data.monthly_spend);
//       document.getElementById('yearly_spend').textContent    = formatCurrency(data.yearly_spend);
//       document.getElementById('monthly_savings').textContent = formatCurrency(data.monthly_savings);
//       document.getElementById('yearly_savings').textContent  = formatCurrency(data.yearly_savings);
//       document.getElementById('total_subscriptions').textContent  = data.total_subscriptions  || 0;
//       document.getElementById('unused_subscriptions').textContent = data.unused_subscriptions || 0;

//       var renewalsList = document.getElementById('renewals-list');
//       if (data.upcoming_renewals && data.upcoming_renewals.length > 0) {
//         var rHtml = '';
//         for (var i = 0; i < data.upcoming_renewals.length; i++) {
//           var item = data.upcoming_renewals[i];
//           rHtml += '<div class="item">'
//             + '<span class="item-name">' + item.service_name + '</span>'
//             + '<span class="item-badge badge-amber">' + item.days_left + 'd left</span>'
//             + '</div>';
//         }
//         renewalsList.innerHTML = rHtml;
//       } else {
//         renewalsList.innerHTML = '<p class="empty">No renewals soon</p>';
//       }

//       var trialsList = document.getElementById('trials-list');
//       if (data.expiring_trials && data.expiring_trials.length > 0) {
//         var tHtml = '';
//         for (var i = 0; i < data.expiring_trials.length; i++) {
//           var item = data.expiring_trials[i];
//           tHtml += '<div class="item">'
//             + '<span class="item-name">' + item.service_name + '</span>'
//             + '<span class="item-badge badge-red">' + item.days_left + 'd left</span>'
//             + '</div>';
//         }
//         trialsList.innerHTML = tHtml;
//       } else {
//         trialsList.innerHTML = '<p class="empty">No expiring trials</p>';
//       }
//     })
//     .catch(function () {
//       showResult('dash-result', 'Failed to load dashboard', 'error');
//     });
//   });
// }

// /* ============================================================
//    ALL EVENT LISTENERS — inside DOMContentLoaded
// ============================================================ */

// document.addEventListener('DOMContentLoaded', function () {

//   /* Check if already logged in */
//   chrome.storage.local.get(['access'], function (stored) {
//     if (stored.access) {
//       showView('dashboard');
//     } else {
//       showView('auth');
//     }
//   });

//   /* ── Tab switching ── */
//   document.getElementById('tab-login').addEventListener('click', function () {
//     switchTab('login');
//   });

//   document.getElementById('tab-register').addEventListener('click', function () {
//     switchTab('register');
//   });

//   /* ── Register ── */
//   document.getElementById('btn-register').addEventListener('click', function () {
//     var username = document.getElementById('register_username').value.trim();
//     var email    = document.getElementById('register_email').value.trim();
//     var password = document.getElementById('register_password').value;

//     if (!username || !email || !password) {
//       showResult('auth-result', 'Please fill all fields', 'error');
//       return;
//     }

//     fetch('http://127.0.0.1:8000/api/v1/register/', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ username: username, email: email, password: password })
//     })
//     .then(function (res) {
//       return res.json().then(function (data) {
//         return { ok: res.ok, data: data };
//       });
//     })
//     .then(function (result) {
//       if (result.ok) {
//         showResult('auth-result', 'Account created! Please login.');
//         switchTab('login');
//       } else {
//         showResult('auth-result', result.data.detail || 'Registration failed', 'error');
//       }
//     })
//     .catch(function () {
//       showResult('auth-result', 'Server unreachable', 'error');
//     });
//   });

//   /* ── Login ── */
//   document.getElementById('btn-login').addEventListener('click', function () {
//     var username = document.getElementById('username').value.trim();
//     var password = document.getElementById('password').value;

//     if (!username || !password) {
//       showResult('auth-result', 'Please fill all fields', 'error');
//       return;
//     }

//     fetch('http://127.0.0.1:8000/api/v1/login/', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ username: username, password: password })
//     })
//     .then(function (res) {
//       return res.json().then(function (data) {
//         return { ok: res.ok, data: data };
//       });
//     })
//     .then(function (result) {
//       if (result.ok && result.data.access) {
//         chrome.storage.local.set({ access: result.data.access }, function () {
//           showView('dashboard');
//         });
//       } else {
//         showResult('auth-result', result.data.detail || 'Invalid credentials', 'error');
//       }
//     })
//     .catch(function () {
//       showResult('auth-result', 'Server unreachable', 'error');
//     });
//   });

//   /* ── Logout ── */
//   document.getElementById('btn-logout').addEventListener('click', function () {
//     logout();
//   });

//   /* ── Go to Add Subscription ── */
//   document.getElementById('btn-go-add').addEventListener('click', function () {
//     showView('add');
//   });

//   /* ── Back from Add ── */
//   document.getElementById('btn-back').addEventListener('click', function () {
//     showView('dashboard');
//   });

//   /* ── Trial toggle ── */
// document.getElementById('is_trial')
// .addEventListener('change', function () {

//     document.getElementById(
//         'trial-date-field'
//     ).style.display =
//         this.checked ? 'block' : 'none';

//     document.getElementById(
//         'billing-cycle-field'
//     ).style.display =
//         this.checked ? 'none' : 'block';

// }); 

//   /* ── Add Subscription ── */
//   document.getElementById('btn-add-subscription').addEventListener('click', function () {
//     chrome.storage.local.get(['access'], function (stored) {
//       if (!stored.access) {
//         showView('auth');
//         return;
//       }

//       var service_name   = document.getElementById('service_name').value.trim();
//       var amount         = document.getElementById('amount').value;
//       var renewal_date   = document.getElementById('renewal_date').value;
//       var billing_cycle  = document.getElementById('billing_cycle').value.trim();
//       if (
//     is_trial &&
//     !billing_cycle
// ) {
//     billing_cycle = "Trial";
// }
//       var category       = document.getElementById('category').value.trim();
//       var is_trial       = document.getElementById('is_trial').checked;
//       var trial_end_date = document.getElementById('trial_end_date').value;


// if (is_trial) {

//     if (
//         !service_name ||
//         !category ||
//         !trial_end_date
//     ) {
//         showResult(
//             'add-result',
//             'Fill all trial fields',
//             'error'
//         );
//         return;
//     }

// } else {

//     if (
//         !service_name ||
//         !amount ||
//         !renewal_date ||
//         !billing_cycle ||
//         !category
//     ) {
//         showResult(
//             'add-result',
//             'Fill all subscription fields',
//             'error'
//         );
//         return;
//     }

// }

//       fetch('http://127.0.0.1:8000/api/v1/subscriptions/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': 'Bearer ' + stored.access
//         },
// body: JSON.stringify({

//     service_name: service_name,

//     amount:
//         is_trial
//             ? null
//             : amount,

//     renewal_date:
//         is_trial
//             ? null
//             : renewal_date,

//     billing_cycle:
//         is_trial
//             ? null
//             : billing_cycle,

//     category: category,

//     is_trial: is_trial,

//     trial_end_date:
//         is_trial
//             ? trial_end_date
//             : null

// })
//       })
//       .then(function (res) {
//         return res.json().then(function (data) {
//           return { ok: res.ok, data: data };
//         });
//       })

// .then(function (result) {

//     if (result.ok) {

//         showResult(
//             'add-result',
//             'Subscription added successfully!'
//         );

//         document.getElementById(
//             'service_name'
//         ).value = '';

//         document.getElementById(
//             'amount'
//         ).value = '';

//         document.getElementById(
//             'renewal_date'
//         ).value = '';

//         document.getElementById(
//             'billing_cycle'
//         ).value = '';

//         document.getElementById(
//             'category'
//         ).value = '';

//         document.getElementById(
//             'trial_end_date'
//         ).value = '';

//         document.getElementById(
//             'is_trial'
//         ).checked = false;

//         document.getElementById(
//             'trial-date-field'
//         ).style.display = 'none';

//         document.getElementById(
//             'billing-cycle-field'
//         ).style.display = 'block';

//         document.getElementById(
//             'renewal-date-field'
//         ).style.display = 'block';

//     } else {

//         showResult(
//             'add-result',
//             JSON.stringify(result.data),
//             'error'
//         );

//     }

// })
//       .catch(function () {
//         showResult('add-result', 'Server unreachable', 'error');
//       });
//     });
//   });

// });



/* ============================================================
   STATE
============================================================ */

var allSubscriptions = [];
var deleteTargetId = null;

/* ============================================================
   HELPERS
============================================================ */

function formatCurrency(val) {
  var num = parseFloat(val) || 0;
  return '\u20B9' + num.toLocaleString('en-IN');
}

function showResult(id, message, type) {
  var el = document.getElementById(id);
  if (!el) return;
  el.textContent = message;
  el.className = 'result ' + (type || 'success');
  setTimeout(function () {
    el.className = 'result hidden';
  }, 3000);
}

function setLoading(btnId, loading) {
  var btn = document.getElementById(btnId);
  if (!btn) return;
  if (loading) {
    btn.textContent = 'Loading...';
    btn.classList.add('loading');
    btn.disabled = true;
  } else {
    btn.disabled = false;
    btn.classList.remove('loading');
  }
}

function getToken(cb) {
  chrome.storage.local.get(['access'], function (stored) {
    if (!stored.access) { showView('auth'); return; }
    cb(stored.access);
  });
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  var parts = dateStr.split('-');
  if (parts.length === 3) return parts[2] + '-' + parts[1] + '-' + parts[0];
  return dateStr;
}

function getDaysLeft(dateStr) {
  if (!dateStr) return null;
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var target = new Date(dateStr);
  var diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
  return diff;
}

/* ============================================================
   VIEW ROUTING
============================================================ */

function showView(name) {
  var views = document.querySelectorAll('.view');
  for (var i = 0; i < views.length; i++) {
    views[i].classList.remove('active');
  }
  var target = document.getElementById('view-' + name);
  if (target) target.classList.add('active');

  if (name === 'dashboard') loadDashboard();
  if (name === 'subs') loadSubscriptions();
}

function switchTab(tabName) {
  var tabs = document.querySelectorAll('.tab');
  for (var i = 0; i < tabs.length; i++) tabs[i].classList.remove('active');
  var panels = document.querySelectorAll('.panel');
  for (var i = 0; i < panels.length; i++) panels[i].classList.remove('active');
  var t = document.getElementById('tab-' + tabName);
  var p = document.getElementById('panel-' + tabName);
  if (t) t.classList.add('active');
  if (p) p.classList.add('active');
}

function logout() {
  chrome.storage.local.remove(['access'], function () {
    showView('auth');
  });
}

/* ============================================================
   DASHBOARD
============================================================ */

function loadDashboard() {
  getToken(function (token) {
    fetch('https://subscription-tracker-api-s7b3.onrender.com/api/v1/dashboard/', {
      headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(function (res) {
      if (res.status === 401) { logout(); return null; }
      return res.json();
    })
    .then(function (data) {
      if (!data) return;

      document.getElementById('monthly_spend').textContent   = formatCurrency(data.monthly_spend);
      document.getElementById('yearly_spend').textContent    = formatCurrency(data.yearly_spend);
      document.getElementById('monthly_savings').textContent = formatCurrency(data.monthly_savings);
      document.getElementById('yearly_savings').textContent  = formatCurrency(data.yearly_savings);
      document.getElementById('total_subscriptions').textContent  = data.total_subscriptions  || 0;
      document.getElementById('unused_subscriptions').textContent = data.unused_subscriptions || 0;
      document.getElementById('trial_subscriptions').textContent  = data.trial_subscriptions  || 0;
      document.getElementById('paid_subscriptions').textContent = data.paid_subscriptions || 0;

      var renewalsList = document.getElementById('renewals-list');
      if (data.upcoming_renewals && data.upcoming_renewals.length > 0) {
        var rHtml = '';
        for (var i = 0; i < data.upcoming_renewals.length; i++) {
          var item = data.upcoming_renewals[i];
          rHtml += '<div class="item">'
            + '<span class="item-name">' + item.service_name + '</span>'
            + '<span class="item-badge badge-amber">' + item.days_left + 'd left</span>'
            + '</div>';
        }
        renewalsList.innerHTML = rHtml;
      } else {
        renewalsList.innerHTML = '<p class="empty">No renewals soon</p>';
      }

      var trialsList = document.getElementById('trials-list');
      if (data.expiring_trials && data.expiring_trials.length > 0) {
        var tHtml = '';
        for (var i = 0; i < data.expiring_trials.length; i++) {
          var item = data.expiring_trials[i];
          tHtml += '<div class="item trial-item">'
            + '<span class="item-name">' + item.service_name + '</span>'
            + '<span class="item-badge badge-red">' + item.days_left + 'd left</span>'
            + '</div>';
        }
        trialsList.innerHTML = tHtml;
      } else {
        trialsList.innerHTML = '<p class="empty">No expiring trials</p>';
      }
    })
    .catch(function () {
      showResult('dash-result', 'Failed to load dashboard', 'error');
    });
  });
}

/* ============================================================
   SUBSCRIPTIONS LIST
============================================================ */

function loadSubscriptions() {
  var container = document.getElementById('subs-list');
  container.innerHTML = '<p class="empty">Loading...</p>';

  getToken(function (token) {
    fetch('https://subscription-tracker-api-s7b3.onrender.com/api/v1/subscriptions/', {
      headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(function (res) {
      if (res.status === 401) { logout(); return null; }
      return res.json();
    })
    .then(function (data) {
      if (!data) return;
      allSubscriptions = data;
      renderSubscriptions();
    })
    .catch(function () {
      container.innerHTML = '<p class="empty">Failed to load subscriptions.</p>';
    });
  });
}

function renderSubscriptions() {
  var search   = document.getElementById('search-input').value.trim().toLowerCase();
  var category = document.getElementById('filter-category').value;
  var sortBy   = document.getElementById('sort-by').value;
  var container = document.getElementById('subs-list');

  var filtered = allSubscriptions.filter(function (s) {
    var matchSearch = !search
      || s.service_name.toLowerCase().indexOf(search) !== -1
      || (s.category && s.category.toLowerCase().indexOf(search) !== -1);
    var matchCat = !category || s.category === category;
    return matchSearch && matchCat;
  });

  if (sortBy === 'renewal') {
    filtered.sort(function (a, b) {
      var da = a.renewal_date || a.trial_end_date || '9999-12-31';
      var db = b.renewal_date || b.trial_end_date || '9999-12-31';
      return da < db ? -1 : da > db ? 1 : 0;
    });
  } else if (sortBy === 'high') {
    filtered.sort(function (a, b) { return (parseFloat(b.amount) || 0) - (parseFloat(a.amount) || 0); });
  } else if (sortBy === 'low') {
    filtered.sort(function (a, b) { return (parseFloat(a.amount) || 0) - (parseFloat(b.amount) || 0); });
  } else if (sortBy === 'az') {
    filtered.sort(function (a, b) { return a.service_name.localeCompare(b.service_name); });
  } else if (sortBy === 'za') {
    filtered.sort(function (a, b) { return b.service_name.localeCompare(a.service_name); });
  }

  if (filtered.length === 0) {
    container.innerHTML = '<div class="empty-state">'
      + '<div class="empty-state-icon">&#128230;</div>'
      + '<div class="empty-state-title">No subscriptions found.</div>'
      + '<div class="empty-state-sub">Click "+" to add your first subscription.</div>'
      + '</div>';
    return;
  }

  var html = '';
  for (var i = 0; i < filtered.length; i++) {
    var s = filtered[i];
    html += buildSubCard(s);
  }
  container.innerHTML = html;

  var editBtns = container.querySelectorAll('.btn-edit');
  for (var i = 0; i < editBtns.length; i++) {
    editBtns[i].addEventListener('click', function () {
      openEdit(this.getAttribute('data-id'));
    });
  }

  var deleteBtns = container.querySelectorAll('.btn-delete');
  for (var i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener('click', function () {
      openDeleteModal(this.getAttribute('data-id'));
    });
  }
}

function buildSubCard(s) {
  var badges = '';
  if (s.is_trial) {
    badges += '<span class="item-badge badge-purple">TRIAL</span>';
    var dl = getDaysLeft(s.trial_end_date);
if (
    dl !== null &&
    dl >= 0 &&
    dl <= 7
) {
      badges += '<span class="item-badge badge-red">' + dl + ' DAYS LEFT</span>';
    }
  } else {
    badges += '<span class="item-badge badge-green">PAID</span>';
    var dl = getDaysLeft(s.renewal_date);
if (
    dl !== null &&
    dl >= 0 &&
    dl <= 7
) {
      badges += '<span class="item-badge badge-amber">' + dl + ' DAYS LEFT</span>';
    }
  }

  var metaLine = '';
  if (s.category) metaLine += '<span>' + s.category + '</span>';
  if (!s.is_trial && s.billing_cycle) metaLine += '<span>' + s.billing_cycle + '</span>';

  var dateLine = '';
  if (s.is_trial && s.trial_end_date) {
    dateLine = '<div style="font-size:12px;color:#6b7280;margin-top:4px;">Trial Ends: <strong>' + formatDate(s.trial_end_date) + '</strong></div>';
  } else if (!s.is_trial && s.renewal_date) {
    dateLine = '<div style="font-size:12px;color:#6b7280;margin-top:4px;">Renewal: <strong>' + formatDate(s.renewal_date) + '</strong></div>';
  }

  var amountLine = '';
  if (!s.is_trial && s.amount) {
    amountLine = '<div class="sub-amount">' + formatCurrency(s.amount) + '</div>';
  }

  return '<div class="sub-card">'
    + '<div class="sub-card-top">'
    + '<div class="sub-name">' + s.service_name + '</div>'
    + '<div class="sub-badges">' + badges + '</div>'
    + '</div>'
    + amountLine
    + '<div class="sub-card-meta">' + metaLine + '</div>'
    + dateLine
    + '<div class="sub-card-actions">'
    + '<button class="btn-edit" data-id="' + s.id + '">\u270F Edit</button>'
    + '<button class="btn-delete" data-id="' + s.id + '">\uD83D\uDDD1 Delete</button>'
    + '</div>'
    + '</div>';
}

/* ============================================================
   ADD SUBSCRIPTION
============================================================ */

function resetAddForm() {
  document.getElementById('service_name').value  = '';
  document.getElementById('amount').value        = '';
  document.getElementById('billing_cycle').value = '';
  document.getElementById('renewal_date').value  = '';
  document.getElementById('category').value      = '';
  document.getElementById('trial_end_date').value = '';
  document.getElementById('is_trial').checked    = false;
  document.getElementById('paid-fields').style.display  = 'block';
  document.getElementById('trial-fields').style.display = 'none';
  document.getElementById('btn-add-subscription').textContent = 'Add Subscription';
}

/* ============================================================
   EDIT SUBSCRIPTION
============================================================ */

function openEdit(id) {
  var sub = null;
  for (var i = 0; i < allSubscriptions.length; i++) {
    if (String(allSubscriptions[i].id) === String(id)) { sub = allSubscriptions[i]; break; }
  }
  if (!sub) return;

  document.getElementById('edit_id').value             = sub.id;
  document.getElementById('edit_service_name').value   = sub.service_name || '';
  document.getElementById('edit_amount').value         = sub.amount || '';
  document.getElementById('edit_billing_cycle').value  = sub.billing_cycle || '';
  document.getElementById('edit_renewal_date').value   = sub.renewal_date || '';
  document.getElementById('edit_trial_end_date').value = sub.trial_end_date || '';
  document.getElementById('edit_is_trial').checked     = sub.is_trial || false;

  var catSel = document.getElementById('edit_category');
  catSel.value = sub.category || '';

  document.getElementById('edit-paid-fields').style.display  = sub.is_trial ? 'none' : 'block';
  document.getElementById('edit-trial-fields').style.display = sub.is_trial ? 'block' : 'none';

  showView('edit');
}

/* ============================================================
   DELETE MODAL
============================================================ */

function openDeleteModal(id) {
  deleteTargetId = id;
  document.getElementById('modal-overlay').classList.remove('hidden');
}

function closeDeleteModal() {
  deleteTargetId = null;
  document.getElementById('modal-overlay').classList.add('hidden');
}

function confirmDelete() {
  if (!deleteTargetId) return;
  var id = deleteTargetId;
  closeDeleteModal();

  getToken(function (token) {
    fetch('https://subscription-tracker-api-s7b3.onrender.com/api/v1/subscriptions/' + id + '/', {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(function (res) {
      if (res.status === 204 || res.ok) {
        allSubscriptions = allSubscriptions.filter(function (s) {
          return String(s.id) !== String(id);
        });
        renderSubscriptions();
        showResult('subs-result', 'Subscription deleted successfully.');
        loadDashboard();
      } else {
        showResult('subs-result', 'Failed to delete subscription.', 'error');
      }
    })
    .catch(function () {
      showResult('subs-result', 'Server unreachable.', 'error');
    });
  });
}

/* ============================================================
   MAIN — DOMContentLoaded
============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* Auto-login check */
  chrome.storage.local.get(['access'], function (stored) {
    if (stored.access) { showView('dashboard'); }
    else { showView('auth'); }
  });

  /* ── Auth tabs ── */
  document.getElementById('tab-login').addEventListener('click', function () { switchTab('login'); });
  document.getElementById('tab-register').addEventListener('click', function () { switchTab('register'); });

  /* ── Register ── */
  document.getElementById('btn-register').addEventListener('click', function () {
    var username = document.getElementById('register_username').value.trim();
    var email    = document.getElementById('register_email').value.trim();
    var password = document.getElementById('register_password').value;

    if (!username || !email || !password) {
      showResult('auth-result', 'Please fill all fields.', 'error'); return;
    }

    setLoading('btn-register', true);
    fetch('https://subscription-tracker-api-s7b3.onrender.com/api/v1/register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, email: email, password: password })
    })
    .then(function (res) { return res.json().then(function (d) { return { ok: res.ok, data: d }; }); })
    .then(function (r) {
      setLoading('btn-register', false);
      document.getElementById('btn-register').textContent = 'Create Account';
if (r.ok) {

    showResult(
        'auth-result',
        'Account created successfully! Please login.'
    );

    document.getElementById(
        'register_username'
    ).value = '';

    document.getElementById(
        'register_email'
    ).value = '';

    document.getElementById(
        'register_password'
    ).value = '';

    switchTab('login');

} else {

    showResult(
        'auth-result',
        r.data.detail || 'Registration failed.',
        'error'
    );

}
    })
    .catch(function () {
      setLoading('btn-register', false);
      document.getElementById('btn-register').textContent = 'Create Account';
      showResult('auth-result', 'Server unreachable.', 'error');
    });
  });

  /* ── Login ── */
  document.getElementById('btn-login').addEventListener('click', function () {
    var username = document.getElementById('username').value.trim();
    var password = document.getElementById('password').value;

    if (!username || !password) {
      showResult('auth-result', 'Please fill all fields.', 'error'); return;
    }

    setLoading('btn-login', true);
    fetch('https://subscription-tracker-api-s7b3.onrender.com/api/v1/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password })
    })
    .then(function (res) { return res.json().then(function (d) { return { ok: res.ok, data: d }; }); })
    .then(function (r) {
      setLoading('btn-login', false);
      document.getElementById('btn-login').textContent = 'Login';
      if (r.ok && r.data.access) {
chrome.storage.local.set(
    {
        access: r.data.access,
        refresh: r.data.refresh
    },
    function () {
        showView('dashboard');
    }
);
      } else {
        showResult('auth-result', r.data.detail || 'Invalid credentials.', 'error');
      }
    })
    .catch(function () {
      setLoading('btn-login', false);
      document.getElementById('btn-login').textContent = 'Login';
      showResult('auth-result', 'Server unreachable.', 'error');
    });
  });

  /* ── Logout ── */
  document.getElementById('btn-logout').addEventListener('click', logout);

  /* ── Nav ── */
  document.getElementById('btn-go-subs').addEventListener('click', function () { showView('subs'); });
  document.getElementById('btn-go-add').addEventListener('click', function () { resetAddForm(); showView('add'); });
  document.getElementById('btn-back-subs').addEventListener('click', function () { showView('dashboard'); });
  document.getElementById('btn-back-add').addEventListener('click', function () { showView('dashboard'); });
  document.getElementById('btn-back-edit').addEventListener('click', function () { showView('subs'); });
  document.getElementById('btn-go-add-from-subs').addEventListener('click', function () { resetAddForm(); showView('add'); });

  /* ── Search / Filter / Sort ── */
  document.getElementById('search-input').addEventListener('input', renderSubscriptions);
  document.getElementById('filter-category').addEventListener('change', renderSubscriptions);
  document.getElementById('sort-by').addEventListener('change', renderSubscriptions);

  /* ── Add: trial toggle ── */
  document.getElementById('is_trial').addEventListener('change', function () {
    document.getElementById('paid-fields').style.display  = this.checked ? 'none' : 'block';
    document.getElementById('trial-fields').style.display = this.checked ? 'block' : 'none';
  });

  /* ── Add Subscription ── */
  document.getElementById('btn-add-subscription').addEventListener('click', function () {
    var service_name   = document.getElementById('service_name').value.trim();
    var is_trial       = document.getElementById('is_trial').checked;
    var amount         = document.getElementById('amount').value;
    var billing_cycle  = document.getElementById('billing_cycle').value.trim();
    var renewal_date   = document.getElementById('renewal_date').value;
    var category       = document.getElementById('category').value;
    var trial_end_date = document.getElementById('trial_end_date').value;

    if (!service_name) { showResult('add-result', 'Service name is required.', 'error'); return; }
    if (!category)     { showResult('add-result', 'Please select a category.', 'error'); return; }

    if (is_trial) {
      if (!trial_end_date) { showResult('add-result', 'Please enter trial end date.', 'error'); return; }
    } else {
      if (!amount)        { showResult('add-result', 'Please enter amount.', 'error'); return; }
      if (!billing_cycle) { showResult('add-result', 'Please enter billing cycle.', 'error'); return; }
      if (!renewal_date)  { showResult('add-result', 'Please enter renewal date.', 'error'); return; }
    }

    if (
    !is_trial &&
    new Date(renewal_date) < new Date().setHours(0,0,0,0)
) {

    showResult(
        'add-result',
        'Renewal date cannot be in the past.',
        'error'
    );

    return;
}


if (
    is_trial &&
    new Date(trial_end_date) < new Date().setHours(0,0,0,0)
) {

    showResult(
        'add-result',
        'Trial end date cannot be in the past.',
        'error'
    );

    return;
}

    var payload = {
      service_name:   service_name,
      category:       category,
      is_trial:       is_trial,
      amount:         is_trial ? null : parseFloat(amount),
      billing_cycle:  is_trial ? null : billing_cycle,
      renewal_date:   is_trial ? null : renewal_date,
      trial_end_date: is_trial ? trial_end_date : null
    };

    setLoading('btn-add-subscription', true);

    getToken(function (token) {
      fetch('https://subscription-tracker-api-s7b3.onrender.com/api/v1/subscriptions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(payload)
      })
      .then(function (res) { return res.json().then(function (d) { return { ok: res.ok, data: d }; }); })
      .then(function (r) {
        setLoading('btn-add-subscription', false);
        document.getElementById('btn-add-subscription').textContent = 'Add Subscription';
        if (r.ok) {
          showResult('add-result', 'Subscription added successfully!');
          resetAddForm();
          loadDashboard();
        } else {
          showResult('add-result', JSON.stringify(r.data), 'error');
        }
      })
      .catch(function () {
        setLoading('btn-add-subscription', false);
        document.getElementById('btn-add-subscription').textContent = 'Add Subscription';
        showResult('add-result', 'Server unreachable.', 'error');
      });
    });
  });

  /* ── Edit: trial toggle ── */
  document.getElementById('edit_is_trial').addEventListener('change', function () {
    document.getElementById('edit-paid-fields').style.display  = this.checked ? 'none' : 'block';
    document.getElementById('edit-trial-fields').style.display = this.checked ? 'block' : 'none';
  });

  /* ── Save Edit ── */
  document.getElementById('btn-save-edit').addEventListener('click', function () {
    var id             = document.getElementById('edit_id').value;
    var service_name   = document.getElementById('edit_service_name').value.trim();
    var is_trial       = document.getElementById('edit_is_trial').checked;
    var amount         = document.getElementById('edit_amount').value;
    var billing_cycle  = document.getElementById('edit_billing_cycle').value.trim();
    var renewal_date   = document.getElementById('edit_renewal_date').value;
    var category       = document.getElementById('edit_category').value;
    var trial_end_date = document.getElementById('edit_trial_end_date').value;

    if (!service_name) { showResult('edit-result', 'Service name is required.', 'error'); return; }
    if (!category)     { showResult('edit-result', 'Please select a category.', 'error'); return; }

    if (is_trial) {
      if (!trial_end_date) { showResult('edit-result', 'Please enter trial end date.', 'error'); return; }
    } else {
      if (!amount)       { showResult('edit-result', 'Please enter amount.', 'error'); return; }
      if (!renewal_date) { showResult('edit-result', 'Please enter renewal date.', 'error'); return; }
    }

    var payload = {
      service_name:   service_name,
      category:       category,
      is_trial:       is_trial,
      amount:         is_trial ? null : parseFloat(amount),
      billing_cycle:  is_trial ? null : billing_cycle,
      renewal_date:   is_trial ? null : renewal_date,
      trial_end_date: is_trial ? trial_end_date : null
    };

    setLoading('btn-save-edit', true);

    getToken(function (token) {
      fetch('https://subscription-tracker-api-s7b3.onrender.com/api/v1/subscriptions/' + id + '/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(payload)
      })
      .then(function (res) { return res.json().then(function (d) { return { ok: res.ok, data: d }; }); })
      .then(function (r) {
        setLoading('btn-save-edit', false);
        document.getElementById('btn-save-edit').textContent = 'Save Changes';
        if (r.ok) {
          showResult('edit-result', 'Subscription updated successfully!');
          for (var i = 0; i < allSubscriptions.length; i++) {
            if (String(allSubscriptions[i].id) === String(id)) {
              allSubscriptions[i] = r.data; break;
            }
          }
          setTimeout(function () { showView('subs'); }, 1200);
          loadDashboard();
        } else {
          showResult('edit-result', JSON.stringify(r.data), 'error');
        }
      })
      .catch(function () {
        setLoading('btn-save-edit', false);
        document.getElementById('btn-save-edit').textContent = 'Save Changes';
        showResult('edit-result', 'Server unreachable.', 'error');
      });
    });
  });

  /* ── Delete Modal ── */
  document.getElementById('btn-cancel-delete').addEventListener('click', closeDeleteModal);
  document.getElementById('btn-confirm-delete').addEventListener('click', confirmDelete);
  document.getElementById('modal-overlay').addEventListener('click', function (e) {
    if (e.target === this) closeDeleteModal();
  });

});

