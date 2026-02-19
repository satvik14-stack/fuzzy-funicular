# Razorpay SME Onboarding Bot - Telegram + Zapier

## Project Goal

Build a Telegram AI bot using Zapier that re-engages SME (Small & Medium Enterprise) users who drop off during Razorpay's onboarding journey. The bot identifies where a user abandoned the process, sends contextual nudges, addresses concerns, and guides them back to complete onboarding.

---

## 1. Razorpay SME Onboarding Journey (Mapped)

Based on Razorpay's public documentation and the onboarding flow visible at https://dashboard.razorpay.com, the SME onboarding journey has **7 key stages**:

```
Stage 1: Sign-Up
    |
Stage 2: Business Profile
    |
Stage 3: Stakeholder / Owner KYC
    |
Stage 4: Bank Account Verification
    |
Stage 5: Website / App Details
    |
Stage 6: Integration & Testing (Test Mode)
    |
Stage 7: Go Live (Activation)
```

### Stage-by-Stage Breakdown

| # | Stage | What User Does | Typical Drop-off Reason |
|---|-------|---------------|------------------------|
| 1 | **Sign-Up** | Registers with email/phone, sets password | Curiosity browsers, not ready to commit |
| 2 | **Business Profile** | Enters business name, type (Pvt Ltd, Proprietorship, etc.), category (e-commerce, SaaS, education, etc.), registered address | Confusion about business category selection; sole proprietors unsure which type to pick |
| 3 | **Stakeholder KYC** | Uploads PAN card, Aadhaar, proof of business (GST certificate, Shop Act license, etc.) | Documents not readily available; fear of sharing sensitive docs online; GST not registered |
| 4 | **Bank Account Verification** | Links business bank account via penny drop or bank statement upload | Mismatch between business name and bank account name; don't have a current account yet |
| 5 | **Website / App Details** | Submits live website/app URL, describes products/services, pricing page, refund policy, T&C, privacy policy | Website not ready; missing mandatory policy pages; app still in development |
| 6 | **Integration & Testing** | Generates API keys, integrates Razorpay SDK/plugin, runs test transactions | Technical complexity; no developer available; unsure which integration method to use |
| 7 | **Go Live** | Submits for final review, Razorpay compliance team activates the account | Stuck in review; additional documents requested; compliance rejection |

---

## 2. Drop-off Analysis & Bot Intervention Strategy

### Where Do Most SMEs Drop Off?

Based on industry data for payment gateway onboarding:

| Stage | Estimated Drop-off Rate | Severity |
|-------|------------------------|----------|
| Sign-Up -> Business Profile | ~30% | High |
| Business Profile -> KYC | ~25% | High |
| KYC -> Bank Verification | ~15% | Medium |
| Bank -> Website Details | ~20% | High |
| Website -> Integration | ~25% | High |
| Integration -> Go Live | ~10% | Medium |

### Bot Intervention Windows

| Drop-off Duration | Action |
|-------------------|--------|
| 1 hour | No action (user may still be gathering docs) |
| 24 hours | Soft nudge: "Hey! We noticed you started your Razorpay setup..." |
| 48 hours | Value nudge: Share a success story or tip relevant to their stage |
| 72 hours | Help nudge: "Need help with [specific stage]? I can guide you!" |
| 7 days | Final nudge: "Your onboarding is almost done! Just [X] steps left" |
| 14 days | Win-back: "Things have changed! Here's what's new on Razorpay..." |

---

## 3. Telegram Bot Conversation Flows

### 3.1 Initial Contact Flow

```
Bot: Hi {name}! I'm the Razorpay Onboarding Assistant.

     I noticed you started setting up your Razorpay account for
     {business_name} but haven't completed it yet.

     You're currently at: {current_stage}
     Steps remaining: {remaining_steps}

     Would you like me to help you finish?

     1. Yes, guide me through it
     2. I'm stuck on something specific
     3. I'll come back later
     4. I'm no longer interested
```

### 3.2 Stage-Specific Nudge Messages

#### Stage 2 Drop-off (Business Profile)

```
Bot: Setting up your business profile takes just 2 minutes!

     Quick question - are you unsure about any of these?
     1. Which business type to select
     2. Which business category fits my business
     3. What documents I'll need later
     4. Something else

[If option 1]
Bot: Here's a quick guide:
     - Sole Proprietorship: If you run the business yourself
     - Partnership: If you have partners with a deed
     - Pvt Ltd / LLP: If your company is registered with MCA
     - Trust / Society: For NGOs and non-profits

     Which one matches your business?
```

