import { ModularProductConfigurator } from '@/components/configurator/ModularProductConfigurator';

export const metadata = {
  title: 'Configurador de Impressos | Gráfica Online',
  description: 'Personalize e compre panfletos, flyers, tags, cartões e catálogos com pré-visualização e orçamento dinâmico.',
};

export default function Home() {
  return <ModularProductConfigurator />;
}
