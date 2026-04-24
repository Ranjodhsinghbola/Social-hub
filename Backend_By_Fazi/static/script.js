document.addEventListener('DOMContentLoaded', () => {
    // 1. Gestione dei Like (Cuori)
    const setupLikeButtons = () => {
        const likeButtons = document.querySelectorAll('.like-btn');
        likeButtons.forEach(btn => {
            // Rimuoviamo eventuali listener precedenti per evitare duplicati
            btn.onclick = (e) => {
                e.preventDefault();
                btn.classList.toggle('liked');
                const icon = btn.querySelector('i');
                
                if (btn.classList.contains('liked')) {
                    icon.classList.replace('far', 'fas'); // Cuore pieno
                    console.log('Post messo tra i preferiti');
                } else {
                    icon.classList.replace('fas', 'far'); // Cuore vuoto
                    console.log('Preferito rimosso');
                }
            };
        });
    };

    // 2. Gestione della Pubblicazione di nuovi Post
    const postBtn = document.querySelector('.post-btn');
    const postTextarea = document.querySelector('.post-creator textarea');
    const feed = document.querySelector('.feed');

    if (postBtn && postTextarea && feed) {
        postBtn.addEventListener('click', () => {
            const content = postTextarea.value.trim();
            
            if (content === "") {
                alert("Scrivi qualcosa prima di pubblicare!");
                return;
            }

            // Creazione dinamica del nuovo post
            const newPost = document.createElement('article');
            newPost.className = 'post card';
            newPost.innerHTML = `
                <div class="post-header">
                    <img src="https://via.placeholder.com/40/222/fff" alt="Avatar" class="avatar">
                    <div class="post-info">
                        <h3>Tu</h3>
                        <span>Proprio ora</span>
                    </div>
                    <button class="more-btn"><i class="fas fa-ellipsis-h"></i></button>
                </div>
                <div class="post-content">
                    <p>${content}</p>
                </div>
                <div class="post-actions">
                    <button class="action-btn like-btn"><i class="far fa-heart"></i></button>
                    <button class="action-btn comment-trigger"><i class="far fa-comment"></i></button>
                    <button class="action-btn"><i class="far fa-share-square"></i></button>
                </div>
                <div class="post-comments">
                    <div class="comment-input">
                        <img src="https://via.placeholder.com/30/222/fff" alt="Avatar" class="avatar-sm">
                        <input type="text" placeholder="Scrivi un commento...">
                    </div>
                </div>
            `;

            // Aggiunta del post in cima al feed
            feed.prepend(newPost);
            
            // Reset della textarea
            postTextarea.value = "";
            
            // Re-inizializza i bottoni like per il nuovo post
            setupLikeButtons();
            setupCommentHandlers();
        });
    }

    // 3. Gestione dei Commenti (Invio con tasto Enter)
    const setupCommentHandlers = () => {
        const commentInputs = document.querySelectorAll('.comment-input input');
        commentInputs.forEach(input => {
            input.onkeypress = (e) => {
                if (e.key === 'Enter' && input.value.trim() !== "") {
                    const commentText = input.value.trim();
                    const commentsContainer = input.closest('.post-comments');
                    
                    // Creazione elemento commento
                    const commentElement = document.createElement('div');
                    commentElement.style.cssText = "margin-top: 10px; font-size: 0.85rem; padding-left: 40px; color: #a0a0a0;";
                    commentElement.innerHTML = `<strong>Tu:</strong> ${commentText}`;
                    
                    // Inserimento prima dell'input
                    commentsContainer.insertBefore(commentElement, input.parentElement);
                    
                    // Reset input
                    input.value = "";
                }
            };
        });
    };

    // Inizializzazione al caricamento
    setupLikeButtons();
    setupCommentHandlers();

    // 4. Simulazione Login (Semplice reindirizzamento per demo)
    const authForm = document.querySelector('.auth-form');
    if (authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In un'app reale qui ci sarebbe la validazione server
            window.location.href = 'index.html';
        });
    }
});