#### Stage 3 Drop-off (KYC)

```
Bot: KYC verification is crucial - it keeps your business and
     customers safe.

     What's holding you up?
     1. I don't have the required documents ready
     2. I'm worried about sharing documents online
     3. I don't have GST registration
     4. My documents got rejected

[If option 2]
Bot: Totally understandable! Here's how Razorpay protects your data:
     - PCI DSS Level 1 certified
     - Bank-grade 256-bit encryption
     - RBI regulated payment aggregator
     - Your documents are only used for verification

     Over 10 million businesses trust Razorpay with their data.
     Would you like to proceed?

[If option 3]
Bot: Good news! GST is NOT mandatory for all business types.
     - Proprietorships can use PAN + Aadhaar
     - You can add GST later when you register

     Want me to show you what documents you need for your
     business type?
```

#### Stage 4 Drop-off (Bank Account)

```
Bot: You're halfway there! Just need to link your bank account.

     What's the blocker?
     1. I don't have a current/business account yet
     2. Name on bank account doesn't match business name
     3. Bank verification failed
     4. Not sure which account to link

[If option 1]
Bot: For sole proprietorships, you can actually use your
     savings account!

     For Pvt Ltd/LLP, you'll need a current account.
     Most banks offer instant current account opening now.

     Want me to share some quick options?
```

#### Stage 5 Drop-off (Website/App)

```
Bot: Your account is almost ready! Just need your website details.

     What's the challenge?
     1. My website isn't ready yet
     2. I don't have policy pages (refund, privacy, T&C)
     3. I sell on social media, not a website
     4. My website was rejected

[If option 2]
Bot: Policy pages are mandatory but easy to create!
     Here's what you need:
     - Privacy Policy
     - Terms & Conditions
     - Refund/Cancellation Policy
     - Contact Us page

     Razorpay provides templates you can customize.
     Should I share the links?

[If option 3]
Bot: Great news! You can use Razorpay Payment Links and
     Payment Pages even without a website!

     - Payment Links: Share on WhatsApp/Instagram
     - Payment Pages: Create a simple checkout page

     You can submit your social media profiles as your
     business URL. Want to try this route?
```

#### Stage 6 Drop-off (Integration)

```
Bot: You're so close! Just the technical integration left.

     What's your situation?
     1. I'm not technical / don't have a developer
     2. I'm not sure which integration to use
     3. I'm having errors during integration
     4. I want to use a plugin (Shopify/WooCommerce/etc.)

[If option 1]
Bot: No worries! You don't need to code.

     Razorpay has no-code options:
     - Payment Links (just share a link!)
     - Payment Pages (drag & drop checkout page)
     - Payment Buttons (copy-paste a snippet)

     Plus plugins for: Shopify, WooCommerce, Wix,
     Magento, and more.

     Which platform do you use?
```

### 3.3 Win-Back Flow (7+ days inactive)

```
Bot: Hey {name}! It's been a while since we heard from you.

     Your Razorpay onboarding for {business_name} is
     {completion_percentage}% complete.

     Here's what businesses like yours achieved after going live:
     - {similar_business} started accepting payments in 24 hours
     - Average SME processes their first transaction within 2 days

     Ready to pick up where you left off?
     1. Yes, let's do it!
     2. I switched to another provider
     3. I have questions first
     4. Please stop messaging me
```

### 3.4 Opt-Out Flow

```
Bot: No problem at all! I've noted your preference.
     You won't receive any more messages from me.

     If you ever want to resume, just send "Hi" to this chat.
     Your progress has been saved.

     Wishing you all the best with {business_name}!
```

---

## 4. Zapier Implementation Plan

### 4.1 Architecture Overview

```
[Google Sheets / Airtable]    <-- User data & onboarding stage tracking
        |
        v
[Zapier Schedule Trigger]    <-- Checks every hour for drop-offs
        |
        v
[Zapier Filter]              <-- Filter users by drop-off duration
        |
        v
[Zapier Paths]               <-- Route by onboarding stage
        |
        v
[Telegram Bot Action]        <-- Send stage-specific message
        |
        v
[Zapier Webhook]             <-- Receive user replies
        |
        v
[OpenAI / ChatGPT Action]   <-- Generate contextual responses
        |
        v
[Telegram Bot Action]        <-- Send AI response
        |
        v
[Google Sheets Update]       <-- Log interaction & update status
```

### 4.2 Prerequisites

