// ============================================================
// ZAPIER "CODE BY ZAPIER" STEPS — JavaScript
// ============================================================
// These are all the JavaScript code blocks you'll need inside
// Zapier's "Code by Zapier" (Run JavaScript) actions.
//
// For each snippet:
//   1. Add a "Code by Zapier" step in your Zap
//   2. Choose "Run JavaScript"
//   3. Set up the Input Data fields as documented
//   4. Paste the code
//   5. The output object becomes available to later steps
// ============================================================


// ──────────────────────────────────────────────────────────────
// CODE STEP 1: Calculate hours since last activity
// ──────────────────────────────────────────────────────────────
// USE IN: Zap #3 (Auto Nudge) — between "Get Many Rows" and "Filter"
//
// INPUT DATA (set these in the left panel):
//   lastActivity  →  map to "last_activity" from Google Sheets
//
// OUTPUT: hoursSinceActivity, daysSinceActivity, isInactive24h,
//         isInactive48h, isInactive72h, isInactive7d

const code_step_1_calculate_inactivity = {
  inputData: { lastActivity: "last_activity from Google Sheets" },
  code: `
const now = new Date();
const lastActivity = new Date(inputData.lastActivity);
const diffMs = now - lastActivity;
const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

output = [{
  hoursSinceActivity: diffHours,
  daysSinceActivity: diffDays,
  isInactive24h: diffHours >= 24 ? "yes" : "no",
  isInactive48h: diffHours >= 48 ? "yes" : "no",
  isInactive72h: diffHours >= 72 ? "yes" : "no",
  isInactive7d: diffDays >= 7 ? "yes" : "no",
  currentTimestamp: now.toISOString()
}];
`
};


// ──────────────────────────────────────────────────────────────
// CODE STEP 2: Increment nudge count
// ──────────────────────────────────────────────────────────────
// USE IN: Zap #3 (Auto Nudge) — inside each Path, before
//         the "Update Spreadsheet Row" step
//
// INPUT DATA:
//   nudgeCount  →  map to "nudge_count" from Google Sheets
//
// OUTPUT: newNudgeCount, currentTimestamp

const code_step_2_increment_nudge = {
  inputData: { nudgeCount: "nudge_count from Google Sheets" },
  code: `
const current = parseInt(inputData.nudgeCount) || 0;
output = [{
  newNudgeCount: current + 1,
  currentTimestamp: new Date().toISOString()
}];
`
};


// ──────────────────────────────────────────────────────────────
// CODE STEP 3: Pick the right nudge message based on count
// ──────────────────────────────────────────────────────────────
// USE IN: Zap #3 (Auto Nudge) — inside each Path, to select
//         Nudge 1 vs Nudge 2 vs Nudge 3 based on how many
//         nudges have already been sent
//
// INPUT DATA:
//   nudgeCount    →  nudge_count from Sheets
//   currentStage  →  current_stage from Sheets
//   name          →  name from Sheets
//   businessName  →  business_name from Sheets
//
// OUTPUT: messageText (ready to paste into Telegram Send Message)

