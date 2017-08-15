/* global instantsearch */
if ($('#q').length >= 1) {
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
    '<div class="hit media mb-2">' +
      '<div class="media-left col-md-3"><a href="{{href}}"><img class="img-responsive" src="{{thumbnail}}"></a>' +
        '<div class="media-object" style="background-image: url(\'{{image}}\');"></div>' +
      '</div>' +
      '<div class="media-body col-md-9">' +
        '<a href="{{href}}"><h4 class="media-heading">{{{_highlightResult.title.value}}}</h4></a>' +
        '<span class="badge badge-success">{{company}}</span> ' +
        '{{#console}}<span class="badge badge-warning">{{.}}</span> {{/console}} ' +
        '<p class="year">{{content}}</p>' +
      '</div>' +
    '</div>';

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
        list: 'nav nav-list nav-block',
        count: 'badge pull-right',
        active: 'active'
      }
    })
  );

    search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#company',
      attributeName: 'company',
      operator: 'or',
      limit: 10,
      cssClasses: {
        list: 'nav nav-list nav-block',
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
        list: 'nav nav-list nav-block',
        count: 'badge pull-right',
        active: 'active'
      }
    })
  );

  search.start();
}


  var client = algoliasearch('9HOA31XFL6', '4f4739d0cdfea2dcb90b69a4133c40fd')
  var index = client.initIndex('videos');

  autocomplete('#aa-search', { hint: true, templates: {
        dropdownMenu: '#my-custom-menu-template',
        footer: '<div class="branding">Powered by <img src="https://www.algolia.com/static_assets/images/press/downloads/algolia-logo-light.svg" /></div>'
      } }, [
    {
      source: autocomplete.sources.hits(index, { hitsPerPage: 5 }),
      name: 'd1',
      displayKey: 'title',
      templates: {
        suggestion: function(suggestion) {
          return suggestion._highlightResult.title.value;
        }
      }
    }
  ]).on('autocomplete:selected', function(event, suggestion, dataset) {
    window.location.href = suggestion.href;
  });