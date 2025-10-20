---
layout: layouts/page.njk
title: "Contact Our Home Health Team"
description: "Reach out to schedule a free in-home assessment or ask questions about Medicare-covered home health services."
permalink: "/contact/"
---
<p>If you have an urgent medical issue, call 911. For home health questions or new referrals, complete the form below and our intake nurse will respond within one business day.</p>

<form name="intake" method="post" data-netlify="true" netlify-honeypot="extra-field" class="card">
  <input type="hidden" name="form-name" value="intake">
  <p class="visually-hidden">
    <label>Leave this field blank if you are human <input name="extra-field"></label>
  </p>
  <p>
    <label for="name">Full name</label><br>
    <input id="name" name="name" type="text" required>
  </p>
  <p>
    <label for="phone">Phone</label><br>
    <input id="phone" name="phone" type="tel" required>
  </p>
  <p>
    <label for="email">Email</label><br>
    <input id="email" name="email" type="email" required>
  </p>
  <p>
    <label for="zip">ZIP code</label><br>
    <input id="zip" name="zip" type="text" pattern="\d{5}" required>
  </p>
  <p>
    <label for="message">How can we help?</label><br>
    <textarea id="message" name="message" rows="5" required></textarea>
  </p>
  <p>
    <button type="submit" class="button">Send request</button>
  </p>
</form>
