'use client';

import React, { useState, useMemo } from 'react';
import {
  Product,
  SelectedOptionsMap,
  AttributeGroup,
  QuantityTier,
} from '@/types/product';
import { flyerProductMock, sampleProductsList } from '@/data/mockProducts';
import { GenericGroupRenderer } from './GenericGroupRenderer';
import { QuantityTable } from './QuantityTable';
import { OrderSummary } from './OrderSummary';
import { ModularAttributeBuilderModal } from '@/components/admin/ModularAttributeBuilderModal';
import {
  PlusCircle,
  Sparkles,
  Printer,
  ChevronRight,
  HelpCircle,
  RotateCcw,
  Sliders,
  Check,
} from 'lucide-react';

export function ModularProductConfigurator() {
  const [currentProduct, setCurrentProduct] = useState<Product>(flyerProductMock);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Estado dos atributos selecionados (chave = groupId, valor = optionId)
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptionsMap>(() => {
    const initial: SelectedOptionsMap = {};
    flyerProductMock.attributeGroups.forEach((group) => {
      initial[group.id] = group.defaultOptionId || group.options[0]?.id || '';
    });
    return initial;
  });

  // Quantidade selecionada (padrão 4000 un como na imagem do usuário)
  const [selectedQuantity, setSelectedQuantity] = useState<number>(4000);

  // Troca de produto
  const handleSelectProduct = (prod: Product) => {
    setCurrentProduct(prod);
    const initial: SelectedOptionsMap = {};
    prod.attributeGroups.forEach((group) => {
      initial[group.id] = group.defaultOptionId || group.options[0]?.id || '';
    });
    setSelectedOptions(initial);
    setSelectedQuantity(prod.quantityTiers[prod.quantityTiers.length > 3 ? 3 : 0]?.quantity || 100);
  };

  // Alteração de uma opção
  const handleSelectOption = (groupId: string, optionId: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [groupId]: optionId,
    }));
  };

  // Adição de novo bloco customizado em tempo real (Admin Simulator)
  const handleAddNewGroup = (newGroup: AttributeGroup) => {
    setCurrentProduct((prev) => ({
      ...prev,
      attributeGroups: [...prev.attributeGroups, newGroup],
    }));

    if (newGroup.options.length > 0) {
      setSelectedOptions((prev) => ({
        ...prev,
        [newGroup.id]: newGroup.options[0].id,
      }));
    }
  };

  // Motor de cálculo de preço
  const calculatedPrice = useMemo(() => {
    let multiplier = 1.0;
    let fixedExtra = 0;

    // Percorre cada atributo selecionado e aplica modificadores
    currentProduct.attributeGroups.forEach((group) => {
      const selectedId = selectedOptions[group.id];
      const opt = group.options.find((o) => o.id === selectedId);
      if (opt) {
        if (opt.priceModifierPercent) {
          multiplier += opt.priceModifierPercent;
        }
        if (opt.priceModifierFixed) {
          fixedExtra += opt.priceModifierFixed;
        }
      }
    });

    // Encontra o tier de quantidade
    const tier = currentProduct.quantityTiers.find((t) => t.quantity === selectedQuantity) ||
      currentProduct.quantityTiers[0] || { quantity: 1, unitPrice: 1, totalPrice: 1 };

    const totalPrice = Math.max(0, tier.totalPrice * multiplier + fixedExtra);
    const unitPrice = totalPrice / tier.quantity;

    return {
      unitPrice,
      totalPrice,
      multiplier,
      fixedExtra,
    };
  }, [currentProduct, selectedOptions, selectedQuantity]);

  // Reseta para padrão do screenshot
  const handleResetToScreenshotDefault = () => {
    handleSelectProduct(flyerProductMock);
    setSelectedQuantity(4000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800">
      {/* Barra Superior / Header do E-commerce */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-xs">
              <Printer className="w-6 h-6" />
            </div>
            <div>
              <span className="font-black text-lg tracking-tight text-gray-900 block leading-tight">
                GRÁFICA<span className="text-emerald-600">PRO</span>
              </span>
              <span className="text-[10px] text-gray-500 font-medium block">
                Plataforma Web-to-Print Modular
              </span>
            </div>
          </div>

          {/* Botão de Destaque: Construtor Dinâmico de Atributos */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2 px-3.5 rounded-md flex items-center gap-2 shadow-xs transition-all cursor-pointer hover:shadow-md"
            >
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              <span>+ Adicionar Bloco de Opções</span>
            </button>
          </div>
        </div>

        {/* Sub-barra de Navegação de Produtos */}
        <div className="border-t border-gray-100 bg-gray-50/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4 overflow-x-auto py-2 text-xs">
            <span className="text-gray-400 font-semibold uppercase text-[10px] tracking-wider whitespace-nowrap">
              Produtos Ativos:
            </span>
            {sampleProductsList.map((prod) => (
              <button
                key={prod.id}
                onClick={() => handleSelectProduct(prod)}
                className={`py-1 px-3 rounded-full font-medium transition-all cursor-pointer whitespace-nowrap ${
                  currentProduct.id === prod.id
                    ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                    : 'text-gray-600 hover:bg-gray-200/60'
                }`}
              >
                {prod.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb e Info */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
          <span>Início</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span>{currentProduct.category}</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="font-semibold text-gray-800">{currentProduct.name}</span>
        </nav>

        {/* Grid Principal: Configurador na esquerda (60%) e Resumo na direita (40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Coluna Esquerda: Configurador de Atributos */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-xl border border-gray-200/80 shadow-xs">
            <div className="flex items-start justify-between border-b border-gray-100 pb-4 mb-6">
              <div>
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">
                  {currentProduct.name}
                </h1>
                <p className="text-xs text-gray-500 mt-1 max-w-xl">
                  {currentProduct.description}
                </p>
              </div>
              <button
                onClick={handleResetToScreenshotDefault}
                className="text-[11px] text-gray-400 hover:text-gray-700 flex items-center gap-1 p-1 cursor-pointer"
                title="Restaurar padrão da imagem"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Restaurar Padrão
              </button>
            </div>

            {/* Renderização Dinâmica dos Grupos de Atributos */}
            <div className="space-y-6">
              {currentProduct.attributeGroups.map((group) => (
                <GenericGroupRenderer
                  key={group.id}
                  group={group}
                  selectedOptionId={selectedOptions[group.id]}
                  onSelectOption={handleSelectOption}
                />
              ))}

              {/* Tabela de Quantidades */}
              <section className="mb-6">
                <h3 className="text-base font-bold text-gray-900 mb-2.5">
                  Quantidade
                </h3>
                <QuantityTable
                  tiers={currentProduct.quantityTiers}
                  selectedQuantity={selectedQuantity}
                  onSelectQuantity={setSelectedQuantity}
                  priceMultiplier={calculatedPrice.multiplier}
                  priceModifierFixed={calculatedPrice.fixedExtra}
                />
              </section>
            </div>
          </div>

          {/* Coluna Direita: Resumo do Pedido & Upload de Arte */}
          <div className="lg:col-span-5">
            <OrderSummary
              product={currentProduct}
              selectedOptions={selectedOptions}
              selectedQuantity={selectedQuantity}
              calculatedPrice={{
                unitPrice: calculatedPrice.unitPrice,
                totalPrice: calculatedPrice.totalPrice,
              }}
            />
          </div>
        </div>
      </main>

      {/* Modal do Administrador para Adicionar Novos Blocos Customizáveis */}
      <ModularAttributeBuilderModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onAddGroup={handleAddNewGroup}
      />
    </div>
  );
}
