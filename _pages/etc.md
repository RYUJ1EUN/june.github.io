---
layout: page
title: etc.
permalink: /etc/
nav: false
# nav_order: 2
---

<div class="etc-container">
  {% assign etcs = site.etc | reverse %}
  {% for entry in etcs %}
    <div class="etc-entry" style="padding-top: 20px; margin-bottom: 40px; border-top: 1px solid #eee; padding-bottom: 20px;">
      <h3 style="margin-bottom: 5px;">{{ entry.title }}</h3>
      <small style="color: #888;">작성일: {{ entry.date | date: "%Y-%m-%d" }}</small>
      <div class="etc-content" style="margin-top: 15px;">
        {{ entry.content }}
      </div>
    </div>
  {% endfor %}
</div>