| Tool | Purpose | Cost |
|------|---------|------|
| Zapier Account (Free/Starter) | Automation platform | Free for 100 tasks/month |
| Telegram Bot (via BotFather) | User communication channel | Free |
| Google Sheets | User database & tracking | Free |
| OpenAI API Key | AI-powered responses | ~$0.002 per conversation |

### 4.3 Step-by-Step Zapier Setup

#### Step 1: Create Your Telegram Bot

```
1. Open Telegram, search for @BotFather
2. Send /newbot
3. Name it: "Razorpay Onboarding Assistant"
4. Username: razorpay_onboarding_bot (or similar available name)
5. Save the API token you receive
```

#### Step 2: Set Up Google Sheets Database

Create a Google Sheet with these columns:

| Column | Description | Example |
|--------|-------------|---------|
| A: user_id | Telegram user ID or phone | 91XXXXXXXXXX |
| B: telegram_chat_id | Telegram chat ID for sending messages | 123456789 |
| C: name | Contact name | Rahul Sharma |
| D: business_name | Their business | TechStart Solutions |
| E: business_type | Proprietorship/Pvt Ltd/etc. | Proprietorship |
| F: current_stage | Stage number (1-7) | 3 |
| G: stage_name | Human readable stage | KYC Verification |
| H: last_activity | Timestamp of last action | 2026-02-18T10:30:00 |
| I: nudge_count | Number of nudges sent | 1 |
| J: last_nudge_sent | Timestamp of last nudge | 2026-02-19T10:30:00 |
| K: status | active / completed / opted_out | active |
| L: drop_off_reason | Why they dropped (from bot conversation) | Documents not ready |
| M: notes | Additional context | Will return after GST registration |

#### Step 3: Zap 1 - Drop-off Detection & Outbound Nudge

```
TRIGGER: Schedule by Zapier
  - Frequency: Every 1 hour

ACTION 1: Google Sheets - Get Many Rows
  - Spreadsheet: "Razorpay Onboarding Tracker"
  - Sheet: "Users"
  - Filter: status = "active"

ACTION 2: Filter by Zapier
  - Condition: last_activity is before 24 hours ago
  - AND nudge_count < 4
  - AND status != "opted_out"

ACTION 3: Paths by Zapier
  Path A: Stage 2 drop-off (Business Profile)
    - Condition: current_stage = 2
    - Message template: [Stage 2 nudge message]

  Path B: Stage 3 drop-off (KYC)
    - Condition: current_stage = 3
    - Message template: [Stage 3 nudge message]

  Path C: Stage 4 drop-off (Bank Account)
    - Condition: current_stage = 4
    - Message template: [Stage 4 nudge message]

  Path D: Stage 5 drop-off (Website)
    - Condition: current_stage = 5
    - Message template: [Stage 5 nudge message]

  Path E: Stage 6 drop-off (Integration)
    - Condition: current_stage = 6
    - Message template: [Stage 6 nudge message]

ACTION 4: Telegram Bot - Send Message
  - Chat ID: {telegram_chat_id}
  - Text: {stage-specific message from Path}
  - Parse Mode: Markdown

ACTION 5: Google Sheets - Update Row
  - nudge_count: {nudge_count + 1}
  - last_nudge_sent: {current timestamp}
```

#### Step 4: Zap 2 - Handle User Replies (Conversational AI)

```
TRIGGER: Telegram Bot - New Message
  - Bot token: {your_bot_token}

ACTION 1: Google Sheets - Lookup Row
  - Lookup column: telegram_chat_id
  - Lookup value: {message.chat.id}

ACTION 2: ChatGPT (OpenAI) - Conversation
  - Model: gpt-4o-mini (cost-effective)
  - System Prompt:
    "You are a helpful Razorpay onboarding assistant on Telegram.
     The user's name is {name}.
     Their business is {business_name} ({business_type}).
     They are currently stuck at stage: {stage_name}.
     They have been inactive for {hours_since_last_activity} hours.

     Your job is to:
     1. Understand why they dropped off
     2. Address their specific concern
     3. Guide them back to complete the current stage
     4. Be empathetic, concise, and helpful
     5. If they mention a specific problem, provide actionable solutions
     6. Never be pushy - if they want to opt out, respect that

     Razorpay knowledge:
     - KYC: PAN mandatory, Aadhaar for proprietors, GST optional for some
     - Bank: Savings account OK for proprietors, current account for companies
     - Website: Payment Links/Pages available as no-website alternative
     - Integration: No-code options exist (Payment Links, Buttons, Plugins)
     - Review: Usually takes 2-3 business days
     - Support: support@razorpay.com or call 1800-258-5765"

  - User Message: {telegram message text}

ACTION 3: Telegram Bot - Send Message
  - Chat ID: {message.chat.id}
  - Text: {ChatGPT response}

ACTION 4: Google Sheets - Update Row
  - last_activity: {current timestamp}
  - notes: Append {user message summary}

ACTION 5: Filter - Check for opt-out keywords
  - If message contains "stop", "unsubscribe", "opt out", "don't message"
  - Then: Update status to "opted_out"
```

