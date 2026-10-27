import type { Category } from '../types';

export interface CategoryMeta {
  label: string;
  color: string;
}

export const CATEGORY_META: Record<Category, CategoryMeta> = {
  air: { label: 'Air', color: '#0f766e' },
  water: { label: 'Water', color: '#2563a8' },
  appliance: { label: 'Appliance', color: '#7c4dbe' },
  vehicle: { label: 'Vehicle', color: '#b45309' },
  pool: { label: 'Pool & spa', color: '#0e7490' },
  other: { label: 'Other', color: '#5b6b62' },
};

export interface FilterPreset {
  id: string;
  label: string;
  category: Category;
  lifespanDays: number;
  cost: number;
}

export const FILTER_TYPES: FilterPreset[] = [
  { id: 'hvac-1', label: 'HVAC air filter · 1"', category: 'air', lifespanDays: 90, cost: 14 },
  { id: 'hvac-4', label: 'HVAC media filter · 4"', category: 'air', lifespanDays: 180, cost: 30 },
  { id: 'air-purifier', label: 'Air purifier HEPA', category: 'air', lifespanDays: 365, cost: 55 },
  { id: 'range-hood', label: 'Range hood grease filter', category: 'air', lifespanDays: 180, cost: 18 },
  { id: 'humidifier', label: 'Humidifier filter', category: 'air', lifespanDays: 90, cost: 15 },
  { id: 'fridge-water', label: 'Refrigerator water filter', category: 'water', lifespanDays: 180, cost: 38 },
  { id: 'under-sink', label: 'Under-sink water filter', category: 'water', lifespanDays: 180, cost: 42 },
  { id: 'whole-house', label: 'Whole-house sediment filter', category: 'water', lifespanDays: 90, cost: 22 },
  { id: 'ro-membrane', label: 'RO membrane', category: 'water', lifespanDays: 730, cost: 60 },
  { id: 'ro-prefilter', label: 'RO pre-filter', category: 'water', lifespanDays: 180, cost: 16 },
  { id: 'pitcher', label: 'Pitcher / faucet filter', category: 'water', lifespanDays: 60, cost: 12 },
  { id: 'shower', label: 'Shower filter', category: 'water', lifespanDays: 180, cost: 25 },
  { id: 'coffee', label: 'Coffee machine filter', category: 'water', lifespanDays: 60, cost: 10 },
  { id: 'pool-cartridge', label: 'Pool cartridge filter', category: 'pool', lifespanDays: 365, cost: 70 },
  { id: 'hot-tub', label: 'Hot tub filter', category: 'pool', lifespanDays: 180, cost: 35 },
  { id: 'aquarium', label: 'Aquarium filter media', category: 'pool', lifespanDays: 30, cost: 8 },
  { id: 'car-cabin', label: 'Car cabin air filter', category: 'vehicle', lifespanDays: 365, cost: 24 },
  { id: 'engine-air', label: 'Engine air filter', category: 'vehicle', lifespanDays: 365, cost: 22 },
  { id: 'vacuum-hepa', label: 'Vacuum HEPA filter', category: 'appliance', lifespanDays: 365, cost: 30 },
  { id: 'dehumidifier', label: 'Dehumidifier filter', category: 'appliance', lifespanDays: 180, cost: 12 },
  { id: 'custom', label: 'Custom filter', category: 'other', lifespanDays: 90, cost: 20 },
];

const TYPES_BY_ID = new Map(FILTER_TYPES.map((type) => [type.id, type]));

export function findType(typeId: string): FilterPreset {
  return TYPES_BY_ID.get(typeId) ?? FILTER_TYPES[FILTER_TYPES.length - 1];
}

export const CATEGORY_ORDER: Category[] = ['air', 'water', 'pool', 'vehicle', 'appliance', 'other'];
