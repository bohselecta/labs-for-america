# 📝 Lab Report

**Lab Title:** {{lab_title}}  
**Lab Type:** {{lab_type}}  
**Organizer:** {{lab_organizer}}  
**Date Opened:** {{lab_opened}}  
**Date Closed:** {{lab_closed}}

---

## 1. Purpose
{{lab_purpose}}

---

## 2. Participants
| Name | Role | Contributions |
|------|------|----------------|
{{#each participants}}
| {{name}} | {{role}} | {{contributions}} |
{{/each}}

---

## 3. Discussion Highlights
{{#each highlights}}
- {{this}}
{{/each}}

---

## 4. Contributions & Proposals

### ✅ Accepted
{{#each accepted}}
- **{{title}}** – submitted by {{author}} – {{summary}}
{{/each}}

### ⏳ Pending / For Further Review
{{#each pending}}
- **{{title}}** – submitted by {{author}} – {{summary}}
{{/each}}

### ❌ Not Adopted
{{#each rejected}}
- **{{title}}** – submitted by {{author}} – {{reason}}
{{/each}}

---

## 5. Decisions & Outcomes
{{#each decisions}}
- {{this}}
{{/each}}

---

## 6. Next Steps
{{#each next_steps}}
- {{this}}
{{/each}}

---

## 7. Archive Reference
- **Lab ID:** {{lab_id}}
- **Tags:** {{lab_tags}}
- **Stored at:** {{archive_path}}

---