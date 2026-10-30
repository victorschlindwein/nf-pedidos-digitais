'use client';

import React, { useState } from 'react';
import {
  Link as LinkIcon,
  MessageCircle,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';
import { Product, SelectedOptionsMap } from '@/types/product';

interface OrderSummaryProps {
  product: Product;
  selectedOptions: SelectedOptionsMap;
  selectedQuantity: number;
  calculatedPrice: {
    unitPrice: number;
    totalPrice: number;
  };
}

export function OrderSummary({
  product,
  selectedOptions,
  selectedQuantity,
  calculatedPrice,
}: OrderSummaryProps) {
  const [artworkOption, setArtworkOption] = useState<'drive_link' | 'hire' | 'later'>('drive_link');
  const [driveUrl, setDriveUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [showWhatsappModal, setShowWhatsappModal] = useState(false);

  // Número do WhatsApp da gráfica para onde o cliente será direcionado
  // (pode ser alterado facilmente ou vir de variável de ambiente)
  const whatsappNumber = '5511999999999';

  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });
  };

  const designCost = artworkOption === 'hire' ? 35.0 : 0;
  const finalTotal = calculatedPrice.totalPrice + designCost;

  // Monta o resumo formatado em texto para WhatsApp
  const generateWhatsappMessage = () => {
    const specsList = product.attributeGroups
      .map((group) => {
        const selectedId = selectedOptions[group.id];
        const selectedOption = group.options.find((opt) => opt.id === selectedId);
        return `• *${group.title}:* ${selectedOption?.label || '-'}`;
      })
      .join('\n');

    let arteTexto = 'Vou enviar pelo próprio WhatsApp';
    if (artworkOption === 'drive_link') {
      arteTexto = driveUrl ? driveUrl.trim() : 'Link a ser enviado em instantes';
    } else if (artworkOption === 'hire') {
      arteTexto = 'Quero contratar a criação pela gráfica (+ R$ 35,00)';
    }

    return `🖨️ *NOVO PEDIDO - ${product.name.toUpperCase()}*
----------------------------------------
${specsList}
• *Tiragem:* ${selectedQuantity.toLocaleString('pt-BR')} unidades
• *Valor Total Estimado:* ${formatBRL(finalTotal)}
• *Arte do Material:* ${arteTexto}
----------------------------------------
Olá! Configurei este material pelo site e gostaria de confirmar o pedido e prazo de produção!`;
  };

  const handleOpenWhatsapp = () => {
    const message = generateWhatsappMessage();
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${whatsappNumber}?text=${encoded}`;
    window.open(url, '_blank');
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(generateWhatsappMessage());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-xs sticky top-6">
      <div className="border-b border-gray-200 pb-3 mb-4">
        <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block">
          Resumo da Configuração
        </span>
        <h2 className="text-lg font-bold text-gray-900 mt-0.5">{product.name}</h2>
      </div>

      {/* Resumo dos atributos selecionados */}
      <div className="space-y-1.5 text-xs text-gray-600 mb-4 bg-gray-50/70 p-3 rounded border border-gray-100">
        {product.attributeGroups.map((group) => {
          const selectedOptionId = selectedOptions[group.id];
          const selectedOption = group.options.find((opt) => opt.id === selectedOptionId);
          return (
            <div key={group.id} className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">{group.title}:</span>
              <span className="font-semibold text-gray-800 text-right">
                {selectedOption?.label || '-'}
              </span>
            </div>
          );
        })}
        <div className="flex justify-between items-center pt-1 border-t border-gray-200/60 font-semibold text-gray-900">
          <span>Tiragem:</span>
          <span>{selectedQuantity.toLocaleString('pt-BR')} unidades</span>
        </div>
      </div>

      {/* Opção da Arte (Foco MVP: Link do Drive ou Criação) */}
      <div className="mb-4">
        <label className="text-xs font-bold text-gray-800 uppercase tracking-wide block mb-2">
          Envio da Arte
        </label>
        <div className="space-y-2">
          <label
            className={`flex items-start gap-2.5 p-2.5 rounded border text-xs cursor-pointer transition-all ${
              artworkOption === 'drive_link'
                ? 'border-emerald-600 bg-emerald-50/20 ring-1 ring-emerald-600/30'
                : 'border-gray-200'
            }`}
          >
            <input
              type="radio"
              name="artwork"
              checked={artworkOption === 'drive_link'}
              onChange={() => setArtworkOption('drive_link')}
              className="mt-0.5 text-emerald-600 focus:ring-emerald-500"
            />
            <div className="w-full">
              <span className="font-semibold text-gray-900 block flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-emerald-600" />
                Link da Arte (Google Drive / WeTransfer / OneDrive)
              </span>
              <span className="text-[11px] text-gray-500 block">
                Cole o link com permissão de visualização
              </span>
            </div>
          </label>

          {artworkOption === 'drive_link' && (
            <div className="pl-6 pt-1">
              <input
                type="url"
                placeholder="https://drive.google.com/file/d/..."
                value={driveUrl}
                onChange={(e) => setDriveUrl(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              />
              <span className="text-[10px] text-gray-400 mt-1 block">
                Certifique-se de que o link esteja liberado para qualquer pessoa com o link.
              </span>
            </div>
          )}

          <label
            className={`flex items-start gap-2.5 p-2.5 rounded border text-xs cursor-pointer transition-all ${
              artworkOption === 'hire'
                ? 'border-emerald-600 bg-emerald-50/20 ring-1 ring-emerald-600/30'
                : 'border-gray-200'
            }`}
          >
            <input
              type="radio"
              name="artwork"
              checked={artworkOption === 'hire'}
              onChange={() => setArtworkOption('hire')}
              className="mt-0.5 text-emerald-600 focus:ring-emerald-500"
            />
            <div>
              <span className="font-semibold text-gray-900 block flex items-center gap-1.5">
                Contratar criação pela gráfica
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1 py-0.2 rounded font-bold">
                  + R$ 35,00
                </span>
              </span>
              <span className="text-[11px] text-gray-500 block">
                Nossa equipe de designers desenvolve o layout
              </span>
            </div>
          </label>

          <label
            className={`flex items-start gap-2.5 p-2.5 rounded border text-xs cursor-pointer transition-all ${
              artworkOption === 'later'
                ? 'border-emerald-600 bg-emerald-50/20 ring-1 ring-emerald-600/30'
                : 'border-gray-200'
            }`}
          >
            <input
              type="radio"
              name="artwork"
              checked={artworkOption === 'later'}
              onChange={() => setArtworkOption('later')}
              className="mt-0.5 text-emerald-600 focus:ring-emerald-500"
            />
            <div>
              <span className="font-semibold text-gray-900 block">Enviar arte pelo WhatsApp</span>
              <span className="text-[11px] text-gray-500 block">
                Envie o arquivo anexo direto na conversa com o atendente
              </span>
            </div>
          </label>
        </div>
      </div>

      {/* Bloco de Preço e Ação */}
      <div className="pt-3 border-t border-gray-200">
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-xs text-gray-500">Unitário estimado:</span>
          <span className="text-sm font-semibold text-gray-700">
            {formatBRL(calculatedPrice.unitPrice)}
          </span>
        </div>

        {artworkOption === 'hire' && (
          <div className="flex items-baseline justify-between mb-1 text-xs text-emerald-700">
            <span>Criação de Arte:</span>
            <span>+ R$ 35,00</span>
          </div>
        )}

        <div className="flex items-baseline justify-between mb-4">
          <span className="text-sm font-bold text-gray-800">Total do Pedido:</span>
          <span className="text-2xl font-black text-gray-900">
            {formatBRL(finalTotal)}
          </span>
        </div>

        {/* Botão de Fechamento via WhatsApp */}
        <button
          type="button"
          onClick={() => setShowWhatsappModal(true)}
          className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3.5 px-4 rounded text-sm shadow-sm transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
        >
          <MessageCircle className="w-5 h-5 fill-white" />
          <span>Finalizar Pedido no WhatsApp</span>
        </button>

        <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-gray-500">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-gray-400" /> Produção: {product.productionDays} dias úteis
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Atendimento Direto
          </span>
        </div>
      </div>

      {/* Modal de Confirmação do WhatsApp */}
      {showWhatsappModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-5 border border-gray-100">
            <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-3">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 fill-current" />
              </div>
              <div>
                <h3 className="font-bold text-base text-gray-900">Tudo pronto para o WhatsApp!</h3>
                <p className="text-xs text-gray-500">
                  Preparamos a mensagem com todos os detalhes técnicos do seu impresso.
                </p>
              </div>
            </div>

            <div className="bg-slate-900 text-slate-100 p-3 rounded-lg text-xs font-mono whitespace-pre-line mb-4 max-h-48 overflow-y-auto border border-slate-800">
              {generateWhatsappMessage()}
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={handleOpenWhatsapp}
                className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-2.5 px-4 rounded-md text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Abrir Conversa no WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleCopyMessage}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-md text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Mensagem copiada!' : 'Copiar texto da mensagem'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowWhatsappModal(false)}
                className="text-center text-xs text-gray-400 hover:text-gray-600 pt-1 cursor-pointer"
              >
                Voltar e alterar opções
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
