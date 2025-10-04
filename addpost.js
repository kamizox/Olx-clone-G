// addpost.js (COMPLETE AND CORRECTED FILE CONTENT)
// addpost.js file ke bilkul start mein add karein
let uploadedImageURL = 'https://via.placeholder.com/300x200?text=New+Post'; // Default placeholder

// Function to handle the form submission when the "Post Ad" button is clicked
// Updated handlePostAd function for addpost.js

function handlePostAd(event) {
    event.preventDefault(); // Stop the default button action

    // 1. COLLECT DATA FROM FORM FIELDS
    const brand = document.getElementById('brand').value.trim();
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const location = document.getElementById('location').value.trim();
    const price = document.getElementById('price').value.trim();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const showPhone = document.querySelector('.toggle-box input[type="checkbox"]').checked;

    // Basic Validation: Ensure required fields are not empty
    if (!brand || !title || !description || !location || !price || !name || !phone) {
        alert("Please fill in all required fields marked with (*).");
        return;
    }

    // Get the currently logged-in user (for attribution)
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const userId = loggedInUser ? loggedInUser.email : 'guest'; // Use email as a simple user ID

    // Generate a unique ID for the new post
    const newAdId = Date.now(); 

    // 2. CONSTRUCT THE NEW PRODUCT OBJECT
    const newAd = {
        id: newAdId,
        title: title,
        description: description,
        price: parseFloat(price),
        brand: brand,
        location: location,
        
        // --- CRITICAL FIX: THUMBNAIL LINE UPDATED ---
        // Ab yeh 'uploadedImageURL' global variable se image data lega, 
        // jo user ne file select karne par save hua tha.
        thumbnail: uploadedImageURL, 
        
        // ---------------------------------------------
        sellerName: name,
        sellerPhone: phone,
        showPhone: showPhone,
        postedBy: userId,
        isCustomPost: true,
        datePosted: new Date().toISOString()
    };

    // 3. SAVE TO LOCAL STORAGE
    let customPosts = JSON.parse(localStorage.getItem("customPosts")) || [];
    customPosts.unshift(newAd); 
    localStorage.setItem("customPosts", JSON.stringify(customPosts));

    // 4. CONFIRMATION AND REDIRECTION
    alert(`Success! Your ad for "${title}" has been posted.`);
    window.location.href = "index.html";
}

// ===============================================
// DOMContentLoaded: COMBINED INITIALIZATION LOGIC - Updated Section
// ===============================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. ATTACH FORM SUBMISSION HANDLERS
    // ... (Your existing code here is fine) ...
    const postBtn1 = document.querySelector('.submit-btn');
    const postBtn2 = document.querySelector('.post-btn');
    if (postBtn1) postBtn1.addEventListener('click', handlePostAd);
    if (postBtn2) postBtn2.addEventListener('click', handlePostAd);

    // 2. ATTACH IMAGE UPLOAD AND PREVIEW HANDLERS
    const uploadBtn = document.querySelector('.upload-btn');
    const fileInput = document.getElementById('image-upload-input');
    const placeholders = document.querySelectorAll('.img-placeholder'); 

    if (uploadBtn && fileInput) {
        // Step A: Trigger the file input click.
        uploadBtn.addEventListener('click', (e) => {
            e.preventDefault(); 
            fileInput.click();
        });

        // Step B: Handle file selection, display preview, AND SAVE THE IMAGE URL
        fileInput.addEventListener('change', (event) => {
            const files = event.target.files;
            
            // Check if at least one file is selected to set the thumbnail
            if (files.length > 0) {
                const coverFile = files[0];
                const reader = new FileReader();

                reader.onload = (e) => {
                    // **CRITICAL: Save the URL of the first image for the thumbnail**
                    uploadedImageURL = e.target.result; 
                };
                reader.readAsDataURL(coverFile);
            }
            
            // Files ko placeholders mein dikhaane ke liye loop chalayein
            for (let i = 0; i < files.length && i < placeholders.length; i++) {
                // ... (Your existing preview logic here is fine) ...
                const file = files[i];
                const reader = new FileReader();
                const placeholder = placeholders[i];

                reader.onload = (e) => {
                    placeholder.style.backgroundImage = `url(${e.target.result})`;
                    placeholder.style.backgroundSize = 'cover';
                    placeholder.style.backgroundPosition = 'center';
                    placeholder.style.border = 'none';
                };
                reader.readAsDataURL(file);
            }

            // Optional: Alert for too many files
            if (files.length > placeholders.length) {
                alert(`You can only upload ${placeholders.length} images.`);
            }
        });
    }
});