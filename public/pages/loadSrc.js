function loadSrc() {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/pages/style.css';
    document.head.appendChild(link);

    var script = document.createElement('script');
    script.src = '/pages/sidebar.js';
    document.head.appendChild(script);

    var script = document.createElement('script');
    script.src = '/pages/people.js';
    document.head.appendChild(script);
}

// Call the function to load src.html
loadSrc();
