interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: [],
  tenantRoles: ['Business Owner', 'Team Member', 'Software Developer'],
  tenantName: 'Organization',
  applicationName: 'Bot Bazaar',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: [
    "Manage organization's profile on the marketplace",
    'View and search for software products, AI tools, plugins on the marketplace',
    'Invite Team Members and Software Developers to join organization on the marketplace',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/bfd14892-74cb-40e7-9099-36d358bf9b49',
};