const code_step_3_pick_nudge_message = {
  inputData: {
    nudgeCount: "nudge_count",
    currentStage: "current_stage",
    name: "name",
    businessName: "business_name"
  },
  code: `
const count = parseInt(inputData.nudgeCount) || 0;
const stage = parseInt(inputData.currentStage);
const name = inputData.name;
const biz = inputData.businessName;

const messages = {
  2: [
    \`Hey \${name}! 👋\\n\\nSetting up your business profile on Razorpay takes just 2 minutes.\\n\\nYou'll need:\\n- Business name & type\\n- Business category\\n- Registered address\\n\\nNeed help choosing the right business type? Just reply here and I'll guide you!\`,
    \`Hi \${name}, quick tip for \${biz}!\\n\\nNot sure which business type to select? Here's a quick guide:\\n\\n*Proprietorship* - You run the business yourself\\n*Partnership* - You have partners with a partnership deed\\n*Pvt Ltd / LLP* - Registered with MCA\\n*Trust / Society* - For NGOs and non-profits\\n\\nReply with your business type and I'll tell you exactly what documents you'll need next!\`,
    \`\${name}, your Razorpay account for *\${biz}* is waiting!\\n\\nYou're just 5 steps away from accepting online payments.\\n\\nI can walk you through the business profile setup right here. Just say "Let's go!" 🚀\\n\\nOr if you have questions, ask away!\`
  ],
  3: [
    \`Hi \${name}! Your Razorpay setup for *\${biz}* is progressing well.\\n\\nNext up: KYC verification. This keeps your business and customers safe.\\n\\nQuick question - do you have these ready?\\n✅ PAN Card\\n✅ Aadhaar Card (for proprietors)\\n✅ Business proof (GST/Shop Act/FSSAI)\\n\\nIf not, no worries - I can help you figure out alternatives!\`,
    \`Hey \${name}, just checking in!\\n\\nA lot of business owners worry about sharing documents online. Totally valid!\\n\\nHere's why Razorpay is safe:\\n🔒 PCI DSS Level 1 certified\\n🔒 256-bit bank-grade encryption\\n🔒 RBI regulated payment aggregator\\n🔒 10M+ businesses trust Razorpay\\n\\nYour documents are only used for verification. Want to proceed?\`,
    \`\${name}, here's something many business owners don't know:\\n\\n*GST registration is NOT mandatory* for all business types on Razorpay!\\n\\nProprietors can complete KYC with just:\\n- PAN Card\\n- Aadhaar Card\\n- Any one business proof\\n\\nWant me to check what documents you need for *\${biz}*?\`
  ],
  4: [
    \`Hi \${name}! You're halfway through your Razorpay setup 🎉\\n\\nNext step: Link your bank account for settlements.\\n\\nQuick facts:\\n💰 Settlements arrive in T+2 days (or instant with Razorpay X)\\n💰 No minimum balance required\\n💰 Proprietors can use savings accounts!\\n\\nReady to link your account? Head to your Razorpay dashboard!\`,
    \`Hey \${name}, stuck on bank verification?\\n\\nCommon issues and fixes:\\n1. *Name mismatch* → Bank account name must match your business name on KYC\\n2. *Wrong IFSC* → Double-check on ifsc.razorpay.com\\n3. *Verification failed* → Try re-entering details or use a different account\\n\\nNeed specific help? Just describe your issue!\`
  ],
  5: [
    \`\${name}, you're almost there! *\${biz}* is 70% set up ✨\\n\\nNext: Share your website or app details.\\n\\nDon't have a website? No problem!\\n📱 *Payment Links* - Share on WhatsApp/Instagram\\n🛒 *Payment Pages* - Razorpay hosts a checkout page for you\\n📌 Social media sellers can submit their shop URL\\n\\nWhich option works for *\${biz}*?\`,
    \`Hi \${name}! Quick reminder about policy pages.\\n\\nRazorpay requires these on your website:\\n📋 Privacy Policy\\n📋 Terms & Conditions\\n📋 Refund/Cancellation Policy\\n📋 Contact Us page\\n\\n*Good news:* Razorpay provides free templates you can customize!\\n\\nWant me to share the template links?\`
  ],
  6: [
    \`\${name}, you're SO close! Just the integration step left for *\${biz}* 🏁\\n\\nNot technical? Here are no-code options:\\n\\n🔗 *Payment Links* - Just share a link, no coding needed\\n📦 *Shopify/WooCommerce Plugin* - Install in 2 clicks\\n🔘 *Payment Button* - Copy-paste a code snippet\\n\\nWhich platform does your business use?\`,
    \`Hey \${name}, integrating Razorpay is easier than you think!\\n\\nIf you use:\\n- *Shopify* → Install Razorpay app from Shopify store\\n- *WooCommerce* → Install Razorpay plugin\\n- *Wix* → Enable Razorpay in payment settings\\n- *Custom website* → Use Checkout.js (just 10 lines of code!)\\n- *No website* → Use Payment Links (zero code!)\\n\\nWhich one is you? I'll send you the exact steps!\`
  ],
  7: [
    \`Hi \${name}! Your *\${biz}* account is under review 🔍\\n\\nThis usually takes 2-3 business days. While you wait:\\n\\n✅ Test your integration in test mode\\n✅ Set up your team members on the dashboard\\n✅ Explore Razorpay tools (invoices, subscriptions, etc.)\\n\\nI'll check back with you soon!\`
  ]
};

const stageMessages = messages[stage] || messages[7];
const idx = Math.min(count, stageMessages.length - 1);

output = [{ messageText: stageMessages[idx] }];
`
};


