# Razorpay Onboarding Bot - The "Explain Like I'm 5" Guide

---

## PART 1: WHAT IS THIS PROJECT?

### What is Razorpay?

Razorpay is like a cash register for the internet. When you buy something online and you pay with your card or UPI, there's a company in the middle that makes that payment happen. Razorpay is that company. Think of it like Paytm or PhonePe, but for businesses.

### What is an SME?

SME = Small and Medium Enterprise. Basically, small businesses. Think:
- A guy selling t-shirts on Instagram
- A tuition teacher taking fees online
- A small restaurant doing online orders
- A freelance graphic designer

### What is "onboarding"?

Onboarding = the signup process. When a small business owner wants to use Razorpay to accept payments, they can't just sign up and start. They have to go through a bunch of steps:

1. Create an account (email + password)
2. Tell Razorpay about their business (name, type, address)
3. Upload ID documents (PAN card, Aadhaar, GST, etc.)
4. Link their bank account (where money will go)
5. Show their website or app
6. Connect Razorpay to their website (the techy part)
7. Get approved and go live

This is like applying for a bank account. You don't just walk in and get one. You fill forms, show your ID, they verify, and THEN you get the account.

### What is "drop-off"?

Imagine you're filling a 7-page form. You finish page 1, page 2, page 3... and then on page 4 you think "ugh, I don't have my bank details right now" and you close the browser.

YOU JUST DROPPED OFF.

You didn't finish. You left in the middle. This is a HUGE problem for Razorpay because:
- They spent money on ads to get you to sign up
- You WANTED to use their product
- But something stopped you
- And now you might never come back

### So what are WE building?

We're building a ROBOT on Telegram that sends a message to people who dropped off, like:

> "Hey! I noticed you started setting up Razorpay but didn't finish. Stuck on something? I can help!"

And when the person replies, the bot uses AI (ChatGPT) to have a helpful conversation and guide them back.

That's it. That's the whole project.

---

## PART 2: WHAT TOOLS ARE WE USING?

We need 4 things. All free (or nearly free).

### Tool 1: Telegram Bot
- **What it is:** A chat bot on Telegram (the messaging app)
- **Why:** This is how we talk to the users
- **Cost:** Free
- **Think of it as:** A phone number that a robot answers

### Tool 2: Google Sheets
- **What it is:** A spreadsheet (like Excel but online)
- **Why:** This is our database. We store the list of users, what stage they're at, and when they dropped off
- **Cost:** Free
- **Think of it as:** A notebook where we write down everyone's info

### Tool 3: Zapier
- **What it is:** A tool that connects other tools together WITHOUT coding
- **Why:** This is the "brain" that checks the spreadsheet, decides who to message, and sends the message
- **Cost:** Free for basic use
- **Think of it as:** An assistant that follows your instructions automatically. Like: "Every hour, check my spreadsheet. If someone hasn't been active for 24 hours, send them a Telegram message."

### Tool 4: OpenAI (ChatGPT)
- **What it is:** The AI that powers ChatGPT
- **Why:** When a user replies to our bot, we need smart, helpful responses. ChatGPT generates those.
- **Cost:** ~$0.002 per conversation (basically free)
- **Think of it as:** A really smart customer support person who works 24/7

### How do they connect?

```
Google Sheets         Zapier            Telegram        User
(our notebook)   (our assistant)      (the phone)    (the person)
     |                 |                  |              |
     |--- "Hey, this --|                  |              |
     |    user has     |                  |              |
     |    been gone    |                  |              |
     |    24 hours"    |                  |              |
     |                 |--- "Send them ---|              |
     |                 |    a message"    |              |
     |                 |                  |-- "Hey! ---->|
     |                 |                  |   Need help?"|
     |                 |                  |              |
     |                 |                  |<- "Yes, I ---|
     |                 |                  |   don't have |
     |                 |                  |   GST"       |
     |                 |                  |              |
     |                 |--- Ask ChatGPT --|              |
     |                 |    what to say   |              |
     |                 |                  |              |
     |                 |--- "Send this ---|              |
     |                 |    response"     |              |
     |                 |                  |-- "GST is -->|
     |                 |                  |  not needed! |
     |                 |                  |  Here's what |
     |                 |                  |  you can do" |
     |                 |                  |              |
     |<-- "Update the--|                  |              |
     |    spreadsheet" |                  |              |
```

