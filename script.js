
// Sapmle Comments PostId, name, Comment, date //
const commentsData = {
    post1: [
      { 
        name: 'Rahul Sharma', 
        comment: 'Great article! I especially liked WebAssembly.', 
        date: 'April 2, 2025' 
      }
    ],
    post2: [],
    post3: []
  };

  const loginBtn = document.querySelector('.login-btn');
  const loginBox = document.querySelector('.login-box');  
  const CancleBtn = document.querySelector(".cancle-btn")

    // Function to show login box
    function showLogin() {
      loginBox.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
  }
  
  // Function to hide login box
  function hideLogin() {
      loginBox.classList.remove('active');
      document.body.style.overflow = ''; // Re-enable scrolling
  }
  
  // Event listeners
  loginBtn.addEventListener('click', showLogin);
  CancleBtn.addEventListener('click', hideLogin);
  
  // Load Comment 
  function loadComments() {
    for (const postId in commentsData) {
      const commentsSection = document.getElementById(`comments-${postId}`);
      const comments = commentsData[postId];
      
      if (comments.length === 0) {
        commentsSection.innerHTML = '<p>No comments yet. Be the first!</p>';
      } else {
        commentsSection.innerHTML = comments.map(buildCommentHTML).join('');
      }
    }
  }
  
  // Build Comment in HTML
  function buildCommentHTML(comment) {
    return `
      <div class="comment">
        <div class="comment-avatar">${comment.name[0].toUpperCase()}</div>
        <div class="comment-content">
          <h4>${comment.name}</h4>
          <span class="comment-date">${comment.date}</span>
          <p>${comment.comment}</p>
        </div>
      </div>
    `;
  }
  
  // form submission for new comments
  function setupCommentForms() {
    const forms = document.querySelectorAll('.comment-form');
    
    forms.forEach(form => {
      form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form data
        const postId = this.id.split('-')[2];
        const name = this.querySelector('input').value;
        const commentText = this.querySelector('textarea').value;
        
        // Create new comment
        const newComment = {
          name: name,
          comment: commentText,
          date: new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })
        };
        
        // Add to storage and display
        commentsData[postId].push(newComment);
        document.getElementById(`comments-${postId}`).innerHTML = 
          commentsData[postId].map(buildCommentHTML).join('');
        
        // Reset form and show confirmation
        this.reset();
        showMessage('Thanks for your comment!');
      });
    });
  }
  
  // Handles blog post search
  function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-btn');
    
    function searchPosts() {
      const searchTerm = searchInput.value.trim().toLowerCase();
      
      if (!searchTerm) {
        showMessage('Please enter search words');
        return;
      }
      
      let foundPosts = false;
      const allPosts = document.querySelectorAll('.blog-post');
      
      allPosts.forEach(post => {
        const matches = post.textContent.toLowerCase().includes(searchTerm);
        post.style.display = matches ? 'block' : 'none';
        if (matches) foundPosts = true;
      });
      
      if (!foundPosts) {
        showMessage('No matching posts found');
      }
    }
    
    searchButton.addEventListener('click', searchPosts);
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') searchPosts();
    });
  }
  
  // Toggles menu button
  function setupMenu() {
    document.querySelector('.menu-btn').addEventListener('click', () => {
      document.querySelector('.nav-list').classList.toggle('show');
    });
  }

  function initialiseFunctions() {
    loadComments();
    setupCommentForms();
    setupSearch();
    setupMenu();
  }
  initialiseFunctions();