// ──────────────────────────────────────────────────────────────
// CODE STEP 4: Detect opt-out keywords
// ──────────────────────────────────────────────────────────────
// USE IN: Zap #2 (Reply Handler) — after the ChatGPT response,
//         to check if the user wants to stop receiving messages
//
// INPUT DATA:
//   messageText  →  "Text" from Telegram trigger
//
// OUTPUT: isOptOut ("yes" or "no"), newStatus

const code_step_4_detect_optout = {
  inputData: { messageText: "Text from Telegram trigger" },
  code: `
const text = (inputData.messageText || "").toLowerCase().trim();
const optOutKeywords = ["stop", "unsubscribe", "opt out", "opt-out",
  "don't message", "dont message", "leave me alone", "no more",
  "cancel", "remove me", "not interested"];

const isOptOut = optOutKeywords.some(kw => text.includes(kw));

output = [{
  isOptOut: isOptOut ? "yes" : "no",
  newStatus: isOptOut ? "opted_out" : "active"
}];
`
};


// ──────────────────────────────────────────────────────────────
// CODE STEP 5: Generate daily summary report
// ──────────────────────────────────────────────────────────────
// USE IN: Zap #4 (Daily Report) — after "Get Many Rows"
//
// NOTE: Zapier's "Get Many Rows" returns rows as numbered
//       fields. This code expects you to pass ALL relevant
//       fields as a JSON string.
//
// INPUT DATA:
//   rowsJson  →  Use Formatter to combine row data into JSON,
//                OR use the Looping feature
//
// For a simpler approach, use this with individual row fields:
//   statuses     →  comma-separated list of status values
//   stages       →  comma-separated list of current_stage values
//   nudgeCounts  →  comma-separated list of nudge_count values

const code_step_5_daily_report = {
  inputData: {
    statuses: "comma-separated status values",
    stages: "comma-separated current_stage values",
    nudgeCounts: "comma-separated nudge_count values"
  },
  code: `
const statuses = (inputData.statuses || "").split(",").map(s => s.trim());
const stages = (inputData.stages || "").split(",").map(s => parseInt(s));
const nudges = (inputData.nudgeCounts || "").split(",").map(s => parseInt(s));

const total = statuses.length;
const active = statuses.filter(s => s === "active").length;
const completed = statuses.filter(s => s === "completed").length;
const optedOut = statuses.filter(s => s === "opted_out").length;
const nudged = nudges.filter(n => n > 0).length;

const stageCounts = {};
stages.forEach(s => {
  if (!isNaN(s)) stageCounts[s] = (stageCounts[s] || 0) + 1;
});

const stageNames = {
  1: "Sign-Up", 2: "Business Profile", 3: "KYC Verification",
  4: "Bank Account", 5: "Website Details", 6: "Integration", 7: "Go Live"
};

let stageBreakdown = "";
for (let i = 2; i <= 7; i++) {
  const count = stageCounts[i] || 0;
  if (count > 0) {
    stageBreakdown += "  Stage " + i + " (" + stageNames[i] + "): " + count + "\\n";
  }
}

const today = new Date().toLocaleDateString("en-IN", {
  weekday: "long", year: "numeric", month: "long", day: "numeric"
});

const report = "📊 *Daily Onboarding Report*\\n"
  + today + "\\n\\n"
  + "👥 *Total Users:* " + total + "\\n"
  + "✅ Active: " + active + "\\n"
  + "🎉 Completed: " + completed + "\\n"
  + "🚫 Opted Out: " + optedOut + "\\n"
  + "📨 Nudged (at least once): " + nudged + "\\n\\n"
  + "📍 *Active Users by Stage:*\\n"
  + stageBreakdown + "\\n"
  + "Keep going! 💪";

output = [{ reportText: report }];
`
};


