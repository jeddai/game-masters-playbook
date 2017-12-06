<h1>Hello World</h1>
<ul>
  {% for post in site.posts %}
    <li>
      <h4><a href="{{ post.url }}">{{ post.title }}</a></h4><small>{{ post.date }}</small>
      {{ post.excerpt }}
    </li>
  {% endfor %}
</ul>
