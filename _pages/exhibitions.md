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
{% if site.exhibitions %}
  {% assign sorted_exhibitions = site.exhibitions | sort: "importance" %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for project in sorted_exhibitions %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
{% else %}
  <p>아직 등록된 전시회가 없습니다. _exhibitions 폴더에 파일을 추가해 주세요!</p>
{% endif %}
</div>