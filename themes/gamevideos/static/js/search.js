/* global instantsearch */

var search = instantsearch({
  appId: '9HOA31XFL6',
  apiKey: '4f4739d0cdfea2dcb90b69a4133c40fd',
  indexName: 'videos',
  urlSync: true
});

search.addWidget(
  instantsearch.widgets.searchBox({
    container: "#q"
  })
);

search.addWidget(
  instantsearch.widgets.stats({
    container: '#stats'
  })
);

var hitTemplate =
  '<a href="{{href}}"><div class="hit media">' +
    '<div class="media-left">' +
      '<div class="media-object" style="background-image: url(\'{{image}}\');"></div>' +
    '</div>' +
    '<div class="media-body">' +
      '<h4 class="media-heading">{{{_highlightResult.title.value}}}</h4>' +
      '<p class="year">{{year}}</p><p class="console">{{#console}}<span class="badge">{{.}}</span> {{/console}}</p>' +
    '</div>' +
  '</div></a>';

var noResultsTemplate =
  '<div class="text-center">No results found matching <strong>{{query}}</strong>.</div>';

search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    hitsPerPage: 10,
    templates: {
      empty: noResultsTemplate,
      item: hitTemplate
    }
  })
);

search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination',
    cssClasses: {
      root: 'pagination',
      active: 'active'
    }
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#console',
    attributeName: 'console',
    operator: 'and',
    limit: 10,
    cssClasses: {
      list: 'nav nav-list',
      count: 'badge pull-right',
      active: 'active'
    }
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#language',
    attributeName: 'language',
    operator: 'or',
    limit: 10,
    cssClasses: {
      list: 'nav nav-list',
      count: 'badge pull-right',
      active: 'active'
    }
  })
);

search.start();