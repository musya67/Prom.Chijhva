// --- ОНОВЛЕНИЙ РЕНДЕР ТОВАРІВ З КАРТИНКАМИ ---
function renderProducts() {
  const container = document.getElementById('products-grid');
  const countBadge = document.getElementById('total-count');
  if (!container) return;

  // Фільтрація за категорією та пошуковим запитом
  const filtered = products.filter(p => {
    const matchCategory = currentCategory === 'Всі' || p.category === currentCategory;
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  if (countBadge) countBadge.innerText = filtered.length;

  // Порційна вибірка
  const displayProducts = filtered.slice(0, visibleCount);

  container.innerHTML = displayProducts.map(p => {
    if (p.isSteam) {
      return `
        <div class="product-card steam-mega-lot">
          <div>
            <span class="product-status" style="color: var(--steam-blue); background: rgba(102, 192, 244, 0.1);">★ Всі права та сервери</span>
            <div class="product-title" style="height: auto; font-size: 1.1rem; margin-top: 4px;">${p.title}</div>
            <div class="product-meta">Артикул: ${p.sku}</div>
          </div>
          <div class="product-bottom" style="margin-top: 16px;">
            <div class="price">${p.price.toLocaleString('uk-UA')} ₴</div>
            <button class="buy-btn" onclick="addToCart(${p.id})">Придбати Steam</button>
          </div>
        </div>
      `;
    }

    // Підбираємо картинку залежно від назви або категорії (наприклад, для ОЗУ чи відеокарт)
    let imageUrl = 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=400&q=80'; // дефолтна (ПК комплектуючі)
    
    const lowerTitle = p.title.toLowerCase();
    if (lowerTitle.includes('оперативн') || lowerTitle.includes('пам\'ять') || lowerTitle.includes('ddr')) {
      imageUrl = 'https://images.unsplash.com/photo-1562976540-1e02c61414bc?auto=format&fit=crop&w=400&q=80'; // Фото ОЗУ / планки пам'яті
    } else if (lowerTitle.includes('монітор')) {
      imageUrl = 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&q=80';
    } else if (lowerTitle.includes('клавіатур') || lowerTitle.includes('миша')) {
      imageUrl = 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=80';
    } else if (p.category === 'Автотовари') {
      imageUrl = 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=400&q=80';
    } else if (p.category === 'Велотовари') {
      imageUrl = 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=400&q=80';
    } else if (p.category === 'Товари для дому') {
      imageUrl = 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=400&q=80';
    }

    return `
      <div class="product-card">
        <div>
          <div class="product-img-wrap">
            <img src="${imageUrl}" alt="${p.title}" loading="lazy">
          </div>
          <span class="product-status">В наявності</span>
          <div class="product-title">${p.title}</div>
          <div class="product-meta">Код: ${p.sku} | ${p.category}</div>
        </div>
        <div class="product-bottom">
          <div class="price">${p.price.toLocaleString('uk-UA')} ₴</div>
          <button class="buy-btn" onclick="addToCart(${p.id})">Купити</button>
        </div>
      </div>
    `;
  }).join('');

  // Кнопка "Завантажити ще"
  const loadMoreBtn = document.getElementById('load-more-btn');
  if (loadMoreBtn) {
    loadMoreBtn.style.display = visibleCount < filtered.length ? 'block' : 'none';
  }
}
