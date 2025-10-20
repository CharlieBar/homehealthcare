---
layout: layouts/page.njk
title: "Thank You"
description: "We received your home health care request and will follow up shortly."
permalink: "/thank-you/"
---
<p>Thanks for reaching out. Our intake nurse reviews each request within one business day. If you need faster support, call <a href="tel:{{ site.phone }}">{{ site.phone }}</a>.</p>
<p>Explore our latest guides while you wait:</p>
<ul>
  {% for post in collections.posts | slice(0,3) %}
  <li><a href="{{ post.url }}">{{ post.data.title }}</a></li>
  {% endfor %}
</ul>