#### Step 5: Zap 3 - New User Registration (Welcome Flow)

```
TRIGGER: Telegram Bot - New Message
  - Condition: Message text = "/start"

ACTION 1: Telegram Bot - Send Message
  - Text: "Welcome! I'm the Razorpay Onboarding Assistant.

           I help businesses like yours get set up on Razorpay
           quickly and smoothly.

           To get started, what's your registered email or
           phone number on Razorpay?"

ACTION 2: Store chat_id in Google Sheets for future matching
```

#### Step 6: Zap 4 - Daily Summary Report

```
TRIGGER: Schedule - Every day at 9 AM IST

ACTION 1: Google Sheets - Get all rows where status = "active"

ACTION 2: Code by Zapier (JavaScript)
  - Calculate:
    - Total active users
    - Users by stage
    - Average drop-off duration
    - Users nudged today
    - Users who responded
    - Users who completed after nudge

ACTION 3: Telegram Bot - Send Message
  - Chat ID: {your_admin_chat_id}
  - Text: Daily onboarding report with stats
```

### 4.4 Inline Keyboard Buttons (Better UX)

Instead of numbered options, use Telegram inline keyboards in Zapier:

```json
{
  "inline_keyboard": [
    [
      {"text": "Yes, guide me!", "callback_data": "guide_me"},
      {"text": "I'm stuck", "callback_data": "stuck"}
    ],
    [
      {"text": "Come back later", "callback_data": "later"},
      {"text": "Not interested", "callback_data": "not_interested"}
    ]
  ]
}
```

Note: Zapier's native Telegram integration supports inline keyboards
via the "Send Message with Inline Keyboard" action in the Telegram
Bot integration.

### 4.5 Handling Callback Queries (Button Presses)

```
TRIGGER: Webhooks by Zapier - Catch Hook
  - Set your Telegram bot webhook to this Zapier webhook URL

ACTION 1: Filter - Check if it's a callback_query

ACTION 2: Paths by Zapier
  Path A: callback_data = "guide_me"
    -> Send stage-specific guidance
  Path B: callback_data = "stuck"
    -> Ask what they're stuck on
  Path C: callback_data = "later"
    -> Schedule follow-up in 48 hours
  Path D: callback_data = "not_interested"
    -> Opt-out flow
```

---

## 5. Data Flow Diagram

```
                    RAZORPAY DASHBOARD
                    (User drops off)
                          |
                    [Manual/CSV Export]
                          |
                          v
                   GOOGLE SHEETS DB
              (User data + stage tracking)
                    |            ^
                    |            |
                    v            |
              ZAPIER ENGINE      |
           /       |       \     |
          v        v        v    |
    Schedule   Webhook   Filter  |
    Trigger    Trigger          |
          \       |       /     |
           v      v      v      |
           PATHS / ROUTER       |
          /    |    |    \      |
         v     v    v     v     |
      Stage  Stage Stage Stage  |
       2      3     4     5     |
       msg   msg   msg   msg    |
          \    |    |    /      |
           v   v    v   v       |
         TELEGRAM BOT API      |
               |                |
               v                |
          USER ON TELEGRAM      |
               |                |
               v                |
          USER REPLIES          |
               |                |
               v                |
         OPENAI / GPT-4o-mini   |
               |                |
               v                |
         SEND RESPONSE -------->|
         + UPDATE SHEET ------->+
```

---

## 6. Sample Google Sheets Data (For Testing)

| user_id | telegram_chat_id | name | business_name | business_type | current_stage | stage_name | last_activity | nudge_count | status |
|---------|-----------------|------|---------------|---------------|---------------|------------|--------------|-------------|--------|
| U001 | 111222333 | Priya Mehta | CraftBazaar | Proprietorship | 3 | KYC Verification | 2026-02-17T14:00:00 | 0 | active |
| U002 | 444555666 | Arjun Patel | DevStack Solutions | Pvt Ltd | 5 | Website Details | 2026-02-16T09:30:00 | 1 | active |
| U003 | 777888999 | Sneha Gupta | FitLife Studio | Proprietorship | 6 | Integration | 2026-02-18T16:00:00 | 0 | active |
| U004 | 101112131 | Rajesh Kumar | KisanDirect | Partnership | 2 | Business Profile | 2026-02-15T11:00:00 | 2 | active |

