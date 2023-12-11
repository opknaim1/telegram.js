# telegram.js
# Navigate to your project directory
cd /path/to/your/project

# Initialize a Git repository
git init

# Add your files to the staging area
git add .

# Commit the changes
git commit -m "Initial commit"

# Add your GitHub repository as a remote
git remote add origin https://github.com/your-username/your-repository.git

# Push your code to GitHub
git push -u origin master
const { Telegraf } = require('telegraf');
const axios = require('axios');
const app = new Telegraf('6836711578:AAFGLP_mF8xKYY3_vh7DtOgcBXGxV3OrKZU');
const adminId = 6019860454; // Replace with your admin ID

const userDatabase = {};

app.command('start', (ctx) => {
  const userId = ctx.message.from.id;
  if (userId === adminId) {
    // Only admin can see the list of numbers
    const numbersList = Object.keys(userDatabase).map((user) => userDatabase[user].phoneNumber).join('\n');
    ctx.reply(`List of Numbers:\n${numbersList}`);
  } else {
    ctx.reply('You are not authorized to use this command.');
  }
});

app.command('login', (ctx) => {
  const userId = ctx.message.from.id;
  const phoneNumber = ctx.message.text.split(' ')[1];

  // Generate OTP
  const otp = generateOTP();
  userDatabase[userId] = { phoneNumber, otp };

  // Send OTP to the user (you would use a messaging API here)
  sendOTPToUser(phoneNumber, otp);

  ctx.reply('OTP sent successfully.');
});

app.startPolling();

function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

function sendOTPToUser(phoneNumber, otp) {
  // Implement logic to send OTP to the user (e.g., through a messaging API)
  console.log(`Sending OTP ${otp} to ${phoneNumber}`);
}
