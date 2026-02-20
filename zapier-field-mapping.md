# Zapier Field Mapping Reference

Exact field-by-field values for every Zapier step. Open this side-by-side with the Zapier editor.

---

## Prerequisites Checklist

Before you start, make sure you have:

- [ ] **Telegram Bot Token** from @BotFather (looks like `6123456789:ABCdefGHIjklMNOpqrSTUvwxYZ`)
- [ ] **Telegram Bot Username** (e.g., `razorpay_onboard_bot`)
- [ ] **Google Sheet** named "Razorpay Onboarding Tracker" with columns A-O as defined in `BEGINNER-GUIDE.md`
- [ ] **OpenAI API Key** from platform.openai.com (looks like `sk-...`)
- [ ] **Zapier Account** (free tier works)
- [ ] At least **one test row** in the Google Sheet with YOUR email

---

## ZAP #1: Email Invite

**Zapier URL:** zapier.com → Create Zap

### Step 1: Trigger

| Setting | Value |
|---------|-------|
| App | **Schedule by Zapier** |
| Event | **Every Hour** |
| Day of the Week | _(leave default — every day)_ |
| Time of Day | _(leave default — every hour)_ |

### Step 2: Get Many Spreadsheet Rows

| Setting | Value |
|---------|-------|
| App | **Google Sheets** |
| Event | **Get Many Spreadsheet Rows** |
| Account | _(your Google account)_ |
| Spreadsheet | **Razorpay Onboarding Tracker** |
| Worksheet | **Sheet1** |

### Step 3: Filter by Zapier

| Condition # | Field (select from dropdown) | Condition | Value |
|-------------|------------------------------|-----------|-------|
| 1 | telegram_chat_id | **Does not exist** | _(leave empty)_ |
| AND 2 | status | **Text exactly matches** | `active` |
| AND 3 | invite_sent | **Text exactly matches** | `no` |

### Step 4: Send Email (Gmail)

| Setting | Value |
|---------|-------|
| App | **Gmail** |
| Event | **Send Email** |
| Account | _(your Gmail)_ |
| To | Click field → select **email** from Step 2 |
| From | _(your email, auto-filled)_ |
| Subject | `Need help finishing your Razorpay setup?` |
| Body Type | **html** |
| Body | Paste from `invite-email-template.html`. Replace `YOUR_BOT_USERNAME` with your bot's username. Click inside `{{name}}` and select **name** from Step 2. Click inside `{{business_name}}` and select **business_name**. Click inside `{{stage_name}}` and select **stage_name**. |

### Step 5: Update Spreadsheet Row (Google Sheets)

| Setting | Value |
|---------|-------|
| App | **Google Sheets** |
| Event | **Update Spreadsheet Row** |
| Spreadsheet | **Razorpay Onboarding Tracker** |
| Worksheet | **Sheet1** |
| Row | Click field → select **Row Number** from Step 2 |
| invite_sent | `yes` |
| _(all other columns)_ | _(leave blank — only fills what you specify)_ |

---

## ZAP #2: Reply Handler

### Step 1: Trigger

| Setting | Value |
|---------|-------|
| App | **Telegram Bot** |
| Event | **New Message** |
| Account | Connect using your **bot token** |

> Test: Send any message to your bot on Telegram, then click "Test trigger" in Zapier.

### Step 2: Lookup Spreadsheet Row (by chat_id)

| Setting | Value |
|---------|-------|
| App | **Google Sheets** |
| Event | **Lookup Spreadsheet Row** |
| Spreadsheet | **Razorpay Onboarding Tracker** |
| Worksheet | **Sheet1** |
| Lookup Column | **telegram_chat_id** |
| Lookup Value | Click field → select **Chat Id** from Step 1 (Telegram) |

> The test will say "no row found" if you haven't connected yet. That's expected.

### Step 3: Paths by Zapier

---

#### PATH A: "Known User"

| Setting | Value |
|---------|-------|
| Path Name | `Known User` |
| Rule: Field | Select **user_id** (or any field) from Step 2 (Lookup) |
| Rule: Condition | **Exists** |

##### Step A1: Code by Zapier — Detect Opt-Out

| Setting | Value |
|---------|-------|
| App | **Code by Zapier** |
| Event | **Run JavaScript** |
| Input Data: `messageText` | Select **Text** from Step 1 (Telegram) |
| Code | Copy the `code_step_4_detect_optout` code from `zapier-code-steps.js` |

##### Step A2: Filter — Only continue if NOT opt-out

| Condition | Field | Condition | Value |
|-----------|-------|-----------|-------|
| 1 | **isOptOut** from Step A1 | **Text exactly matches** | `no` |

##### Step A3: ChatGPT — Generate Reply

