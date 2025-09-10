const { execSync } = require('child_process');

// User Parameters
const EMAIL = "prachismitapanda10@gmail.com";
const START_DATE = new Date("2025-09-10T00:00:00");
const END_DATE = new Date("2025-10-31T00:00:00");

// Expanded pool of frontend tasks
const baseMessages = [
  "Build HTML semantic structure",
  "Update flexbox layout in CSS",
  "Refactor DOM manipulation logic",
  "Add media queries for mobile responsiveness",
  "Optimize image assets and SVGs",
  "Fix navigation menu toggle bug",
  "Enhance typography and visual hierarchy",
  "Add event listeners for form validation",
  "Clean up unused CSS variables",
  "Improve color contrast ratios",
  "Implement CSS grid functionality",
  "Fix cross-browser styling issues",
  "Update footer links and layout",
  "Create reusable JS utility functions",
  "Add CSS animations for hover states"
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generates a random time between 8:00 AM and 9:00 PM
function getRandomTime(date) {
  const hours = getRandomInt(8, 20);
  const minutes = getRandomInt(0, 59);
  const seconds = getRandomInt(0, 59);
  const newDate = new Date(date);
  newDate.setHours(hours, minutes, seconds);
  return newDate;
}

// Executes terminal commands
function runCommand(command, envVars) {
  try {
    execSync(command, { env: { ...process.env, ...envVars }, stdio: 'pipe' });
  } catch (error) {
    console.error(`Error executing command: ${command}`);
  }
}

console.log("Setting local git email to match GitHub verified email...");
runCommand(`git config user.email "${EMAIL}"`, {});

console.log("\n--- Phase 1: Committing Real Files on Start Date ---");
const phase1Date = getRandomTime(START_DATE);
const phase1DateString = phase1Date.toISOString();

runCommand('git add .', {});
runCommand(`git commit -m "Project initialization and base HTML/CSS setup"`, {
  GIT_AUTHOR_DATE: phase1DateString,
  GIT_COMMITTER_DATE: phase1DateString
});
console.log(`Real files committed successfully on ${phase1Date.toString()}`);

console.log("\n--- Phase 2: Generating Ghost Commits ---");
let currentDate = new Date(START_DATE);
currentDate.setDate(currentDate.getDate() + 1);

let totalCommits = 0;

while (currentDate <= END_DATE) {
  // FIXED LOGIC: 15% chance to take a gap (makes the graph mostly green)
  const triggerGap = Math.random() < 0.15;

  if (triggerGap) {
    // If gap is triggered, skip between 1 and 10 days randomly
    const gapDays = getRandomInt(1, 10);
    console.log(`[GAP] Skipping ${gapDays} days for natural inactivity...`);
    currentDate.setDate(currentDate.getDate() + gapDays);
    continue; // Skip to the next date after the gap
  }

  if (currentDate > END_DATE) break;

  // If no gap, generate 2 to 4 commits for today
  const commitsToday = getRandomInt(2, 4);
  const dateStr = currentDate.toISOString().split('T')[0];
  
  console.log(`[${dateStr}] Generating ${commitsToday} unique ghost commits...`);

  for (let i = 1; i <= commitsToday; i++) {
    const commitTime = getRandomTime(currentDate);
    const commitTimeString = commitTime.toISOString();
    
    // GUARANTEED UNIQUE MESSAGE
    const randomBase = baseMessages[getRandomInt(0, baseMessages.length - 1)];
    const uniqueMessage = `${randomBase} (Update: ${dateStr} - Task #${i})`;

    runCommand(`git commit --allow-empty -m "${uniqueMessage}"`, {
      GIT_AUTHOR_DATE: commitTimeString,
      GIT_COMMITTER_DATE: commitTimeString
    });
    totalCommits++;
  }
  
  // Move to the next day
  currentDate.setDate(currentDate.getDate() + 1);
}

console.log(`\nAutomation Complete! Generated ${totalCommits} completely unique ghost commits.`);