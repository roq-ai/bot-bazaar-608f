const mapping: Record<string, string> = {
  'ai-tools': 'ai_tool',
  favorites: 'favorites',
  organizations: 'organization',
  plugins: 'plugin',
  'software-products': 'software_product',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
