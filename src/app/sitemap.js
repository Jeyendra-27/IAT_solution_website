export default function sitemap() {
  const baseUrl = 'https://iattechnologies.com'; // Adjust to actual domain later

  const routes = [
    '',
    '/about',
    '/contact',
    '/services',
    '/solutions',
    '/ai-solutions',
    '/web-ecommerce'
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