// ──────────────────────────────────────────────────────────────
// CODE STEP 6: Validate email format
// ──────────────────────────────────────────────────────────────
// USE IN: Zap #2 (Reply Handler) — Path B (New User), before
//         the email lookup, to check if the message looks like
//         an email address
//
// INPUT DATA:
//   messageText  →  "Text" from Telegram trigger
//
// OUTPUT: isEmail, cleanedEmail

const code_step_6_validate_email = {
  inputData: { messageText: "Text from Telegram trigger" },
  code: `
const text = (inputData.messageText || "").trim().toLowerCase();
const emailRegex = /^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$/;
const isEmail = emailRegex.test(text);

output = [{
  isEmail: isEmail ? "yes" : "no",
  cleanedEmail: isEmail ? text : ""
}];
`
};


// ──────────────────────────────────────────────────────────────
// CODE STEP 7: Build the welcome message after connecting
// ──────────────────────────────────────────────────────────────
// USE IN: Zap #2 (Reply Handler) — Path B > "Email Found"
//         sub-path, as the Telegram message to send
//
// INPUT DATA:
//   name          →  name from Sheets lookup
//   businessName  →  business_name from Sheets lookup
//   stageName     →  stage_name from Sheets lookup
//   currentStage  →  current_stage from Sheets lookup
//
// OUTPUT: welcomeMessage

const code_step_7_welcome_message = {
  inputData: {
    name: "name",
    businessName: "business_name",
    stageName: "stage_name",
    currentStage: "current_stage"
  },
  code: `
const name = inputData.name;
const biz = inputData.businessName;
const stage = inputData.stageName;
const stageNum = parseInt(inputData.currentStage);
const remaining = 7 - stageNum;

const msg = "🎉 I found your account!\\n\\n"
  + "Here's what I see:\\n"
  + "- *Business:* " + biz + "\\n"
  + "- *Current step:* " + stage + " (Step " + stageNum + " of 7)\\n"
  + "- *Steps remaining:* " + remaining + "\\n\\n"
  + "Would you like help completing this step? Just tell me what you're stuck on and I'll guide you through it.";

output = [{ welcomeMessage: msg }];
`
};


// ──────────────────────────────────────────────────────────────
// CODE STEP 8: Build the win-back message (7+ days inactive)
// ──────────────────────────────────────────────────────────────
// USE IN: Zap #3 (Auto Nudge) — as a fallback path for users
//         with 7+ days of inactivity
//
// INPUT DATA:
//   name          →  name from Sheets
//   businessName  →  business_name from Sheets
//   currentStage  →  current_stage from Sheets
//
// OUTPUT: winBackMessage

const code_step_8_winback_message = {
  inputData: {
    name: "name",
    businessName: "business_name",
    currentStage: "current_stage"
  },
  code: `
const name = inputData.name;
const biz = inputData.businessName;
const stage = parseInt(inputData.currentStage);

const msg = "Hey " + name + "! It's been a while 👋\\n\\n"
  + "Your Razorpay setup for *" + biz + "* is still saved - you don't have to start over!\\n\\n"
  + "You're on step " + stage + " of 7. Almost there!\\n\\n"
  + "Businesses that complete onboarding start accepting payments within 24 hours.\\n\\n"
  + "Ready to pick up where you left off?\\n"
  + "→ Reply \\"Yes\\" and I'll guide you\\n"
  + "→ Reply \\"Stop\\" if you'd prefer not to hear from me";

output = [{ winBackMessage: msg }];
`
};
