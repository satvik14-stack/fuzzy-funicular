# Nudge Message Templates for Zapier

Copy-paste these into your Zapier Path actions. Replace `{{variables}}` with Zapier field mappings from your Google Sheets step.

**Important:** All `{{field_name}}` placeholders below correspond to column names in your Google Sheet. In Zapier's editor, click in the text field and select the matching field from the Google Sheets step dropdown (e.g., select "name" for `{{name}}`, select "business_name" for `{{business_name}}`).

---

## Stage 2: Business Profile Drop-off

### Nudge 1 (24 hours)
```
Hey {{name}}! 👋

Setting up your business profile on Razorpay takes just 2 minutes.

You'll need:
- Business name & type
- Business category
- Registered address

Need help choosing the right business type? Just reply here and I'll guide you!
```

### Nudge 2 (48 hours)
```
Hi {{name}}, quick tip for {{business_name}}!

Not sure which business type to select? Here's a quick guide:

*Proprietorship* - You run the business yourself
*Partnership* - You have partners with a partnership deed
*Pvt Ltd / LLP* - Registered with MCA
*Trust / Society* - For NGOs and non-profits

Reply with your business type and I'll tell you exactly what documents you'll need next!
```

### Nudge 3 (72 hours)
```
{{name}}, your Razorpay account for *{{business_name}}* is waiting!

You're just 5 steps away from accepting online payments.

I can walk you through the business profile setup right here. Just say "Let's go!" 🚀

Or if you have questions, ask away!
```

---

## Stage 3: KYC Verification Drop-off

### Nudge 1 (24 hours)
```
Hi {{name}}! Your Razorpay setup for *{{business_name}}* is progressing well.

Next up: KYC verification. This keeps your business and customers safe.

Quick question - do you have these ready?
✅ PAN Card
✅ Aadhaar Card (for proprietors)
✅ Business proof (GST/Shop Act/FSSAI)

If not, no worries - I can help you figure out alternatives!
```

### Nudge 2 (48 hours)
```
Hey {{name}}, just checking in!

A lot of business owners worry about sharing documents online. Totally valid!

Here's why Razorpay is safe:
🔒 PCI DSS Level 1 certified
🔒 256-bit bank-grade encryption
🔒 RBI regulated payment aggregator
🔒 10M+ businesses trust Razorpay

Your documents are only used for verification. Want to proceed?
```

### Nudge 3 (72 hours)
```
{{name}}, here's something many business owners don't know:

*GST registration is NOT mandatory* for all business types on Razorpay!

Proprietors can complete KYC with just:
- PAN Card
- Aadhaar Card
- Any one business proof

Want me to check what documents you need for *{{business_name}}*?
```

---

## Stage 4: Bank Account Verification Drop-off

### Nudge 1 (24 hours)
```
Hi {{name}}! You're halfway through your Razorpay setup 🎉

Next step: Link your bank account for settlements.

Quick facts:
💰 Settlements arrive in T+2 days (or instant with Razorpay X)
💰 No minimum balance required
💰 Proprietors can use savings accounts!

Ready to link your account? Head to your Razorpay dashboard!
```

### Nudge 2 (48 hours)
```
Hey {{name}}, stuck on bank verification?

Common issues and fixes:
1. *Name mismatch* → Bank account name must match your business name on KYC
2. *Wrong IFSC* → Double-check on ifsc.razorpay.com
3. *Verification failed* → Try re-entering details or use a different account

Need specific help? Just describe your issue!
```

---

## Stage 5: Website / App Details Drop-off

### Nudge 1 (24 hours)
```
{{name}}, you're almost there! *{{business_name}}* is 70% set up ✨

Next: Share your website or app details.

Don't have a website? No problem!
📱 *Payment Links* - Share on WhatsApp/Instagram
🛒 *Payment Pages* - Razorpay hosts a checkout page for you
📌 Social media sellers can submit their shop URL

Which option works for *{{business_name}}*?
```

### Nudge 2 (48 hours)
```
Hi {{name}}! Quick reminder about policy pages.

Razorpay requires these on your website:
📋 Privacy Policy
📋 Terms & Conditions
📋 Refund/Cancellation Policy
📋 Contact Us page

*Good news:* Razorpay provides free templates you can customize!

Want me to share the template links?
```

---

## Stage 6: Integration Drop-off

### Nudge 1 (24 hours)
```
{{name}}, you're SO close! Just the integration step left for *{{business_name}}* 🏁

Not technical? Here are no-code options:

🔗 *Payment Links* - Just share a link, no coding needed
📦 *Shopify/WooCommerce Plugin* - Install in 2 clicks
🔘 *Payment Button* - Copy-paste a code snippet

Which platform does your business use?
```

### Nudge 2 (48 hours)
```
Hey {{name}}, integrating Razorpay is easier than you think!

If you use:
- *Shopify* → Install Razorpay app from Shopify store
- *WooCommerce* → Install Razorpay plugin
- *Wix* → Enable Razorpay in payment settings
- *Custom website* → Use Checkout.js (just 10 lines of code!)
- *No website* → Use Payment Links (zero code!)

Which one is you? I'll send you the exact steps!
```

---

## Stage 7: Go Live (Waiting for Review)

### Nudge 1 (48 hours)
```
Hi {{name}}! Your *{{business_name}}* account is under review 🔍

This usually takes 2-3 business days. While you wait:

✅ Test your integration in test mode
✅ Set up your team members on the dashboard
✅ Explore Razorpay tools (invoices, subscriptions, etc.)

I'll check back with you soon!
```

---

## Win-Back Message (7+ days inactive)

```
Hey {{name}}! It's been a while 👋

Your Razorpay setup for *{{business_name}}* is still saved - you don't have to start over!

You're on step {{current_stage}} of 7. Almost there!

Businesses that complete onboarding start accepting payments within 24 hours.

Ready to pick up where you left off?
→ Reply "Yes" and I'll guide you
→ Reply "Stop" if you'd prefer not to hear from me
```

---

## Opt-Out Confirmation

```
No problem at all, {{name}}! I've noted your preference. 🙏

You won't receive any more messages from me.

Your progress for *{{business_name}}* has been saved. If you ever want to resume, just send "Hi" to this chat.

Wishing you the best! 💛
```
