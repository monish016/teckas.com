# Teckas Launch Action Plan: Indexing, Sharing, Monitoring

Date created: April 2026

Below are the steps you need to complete manually (they require your Google, LinkedIn, or email account access). Everything takes 60-90 minutes total.

---

## 1. Request Indexing in Google Search Console (20 minutes)

### Setup (one-time, if not done)

1. Go to https://search.google.com/search-console
2. Click **Add property** > **URL prefix** > enter `https://teckas.com`
3. Verify ownership. Easiest method: **HTML tag** - paste a meta tag into the `<head>` of your homepage OR use the DNS TXT record method via your Netlify domain settings

### Submit sitemap

4. In Search Console, go to **Sitemaps** (left sidebar)
5. Enter `sitemap.xml` in the input box and click **Submit**
6. Status should show "Success" within minutes

### Request indexing for priority pages (do these FIRST - highest ROI)

For each of these URLs, use the URL Inspection tool at the top of Search Console:

**Priority 1 - Alternative Pages (fastest ranking)**
1. https://teckas.com/alternatives/bruntwork.html
2. https://teckas.com/alternatives/support-shepherd.html
3. https://teckas.com/alternatives/myoutdesk.html
4. https://teckas.com/alternatives/wing.html

**Priority 2 - Keystone Content (biggest long-term lift)**
5. https://teckas.com/salary-report-2026.html
6. https://teckas.com/pricing.html
7. https://teckas.com/

**Priority 3 - High-Value Landing Pages**
8. https://teckas.com/hire/virtual-dispatcher-hvac.html
9. https://teckas.com/hire/remote-bookkeeper-small-business.html
10. https://teckas.com/hire/virtual-receptionist-small-business.html
11. https://teckas.com/compare/offshore-developer-cost.html
12. https://teckas.com/compare/virtual-assistant-cost-per-hour.html

**Priority 4 - Top Location Pages**
13. https://teckas.com/locations/texas.html
14. https://teckas.com/locations/california.html
15. https://teckas.com/locations/florida.html

For each URL:
- Paste URL into the URL Inspection bar at top of Search Console
- Wait for the inspection result (10-30 seconds)
- Click **Request Indexing** button
- Wait for confirmation (1-2 minutes)

Google allows approximately 10-12 indexing requests per day per property. Submit the priority 1 and 2 lists first.

---

## 2. Connect Search Console to Google Analytics (5 minutes)

1. In Google Analytics 4, go to **Admin** > **Product links** > **Search Console Links**
2. Click **Link** and select your Search Console property
3. Save

This lets you see actual search queries driving traffic in GA4.

---

## 3. Monitor Schedule (60-day plan)

### Week 1 (immediately after indexing requests)
- Check Search Console **Coverage** report daily for indexation progress
- Target: all 64 URLs in index within 7-10 days

### Week 2-3
- Check Search Console **Performance** report for impressions starting to appear
- Target: first impressions on alternative pages (BruntWork, Wing, MyOutDesk queries)

### Week 4-5
- Check **Position** column in Performance report
- Alternative pages should be appearing on pages 3-5 of search results
- Location pages should start generating impressions for "remote staffing [state]" queries

### Week 6-8
- Alternative pages may start ranking on page 1-2 for low-competition variants
- Location pages may be on page 2-3
- Salary Report may start getting impressions for "remote staffing salary" queries

### Week 9-12 (Day 60-90)
- Full picture emerges
- Alternative pages should be ranked for most [competitor] + alternative queries
- Top location pages on page 1-2 for their primary keywords
- Salary Report accumulating organic backlinks (check Ahrefs or SEMrush free tools)

### What to track weekly

| Metric | Source | Target at Day 60 |
|---|---|---|
| Pages indexed | Search Console Coverage | 60+ of 64 |
| Total impressions | Search Console Performance | 2,000+/month |
| Total clicks | Search Console Performance | 100-300/month |
| Avg position | Search Console Performance | 25-35 |
| Referring domains (backlinks) | Ahrefs free / SEMrush free | 5-15 new |
| Branded search volume | GA4 Search Console data | Growing month-over-month |

### Red flags to watch for

- **Pages not getting indexed after 2 weeks** - check Search Console "Why not indexed" reasons. Common causes: duplicate content (shouldn't be an issue for us), crawl errors, robots.txt blocks.
- **Impressions but no clicks** - meta descriptions may not be compelling. Revise copy.
- **High bounce rate from organic** - content may not match search intent. Check GA4 engaged sessions rate.

---

## 4. Google Business Profile (if you have a US or Canada address)

Even a virtual address counts. This is a massive local SEO lever.

1. Go to https://business.google.com
2. Create a Business Profile with category: "Employment agency" or "Staffing agency"
3. Add your legal name: Teckas Technologies Pvt. Ltd.
4. Verify ownership (postcard takes 5-14 days)
5. Once verified, add: services, hours, photos, FAQ

This creates a **Knowledge Graph entry** which dramatically improves branded search appearance.

---

## Next Actions (after indexing is live)

See the other files in this folder:
- `02-linkedin-post-copy.md` - ready-to-paste LinkedIn posts for the Salary Report
- `03-outreach-templates.md` - email templates for link-building outreach
