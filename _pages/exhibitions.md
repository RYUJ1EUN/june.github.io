---
layout: page
title: EXHIBITIONS
permalink: /exhibitions/
description: Exhibitions I Want to Remember.
nav: false
# nav_order: 3
# display_categories: [work, fun]
horizontal: false
---
<div class="projects">
{% assign sorted_exhibitions = site.exhibitions | sort: "importance" %}

{% if page.horizontal %}
  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
    {% for project in sorted_exhibitions %}
      {% include projects_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
{% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for project in sorted_exhibitions %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
{% endif %}
</div>