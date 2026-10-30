import { Product } from '@/types/product';

export const flyerProductMock: Product = {
  id: 'prod-flyer-01',
  name: 'Panfletos e Flyers',
  slug: 'panfletos-e-flyers',
  category: 'Promocional',
  description: 'Panfletos e folhetos promocionais de alta qualidade com acabamento impecável para divulgar seu negócio.',
  defaultCover: '/images/flyer-mockup.png',
  productionDays: 2,
  quantityTiers: [
    { quantity: 25, unitPrice: 1.63, totalPrice: 40.73 },
    { quantity: 50, unitPrice: 1.09, totalPrice: 54.50 },
    { quantity: 100, unitPrice: 0.48, totalPrice: 47.94 },
    { quantity: 250, unitPrice: 0.55, totalPrice: 137.53 },
    { quantity: 500, unitPrice: 0.39, totalPrice: 196.72 },
    { quantity: 1000, unitPrice: 0.25, totalPrice: 253.22 },
    { quantity: 2000, unitPrice: 0.22, totalPrice: 441.24 },
    { quantity: 4000, unitPrice: 0.20, totalPrice: 806.60, isPopular: true },
    { quantity: 8000, unitPrice: 0.21, totalPrice: 1646.70 },
    { quantity: 10000, unitPrice: 0.19, totalPrice: 1900.00 },
  ],
  attributeGroups: [
    {
      id: 'tamanho',
      title: 'Tamanho',
      displayType: 'size_grid',
      defaultOptionId: 'a5',
      options: [
        {
          id: 'a6',
          label: '105 x 148 mm (A6)',
          iconType: 'sheet_proportions',
          meta: { widthMm: 105, heightMm: 148, proportionRatio: 'A6' },
          priceModifierPercent: -0.15,
        },
        {
          id: 'dl',
          label: '99 x 210 mm (DL)',
          iconType: 'sheet_proportions',
          meta: { widthMm: 99, heightMm: 210, proportionRatio: 'DL' },
          priceModifierPercent: -0.05,
        },
        {
          id: 'a5',
          label: '148 x 210 mm (A5)',
          iconType: 'sheet_proportions',
          meta: { widthMm: 148, heightMm: 210, proportionRatio: 'A5' },
          priceModifierPercent: 0,
        },
        {
          id: 'a4',
          label: '210 x 297 mm (A4)',
          iconType: 'sheet_proportions',
          meta: { widthMm: 210, heightMm: 297, proportionRatio: 'A4' },
          priceModifierPercent: 0.40,
        },
        {
          id: 'a7',
          label: '74 x 105 mm (A7)',
          iconType: 'sheet_proportions',
          meta: { widthMm: 74, heightMm: 105, proportionRatio: 'A7' },
          priceModifierPercent: -0.30,
        },
        {
          id: 'h_dl',
          label: '297 x 105 mm',
          iconType: 'sheet_proportions',
          meta: { widthMm: 297, heightMm: 105, proportionRatio: 'Horizontal' },
          priceModifierPercent: 0.10,
        },
      ],
    },
    {
      id: 'material',
      title: 'Material',
      displayType: 'material_list',
      defaultOptionId: 'couche_150',
      allowExpand: true,
      visibleCountInitial: 3,
      options: [
        {
          id: 'couche_90',
          label: 'Couchê Fosco 90 g',
          badge: 'MAIS POPULAR',
          priceModifierPercent: -0.10,
        },
        {
          id: 'couche_150',
          label: 'Couchê Brilho 150 g',
          priceModifierPercent: 0,
        },
        {
          id: 'papel_250',
          label: 'Papel 250 g',
          priceModifierPercent: 0.25,
        },
        {
          id: 'couche_300',
          label: 'Couchê Fosco Premium 300 g',
          priceModifierPercent: 0.45,
        },
        {
          id: 'reciclato_90',
          label: 'Reciclato Ecológico 90 g',
          priceModifierPercent: 0.05,
        },
        {
          id: 'offset_75',
          label: 'Sulfite / Offset 75 g',
          priceModifierPercent: -0.20,
        },
      ],
    },
    {
      id: 'lados',
      title: 'Lados impressos',
      displayType: 'sides_cards',
      defaultOptionId: 'frente_verso',
      options: [
        {
          id: 'frente_verso',
          label: 'Frente e Verso',
          iconType: 'sides_double',
          priceModifierPercent: 0,
        },
        {
          id: 'so_frente',
          label: 'Só Frente',
          iconType: 'sides_single',
          priceModifierPercent: -0.18,
        },
      ],
    },
    {
      id: 'cor',
      title: 'Cor da impressão',
      displayType: 'color_cards',
      defaultOptionId: 'cores',
      options: [
        {
          id: 'cores',
          label: 'Cores',
          iconType: 'color_palette',
          priceModifierPercent: 0,
        },
        {
          id: 'preto_branco',
          label: 'Preto e Branco',
          iconType: 'monochrome',
          priceModifierPercent: -0.25,
        },
      ],
    },
    {
      id: 'acabamento',
      title: 'Acabamento',
      displayType: 'finishing_cards',
      defaultOptionId: 'sem_acabamento',
      options: [
        {
          id: 'sem_acabamento',
          label: 'Sem acabamento',
          iconType: 'box_square',
          priceModifierFixed: 0,
        },
        {
          id: 'verniz_total',
          label: 'Verniz Total Frente',
          iconType: 'box_square',
          priceModifierFixed: 35.0,
        },
        {
          id: 'laminacao_fosca',
          label: 'Laminação Fosca',
          iconType: 'box_square',
          priceModifierFixed: 45.0,
        },
      ],
    },
  ],
};

