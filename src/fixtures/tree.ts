import type { TreeGroup } from '~/types/ui';

export const TREE_GROUPS: TreeGroup[] = [
  {
    label: 'apex',
    items: [
      { name: 'AccountHandler.cls', state: 'synced' },
      { name: 'OpportunityTrigger.trigger', state: 'dirty' },
      { name: 'LegacyRouter.cls', state: 'delete' },
    ],
  },
  {
    label: 'lwc',
    items: [
      { name: 'oppForecast', state: 'dirty' },
      { name: 'accountTile', state: 'inflight' },
    ],
  },
  { label: 'flows', items: [{ name: 'Opp_Assign_Flow', state: 'synced' }] },
  { label: 'objects', items: [{ name: 'Account.object', state: 'conflict' }] },
  { label: 'permsets', items: [{ name: 'OppForecaster', state: 'synced' }] },
];
