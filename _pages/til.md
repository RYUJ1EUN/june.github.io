---
layout: page
title: TIL
permalink: /til/
nav: true
nav_order: 2
---

<div class="til-container">
  {% assign tils = site.til | reverse %}
  {% for entry in tils %}
    <div class="til-entry" style="padding-top: 20px; margin-bottom: 40px; border-top: 1px solid #eee; padding-bottom: 20px;">
      <h3 style="margin-bottom: 5px;">{{ entry.title }}</h3>
      <small style="color: #888;">작성일: {{ entry.date | date: "%Y-%m-%d" }}</small>
      <div class="til-content" style="margin-top: 15px;">
        {{ entry.content }}
      </div>
    </div>
  {% endfor %}
</div>