| Setting | Value |
|---------|-------|
| App | **ChatGPT** (or **OpenAI**) |
| Event | **Conversation** |
| Account | Connect with your OpenAI API key |
| Model | **gpt-4o-mini** |
| System Prompt | Copy from `zapier-openai-system-prompt.txt`. Click inside each `{{variable}}` and select the matching field from Step 2 (Sheets Lookup): |

| Placeholder in prompt | Select from Step 2 |
|-----------------------|-------------------|
| `{{name}}` | **name** |
| `{{business_name}}` | **business_name** |
| `{{business_type}}` | **business_type** |
| `{{stage_name}}` | **stage_name** |
| `{{current_stage}}` | **current_stage** |
| `{{last_activity}}` | **last_activity** |
| `{{nudge_count}}` | **nudge_count** |
| `{{drop_off_reason}}` | **drop_off_reason** |

| Setting | Value |
|---------|-------|
| User Message | Select **Text** from Step 1 (Telegram) |
| Max Tokens | `300` |
| Temperature | `0.7` |

##### Step A4: Telegram Bot — Send Reply

| Setting | Value |
|---------|-------|
| App | **Telegram Bot** |
| Event | **Send Message** |
| Chat ID | Select **Chat Id** from Step 1 (Telegram trigger) |
| Text | Select **Reply** (or **Response**) from Step A3 (ChatGPT) |
| Parse Mode | **Markdown** |

##### Step A5: Google Sheets — Update last_activity

| Setting | Value |
|---------|-------|
| App | **Google Sheets** |
| Event | **Update Spreadsheet Row** |
| Spreadsheet | **Razorpay Onboarding Tracker** |
| Worksheet | **Sheet1** |
| Row | Select **Row Number** from Step 2 (Lookup) |
| last_activity | Type `{{zap_meta_human_now}}` |

##### Step A-OptOut: (Only if opt-out detected)

Add a **second path** after Step A1 where `isOptOut` = `yes`:

| Setting | Value |
|---------|-------|
| Telegram: Text | `No problem at all! I've noted your preference. 🙏 You won't receive any more messages. If you ever want to resume, just send "Hi" to this chat.` |
| Google Sheets: status | `opted_out` |

---

#### PATH B: "New User"

| Setting | Value |
|---------|-------|
| Path Name | `New User` |
| Rule: Field | Select **user_id** from Step 2 (Lookup) |
| Rule: Condition | **Does not exist** |

##### Step B1: Code by Zapier — Validate Email

| Setting | Value |
|---------|-------|
| App | **Code by Zapier** |
| Event | **Run JavaScript** |
| Input Data: `messageText` | Select **Text** from Step 1 (Telegram) |
| Code | Copy the `code_step_6_validate_email` code from `zapier-code-steps.js` |

##### Step B2: Paths (inside Path B)

---

###### SUB-PATH B2a: "Is Email"

| Setting | Value |
|---------|-------|
| Rule: Field | **isEmail** from Step B1 |
| Condition | **Text exactly matches** |
| Value | `yes` |

**Step B2a-1:** Google Sheets — Lookup by email

| Setting | Value |
|---------|-------|
| Event | **Lookup Spreadsheet Row** |
| Lookup Column | **email** |
| Lookup Value | Select **cleanedEmail** from Step B1 |

**Step B2a-2:** Paths (email found or not?)

**Sub-path "Email Found":**
- Rule: user_id from B2a-1 → **Exists**
- **Google Sheets — Update Row:**
  - Row: **Row Number** from Step B2a-1
  - telegram_chat_id: Select **Chat Id** from Step 1 (Telegram)
  - last_activity: `{{zap_meta_human_now}}`
- **Code by Zapier** (code_step_7_welcome_message):
  - Input: name, businessName, stageName, currentStage from Step B2a-1
- **Telegram — Send Message:**
  - Chat ID: **Chat Id** from Step 1
  - Text: **welcomeMessage** from the Code step above

**Sub-path "Email Not Found":**
- Rule: user_id from B2a-1 → **Does not exist**
- **Telegram — Send Message:**
  - Chat ID: **Chat Id** from Step 1
  - Text: `I couldn't find an account with that email. 😕 Please double-check and try again. Make sure you've signed up at https://dashboard.razorpay.com first.`

---

###### SUB-PATH B2b: "Not Email" (message is /start or random text)

| Setting | Value |
|---------|-------|
| Rule: Field | **isEmail** from Step B1 |
| Condition | **Text exactly matches** |
| Value | `no` |

**Telegram — Send Message:**

| Setting | Value |
|---------|-------|
| Chat ID | Select **Chat Id** from Step 1 |
| Text | `Welcome! I'm the Razorpay Onboarding Assistant. 👋 To connect your account, please share the email address you used to sign up on Razorpay. (Type your email and send it as a message)` |

---

## ZAP #3: Auto Nudge

### Step 1: Trigger

