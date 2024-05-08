function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('toggle-btn');
  const content = document.getElementById('content');

  sidebar.classList.toggle('collapsed');
  toggleBtn.classList.toggle('collapsed');
  content.classList.toggle('collapsed');
}

function loadSidebar() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/pages/sidebar.html', true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      document.getElementById('sidebar').innerHTML = xhr.responseText;
    }
  };
  xhr.send();
}
