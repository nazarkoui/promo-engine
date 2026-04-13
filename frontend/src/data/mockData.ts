export const geoTreeDB = [
  {
    id: 'EU', name: '🇪🇺 Europe (EMEA)', children: [
      {
        id: 'BENELUX', name: 'Benelux Region', children: [
          { id: 'NL', name: '🇳🇱 Netherlands', children: [
            { id: 'NL-STORE-01', name: 'Amsterdam Store', children: [] },
            { id: 'NL-STORE-02', name: 'Rotterdam Outlet', children: [] }
          ]}
        ]
      },
      {
        id: 'DACH', name: 'DACH Region', children: [
          { id: 'DE', name: '🇩🇪 Germany', children: [] },
          { id: 'AT', name: '🇦🇹 Austria', children: [] }
        ]
      }
    ]
  }
];

export const promoDictionary = ["PR-1031", "PR-1030", "PR-1032", "PR-9999", "PR-1029"];
export const productCategoryDict = ["Roller Blinds", "Venetian Blinds", "Wooden Blinds", "Drapery"];
export const fabricCollectionDict = ["Eco-Shield", "Acoustic Pro", "Velvet Bloom"];
export const hardwareDict = ["230V Motor", "Battery Motor", "Manual Chain"];

export const massiveInclusions = ['Global', 'EU Baseline', 'Netherlands Market'];
export const massiveExclusions = ['B2B Tenders'];

export const massivePromoList = [
  { id: 'PR-1031', name: '20% Off Selected Product Lines', type: 'Flat Discount', status: 'Active', rules: 3, conflicts: 0 },
  { id: 'PR-9999', name: 'The Enterprise Mega-Stack', type: 'Hybrid Mechanic', status: 'Draft', rules: 8, conflicts: 3 }
];

export const promoDetailsDB: Record<string, any> = {
  'PR-1031': {
    name: '20% Off Selected Product Lines',
    start: '2023-01-01', end: 'Ongoing',
    description: '20% off Roller Blinds, Roman Shades, Venetian Blinds.',
    priority: 'P2',
    tiers: [{ name: 'Tier 1: Selected Lines @ 20%', defaultAction: 'discount', defaultProducts: 'Roller Blinds' }],
    constraints: []
  }
};

export function getPromoDetails(id: string) {
  return promoDetailsDB[id] || { name: 'Promo Item', start: '', end: '', description: '', tiers: [], constraints: [] };
}
