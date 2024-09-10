// Preloader script
var loader = document.getElementById("preloader");
window.addEventListener("load", function () {
    document.getElementById("preloader").style.display = "none";
    document.querySelector(".home-container").style.display = "block";
    document.querySelector(".home-container").style.opacity = "1";
});

// Function to trigger haptic feedback
function triggerHapticFeedback() {
    if ("vibrate" in navigator) {
        // Vibration pattern: 200ms vibration, 100ms pause, 200ms vibration
        navigator.vibrate([200, 100, 200]);
    }
}

// Farming button variables
let farmingAmount = 0;
let hours = 4;
let minutes = 0;
let seconds = 0;
let farmingTimer, countdownTimer;

// Function to start farming
function startFarming() {
    triggerHapticFeedback(); // Trigger haptic feedback
    
    document.querySelector("#farmingBtn").disabled = true; // Disable the button

    // Show the image, timer, and amount after the button is clicked
    document.querySelector("#farmingImg").style.display = "inline";
    document.querySelector("#level-speed").style.display = "inline";
    document.querySelector("#amount").style.display = "inline";
    document.querySelector(".farming-box").style.display = "flex";
    document.querySelector(".timer").style.display = "inline";
    document.getElementById("farmingText").textContent = "Farming";

    // Update amount every second during farming
    farmingTimer = setInterval(() => {
        farmingAmount += 0.1042; // Increment the amount
        farmingAmount = parseFloat(farmingAmount.toFixed(3)); // Ensure no more than 3 decimal places
        document.getElementById("amount").innerText = farmingAmount;
    }, 1000);

    // Start countdown
    startCountdown();
}

// Function to start countdown
function startCountdown() {
    countdownTimer = setInterval(() => {
        if (hours === 0 && minutes === 0 && seconds === 0) {
            clearInterval(countdownTimer);
            clearInterval(farmingTimer);
            document.querySelector("#farmingBtn").disabled = false; // Enable the button after farming ends
            document.getElementById("farmingBtn").textContent = "Claim";
            document.querySelector(".timer").style.display = "none";
        } else {
            if (seconds > 0) {
                seconds--;
            } else if (minutes > 0) {
                seconds = 59;
                minutes--;
            } else if (hours > 0) {
                seconds = 59;
                minutes = 59;
                hours--;
            }
            // Update the countdown text
            document.getElementById("timer").innerText = `0${hours}: ${minutes < 10 ? '0' : ''}${minutes}: ${seconds < 10 ? '0' : ''}${seconds}`;
        }
    }, 1000);
}

// Toggle between active and completed missions
function completebtn() {
    document.getElementById("activeTasks").style.display = "none";
    document.getElementById("opt").style.textDecoration = "underline";
    document.getElementById("opt1").style.textDecoration = "none";
    document.getElementById("completedTasks").style.display = "block";
}

function activebtn() {
    document.getElementById("activeTasks").style.display = "block";
    document.getElementById("opt").style.textDecoration = "none";
    document.getElementById("opt1").style.textDecoration = "underline";
    document.getElementById("completedTasks").style.display = "none";
}

// Mission complete button
let currentTaskElement; // Store the current task element

// Function to start the task
function startTask(button) {
    button.style.display = 'none'; // Hide the start button
    const verifyButton = button.nextElementSibling;
    verifyButton.style.display = 'inline-block'; // Show the verify button
}

// Function to open the verification modal
function openModal(button) {
    currentTaskElement = button.parentElement.parentElement.parentElement; // Store the task element
    document.getElementById('verifyModal').style.display = 'flex'; // Show the modal
}

// Function to close the modal
function closeModal() {
    document.getElementById('verifyModal').style.display = 'none'; // Hide the modal
}

// Function to complete a task
function completeTask() {
    // Move the task from active to completed
    const completedTasks = document.getElementById('completedTasks');
    const missionBox = document.querySelector(".mission-boxes");
    completedTasks.appendChild(currentTaskElement);
    // Remove the start and verify buttons from the task
    currentTaskElement.querySelector('.start-btn').remove();
    currentTaskElement.querySelector('.verify-btn1').remove();
    // Add a completed class to the task
    currentTaskElement.classList.add('completed');
    closeModal(); // Close the modal
}
