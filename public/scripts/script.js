document.addEventListener('DOMContentLoaded', function () {
    let input = document.getElementById("searchInput");
    let list = document.getElementById("dropdownList");

    let timeoutId;

    input.addEventListener("input", async () => {
        clearTimeout(timeoutId);

        const searchTerm = input.value;

        if (!searchTerm) {
            list.style.display = "none";
        }

        timeoutId = setTimeout(async () => {
            const response = await fetch('http://localhost:3000/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `searchInput=${encodeURIComponent(searchTerm)}`
            });
            const data = await response.json();
            if (data.length !== 0) {
                let html = '';
                list.style.display = "inline-block";
                data.forEach(item => {
                    html += `<li class="dropdown-item"><a class="nav-link" href="/search/${item.title}">${item.title}</a></li>`;
                });
                list.innerHTML = html;
            } else {
                list.style.display = "none";
            }
        }, 500); // Ritardo di 500 ms
    });

    document.addEventListener("click", () => {
        list.style.display = "none";
    });
});