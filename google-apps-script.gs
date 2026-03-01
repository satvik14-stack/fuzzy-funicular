// ============================================================
// GOOGLE APPS SCRIPT — Complete Razorpay Onboarding Bot
// ============================================================
// This script runs entirely inside Google Sheets (free).
// It replaces ALL 3 Zapier Zaps with zero task limits.
//
// SETUP:
//   1. Open your "Razorpay Onboarding Tracker" Google Sheet
//   2. Click Extensions → Apps Script
//   3. Delete the default code and paste this entire file
//   4. Fill in the CONFIG section below with your keys
//   5. Click Run → onOpen (authorize when prompted)
//   6. Click Run → setupTimeTriggers (sets up hourly automation)
//   7. Click Run → registerTelegramWebhook (connects the bot)
//
// That's it. Your bot is now fully operational.
// ============================================================


// ═══════════════════════════════════════════════════════════════
// CONFIGURATION — Fill in your keys here
// ═══════════════════════════════════════════════════════════════

const CONFIG = {
  TELEGRAM_BOT_TOKEN: "YOUR_TELEGRAM_BOT_TOKEN_HERE",
  OPENAI_API_KEY: "YOUR_OPENAI_API_KEY_HERE",
  BOT_USERNAME: "your_bot_username",
  SHEET_NAME: "Sheet1",

  // Your personal Telegram chat ID (for daily reports)
  // Send /start to @userinfobot on Telegram to find yours
  ADMIN_CHAT_ID: "YOUR_CHAT_ID_HERE",

  // Nudge settings
  INACTIVITY_THRESHOLD_HOURS: 24,
  MAX_NUDGES: 4,

  // OpenAI settings
  OPENAI_MODEL: "gpt-4o-mini",
  MAX_TOKENS: 300
};

// Column indices (0-based, matching your sheet: A=0, B=1, ...)
const COL = {
  USER_ID: 0,
  TELEGRAM_CHAT_ID: 1,
  NAME: 2,
  EMAIL: 3,
  BUSINESS_NAME: 4,
  BUSINESS_TYPE: 5,
  CURRENT_STAGE: 6,
  STAGE_NAME: 7,
  LAST_ACTIVITY: 8,
  NUDGE_COUNT: 9,
  LAST_NUDGE_SENT: 10,
  STATUS: 11,
  INVITE_SENT: 12,
  DROP_OFF_REASON: 13,
  NOTES: 14
};


// ═══════════════════════════════════════════════════════════════
// MENU — Adds a custom menu to your Google Sheet
// ═══════════════════════════════════════════════════════════════

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("🤖 Onboarding Bot")
    .addItem("▶ Run Nudge Check Now", "autoNudge")
    .addItem("📧 Send Email Invites Now", "emailInvite")
    .addItem("📊 Send Daily Report", "dailyReport")
    .addSeparator()
    .addItem("⏰ Setup Hourly Triggers", "setupTimeTriggers")
    .addItem("🔗 Register Telegram Webhook", "registerTelegramWebhook")
    .addItem("🔓 Remove Telegram Webhook", "removeTelegramWebhook")
    .addToUi();
}


// ═══════════════════════════════════════════════════════════════
// SETUP FUNCTIONS
// ═══════════════════════════════════════════════════════════════

function setupTimeTriggers() {
  // Remove existing triggers to avoid duplicates
  ScriptApp.getProjectTriggers().forEach(t => {
    if (t.getHandlerFunction() === "autoNudge" ||
        t.getHandlerFunction() === "emailInvite" ||
        t.getHandlerFunction() === "dailyReport") {
      ScriptApp.deleteTrigger(t);
    }
  });

  // Nudge check: every hour
  ScriptApp.newTrigger("autoNudge")
    .timeBased()
    .everyHours(1)
    .create();

  // Email invite check: every hour
  ScriptApp.newTrigger("emailInvite")
    .timeBased()
    .everyHours(1)
    .create();

  // Daily report: every day at 9 AM
  ScriptApp.newTrigger("dailyReport")
    .timeBased()
    .atHour(9)
    .everyDays(1)
    .create();

  SpreadsheetApp.getUi().alert(
    "Triggers set up successfully!\n\n" +
    "- Auto Nudge: every hour\n" +
    "- Email Invite: every hour\n" +
    "- Daily Report: every day at 9 AM"
  );
}

