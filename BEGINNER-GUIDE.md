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

There are 3 Zaps (automations) to build and they go in this order. I'm putting the new customer flow FIRST because that's where everything starts.

```
ZAP #1: "Email Invite"
   Sends an email with the bot link to new users in the sheet
   who don't have a chat_id yet.
   THIS IS HOW THE BOT REACHES NEW PEOPLE.

ZAP #2: "Reply Handler"
   When someone messages the bot, figure out who they are,
   save their chat_id, and reply using ChatGPT.
   THIS IS HOW THE BOT TALKS.

ZAP #3: "Auto Nudge"
   Every hour, check the sheet for inactive users who DO
   have a chat_id, and send them a reminder.
   THIS IS HOW THE BOT FOLLOWS UP.
```

Here's how they connect for a brand new user:

```
YOU add Priya to Google Sheet (chat_id is blank)
      ↓
ZAP #1 sees blank chat_id → emails Priya the bot link
      ↓
Priya clicks link → opens Telegram → taps "Start"
      ↓
ZAP #2 catches the message → asks "What's your email?"
      ↓
Priya types her email → ZAP #2 finds her row →
      WRITES chat_id into the sheet → "Found you!"
      ↓
Now chat_id is filled. Priya is connected.
      ↓
ZAP #3 can now send her nudges automatically.
ZAP #2 handles all her replies with ChatGPT.
```

---

### BEFORE YOU BUILD: Set up the basics (25 minutes)

#### A. Create a Telegram Bot (10 minutes)

