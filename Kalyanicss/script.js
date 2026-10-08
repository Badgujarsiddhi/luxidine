const menu = [
    { name: "Truffle Pasta", price: "$24", category: "Mains", tags: ["luxury", "creamy", "comfort"] },
    { name: "Wagyu Slider", price: "$18", category: "Appetizers", tags: ["meat", "savory", "classic"] },
    { name: "Gold Leaf Risotto", price: "$32", category: "Mains", tags: ["lavish", "creamy", "gold"] },
    { name: "Saffron Sorbet", price: "$12", category: "Desserts", tags: ["sweet", "refreshing", "exotic"] },
    { name: "Vintage Champagne", price: "$45", category: "Drinks", tags: ["luxury", "bubbly", "party"] },
    { name: "Spicy Arrabbiata", price: "$22", category: "Mains", tags: ["spicy", "hot", "tomato"] },
    { name: "Chili Garlic Prawns", price: "$28", category: "Appetizers", tags: ["spicy", "seafood", "garlic"] }
];

const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.innerHTML = `
        <div class="message-content">
            <p>${text}</p>
        </div>
        <span class="timestamp">${time}</span>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showMenu(filteredItems = null) {
    const itemsToShow = filteredItems || menu;
    let menuHtml = '<div class="menu-flash">';
    itemsToShow.forEach(item => {
        menuHtml += `
            <div class="menu-item">
                <span class="item-name">${item.name}</span>
                <span class="item-price">${item.price}</span>
            </div>
        `;
    });
    menuHtml += '</div>';
    
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'bot');
    
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const introText = filteredItems ? 
        "Based on your preference, I highly recommend these selections:" : 
        "Certainly! Here is our curated menu for this evening:";

    messageDiv.innerHTML = `
        <div class="message-content">
            <p>${introText}</p>
            ${menuHtml}
            ${filteredItems ? '<p style="margin-top: 10px; font-size: 0.85rem; opacity: 0.8;">Would you like to see the full menu or place an order?</p>' : ''}
        </div>
        <span class="timestamp">${time}</span>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleBotResponse(message) {
    const msg = message.toLowerCase();
    const words = msg.split(/\W+/);
    
    setTimeout(() => {
        if (words.includes('hello') || words.includes('hi') || words.includes('hey')) {
            addMessage("Greetings! How may I assist you with your dining experience today?", 'bot');
        } else if (msg.includes('menu')) {
            showMenu();
        } else if (msg.includes('spicy') || msg.includes('hot')) {
            const spicyItems = menu.filter(item => item.tags.includes('spicy'));
            showMenu(spicyItems);
        } else if (msg.includes('sweet')) {
            const sweetItems = menu.filter(item => item.tags.includes('sweet'));
            showMenu(sweetItems);
        } else if (msg.includes('order') || msg.includes('buy')) {
            addMessage("To place an order, please specify the item name from our menu. For example: 'Order Truffle Pasta'", 'bot');
        } else if (menu.some(item => msg.includes(item.name.toLowerCase()))) {
            const item = menu.find(item => msg.includes(item.name.toLowerCase()));
            addMessage(`Excellent choice. I have added <strong>${item.name}</strong> to your order. Would you like anything else?`, 'bot');
        } else if (msg.includes('thank')) {
            addMessage("It is my pleasure. Enjoy your meal!", 'bot');
        } else {
            addMessage("I'm sorry, I didn't quite catch that. You can ask for our 'menu', tell me your taste preferences (like 'spicy'), or place an 'order'.", 'bot');
        }
    }, 800);
}

function sendMessage() {
    const text = userInput.value.trim();
    if (text) {
        addMessage(text, 'user');
        userInput.value = '';
        handleBotResponse(text);
    }
}

sendBtn.addEventListener('click', sendMessage);

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
