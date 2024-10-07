const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);

const searchInput = document.getElementById('search');
const itemList = document.getElementById('itemList');

function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
}

function filterItems() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredItems = items.filter(item => item.toLowerCase().includes(searchTerm));

    itemList.innerHTML = '';

    filteredItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        itemList.appendChild(li);
    });
}

const debouncedFilterItems = debounce(filterItems, 300);

searchInput.addEventListener('input', debouncedFilterItems);

filterItems();