function registerTelegramWebhook() {
  const webAppUrl = ScriptApp.getService().getUrl();
  const url = `https://api.telegram.org/bot${CONFIG.TELEGRAM_BOT_TOKEN}/setWebhook?url=${webAppUrl}`;
  const response = UrlFetchApp.fetch(url);
  const result = JSON.parse(response.getContentText());

  if (result.ok) {
    SpreadsheetApp.getUi().alert(
      "Webhook registered!\n\n" +
      "Your bot is now listening for messages.\n" +
      "Webhook URL: " + webAppUrl
    );
  } else {
    SpreadsheetApp.getUi().alert("Error: " + JSON.stringify(result));
  }
}

function removeTelegramWebhook() {
  const url = `https://api.telegram.org/bot${CONFIG.TELEGRAM_BOT_TOKEN}/deleteWebhook`;
  UrlFetchApp.fetch(url);
  SpreadsheetApp.getUi().alert("Webhook removed.");
}


// ═══════════════════════════════════════════════════════════════
// TELEGRAM WEBHOOK HANDLER — receives all bot messages
// ═══════════════════════════════════════════════════════════════

function doPost(e) {
  try {
    const update = JSON.parse(e.postData.contents);
    if (update.message) {
      handleIncomingMessage(update.message);
    }
  } catch (err) {
    console.error("doPost error:", err);
  }
  return ContentService.createTextOutput("OK");
}

function handleIncomingMessage(message) {
  const chatId = String(message.chat.id);
  const text = (message.text || "").trim();
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();

  // Step 1: Look up by telegram_chat_id
  const knownRow = findRowByChatId(data, chatId);

  if (knownRow !== -1) {
    handleKnownUser(sheet, data, knownRow, chatId, text);
  } else {
    handleNewUser(sheet, data, chatId, text);
  }
}


// ═══════════════════════════════════════════════════════════════
// KNOWN USER — ChatGPT-powered conversation
// ═══════════════════════════════════════════════════════════════

function handleKnownUser(sheet, data, rowIdx, chatId, text) {
  const row = data[rowIdx];

  // Check for opt-out
  if (isOptOut(text)) {
    sheet.getRange(rowIdx + 1, COL.STATUS + 1).setValue("opted_out");
    const optOutMsg =
      `No problem at all, ${row[COL.NAME]}! I've noted your preference. 🙏\n\n` +
      `You won't receive any more messages from me.\n\n` +
      `Your progress for *${row[COL.BUSINESS_NAME]}* has been saved. ` +
      `If you ever want to resume, just send "Hi" to this chat.\n\n` +
      `Wishing you the best! 💛`;
    sendTelegramMessage(chatId, optOutMsg);
    return;
  }

  // Build system prompt with user context
  const systemPrompt = buildSystemPrompt(row);
  const aiReply = callOpenAI(systemPrompt, text);

  sendTelegramMessage(chatId, aiReply);

  // Update last_activity
  sheet.getRange(rowIdx + 1, COL.LAST_ACTIVITY + 1).setValue(new Date().toISOString());
}


// ═══════════════════════════════════════════════════════════════
// NEW USER — Email matching + chat_id registration
// ═══════════════════════════════════════════════════════════════

function handleNewUser(sheet, data, chatId, text) {
  // If message is /start, ask for email
  if (text === "/start") {
    sendTelegramMessage(chatId,
      "Welcome! I'm the Razorpay Onboarding Assistant. 👋\n\n" +
      "To connect your account, please share the email address " +
      "you used to sign up on Razorpay.\n\n" +
      "(Type your email and send it as a message)"
    );
    return;
  }

  // Check if the message looks like an email
  if (!isValidEmail(text)) {
    sendTelegramMessage(chatId,
      "That doesn't look like an email address. 🤔\n\n" +
      "Please type the email you used to register on Razorpay.\n" +
      "For example: yourname@email.com"
    );
    return;
  }

  // Look up by email
  const emailRow = findRowByEmail(data, text.toLowerCase());

  if (emailRow !== -1) {
    // Found — save chat_id and send welcome
    sheet.getRange(emailRow + 1, COL.TELEGRAM_CHAT_ID + 1).setValue(chatId);
    sheet.getRange(emailRow + 1, COL.LAST_ACTIVITY + 1).setValue(new Date().toISOString());

    const row = data[emailRow];
    const stageNum = parseInt(row[COL.CURRENT_STAGE]);
    const remaining = 7 - stageNum;

    sendTelegramMessage(chatId,
      `🎉 I found your account!\n\n` +
      `Here's what I see:\n` +
      `- *Business:* ${row[COL.BUSINESS_NAME]}\n` +
      `- *Current step:* ${row[COL.STAGE_NAME]} (Step ${stageNum} of 7)\n` +
      `- *Steps remaining:* ${remaining}\n\n` +
      `Would you like help completing this step? ` +
      `Just tell me what you're stuck on and I'll guide you through it.`
    );
  } else {
    // Not found
    sendTelegramMessage(chatId,
      "I couldn't find an account with that email. 😕\n\n" +
      "Please double-check and try again, or make sure you've " +
      "signed up at https://dashboard.razorpay.com first.\n\n" +
      "If you think this is an error, contact support@razorpay.com"
    );
  }
}


