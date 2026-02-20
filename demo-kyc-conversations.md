# KYC Demo Conversations — What to Ask the Bot

Use these during your demo or interview recording. Each one hits a **different real drop-off reason** and shows the bot giving a genuinely useful answer, not a generic reply.

Best demo users from your sheet: **Priya Mehta** (CraftBazaar, Proprietorship), **Ananya Reddy** (SpiceRoute, Proprietorship, no GST), or **Rohit Verma** (CloudNine Travels, Partnership, worried about doc security).

---

## Conversation 1: "I don't have GST" (The #1 KYC blocker)

**Why this is great for demo:** Most people think GST is mandatory. The bot corrects this misconception with specific alternatives. Shows the bot actually knows Razorpay's rules.

```
You:  I don't have GST registration. Can I still complete KYC?

Bot:  [Will explain GST is NOT mandatory for proprietorships,
      you can use PAN + Aadhaar + any business proof like
      Shop Act License, FSSAI, etc.]
```

**Follow-up to keep the conversation going:**

```
You:  I don't have Shop Act or FSSAI either. I just sell
      spices from home on Instagram. What can I use?

Bot:  [Will suggest alternatives like utility bill, bank
      statement, or recommend contacting support for
      edge cases]
```

> **What this shows the interviewer:** The bot handles multi-turn conversations and doesn't just give a one-shot answer.

---

## Conversation 2: "Is it safe to upload my documents?" (Trust/security concern)

**Why this is great for demo:** This is an emotional objection, not a factual one. Shows the bot can be empathetic AND informative.

```
You:  I'm nervous about uploading my PAN card and Aadhaar
      online. How do I know my documents are safe?

Bot:  [Will acknowledge the concern, then explain PCI DSS
      Level 1, 256-bit encryption, RBI regulation, and
      that 10M+ businesses trust Razorpay]
```

**Follow-up:**

```
You:  What if there's a data breach? Has Razorpay ever
      been hacked?

Bot:  [Will explain security measures, suggest contacting
      official support for specific security questions,
      won't make false guarantees]
```

> **What this shows:** The bot handles security fears with real facts, not hand-waving. It also doesn't fabricate answers — it redirects to official support when unsure.

---

## Conversation 3: "What documents do I need exactly?" (Confused user)

**Why this is great for demo:** Shows the bot gives different answers based on business type (Proprietorship vs Pvt Ltd vs Partnership). Context-aware, not one-size-fits-all.

```
You:  What documents do I need for KYC? I run a small
      craft business by myself.

Bot:  [Will identify this as a Proprietorship and list:
      - PAN Card (mandatory)
      - Aadhaar Card
      - One business proof (GST/Shop Act/FSSAI/etc.)
      Will mention GST is optional]
```

**Then test with a different business type:**

```
You:  Actually, I'm registering as a Pvt Ltd company.
      Does that change things?

Bot:  [Will give the Pvt Ltd list instead:
      - PAN (business)
      - Certificate of Incorporation
      - Board Resolution
      - MOA/AOA]
```

> **What this shows:** The bot adapts its answers based on user input, not just the spreadsheet data. True conversational intelligence.

---

## Conversation 4: "My documents got rejected" (Frustrated user)

**Why this is great for demo:** Shows the bot handling frustration empathetically and giving actionable troubleshooting steps.

```
You:  I uploaded my PAN card and Razorpay rejected it.
      This is so frustrating. I've been trying for 3 days.

Bot:  [Will acknowledge frustration first, then suggest
      common rejection reasons: blurry image, name mismatch,
      expired document. Will recommend re-uploading with
      clear scan and matching names]
```

**Follow-up:**

```
You:  The name on my PAN is different from my business name.
      What do I do?

Bot:  [Will explain that for Proprietorships the PAN should
      be the individual's PAN, name should match exactly.
      Will suggest contacting support for name mismatch issues]
```

> **What this shows:** The bot doesn't just give information — it does customer support. It empathizes first, then troubleshoots.

---

## Conversation 5: "How long does verification take?" (Impatient user)

**Why this is great for demo:** Quick exchange that shows the bot gives precise timelines without over-promising.

```
You:  I submitted my KYC documents 2 days ago. When will
      I get verified?

Bot:  [Will say verification takes 1-2 business days,
      may take longer if additional documents are needed.
      Won't guarantee exact timing. Will suggest checking
      dashboard for status updates]
```

> **What this shows:** The bot follows the "never guarantee timelines" rule — it gives ranges, not promises. Shows responsible AI behavior.

---

## Conversation 6: "I want to stop" (Opt-out flow)

**Why this is great for demo:** Shows the bot respects user preferences immediately. Important for compliance.

```
You:  Stop messaging me please

Bot:  No problem at all! I've noted your preference. 🙏
      You won't receive any more messages from me.
      Your progress has been saved. If you ever want to
      resume, just send "Hi" to this chat.
      Wishing you the best! 💛
```

**Then show the Google Sheet:** The `status` column changes from `active` to `opted_out`. No more nudges will be sent.

> **What this shows:** GDPR/consent compliance. The bot stops immediately and updates the database. Interviewers love seeing this.

---

## Best Demo Script (5 minutes, covers everything)

For a tight demo, do these in order:

| # | You type | What it shows |
|---|----------|---------------|
| 1 | _(show Google Sheet with Priya at Stage 3)_ | Data layer |
| 2 | _(trigger Zap #3 manually)_ | Auto-nudge sends KYC message |
| 3 | `I don't have GST, can I still do KYC?` | Misconception-busting |
| 4 | `What documents do I need as a proprietorship?` | Context-aware help |
| 5 | `Is it safe to share my Aadhaar online?` | Security concern handling |
| 6 | `My PAN got rejected, what do I do?` | Frustration + troubleshooting |
| 7 | _(show Google Sheet updating last_activity)_ | Real-time data tracking |

This covers: nudging, AI conversation, security trust, troubleshooting, and data tracking — all in 5 minutes.

---

## Bonus: Questions for OTHER stages (if asked to show more)

**Stage 4 (Bank):**
- `My bank account name doesn't match my business name`
- `Can I use my savings account?`

**Stage 5 (Website):**
- `I don't have a website, I sell on Instagram`
- `Where do I get a refund policy template?`

**Stage 6 (Integration):**
- `I'm not a developer, how do I integrate?`
- `I use Shopify, what do I do?`