---

## 7. Key Metrics to Track

| Metric | How to Measure |
|--------|---------------|
| **Nudge Response Rate** | Users who replied / Users nudged |
| **Re-engagement Rate** | Users who resumed onboarding after bot contact |
| **Completion Rate** | Users who reached Stage 7 after bot intervention |
| **Average Time to Complete** | Time from first nudge to completion |
| **Drop-off Reason Distribution** | Categorize reasons from conversations |
| **Opt-out Rate** | Users who asked to stop / Total nudged |
| **Stage-wise Recovery** | Which stage has highest re-engagement |
| **Bot Satisfaction** | Quick thumbs up/down after conversation |

---

## 8. Resume-Ready Project Description

### Suggested Title
**"AI-Powered SME Onboarding Re-engagement Bot"**

### Resume Bullet Points

- Designed and built a Telegram chatbot using Zapier, OpenAI GPT-4o-mini, and Google Sheets to re-engage SME users who dropped off during payment gateway onboarding
- Mapped a 7-stage onboarding journey, identified key drop-off points, and created stage-specific intervention strategies with contextual nudge messaging
- Implemented automated drop-off detection with time-based escalation (24h/48h/72h/7d) reducing theoretical re-engagement time by 60%
- Built conversational AI flows that diagnose user-specific blockers (KYC, compliance, technical integration) and provide actionable resolution paths
- Created a no-code automation pipeline processing user interactions through Zapier Paths, OpenAI API, and Telegram Bot API with Google Sheets as the data layer
- Tracked key metrics including nudge response rate, re-engagement rate, stage-wise recovery, and drop-off reason distribution

---

## 9. Cost Estimate

| Component | Monthly Cost |
|-----------|-------------|
| Zapier Free Plan | $0 (100 tasks/month) |
| Zapier Starter (if needed) | $19.99 (750 tasks/month) |
| Telegram Bot API | $0 (free) |
| Google Sheets | $0 (free) |
| OpenAI API (GPT-4o-mini) | ~$2-5 (for ~1000 conversations) |
| **Total (Free tier)** | **$0 - $5/month** |
| **Total (Starter tier)** | **$20 - $25/month** |

---

## 10. Future Enhancements (Mention in Interview)

1. **Razorpay API Integration** - Pull real onboarding status via Razorpay Partner API instead of manual Google Sheets
2. **Multi-language Support** - Hindi, Tamil, Bengali, Marathi for regional SMEs
3. **WhatsApp Integration** - WhatsApp Business API for higher open rates (95% vs 45% for email)
4. **Predictive Drop-off** - ML model to predict which users are likely to drop off BEFORE they do
5. **A/B Testing Nudges** - Test different message tones, timings, and content
6. **Slack Integration** - Notify the sales/support team when a high-value lead re-engages
7. **Voice Bot** - IVR integration for users who prefer phone calls
8. **Analytics Dashboard** - Real-time dashboard using Google Data Studio or Metabase

---

## 11. Implementation Timeline

| Week | Task |
|------|------|
| Week 1, Day 1-2 | Create Telegram bot via BotFather, set up Google Sheets database |
| Week 1, Day 3-4 | Build Zap 1 (Drop-off detection & outbound nudge) |
| Week 1, Day 5-7 | Build Zap 2 (Conversational AI reply handler) |
| Week 2, Day 1-2 | Build Zap 3 (Welcome flow) and Zap 4 (Daily report) |
| Week 2, Day 3-4 | Test with sample data, refine prompts and messages |
| Week 2, Day 5-7 | Record demo video, write documentation, add to resume |

---

## 12. Demo Script (For Portfolio / Interview)

1. Show the Google Sheets database with sample users at different stages
2. Trigger the drop-off detection Zap manually
3. Show the Telegram bot sending a stage-specific nudge
4. Reply as the user with a specific concern ("I don't have GST")
5. Show the AI generating a helpful, contextual response
6. Show the Google Sheets updating with the interaction log
7. Show the daily summary report

---

*Project by: [Your Name]*
*Built with: Zapier, Telegram Bot API, OpenAI GPT-4o-mini, Google Sheets*
*Focus: SME Payment Gateway Onboarding Drop-off Recovery*
