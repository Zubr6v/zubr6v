/* Іконки зібрані за контурами Lucide (ISC): https://lucide.dev */
(function () {
  var ICONS = {
    instagram:
      '<rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>' +
      '<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>' +
      '<line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>',
    telegram:
      '<path d="m22 2-7 20-4-9-9-4Z"></path>' +
      '<path d="M22 2 11 13"></path>',
    github:
      '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>' +
      '<path d="M9 18c-4.51 2-5-2-7-2"></path>',
    email:
      '<rect width="20" height="16" x="2" y="4" rx="2"></rect>' +
      '<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>',
    receipt:
      '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"></path>' +
      '<path d="M14 8H8"></path><path d="M16 12H8"></path><path d="M13 16H8"></path>',
    radio:
      '<path d="M16.247 7.761a6 6 0 0 1 0 8.478"></path>' +
      '<path d="M19.075 4.933a10 10 0 0 1 0 14.134"></path>' +
      '<path d="M4.925 19.067a10 10 0 0 1 0-14.134"></path>' +
      '<path d="M7.753 16.239a6 6 0 0 1 0-8.478"></path>' +
      '<circle cx="12" cy="12" r="2"></circle>',
    plus: '<path d="M5 12h14"></path><path d="M12 5v14"></path>'
  };

  function icon(name) {
    return (
      '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">' +
      (ICONS[name] || ICONS.plus) +
      "</svg>"
    );
  }

  function normalizeHref(entry) {
    var href = entry && entry.href ? String(entry.href).trim() : "";
    if (entry && entry.id === "email" && href && href.indexOf("mailto:") !== 0) {
      return "mailto:" + href;
    }
    return href;
  }

  function replaceChildren(parent, fragment) {
    if (parent.replaceChildren) {
      parent.replaceChildren(fragment);
      return;
    }
    parent.innerHTML = "";
    parent.appendChild(fragment);
  }

  function isUsableHref(href) {
    if (!href || href === "#") return false;
    if (/replace_me|yourname|example\.com/i.test(href)) return false;
    return true;
  }

  function renderProjects(projects) {
    var grid = document.getElementById("project-grid");
    if (!grid || !projects || !projects.length) return;

    var fragment = document.createDocumentFragment();
    projects.forEach(function (project) {
      if (!project || !project.title) return;

      var card = document.createElement("article");
      card.className = "project-card" + (project.placeholder ? " is-placeholder" : "");

      var iconWrap = document.createElement("div");
      iconWrap.className = "project-icon";
      iconWrap.innerHTML = icon(project.icon || (project.placeholder ? "plus" : "receipt"));

      var title = document.createElement("h3");
      title.textContent = project.title;

      card.appendChild(iconWrap);
      card.appendChild(title);

      if (project.description) {
        var text = document.createElement("p");
        text.textContent = project.description;
        card.appendChild(text);
      }

      var links = (project.links || []).filter(function (link) {
        return link && isUsableHref(normalizeHref(link));
      });

      if (links.length) {
        var actions = document.createElement("div");
        actions.className = "card-actions";
        links.forEach(function (link, index) {
          var anchor = document.createElement("a");
          anchor.className = "btn " + (index === 0 ? "btn-primary" : "btn-ghost");
          anchor.href = normalizeHref(link);
          anchor.target = "_blank";
          anchor.rel = "noopener noreferrer";
          anchor.textContent = link.label || "Відкрити";
          actions.appendChild(anchor);
        });
        card.appendChild(actions);
      }

      fragment.appendChild(card);
    });

    if (fragment.childNodes.length) replaceChildren(grid, fragment);
  }

  function renderSocial(items) {
    var list = document.getElementById("social-list");
    if (!list || !items || !items.length) return;

    var fragment = document.createDocumentFragment();
    items.forEach(function (item) {
      if (!item || !item.label) return;
      var href = normalizeHref(item);
      var usable = isUsableHref(href);
      var li = document.createElement("li");
      var node = document.createElement(usable ? "a" : "div");
      node.className = "social-link" + (usable ? "" : " is-unconfigured");

      var iconWrap = document.createElement("span");
      iconWrap.className = "social-icon";
      iconWrap.innerHTML = icon(item.id);

      var label = document.createElement("span");
      label.className = "social-label";
      label.textContent = item.label;

      node.appendChild(iconWrap);
      node.appendChild(label);

      if (usable) {
        node.href = href;
        if (href.indexOf("mailto:") !== 0) {
          node.target = "_blank";
          node.rel = "noopener noreferrer";
          var external = document.createElement("span");
          external.className = "sr-only";
          external.textContent = " (відкривається в новій вкладці)";
          node.appendChild(external);
        }
      } else {
        node.setAttribute("role", "group");
        node.setAttribute("aria-label", item.label + ": посилання ще не додано");
      }

      li.appendChild(node);
      fragment.appendChild(li);
    });

    if (fragment.childNodes.length) replaceChildren(list, fragment);
  }

  function setupPortrait() {
    var photo = document.querySelector(".portrait-photo");
    var fallback = document.querySelector(".portrait-fallback");
    if (!photo) return;

    function showFallback() {
      photo.remove();
      if (!fallback) return;
      fallback.removeAttribute("aria-hidden");
      fallback.setAttribute("role", "img");
      fallback.setAttribute("aria-label", "Портрет Василя Зубрицького");
    }

    photo.addEventListener("error", showFallback);
    if (photo.complete && photo.naturalWidth === 0) showFallback();
  }

  function setupNav() {
    var toggle = document.getElementById("nav-toggle");
    var nav = document.getElementById("site-nav");
    if (!toggle || !nav) return;

    function sync() {
      toggle.setAttribute("aria-expanded", toggle.checked ? "true" : "false");
    }

    toggle.addEventListener("change", sync);
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 760px)").matches) {
          toggle.checked = false;
          sync();
        }
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.checked) {
        toggle.checked = false;
        sync();
        toggle.focus();
      }
    });
  }

  function setupSectionSpy() {
    var links = Array.prototype.slice.call(document.querySelectorAll("#site-nav a"));
    if (!links.length || !("IntersectionObserver" in window)) return;

    var pairs = links
      .map(function (link) {
        var id = link.getAttribute("href");
        var section = id ? document.querySelector(id) : null;
        return section ? { link: link, section: section } : null;
      })
      .filter(Boolean);

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          links.forEach(function (link) {
            link.removeAttribute("aria-current");
          });
          var match = pairs.filter(function (pair) {
            return pair.section === entry.target;
          })[0];
          if (match) match.link.setAttribute("aria-current", "true");
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    pairs.forEach(function (pair) {
      observer.observe(pair.section);
    });
  }

  function setupReveal() {
    var nodes = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    if (!nodes.length) return;

    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      nodes.forEach(function (node) {
        node.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );

    nodes.forEach(function (node) {
      observer.observe(node);
    });
  }

  document.documentElement.classList.add("js");

  var config = window.SITE_CONFIG || {};
  try {
    renderProjects(config.projects);
    renderSocial(config.social);
  } catch (error) {
    document.documentElement.classList.add("js-render-failed");
  }

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  setupPortrait();
  setupNav();
  setupSectionSpy();
  setupReveal();
})();