// ═══════════════════════════════════════════════════════════════
// ZAP #1 EQUIVALENT — Email Invite
// ═══════════════════════════════════════════════════════════════

function emailInvite() {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  let invitesSent = 0;

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const chatId = String(row[COL.TELEGRAM_CHAT_ID] || "").trim();
    const status = String(row[COL.STATUS] || "").trim();
    const inviteSent = String(row[COL.INVITE_SENT] || "").trim().toLowerCase();
    const email = String(row[COL.EMAIL] || "").trim();

    if (chatId === "" && status === "active" && inviteSent === "no" && email !== "") {
      try {
        sendInviteEmail(row);
        sheet.getRange(i + 1, COL.INVITE_SENT + 1).setValue("yes");
        invitesSent++;
        Utilities.sleep(1000);
      } catch (err) {
        console.error(`Failed to send invite to ${email}:`, err);
      }
    }
  }

  console.log(`Email invites sent: ${invitesSent}`);
}

function sendInviteEmail(row) {
  const name = row[COL.NAME];
  const email = row[COL.EMAIL];
  const businessName = row[COL.BUSINESS_NAME];
  const stageName = row[COL.STAGE_NAME];
  const botLink = `https://t.me/${CONFIG.BOT_USERNAME}`;

  const subject = "Need help finishing your Razorpay setup?";

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #2962FF 0%, #0039CB 100%); padding: 30px; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Razorpay Onboarding</h1>
      </div>
      <div style="background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 12px 12px;">
        <p style="font-size: 16px; color: #333;">Hi ${name},</p>
        <p style="font-size: 16px; color: #333;">
          I noticed you started setting up Razorpay for <strong>${businessName}</strong>
          but haven't completed it yet.
        </p>
        <p style="font-size: 16px; color: #333;">
          You're currently on: <strong>${stageName}</strong>
        </p>
        <p style="font-size: 16px; color: #333;">
          I have a Telegram assistant that can help you finish in minutes.
          It'll answer any questions you have.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${botLink}" style="background: #2962FF; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-size: 16px; font-weight: bold;">
            Chat with Assistant on Telegram
          </a>
        </div>
        <p style="font-size: 14px; color: #888; text-align: center;">
          Or open Telegram and search for @${CONFIG.BOT_USERNAME}
        </p>
      </div>
    </div>
  `;

  const plainBody =
    `Hi ${name},\n\n` +
    `I noticed you started setting up Razorpay for ${businessName} ` +
    `but haven't completed it yet.\n\n` +
    `You're currently on: ${stageName}\n\n` +
    `I have a Telegram assistant that can help you finish in minutes.\n\n` +
    `Tap here to chat: ${botLink}\n\n` +
    `Talk soon!\nRazorpay Onboarding Team`;

  GmailApp.sendEmail(email, subject, plainBody, { htmlBody: htmlBody });
}


// ═══════════════════════════════════════════════════════════════
// ZAP #3 EQUIVALENT — Auto Nudge
// ═══════════════════════════════════════════════════════════════