1. Open Telegram on your phone
2. Search for `@BotFather` (this is Telegram's official bot-making bot)
3. Tap Start
4. Type `/newbot`
5. It will ask: "What name do you want?" Type: `Razorpay Onboarding Helper`
6. It will ask: "What username?" Type: `razorpay_onboard_bot` (must end in "bot")
7. BotFather will give you a long code called a TOKEN. It looks like: `6123456789:ABCdefGHIjklMNOpqrSTUvwxYZ`
8. SAVE THIS TOKEN. You'll need it later.
9. BotFather will also show your bot link: `https://t.me/razorpay_onboard_bot`. SAVE THIS TOO.

Done! Your bot exists now. It can't do anything yet, but it exists.

#### B. Create the Google Sheet (10 minutes)

1. Go to sheets.google.com
2. Create a new spreadsheet
3. Name it: `Razorpay Onboarding Tracker`
4. In Row 1, type these column headers (each in its own cell, A through O):

| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| user_id | telegram_chat_id | name | email | business_name | business_type | current_stage | stage_name | last_activity | nudge_count | last_nudge_sent | status | invite_sent | drop_off_reason | notes |

Here's what each column is for:
- **user_id**: A unique ID for each user (e.g., U001, U002)
- **telegram_chat_id**: Gets filled automatically when the user connects to the bot (leave blank initially)
- **name**: The user's name
- **email**: The user's email (used to match them when they connect via Telegram)
- **business_name**: Their business name on Razorpay
- **business_type**: Proprietorship, Pvt Ltd, LLP, Partnership, etc.
- **current_stage**: A number 1-7 representing which onboarding stage they're at
- **stage_name**: The human-readable name of the stage (e.g., "KYC Verification")
- **last_activity**: When the user was last active (date/time)
- **nudge_count**: How many nudge messages we've sent (starts at 0)
- **last_nudge_sent**: When the last nudge was sent (leave blank initially)
- **status**: "active", "completed", or "opted_out"
- **invite_sent**: "yes" or "no" — whether we've emailed them the bot link
- **drop_off_reason**: Optional — why they dropped off, if known
- **notes**: Optional — any extra notes

5. Add a test user in Row 2. Use YOUR real email so you can test it:

| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| U001 | _(leave empty)_ | Your Name | your.real@email.com | TestBiz | Proprietorship | 3 | KYC Verification | 2026-02-19 | 0 | _(leave empty)_ | active | no | _(leave empty)_ | _(leave empty)_ |

Notice: `telegram_chat_id` is BLANK and `invite_sent` is "no". This is a new user who hasn't connected to the bot yet.

#### C. Create a Zapier Account (5 minutes)

1. Go to zapier.com
2. Sign up with Google (free)
3. You're in.

---

### ZAP #1: EMAIL INVITE (sends bot link to new users)

This is the Zap that solves the "new customer problem." It finds users in your sheet who don't have a `telegram_chat_id` yet, and emails them an invite link to your Telegram bot.

#### What it does in plain English:

```
Every hour:
  Look at the Google Sheet
  Find anyone where:
    - telegram_chat_id is EMPTY (they haven't connected yet)
    - invite_sent is "no" (we haven't emailed them yet)
    - status is "active"
  Send them an email with the Telegram bot link
  Mark invite_sent as "yes" so we don't email them again
```

#### Click-by-click:

##### Step 1: Create the trigger

1. In Zapier, click the big orange "Create Zap" button
2. Search for **"Schedule by Zapier"**
3. Event: **"Every Hour"**
4. Click Continue, then Test, then Continue again

##### Step 2: Get rows from the sheet

1. Click the **"+"** button below the trigger
2. Search for **"Google Sheets"**
3. Event: choose **"Get Many Spreadsheet Rows"**
4. Click Continue
5. Connect your Google account (it will ask you to sign in)
6. Spreadsheet: select **"Razorpay Onboarding Tracker"**
7. Worksheet: select the sheet (usually "Sheet1")
8. Click Continue, then Test

##### Step 3: Filter to only new users

1. Click **"+"** again
2. Search for **"Filter by Zapier"**
3. Set up these conditions (click "AND" to add each one):
   - Field: **telegram_chat_id** → Condition: **Does not exist** (this means it's blank)
   - AND: **status** → Condition: **Text exactly matches** → Value: **active**
   - AND: **invite_sent** → Condition: **Text exactly matches** → Value: **no**
4. Click Continue

##### Step 4: Send the email

1. Click **"+"** again
2. Search for **"Gmail"** (or **"Email by Zapier"** if you don't want to use Gmail)
3. Event: **"Send Email"**
4. Connect your Gmail account
5. Fill in:
   - **To:** Click in the field, then select **"email"** from the Google Sheets data (the dropdown shows fields from earlier steps)
   - **Subject:** `Need help finishing your Razorpay setup?`
   - **Body:** (type this, but click to insert the {{fields}} from Google Sheets)

```
Hi {{name}},

I noticed you started setting up Razorpay for {{business_name}}
but haven't completed it yet.

You're currently on: {{stage_name}}

I have a Telegram assistant that can help you finish
in minutes. It'll answer any questions you have.

Tap here to chat: https://t.me/YOUR_BOT_USERNAME

Talk soon!
Razorpay Onboarding Team
```

   Replace `YOUR_BOT_USERNAME` with your actual bot username from BotFather.

6. Click Continue, then Test (this will send a real email to your test user — which is you!)
7. Check your inbox. You should see the email.

##### Step 5: Mark the user as invited

1. Click **"+"** again
2. Search for **"Google Sheets"**
3. Event: **"Update Spreadsheet Row"**
4. Spreadsheet: **"Razorpay Onboarding Tracker"**
5. Worksheet: your sheet
6. Row: select the **Row Number** from the "Get Many Spreadsheet Rows" step
7. Find the **invite_sent** column and type: **yes**
8. Click Continue, then Test

##### Step 6: Turn it on

1. Click **"Publish"** (or "Turn on Zap")
2. Give it a name: "Email Invite - New Users"

##### What just happened?

```
Every hour, Zapier:
  1. Looks at your Google Sheet
  2. Finds users with no chat_id and invite_sent = "no"
  3. Sends them a personalized email with the bot link
  4. Marks invite_sent = "yes" so it doesn't email them again

Your Google Sheet row changes from:

  BEFORE:
  | chat_id | name  | email           | invite_sent |
  | (empty) | Priya | priya@email.com | no          |

  AFTER:
  | chat_id | name  | email           | invite_sent |
  | (empty) | Priya | priya@email.com | yes         |

The chat_id is STILL empty. That gets filled by Zap #2
when Priya clicks the link and talks to the bot.
```

---

### ZAP #2: REPLY HANDLER (talks to users + saves chat_id)

This is the brain. It handles EVERY message that comes into the bot. It does TWO jobs:

- **Job 1 (new users):** When someone messages the bot for the first time, figure out who they are, and save their `telegram_chat_id` into the Google Sheet.
- **Job 2 (known users):** When a connected user sends a message, look up their context, ask ChatGPT, and reply.

#### What it does in plain English:

```
Someone sends a message to the bot
      ↓
Look up their chat_id in Google Sheets
      ↓
Found? → YES → This is a known user
  │              Ask ChatGPT for a smart reply
  │              Send the reply
  │
  └──→ NO → This is someone new
              Look up the message text as an EMAIL in Google Sheets
              Found? → YES → Save their chat_id into that row
              │               Send "Found your account!"
              │
              └──→ NO → Send "What's your email?"
```

#### Click-by-click:

##### Step 1: Create the trigger

1. Click **"Create Zap"**
2. Search for **"Telegram Bot"**
3. Event: **"New Message"**
4. Connect your bot (paste your TOKEN from BotFather)
5. Test it: go to Telegram, open your bot, send any message like "hello"
6. Come back to Zapier, click **"Test trigger"** — it should find your message
7. Click Continue

##### Step 2: Look up the user by chat_id

1. Click **"+"**
2. Search for **"Google Sheets"**
3. Event: **"Lookup Spreadsheet Row"**
4. Spreadsheet: **"Razorpay Onboarding Tracker"**
5. Worksheet: your sheet
6. Lookup Column: **telegram_chat_id**
7. Lookup Value: click in the field, select **"Chat Id"** from the Telegram trigger
8. Click Continue, then Test
9. IMPORTANT: The test will probably say "no row found" since your sheet doesn't have a chat_id yet. That's FINE. That's exactly what we're handling.

##### Step 3: Split into paths

1. Click **"+"**
2. Search for **"Paths by Zapier"**

This creates two paths. You'll set up each one:

##### Step 3A: PATH A — "Known User" (chat_id was found)

1. Click on **Path A**
2. Rename it to **"Known User"**
3. Set the rule:
   - Field: select **"id"** (or any field) from the Google Sheets Lookup step
   - Condition: **Exists**
   - This means the lookup found a row — the user is already in the system

4. Under Path A, click **"+"** → search **"ChatGPT"** or **"OpenAI"**
5. Event: **"Conversation"**
6. Connect your OpenAI account (you need an API key from platform.openai.com)
7. Model: **gpt-4o-mini**
8. System Prompt: Copy from `zapier-openai-system-prompt.txt` in this repo.
   But replace the `{{variables}}` by clicking in the field and selecting the matching data from the Google Sheets Lookup:
   - `{{name}}` → select **name** from Sheets
   - `{{business_name}}` → select **business_name** from Sheets
   - `{{business_type}}` → select **business_type** from Sheets
   - `{{stage_name}}` → select **stage_name** from Sheets
   - `{{current_stage}}` → select **current_stage** from Sheets
9. User Message: select **"Text"** from the Telegram trigger (this is what the user typed)
10. Click Continue, then Test

11. Under Path A, click **"+"** again → search **"Telegram Bot"**
12. Event: **"Send Message"**
13. Chat ID: select **"Chat Id"** from the Telegram trigger
14. Text: select the **reply/response** from the ChatGPT step
15. Click Continue

**Path A is done.** This handles all conversations with users who are already connected.

##### Step 3B: PATH B — "New User" (chat_id was NOT found)

1. Click on **Path B** (or click "+ Add Path" if it doesn't exist)
2. Rename it to **"New User"**
3. Set the rule:
   - Field: select **"id"** (or any field) from the Google Sheets Lookup step
   - Condition: **Does not exist**
   - This means no row was found — the chat_id isn't in the sheet

4. Under Path B, click **"+"** → search **"Google Sheets"**
5. Event: **"Lookup Spreadsheet Row"**
6. Spreadsheet: **"Razorpay Onboarding Tracker"**
7. Worksheet: your sheet
8. Lookup Column: **email**
9. Lookup Value: select **"Text"** from the Telegram trigger (the user's message — hopefully their email)
10. Click Continue, then Test

Now we need ANOTHER split inside Path B:

11. Under Path B, click **"+"** → search **"Paths by Zapier"** (yes, paths inside paths)

##### Step 3B-1: SUB-PATH — "Email Found" (we matched the user)

1. Click on the first sub-path
2. Rename it to **"Email Found"**
3. Set the rule:
   - Field: select **"id"** (or any field) from the EMAIL lookup step (step 4 above, NOT step 2)
   - Condition: **Exists**

4. Click **"+"** → search **"Google Sheets"**
5. Event: **"Update Spreadsheet Row"**
6. Spreadsheet: **"Razorpay Onboarding Tracker"**
7. Worksheet: your sheet
8. Row: select **"Row Number"** from the EMAIL lookup step
9. Find the column **telegram_chat_id** and click in the field
10. Select **"Chat Id"** from the Telegram trigger (Step 1)
11. Click Continue, then Test

**THIS IS THE STEP THAT FILLS IN THE CHAT_ID.** This is the answer to the whole "new customer problem." Right here, Zapier takes the chat_id that Telegram gave it and writes it into the Google Sheet.

12. Click **"+"** → search **"Telegram Bot"**
13. Event: **"Send Message"**
14. Chat ID: select **"Chat Id"** from the Telegram trigger
15. Text: Type this (clicking to insert fields from the EMAIL lookup):

```
I found your account!

Here's what I see:
- Business: {{business_name}}
- Current step: {{stage_name}} (Step {{current_stage}} of 7)

Would you like help completing this step? Just tell me what you're stuck on and I'll guide you through it.
```

16. Click Continue

##### Step 3B-2: SUB-PATH — "Email Not Found" (we don't know who this is)

1. Click on the second sub-path
2. Rename it to **"Email Not Found"**
3. Set the rule:
   - Field: select **"id"** from the EMAIL lookup step
   - Condition: **Does not exist**

4. Click **"+"** → search **"Telegram Bot"**
5. Event: **"Send Message"**
6. Chat ID: select **"Chat Id"** from the Telegram trigger
7. Text:

```
Welcome! I'm the Razorpay Onboarding Assistant.

To connect your account, please share the email address you used to sign up on Razorpay.

(Type your email and send it as a message)
```

8. Click Continue

##### Step 4: Turn it on

1. Click **"Publish"**
2. Name it: "Reply Handler - Bot Brain"

##### Here's what the full Zap looks like:

```
TRIGGER: Telegram Bot - New Message
  │
  ├─ STEP 2: Google Sheets - Lookup by telegram_chat_id
  │
  └─ STEP 3: Paths
       │
       ├── PATH A: "Known User" (chat_id found in sheet)
       │     │
       │     ├─ ChatGPT: Generate smart reply using user's context
       │     │
       │     └─ Telegram: Send the ChatGPT reply
       │
       └── PATH B: "New User" (chat_id NOT in sheet)
             │
             ├─ Google Sheets: Lookup by EMAIL (using message text)
             │
             └─ Sub-Paths:
                  │
                  ├── "Email Found":
                  │     │
                  │     ├─ Google Sheets: UPDATE ROW
                  │     │  (writes telegram_chat_id into the row)
                  │     │  *** THIS SOLVES THE NEW CUSTOMER PROBLEM ***
                  │     │
                  │     └─ Telegram: "Found your account! You're at..."
                  │
                  └── "Email Not Found":
                        │
                        └─ Telegram: "What's your email on Razorpay?"
```

---

### ZAP #3: AUTO NUDGE (sends reminders to inactive users)

This only works for users who ALREADY have a `telegram_chat_id` in the sheet. Zap #1 and #2 make sure that happens first.

#### What it does in plain English:

```
Every hour:
  Look at Google Sheet
  Find anyone where:
    - telegram_chat_id is NOT empty (they're connected)
    - last_activity is more than 24 hours ago (they've gone quiet)
    - status is "active"
    - nudge_count is less than 4 (don't spam them)
  Send them a stage-specific nudge message on Telegram
  Update nudge_count so we track how many we've sent
```

#### Click-by-click:

##### Step 1: Create the trigger

1. Click **"Create Zap"**
2. Search for **"Schedule by Zapier"**
3. Event: **"Every Hour"**
4. Click Continue

##### Step 2: Get rows from the sheet

1. Click **"+"**
2. Search for **"Google Sheets"** → **"Get Many Spreadsheet Rows"**
3. Select your spreadsheet and worksheet
4. Click Continue, then Test

##### Step 3: Filter to only connected, inactive users

1. Click **"+"**
2. Search for **"Filter by Zapier"**
3. Set these conditions:
   - **telegram_chat_id** → **Exists** (not empty — they're connected)
   - AND: **status** → **Text exactly matches** → **active**
   - AND: **nudge_count** → **Number less than** → **4**
   - AND: **last_activity** → **Date is before** → use Zapier's date math to say "24 hours ago"

For the date comparison: In the value field, you can type `{{zap_meta_human_now}}` and Zapier will compare it. Or use a **"Code by Zapier"** step to calculate if more than 24 hours have passed. The simplest way: use **"Formatter by Zapier"** → **"Date/Time"** → **"Compare Dates"** before the filter.

4. Click Continue

##### Step 4: Route by stage (send different messages)

1. Click **"+"**
2. Search for **"Paths by Zapier"**
3. Set up one path per stage:

**Path A: current_stage = 2 (Business Profile)**
- Rule: current_stage **Text exactly matches** 2
- Action: Telegram Bot → Send Message
- Chat ID: select **telegram_chat_id** from Google Sheets
- Text: Copy the Stage 2 message from `nudge-message-templates.md`
  - Replace {{name}} by clicking and selecting **name** from Sheets
  - Replace {{business_name}} by selecting **business_name** from Sheets

**Path B: current_stage = 3 (KYC)**
- Same setup, use Stage 3 message

**Path C: current_stage = 4 (Bank Account)**
- Same setup, use Stage 4 message

**Path D: current_stage = 5 (Website)**
- Same setup, use Stage 5 message

**Path E: current_stage = 6 (Integration)**
- Same setup, use Stage 6 message

**Path F: current_stage = 7 (Go Live)**
- Same setup, use Stage 7 message

##### Step 5: Update the spreadsheet

At the end of EACH path (after the Telegram Send Message), add:

1. Click **"+"**
2. Search for **"Google Sheets"** → **"Update Spreadsheet Row"**
3. Row: select **Row Number** from the Get Many Rows step
4. Set **nudge_count** to: the current nudge_count + 1 (use a **"Formatter by Zapier"** → **"Numbers"** → **"Perform Math Operation"** step before this to add 1)
5. Set **last_nudge_sent** to today's date/time (use `{{zap_meta_human_now}}`)
6. Set **last_activity** to today's date/time

##### Step 6: Turn it on

1. Click **"Publish"**
2. Name it: "Auto Nudge - Hourly Check"

---

### TESTING THE WHOLE THING (30 minutes)

Here's how to test the COMPLETE flow from new user to conversation:

#### Test 1: The email invite

1. Make sure your Google Sheet has a row with YOUR real email, blank chat_id, and invite_sent = "no"
2. Manually run Zap #1 (click "Run" in Zapier)
3. Check your email inbox — you should get the invite email with the bot link
4. Check Google Sheets — `invite_sent` should now say "yes"

#### Test 2: Connecting to the bot

1. Click the bot link in the email you received
2. Telegram opens, you see your bot
3. Tap **"Start"**
4. The bot should say: "Welcome! Please share the email you used on Razorpay"
5. Type your email (the same one in the Google Sheet)
6. The bot should say: "Found your account! You're at KYC Verification..."
7. Check Google Sheets — YOUR `telegram_chat_id` should now be FILLED IN

#### Test 3: Having a conversation

1. Type something to the bot: "I don't have GST, what do I do?"
2. The bot should reply with a helpful ChatGPT-powered answer about how GST isn't mandatory
3. Ask another question, see if it keeps the context

#### Test 4: Getting a nudge

1. In Google Sheets, change your `last_activity` to 2 days ago
2. Manually run Zap #3
3. You should get a nudge message on Telegram about KYC (since you're at stage 3)
4. Check Google Sheets — your `nudge_count` should increase by 1

If all 4 tests pass, your bot is fully working.

---

### RECORDING YOUR DEMO (20 minutes)

1. Reset your Google Sheet row (clear chat_id, set invite_sent to "no")
2. Start screen recording (show Google Sheet, Zapier, Telegram, and email side by side)
3. Walk through all 4 tests, narrating what's happening
4. Show the Google Sheet updating in real time
5. Post on LinkedIn, add to resume

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