---

## PART 3: THE 7 STAGES (EXPLAINED SIMPLY)

Here's what happens when a small business owner signs up for Razorpay, and why they might quit at each stage:

### Stage 1: Sign Up
**What they do:** Enter email, phone number, create password
**Why they quit:** "I was just looking, not serious yet"
**What our bot says:** Nothing yet (too soon)

### Stage 2: Business Profile
**What they do:** Fill in business name, what kind of business, address
**Why they quit:** "I'm confused. Am I a 'Proprietorship' or 'Pvt Ltd'? I don't know these terms!"
**What our bot says:** "Hey! Not sure what business type to pick? If you run the business by yourself, choose 'Proprietorship'. Simple as that!"

### Stage 3: KYC (ID Verification)
**What they do:** Upload PAN card, Aadhaar, GST certificate
**Why they quit:**
  - "I don't have GST registration"
  - "I'm scared to upload my documents online"
  - "My documents are at my CA's office"
**What our bot says:** "Did you know GST is NOT required for all businesses? You can use just PAN + Aadhaar. And your docs are encrypted with bank-level security."

### Stage 4: Bank Account
**What they do:** Enter bank account number and IFSC code
**Why they quit:**
  - "My bank account name doesn't match my business name"
  - "I don't have a current account"
**What our bot says:** "If you're a sole proprietor, you can use your personal savings account! No current account needed."

### Stage 5: Website Details
**What they do:** Submit their website URL, show refund policy, privacy policy pages
**Why they quit:**
  - "My website isn't ready yet"
  - "I don't HAVE a website, I sell on Instagram"
  - "I don't have a refund policy page"
**What our bot says:** "No website? No problem! Razorpay has Payment Links - just share a link on WhatsApp and collect payments. Zero website needed!"

### Stage 6: Integration (The Techy Part)
**What they do:** Connect Razorpay to their website using code/plugins
**Why they quit:**
  - "I'm not a programmer"
  - "I don't have a developer"
  - "This is too complicated"
**What our bot says:** "You don't need to code! If you use Shopify, just install the Razorpay app. If you don't have a website, use Payment Links. Zero code!"

### Stage 7: Go Live
**What they do:** Wait for Razorpay to review and approve their account
**Why they quit:** "It's been 3 days and nothing happened"
**What our bot says:** "Review usually takes 2-3 business days. While you wait, you can test everything in test mode!"

---

## PART 4: HOW TO BUILD IT (STEP BY STEP)

### Step 1: Create a Telegram Bot (10 minutes)

