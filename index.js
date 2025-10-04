

// --- NEW CODE TO PASTE in script.js OR index.js ---

function getProducts() {
    // 1. Fetch Custom Posts from Local Storage
    const customPosts = JSON.parse(localStorage.getItem("customPosts")) || [];
    
    // 2. Fetch Dummy Products from the API
    fetch("https://dummyjson.com/products")
        .then((response) => response.json())
        .then((result) => {
            // Get products from the API result
            const apiProducts = result.products || [];
            
            // 3. Combine custom posts (first) and API products (second)
            const allProducts = [...customPosts, ...apiProducts];

            // 4. Display all products
            showProduct({ products: allProducts });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            
            // If the API fetch fails, still show any custom posts
            showProduct({ products: customPosts });
        }); 
}

// ----------------------------------------------------

function showProduct(result) {
    const { products } = result
    
    let cardElementContainer = document.getElementById('product-listing-container'); 
    
    if (!cardElementContainer) return; 
    
    cardElementContainer.innerHTML = ''; 

    products.forEach((element) => { 
        // Ensure element.brand is available, if not, set a default
        const brand = element.brand || 'No Brand'; 
        
        const { thumbnail, price, title, description, id } = element;
        cardElementContainer.innerHTML += `
        <a href='./product.html?id=${id}' target="_blank" style="text-decoration: none; color: inherit;">
            <div id="product-card">
                <div id="product-front">
                    <div class="shadow"></div>
                    
                    <img src=${thumbnail} 
                         alt="${title}"
                         style="width: 100%; height: 150px; object-fit: cover; display: block;" 
                    /> 
                    
                    <div class="image_overlay"></div>
                    <div id="view_details">View details</div>
                    <div class="stats">
                        <div class="stats-container">
                            <span class="product_price">$${price}</span>
                            <span class="product_name">${title}</span>
                            <p>${description.substring(0, 50)}...</p>

                            <div class="product-options">
                                <strong>Brand:</strong>
                                <span>${brand}</span> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </a>
        `;
    });
}

// Call the product fetching function when the page loads
getProducts();