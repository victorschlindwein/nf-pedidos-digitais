export type DisplayType = 
  | 'size_grid' 
  | 'material_list' 
  | 'sides_cards' 
  | 'color_cards' 
  | 'finishing_cards' 
  | 'radio_cards'
  | 'select_box';

export interface AttributeOption {
  id: string;
  label: string;
  subtitle?: string;
  badge?: string; // Ex: 'MAIS POPULAR'
  iconType?: 'sheet_proportions' | 'sides_double' | 'sides_single' | 'color_palette' | 'monochrome' | 'box_square' | 'custom_image';
  iconUrl?: string;
  meta?: {
    widthMm?: number;
    heightMm?: number;
    proportionRatio?: string;
  };
  priceModifierPercent?: number; // Ex: +15% para Couchê 250g
  priceModifierFixed?: number;   // Ex: +R$ 20 acabamento
}

export interface AttributeGroup {
  id: string;
  title: string;
  displayType: DisplayType;
  options: AttributeOption[];
  defaultOptionId?: string;
  allowExpand?: boolean; // Para "Mostrar mais"
  visibleCountInitial?: number;
}

export interface QuantityTier {
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  isPopular?: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  slug: string;
  description: string;
  defaultCover: string;
  productionDays: number;
  attributeGroups: AttributeGroup[];
  quantityTiers: QuantityTier[];
}

export type SelectedOptionsMap = Record<string, string>; // groupId -> optionId