1. Open Telegram on your phone
2. Search for `@BotFather` (this is Telegram's official bot-making bot)
3. Tap Start
4. Type `/newbot`
5. It will ask: "What name do you want?" Type: `Razorpay Onboarding Helper`
6. It will ask: "What username?" Type: `razorpay_onboard_bot` (must end in "bot")
7. BotFather will give you a long code called a TOKEN. It looks like: `6123456789:ABCdefGHIjklMNOpqrSTUvwxYZ`
8. SAVE THIS TOKEN. You'll need it later.

Done! Your bot exists now. It can't do anything yet, but it exists.

### Step 2: Create the Google Sheet (15 minutes)

1. Go to sheets.google.com
2. Create a new spreadsheet
3. Name it: `Razorpay Onboarding Tracker`
4. In Row 1, type these column headers:

| A | B | C | D | E | F | G | H | I | J | K |
|---|---|---|---|---|---|---|---|---|---|---|
| user_id | telegram_chat_id | name | business_name | business_type | current_stage | stage_name | last_activity | nudge_count | status | drop_off_reason |

5. Add some fake data in row 2 (for testing):

| A | B | C | D | E | F | G | H | I | J | K |
|---|---|---|---|---|---|---|---|---|---|---|
| U001 | (leave blank for now) | Priya | CraftBazaar | Proprietorship | 3 | KYC Verification | 2026-02-17 | 0 | active | |

You now have a "database" of users. In real life, this data would come from Razorpay's system, but for our demo, we fill it in manually.

### Step 3: Create a Zapier Account (5 minutes)

1. Go to zapier.com
2. Sign up with Google (free)
3. You're in. That's it.

### Step 4: Build Zap #1 - "Reply to messages" (30 minutes)

This is the most important one. When someone sends a message to your Telegram bot, this Zap catches it, thinks of a smart reply using ChatGPT, and sends it back.

**Here's how, click by click:**

#### 4a. Create the Trigger (what starts the Zap)

1. In Zapier, click "Create Zap" (big orange button)
2. For the TRIGGER, search for "Telegram Bot"
3. Choose "New Message"
4. It will ask you to connect your Telegram bot
5. Paste your TOKEN from Step 1
6. Test it by sending any message to your bot on Telegram
7. Zapier should pick up the message. Click "Continue"

#### 4b. Add Action 1: Look up the user in Google Sheets

1. Click the "+" to add an action
2. Search for "Google Sheets"
3. Choose "Lookup Spreadsheet Row"
4. Connect your Google account
5. Select your spreadsheet: "Razorpay Onboarding Tracker"
6. Lookup column: "telegram_chat_id"
7. Lookup value: Select the "Chat ID" field from the Telegram trigger
8. This finds the user's row in your spreadsheet

#### 4c. Add Action 2: Ask ChatGPT what to say

1. Click "+" again
2. Search for "ChatGPT" or "OpenAI"
3. Choose "Conversation"
4. Connect your OpenAI account (you'll need an API key from platform.openai.com)
5. Model: gpt-4o-mini
6. System Prompt: Copy-paste from `zapier-openai-system-prompt.txt` in this repo
   - Replace the {{variables}} with fields from Google Sheets (Zapier lets you click to insert these)
7. User Message: Select the "Text" field from the Telegram trigger (this is what the user typed)

#### 4d. Add Action 3: Send the reply back on Telegram

1. Click "+" again
2. Search for "Telegram Bot"
3. Choose "Send Message"
4. Chat ID: Select "Chat ID" from the Telegram trigger
5. Text: Select the "Reply" from the ChatGPT action
6. Turn on the Zap!

#### What just happened?

You built this flow:

```
User sends message on Telegram
        ↓
Zapier catches the message
        ↓
Zapier looks up the user in Google Sheets
(finds their name, business, what stage they're stuck at)
        ↓
Zapier sends all that context + the user's message to ChatGPT
        ↓
ChatGPT generates a helpful reply
        ↓
Zapier sends that reply back to the user on Telegram
```

**Congratulations! You have a working AI bot!**

### Step 5: Build Zap #2 - "Send nudges automatically" (30 minutes)

This checks your spreadsheet every hour and sends messages to people who've been inactive.

#### 5a. Trigger

1. Create a new Zap
2. Trigger: "Schedule by Zapier"
3. Frequency: "Every Hour"

#### 5b. Get users from the spreadsheet

1. Action: "Google Sheets" → "Get Many Spreadsheet Rows"
2. Select your spreadsheet
3. This pulls all the rows

#### 5c. Filter inactive users

1. Action: "Filter by Zapier"
2. Condition: "last_activity" is before "24 hours ago"
3. AND: "status" equals "active"
4. AND: "nudge_count" is less than "4"

#### 5d. Route by stage

1. Action: "Paths by Zapier"
2. Path A: IF current_stage = 2 → send Stage 2 message
3. Path B: IF current_stage = 3 → send Stage 3 message
4. Path C: IF current_stage = 4 → send Stage 4 message
5. (and so on for stages 5, 6, 7)

#### 5e. Send the message

1. At the end of each Path, add: "Telegram Bot" → "Send Message"
2. Use the templates from `nudge-message-templates.md`
3. Replace {{name}} and {{business_name}} with fields from Google Sheets

#### 5f. Update the spreadsheet

1. Action: "Google Sheets" → "Update Spreadsheet Row"
2. Find the row for this user
3. Set nudge_count = nudge_count + 1
4. Set last_nudge_sent = current date/time

Done! Now every hour, your bot checks for inactive users and nudges them.

### Step 6: Test Everything (30 minutes)

1. Open your Telegram bot
2. Send it a message: "Hi"
3. Check if Zap #1 picks it up and replies
4. Put YOUR Telegram chat ID in the Google Sheet
5. Set your last_activity to yesterday
6. Manually run Zap #2 and see if you get a nudge
7. Reply to the nudge and see if Zap #1 handles it

### Step 7: Record a Demo (20 minutes)

1. Screen-record yourself doing Step 6
2. Show the Google Sheet, Zapier dashboard, and Telegram side by side
3. Narrate what's happening
4. Post it on LinkedIn and put it on your resume

---

## PART 5: COMMON QUESTIONS

### "Where does the user data come from?"

In a REAL scenario, Razorpay's system would export this data. For our demo, we manually type it into Google Sheets. That's perfectly fine for a portfolio project.

### "Is this legal? Can I just message random people?"

For a demo, you're messaging yourself. In production, the business would have users' consent. Our bot also has an opt-out option ("Reply STOP to unsubscribe").

### "What if I don't have an OpenAI API key?"

Go to platform.openai.com, sign up, add $5 credit (or use the free trial credits), and create an API key. $5 will last you thousands of test conversations.

### "Can I show this in an interview?"

YES! That's the whole point. This shows:
- You understand user journeys and drop-off analysis
- You can build automation without code
- You understand AI/chatbot design
- You think about business problems (revenue recovery)

### "What if Zapier's free plan isn't enough?"

Free plan gives you 100 tasks/month. For a demo, that's plenty. Each message sent or received = 1 task. So you can demo it 50 times easily.

### "I don't understand Paths in Zapier"

Think of it like a road that splits:

```
                    Is the user stuck at...
                    /     |     |     \
                Stage 2  Stage 3  Stage 4  Stage 5
                  |        |        |        |
              Send msg  Send msg  Send msg  Send msg
              about     about     about     about
              business  KYC      bank      website
              profile   docs     account   details
```

Each "path" sends a different message based on where the user is stuck.

### "What's a webhook?"

A webhook is like giving someone your phone number and saying "call me when something happens." You give Telegram Zapier's "phone number" (a URL), and whenever someone messages your bot, Telegram "calls" Zapier to let it know.

Zapier sets this up automatically when you connect your Telegram bot. You don't have to do anything manually.

---

## PART 6: TIMELINE

| Day | What to do | Time needed |
|-----|-----------|-------------|
| Day 1 | Create Telegram bot + Google Sheet | 30 min |
| Day 1 | Create Zapier account + connect everything | 15 min |
| Day 2 | Build Zap #1 (reply handler) | 45 min |
| Day 2 | Test Zap #1 thoroughly | 30 min |
| Day 3 | Build Zap #2 (auto nudge) | 45 min |
| Day 3 | Test everything end to end | 30 min |
| Day 4 | Record demo video, write LinkedIn post | 1 hour |

**Total: About 4-5 hours spread over 4 days.**

---

## PART 7: WHAT TO SAY IN AN INTERVIEW

> "I built a Telegram bot that re-engages SME users who drop off during Razorpay's onboarding journey. I mapped the 7-stage onboarding flow, identified the top reasons users abandon at each stage, and created an AI-powered bot that sends contextual nudges and has intelligent conversations to guide users back. It's built on Zapier with OpenAI for natural language responses and uses Google Sheets as the data layer. The whole system runs automatically without any code."

If they ask follow-up questions:
- "How did you identify drop-off reasons?" → "I studied Razorpay's onboarding flow, analyzed common friction points in fintech KYC processes, and mapped each stage to typical user objections."
- "Why Telegram?" → "High open rates (95%+), free bot API, and it's where many SME owners already communicate."
- "What would you improve?" → "Real-time Razorpay API integration instead of manual data, WhatsApp Business API for wider reach, and A/B testing different nudge messages."

---

*You've got this! Start with Step 1 (create the Telegram bot) and take it one step at a time.*
