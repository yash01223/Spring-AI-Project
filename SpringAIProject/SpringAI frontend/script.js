
const API_BASE_URL = 'http://localhost:8080'; 

async function submitPrompt() {
    const promptInput = document.getElementById('userPrompt');
    const responseArea = document.getElementById('responseArea');
    const submitButton = document.querySelector('button');
    
    if (!promptInput || !responseArea || !submitButton) {
        console.error('Required elements not found in DOM');
        alert('UI elements not found. Check HTML IDs.');
        return;
    }
    
    const prompt = promptInput.value.trim();
    
    if (prompt === '') {
        alert('Please enter a prompt!');
        return;
    }
    
   
    submitButton.disabled = true;
    submitButton.textContent = 'Generating...';
    responseArea.innerHTML = '<div class="loading">Generating response</div>';
    
    try {
        console.log('Sending prompt:', prompt);
        
      
        const encodedPrompt = encodeURIComponent(prompt);
        const url = `${API_BASE_URL}/api/ollama/${encodedPrompt}`;
        console.log('API URL:', url); 
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
        }
        
        const responseText = await response.text(); 
        console.log('Received response:', responseText);
        
        
        responseArea.innerHTML = `<div class="ollama-response">${responseText}</div>`;
        
    } catch (error) {
        console.error('Error fetching response:', error);
        responseArea.innerHTML = `<div class="error">Error: ${error.message}. Please check if the backend is running on ${API_BASE_URL}.</div>`;
    } finally {
        
        submitButton.disabled = false;
        submitButton.textContent = 'Submit';
        
       
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const promptInput = document.getElementById('userPrompt');
    if (promptInput) {
        promptInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                submitPrompt();
            }
        });
    }
});