function autoNudge() {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  const now = new Date();
  let nudgesSent = 0;

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const chatId = String(row[COL.TELEGRAM_CHAT_ID] || "").trim();
    const status = String(row[COL.STATUS] || "").trim();
    const nudgeCount = parseInt(row[COL.NUDGE_COUNT]) || 0;
    const lastActivity = new Date(row[COL.LAST_ACTIVITY]);
    const currentStage = parseInt(row[COL.CURRENT_STAGE]);

    if (chatId === "" || status !== "active" || nudgeCount >= CONFIG.MAX_NUDGES) {
      continue;
    }

    const hoursSince = (now - lastActivity) / (1000 * 60 * 60);
    if (hoursSince < CONFIG.INACTIVITY_THRESHOLD_HOURS) {
      continue;
    }

    const message = getNudgeMessage(row, nudgeCount);
    if (message) {
      try {
        sendTelegramMessage(chatId, message);

        sheet.getRange(i + 1, COL.NUDGE_COUNT + 1).setValue(nudgeCount + 1);
        sheet.getRange(i + 1, COL.LAST_NUDGE_SENT + 1).setValue(now.toISOString());
        sheet.getRange(i + 1, COL.LAST_ACTIVITY + 1).setValue(now.toISOString());
        nudgesSent++;
        Utilities.sleep(1000);
      } catch (err) {
        console.error(`Failed to nudge ${row[COL.NAME]}:`, err);
      }
    }
  }

  console.log(`Nudges sent: ${nudgesSent}`);
}


// ═══════════════════════════════════════════════════════════════
// DAILY REPORT
// ═══════════════════════════════════════════════════════════════

function dailyReport() {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();

  let total = 0, active = 0, completed = 0, optedOut = 0, nudged = 0;
  const stageCounts = {};
  const stageNames = {
    1: "Sign-Up", 2: "Business Profile", 3: "KYC Verification",
    4: "Bank Account", 5: "Website Details", 6: "Integration", 7: "Go Live"
  };

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (!row[COL.USER_ID]) continue;
    total++;

    const status = String(row[COL.STATUS] || "").trim();
    if (status === "active") active++;
    else if (status === "completed") completed++;
    else if (status === "opted_out") optedOut++;

    if ((parseInt(row[COL.NUDGE_COUNT]) || 0) > 0) nudged++;

    const stage = parseInt(row[COL.CURRENT_STAGE]);
    if (status === "active" && !isNaN(stage)) {
      stageCounts[stage] = (stageCounts[stage] || 0) + 1;
    }
  }

  let stageBreakdown = "";
  for (let i = 2; i <= 7; i++) {
    if (stageCounts[i]) {
      stageBreakdown += `  Stage ${i} (${stageNames[i]}): ${stageCounts[i]}\n`;
    }
  }

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  });

  const report =
    `📊 *Daily Onboarding Report*\n${today}\n\n` +
    `👥 *Total Users:* ${total}\n` +
    `✅ Active: ${active}\n` +
    `🎉 Completed: ${completed}\n` +
    `🚫 Opted Out: ${optedOut}\n` +
    `📨 Nudged (at least once): ${nudged}\n\n` +
    `📍 *Active Users by Stage:*\n${stageBreakdown}\n` +
    `Keep going! 💪`;

  sendTelegramMessage(CONFIG.ADMIN_CHAT_ID, report);
}


// ═══════════════════════════════════════════════════════════════
// NUDGE MESSAGE SELECTION
// ═══════════════════════════════════════════════════════════════