export const sampleProductsList: Product[] = [
  flyerProductMock,
  {
    id: 'prod-tag-02',
    name: 'Tags Personalizadas',
    slug: 'tags-personalizadas',
    category: 'Etiquetas & Tags',
    description: 'Tags com furo para roupas, joias, brindes e presentes com cortes e papeis variados.',
    defaultCover: '/images/tag-mockup.png',
    productionDays: 3,
    quantityTiers: [
      { quantity: 100, unitPrice: 0.85, totalPrice: 85.00 },
      { quantity: 250, unitPrice: 0.52, totalPrice: 130.00 },
      { quantity: 500, unitPrice: 0.38, totalPrice: 190.00 },
      { quantity: 1000, unitPrice: 0.28, totalPrice: 280.00, isPopular: true },
      { quantity: 2500, unitPrice: 0.20, totalPrice: 500.00 },
    ],
    attributeGroups: [
      {
        id: 'tamanho_tag',
        title: 'Tamanho da Tag',
        displayType: 'radio_cards',
        defaultOptionId: 'tag_padrao',
        options: [
          { id: 'tag_mini', label: '40 x 40 mm (Quadrada)' },
          { id: 'tag_padrao', label: '50 x 90 mm (Padrão)' },
          { id: 'tag_alongada', label: '40 x 100 mm' },
        ],
      },
      {
        id: 'corte_furo',
        title: 'Tipo de Furo e Acabamento',
        displayType: 'radio_cards',
        defaultOptionId: 'furo_redondo',
        options: [
          { id: 'furo_redondo', label: 'Furo padrão 3mm' },
          { id: 'furo_redondo_5mm', label: 'Furo 5mm' },
          { id: 'canto_arredondado', label: 'Cantos Arredondados + Furo' },
        ],
      },
      {
        id: 'cordao',
        title: 'Acessório (Cordão)',
        displayType: 'select_box',
        defaultOptionId: 'sem_cordao',
        options: [
          { id: 'sem_cordao', label: 'Sem cordão' },
          { id: 'cordao_sisal', label: 'Cordão de Sisal rústico (+R$ 0,15/un)' },
          { id: 'cordao_algodao', label: 'Cordão de Algodão preto (+R$ 0,20/un)' },
        ],
      },
    ],
  },
];
