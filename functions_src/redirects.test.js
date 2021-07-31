const {
  filterBy,
  filterByPlaceholder,
  formatPlaceholdeURL,
  formatWildcardURL,
  getRedirectURL
} = require('../lib/helpers/redirect-url-parser.js')

const data = [
  {
    from: "/legacy-url/",
    to: "/updated-url/",
    status: "301"
  },
  {
    from: "/legacy-query/?q=test",
    to: "/updated-query-url/",
    status: "301"
  },
  {
    from: "/legacy-query-wildcard/*",
    to: "/updated-query-wildcard/*?q=test",
    status: "301"
  },
  {
    from: "/legacy-placeholder/:placeholder/lorem/",
    to: "/updated-placeholder/lorem/:placeholder/",
    status: "301"
  },
  {
    from: "/legacy-placewilder/:placeholder/*",
    to: "/updated-placewilder/:placeholder/lorem/*",
    status: "301"
  },
  {
    from: "/legacy-double-placewilder/:placer/:placeholder/*",
    to: "/updated-double-placewilder/:placeholder/lorem/:placer/*",
    status: "301"
  },
  {
    from: "/puppy-sponsor/:pupname/gallery/",
    to: "/sponsor-a-puppy/gallery/:pupname/",
    status: "301"
  },
  {
    from: "/wildcard-url/*",
    to: "/updated-wildcard-url/",
    status: "301"
  },
  {
    from: "/incorrect-wildcard-url/*",
    to: "/updated-incorrect-wildcard-url/",
    status: "301"
  },
  {
    from: "/nested-wildcard-url/*",
    to: "/updated-nested-wildcard-url/*",
    status: "301"
  },
]

describe('integration tests', () => {
  test('default redirect', () => {
    const value = getRedirectURL("/legacy-url/", data)
    expect(value).toEqual(expect.objectContaining({
      target: "/updated-url/",
      status: "301"
    }));
  });

  test('redirect with query string', () => {
    const value = getRedirectURL("/legacy-query/?q=test", data)
    expect(value).toEqual(expect.objectContaining({
      target: "/updated-query-url/?q=test",
      status: "301"
    }));
  });

  test('redirect with wildcard and query string in source', () => {
    const value = getRedirectURL("/wildcard-url/test/testing?q=test", data)
    expect(value).toEqual(expect.objectContaining({
      target: "/updated-wildcard-url/?q=test",
      status: "301"
    }));
  });

  test('redirect with wildcard without children specified', () => {
    const value = getRedirectURL("/legacy-query-wildcard/", data)
    expect(value).toEqual(null);
  });
  
  test('redirect with wildcard and query string in target', () => {
    const value = getRedirectURL("/legacy-query-wildcard/test", data)
    expect(value).toEqual(expect.objectContaining({
      target: "/updated-query-wildcard/test?q=test",
      status: "301"
    }));
  });

  test('redirect with placeholder and query string in source', () => {
    const value = getRedirectURL("/puppy-sponsor/molly/gallery/?q=test", data)
    expect(value).toEqual(expect.objectContaining({
      target: "/sponsor-a-puppy/gallery/molly/?q=test",
      status: "301"
    }));
  });

  test('formats path with two placeholder and wildcard', () => {
    const value = getRedirectURL("/legacy-double-placewilder/temp/value/some/path/", data)
    expect(value).toEqual(expect.objectContaining({
      target: "/updated-double-placewilder/value/lorem/temp/some/path/",
      status: "301"
    }));
  });

  test('formats path with two placeholder and wildcard and no children', () => {
    const value = getRedirectURL("/legacy-double-placewilder/temp/value/", data)
    expect(value).toEqual(null);
  });

  test('wildcard redirect in both directions', () => {
    const value = getRedirectURL("/wildcard-url/some/path/", data)
    expect(value).toEqual(expect.objectContaining({
      target: "/updated-wildcard-url/",
      status: "301"
    }));
  });

  test('wildcard redirect in single direction', () => {
    const value = getRedirectURL("/nested-wildcard-url/some/path/", data)
    expect(value).toEqual(expect.objectContaining({
      target: "/updated-nested-wildcard-url/some/path/",
      status: "301"
    }));
  });

  test('placeholder redirect', () => {
    const value = getRedirectURL("/legacy-placeholder/the-placeholder/lorem/", data)
    expect(value).toEqual(expect.objectContaining({
      target: "/updated-placeholder/lorem/the-placeholder/",
      status: "301"
    }));
  });

  test('placeholder and wildcard redirect', () => {
    const value = getRedirectURL("/legacy-placewilder/the-placeholder/some/path", data)
    expect(value).toEqual(expect.objectContaining({
      target: "/updated-placewilder/the-placeholder/lorem/some/path",
      status: "301"
    }));
  });
  
  test('no redirect found', () => {
    const url = getRedirectURL("/unknown-url/", data)
    expect(url).toBe(null);
  });
})


describe('wildcard tests', () => {
  test('formats path without wildcard in toURL', () => {
    const url = formatWildcardURL(
      "/nested-wildcard-url/some/path/",
      "/nested-wildcard-url/*",
      "/updated-nested-wildcard-url/")

    expect(url).toBe("/updated-nested-wildcard-url/");
  });
  
  test('formats path with wildcard in toURL', () => {
    const url = formatWildcardURL(
      "/nested-wildcard-url/some/path/",
      "/nested-wildcard-url/*",
      "/updated-nested-wildcard-url/*")

    expect(url).toBe("/updated-nested-wildcard-url/some/path/");
  });

  test('formats path with wildcard and querystring in toURL', () => {
    const url = formatWildcardURL(
      "/nested-wildcard-url/some/path/",
      "/nested-wildcard-url/*",
      "/updated-nested-wildcard-url/*?x=2")

    expect(url).toBe("/updated-nested-wildcard-url/some/path/?x=2");
  });


  test('finds redirect url correctly', () => {
    const match = filterBy("/wildcard-url/some/path/", data)
    expect(match).toEqual(expect.arrayContaining([{"from": "/wildcard-url/*", status: "301", "to": "/updated-wildcard-url/"}]));
  });
})

describe('placeholder tests', () => {
  test('formats path with placeholder', () => {
    const url = formatPlaceholdeURL(
      "/puppy-sponsor/ruby/gallery/",
      "/puppy-sponsor/:pupname/gallery/",
      "/sponsor-a-puppy/gallery/:pupname/")

    expect(url).toBe("/sponsor-a-puppy/gallery/ruby/");
  });

  test('formats path with two placeholder', () => {
    const url = formatPlaceholdeURL(
      "/puppy-sponsor/ruby/gallery/",
      "/puppy-sponsor/:pupname/:sub/",
      "/sponsor-a-puppy/:sub/:pupname/")

    expect(url).toBe("/sponsor-a-puppy/gallery/ruby/");
  });

  test('finds redirect url correctly', () => {
    const match = filterByPlaceholder("/puppy-sponsor/ruby/gallery/", data)
    expect(match).toEqual(expect.arrayContaining([{"from": "/puppy-sponsor/:pupname/gallery/", "to": "/sponsor-a-puppy/gallery/:pupname/", status: "301"}]));
  });
  
  test('doesnt find path with placeholder', () => {
    const match = filterByPlaceholder("/puppy-sponsor-fail/ruby/gallery/", data)
    expect(match).toHaveLength(0);
  });
})