function getNudgeMessage(row, nudgeCount) {
  const name = row[COL.NAME];
  const biz = row[COL.BUSINESS_NAME];
  const stage = parseInt(row[COL.CURRENT_STAGE]);
  const lastActivity = new Date(row[COL.LAST_ACTIVITY]);
  const daysSince = Math.floor((new Date() - lastActivity) / (1000 * 60 * 60 * 24));

  // Win-back for 7+ days
  if (daysSince >= 7) {
    return `Hey ${name}! It's been a while 👋\n\n` +
      `Your Razorpay setup for *${biz}* is still saved - you don't have to start over!\n\n` +
      `You're on step ${stage} of 7. Almost there!\n\n` +
      `Businesses that complete onboarding start accepting payments within 24 hours.\n\n` +
      `Ready to pick up where you left off?\n` +
      `→ Reply "Yes" and I'll guide you\n` +
      `→ Reply "Stop" if you'd prefer not to hear from me`;
  }

  const messages = {
    2: [
      `Hey ${name}! 👋\n\nSetting up your business profile on Razorpay takes just 2 minutes.\n\nYou'll need:\n- Business name & type\n- Business category\n- Registered address\n\nNeed help choosing the right business type? Just reply here and I'll guide you!`,
      `Hi ${name}, quick tip for ${biz}!\n\nNot sure which business type to select? Here's a quick guide:\n\n*Proprietorship* - You run the business yourself\n*Partnership* - You have partners with a partnership deed\n*Pvt Ltd / LLP* - Registered with MCA\n*Trust / Society* - For NGOs and non-profits\n\nReply with your business type and I'll tell you exactly what documents you'll need next!`,
      `${name}, your Razorpay account for *${biz}* is waiting!\n\nYou're just 5 steps away from accepting online payments.\n\nI can walk you through the business profile setup right here. Just say "Let's go!" 🚀\n\nOr if you have questions, ask away!`
    ],
    3: [
      `Hi ${name}! Your Razorpay setup for *${biz}* is progressing well.\n\nNext up: KYC verification. This keeps your business and customers safe.\n\nQuick question - do you have these ready?\n✅ PAN Card\n✅ Aadhaar Card (for proprietors)\n✅ Business proof (GST/Shop Act/FSSAI)\n\nIf not, no worries - I can help you figure out alternatives!`,
      `Hey ${name}, just checking in!\n\nA lot of business owners worry about sharing documents online. Totally valid!\n\nHere's why Razorpay is safe:\n🔒 PCI DSS Level 1 certified\n🔒 256-bit bank-grade encryption\n🔒 RBI regulated payment aggregator\n🔒 10M+ businesses trust Razorpay\n\nYour documents are only used for verification. Want to proceed?`,
      `${name}, here's something many business owners don't know:\n\n*GST registration is NOT mandatory* for all business types on Razorpay!\n\nProprietors can complete KYC with just:\n- PAN Card\n- Aadhaar Card\n- Any one business proof\n\nWant me to check what documents you need for *${biz}*?`
    ],
    4: [
      `Hi ${name}! You're halfway through your Razorpay setup 🎉\n\nNext step: Link your bank account for settlements.\n\nQuick facts:\n💰 Settlements arrive in T+2 days (or instant with Razorpay X)\n💰 No minimum balance required\n💰 Proprietors can use savings accounts!\n\nReady to link your account? Head to your Razorpay dashboard!`,
      `Hey ${name}, stuck on bank verification?\n\nCommon issues and fixes:\n1. *Name mismatch* → Bank account name must match your business name on KYC\n2. *Wrong IFSC* → Double-check on ifsc.razorpay.com\n3. *Verification failed* → Try re-entering details or use a different account\n\nNeed specific help? Just describe your issue!`
    ],
    5: [
      `${name}, you're almost there! *${biz}* is 70% set up ✨\n\nNext: Share your website or app details.\n\nDon't have a website? No problem!\n📱 *Payment Links* - Share on WhatsApp/Instagram\n🛒 *Payment Pages* - Razorpay hosts a checkout page for you\n📌 Social media sellers can submit their shop URL\n\nWhich option works for *${biz}*?`,
      `Hi ${name}! Quick reminder about policy pages.\n\nRazorpay requires these on your website:\n📋 Privacy Policy\n📋 Terms & Conditions\n📋 Refund/Cancellation Policy\n📋 Contact Us page\n\n*Good news:* Razorpay provides free templates you can customize!\n\nWant me to share the template links?`
    ],
    6: [
      `${name}, you're SO close! Just the integration step left for *${biz}* 🏁\n\nNot technical? Here are no-code options:\n\n🔗 *Payment Links* - Just share a link, no coding needed\n📦 *Shopify/WooCommerce Plugin* - Install in 2 clicks\n🔘 *Payment Button* - Copy-paste a code snippet\n\nWhich platform does your business use?`,
      `Hey ${name}, integrating Razorpay is easier than you think!\n\nIf you use:\n- *Shopify* → Install Razorpay app from Shopify store\n- *WooCommerce* → Install Razorpay plugin\n- *Wix* → Enable Razorpay in payment settings\n- *Custom website* → Use Checkout.js (just 10 lines of code!)\n- *No website* → Use Payment Links (zero code!)\n\nWhich one is you? I'll send you the exact steps!`
    ],
    7: [
      `Hi ${name}! Your *${biz}* account is under review 🔍\n\nThis usually takes 2-3 business days. While you wait:\n\n✅ Test your integration in test mode\n✅ Set up your team members on the dashboard\n✅ Explore Razorpay tools (invoices, subscriptions, etc.)\n\nI'll check back with you soon!`
    ]
  };

  const stageMessages = messages[stage];
  if (!stageMessages) return null;

  const idx = Math.min(nudgeCount, stageMessages.length - 1);
  return stageMessages[idx];
}


// ═══════════════════════════════════════════════════════════════
// OPENAI / CHATGPT
// ═══════════════════════════════════════════════════════════════