| Setting | Value |
|---------|-------|
| App | **Schedule by Zapier** |
| Event | **Every Hour** |

### Step 2: Get Many Spreadsheet Rows

| Setting | Value |
|---------|-------|
| App | **Google Sheets** |
| Event | **Get Many Spreadsheet Rows** |
| Spreadsheet | **Razorpay Onboarding Tracker** |
| Worksheet | **Sheet1** |

### Step 3: Code by Zapier — Calculate Inactivity

| Setting | Value |
|---------|-------|
| App | **Code by Zapier** |
| Event | **Run JavaScript** |
| Input Data: `lastActivity` | Select **last_activity** from Step 2 |
| Code | Copy the `code_step_1_calculate_inactivity` code from `zapier-code-steps.js` |

### Step 4: Filter by Zapier

| Condition # | Field | Condition | Value |
|-------------|-------|-----------|-------|
| 1 | **telegram_chat_id** from Step 2 | **Exists** | _(leave empty)_ |
| AND 2 | **status** from Step 2 | **Text exactly matches** | `active` |
| AND 3 | **nudge_count** from Step 2 | **(Number) Less than** | `4` |
| AND 4 | **isInactive24h** from Step 3 | **Text exactly matches** | `yes` |

### Step 5: Code by Zapier — Pick Message + Increment Count

| Setting | Value |
|---------|-------|
| App | **Code by Zapier** |
| Event | **Run JavaScript** |
| Input Data: `nudgeCount` | **nudge_count** from Step 2 |
| Input Data: `currentStage` | **current_stage** from Step 2 |
| Input Data: `name` | **name** from Step 2 |
| Input Data: `businessName` | **business_name** from Step 2 |
| Code | Copy the `code_step_3_pick_nudge_message` code from `zapier-code-steps.js` |

### Step 6: Telegram Bot — Send Nudge

| Setting | Value |
|---------|-------|
| App | **Telegram Bot** |
| Event | **Send Message** |
| Chat ID | Select **telegram_chat_id** from Step 2 |
| Text | Select **messageText** from Step 5 (Code) |
| Parse Mode | **Markdown** |

### Step 7: Code by Zapier — Increment Nudge Count

| Setting | Value |
|---------|-------|
| Input Data: `nudgeCount` | **nudge_count** from Step 2 |
| Code | Copy the `code_step_2_increment_nudge` code from `zapier-code-steps.js` |

### Step 8: Google Sheets — Update Row

| Setting | Value |
|---------|-------|
| Event | **Update Spreadsheet Row** |
| Spreadsheet | **Razorpay Onboarding Tracker** |
| Worksheet | **Sheet1** |
| Row | Select **Row Number** from Step 2 |
| nudge_count | Select **newNudgeCount** from Step 7 |
| last_nudge_sent | Select **currentTimestamp** from Step 7 |
| last_activity | Select **currentTimestamp** from Step 7 |

---

## ZAP #4: Daily Report (Optional)

### Step 1: Trigger

| Setting | Value |
|---------|-------|
| App | **Schedule by Zapier** |
| Event | **Every Day** |
| Time of Day | **9:00 AM** |

### Step 2: Get Many Spreadsheet Rows

| Setting | Value |
|---------|-------|
| App | **Google Sheets** |
| Event | **Get Many Spreadsheet Rows** |
| Spreadsheet | **Razorpay Onboarding Tracker** |
| Worksheet | **Sheet1** |

### Step 3: Code by Zapier — Generate Report

| Setting | Value |
|---------|-------|
| Input Data: `statuses` | Comma-separated list of all **status** values |
| Input Data: `stages` | Comma-separated list of all **current_stage** values |
| Input Data: `nudgeCounts` | Comma-separated list of all **nudge_count** values |
| Code | Copy the `code_step_5_daily_report` code from `zapier-code-steps.js` |

> Note: Getting comma-separated values from "Get Many Rows" requires
> using Zapier's **Looping** feature or a **Formatter** step to combine values.

### Step 4: Telegram Bot — Send Report

| Setting | Value |
|---------|-------|
| Chat ID | Your personal chat ID (send /start to @userinfobot to find it) |
| Text | Select **reportText** from Step 3 |
| Parse Mode | **Markdown** |

---

## Quick Reference: Which file goes where

| File in this repo | Where to use it |
|--------------------|----------------|
| `zapier-openai-system-prompt.txt` | Zap #2, Path A, ChatGPT System Prompt |
| `nudge-message-templates.md` | Reference only (messages are built by Code steps) |
| `invite-email-template.html` | Zap #1, Step 4 (Gmail Body) |
| `zapier-code-steps.js` | Zap #2 and #3, Code by Zapier steps |
| `sample-data.csv` | Import into Google Sheets for testing |
| `google-apps-script.gs` | **Alternative:** paste into Google Sheets Apps Script to skip Zapier entirely |