function buildSystemPrompt(row) {
  return `You are a friendly and helpful Razorpay SME Onboarding Assistant on Telegram. Your name is "Riya" (Razorpay's AI assistant).

## Context about the user:
- Name: ${row[COL.NAME]}
- Business: ${row[COL.BUSINESS_NAME]} (${row[COL.BUSINESS_TYPE]})
- Current onboarding stage: ${row[COL.STAGE_NAME]} (Stage ${row[COL.CURRENT_STAGE]} of 7)
- Last activity date: ${row[COL.LAST_ACTIVITY]}
- Previous nudges sent: ${row[COL.NUDGE_COUNT]}
- Drop-off reason (if known): ${row[COL.DROP_OFF_REASON] || "Unknown"}

## Your Goals:
1. Understand WHY the user dropped off at their current stage
2. Address their specific concern with accurate Razorpay knowledge
3. Guide them to complete the current step with clear, actionable instructions
4. Be warm, empathetic, and never pushy

## Razorpay Knowledge:
- Stage 2 (Business Profile): Business types are Proprietorship, Partnership, LLP, Pvt Ltd, Public Ltd, Trust, Society, NGO
- Stage 3 (KYC): PAN mandatory, Aadhaar for proprietors, GST is NOT mandatory for all types. Documents encrypted with 256-bit encryption. PCI DSS Level 1 certified.
- Stage 4 (Bank): Proprietors CAN use savings accounts. Companies need current accounts. Name must match KYC documents.
- Stage 5 (Website): No website? Use Payment Links or Payment Pages. Social media sellers can submit shop URL. Policy page templates available.
- Stage 6 (Integration): No-code options: Payment Links, Buttons, Pages. Plugins for Shopify, WooCommerce, Wix, Magento.
- Stage 7 (Go Live): Review takes 2-3 business days. Test mode available while waiting.
- Support: support@razorpay.com / 1800-258-5765

## Rules:
- Keep responses under 200 words
- Use *bold* for important terms (Telegram Markdown)
- End with a clear call-to-action or question
- NEVER share fake data or guarantee timelines
- NEVER ask for sensitive info (passwords, OTPs, card numbers)
- If unsure, redirect to official support`;
}

function callOpenAI(systemPrompt, userMessage) {
  const url = "https://api.openai.com/v1/chat/completions";

  const payload = {
    model: CONFIG.OPENAI_MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage }
    ],
    max_tokens: CONFIG.MAX_TOKENS,
    temperature: 0.7
  };

  const options = {
    method: "post",
    contentType: "application/json",
    headers: { "Authorization": "Bearer " + CONFIG.OPENAI_API_KEY },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    const json = JSON.parse(response.getContentText());

    if (json.choices && json.choices.length > 0) {
      return json.choices[0].message.content;
    }
    return "I'm having trouble responding right now. Please try again or contact support@razorpay.com for help.";
  } catch (err) {
    console.error("OpenAI error:", err);
    return "I'm having trouble responding right now. Please try again or contact support@razorpay.com for help.";
  }
}


// ═══════════════════════════════════════════════════════════════
// TELEGRAM API
// ═══════════════════════════════════════════════════════════════

function sendTelegramMessage(chatId, text) {
  const url = `https://api.telegram.org/bot${CONFIG.TELEGRAM_BOT_TOKEN}/sendMessage`;

  const payload = {
    chat_id: chatId,
    text: text,
    parse_mode: "Markdown"
  };

  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(url, options);
  const result = JSON.parse(response.getContentText());

  if (!result.ok) {
    // Retry without Markdown if parsing fails
    if (result.description && result.description.includes("parse")) {
      payload.parse_mode = undefined;
      options.payload = JSON.stringify(payload);
      UrlFetchApp.fetch(url, options);
    } else {
      console.error("Telegram send error:", JSON.stringify(result));
    }
  }
}


// ═══════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════

function getSheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME);
}

function findRowByChatId(data, chatId) {
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][COL.TELEGRAM_CHAT_ID]).trim() === chatId) {
      return i;
    }
  }
  return -1;
}

function findRowByEmail(data, email) {
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][COL.EMAIL]).trim().toLowerCase() === email) {
      return i;
    }
  }
  return -1;
}

function isValidEmail(text) {
  return /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(text.trim());
}

function isOptOut(text) {
  const lower = text.toLowerCase();
  const keywords = ["stop", "unsubscribe", "opt out", "opt-out",
    "don't message", "dont message", "leave me alone", "no more",
    "cancel", "remove me", "not interested"];
  return keywords.some(kw => lower.includes(kw));
}
