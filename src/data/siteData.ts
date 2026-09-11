import { BusFront, Compass, Star, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import athleticoParanaenseLogo from '../assets/athletico-paranaese.svg'
import atleticoMineiroLogo from '../assets/atletico-mineiro-logo-footylogos.svg'
import corinthiansLogo from '../assets/corinthians-logo-footylogos.svg'
import flamengoLogo from '../assets/flamengo-logo-footylogos.svg'
import gremioLogo from '../assets/gremio-logo-footylogos.svg'
import internacionalLogo from '../assets/sc-internacional-logo-footylogos.svg'
import palmeirasLogo from '../assets/palmeiras-logo-footylogos.svg'
import santosLogo from '../assets/santos-fc-logo-footylogos.svg'
import saopauloLogo from '../assets/sao-paulo-logo-footylogos.svg'
import vitoriaLogo from '../assets/vitoria-logo-footylogos.svg'
import onibus from '../assets/Onibus.jpg'
import van from '../assets/van.jpg'

export type Service = {
  title: string
  description: string
  icon: LucideIcon
}

export type FleetItem = {
  name: string
  image: string
  description: string
  tag: string
}

export type Club = {
  name: string
  logo: string
}

export const services: Service[] = [
  { title: 'Transporte para clubes', description: 'Logística dedicada para atletas, comissões técnicas e staff.', icon: BusFront },
  { title: 'Eventos esportivos', description: 'Operações coordenadas para jogos, torneios e grandes eventos.', icon: Star },
  { title: 'Transporte executivo', description: 'Ônibus e vans para empresas, convidados e grupos.', icon: Users },
  { title: 'Transfers', description: 'Conectamos aeroportos, hotéis, estádios e centros de treinamento.', icon: Compass },
]

export const fleet: FleetItem[] = [
  { name: 'Ônibus executivo', image: onibus, description: 'Conforto e espaço para operações que exigem presença e organização.', tag: 'Conforto em movimento' },
  { name: 'Van executiva', image: van, description: 'Flexibilidade e praticidade para deslocamentos sob medida.', tag: 'Agilidade e precisão' },
 
]

export const clubs: Club[] = [
  { name: 'Corinthians', logo: corinthiansLogo },
  { name: 'São Paulo', logo: saopauloLogo },
  { name: 'Santos', logo: santosLogo },
  { name: 'Palmeiras', logo: palmeirasLogo },
  { name: 'Flamengo', logo: flamengoLogo },
  { name: 'Internacional', logo: internacionalLogo },
  { name: 'Grêmio', logo: gremioLogo },
  { name: 'Vitória', logo: vitoriaLogo },
  { name: 'Atlético Mineiro', logo: atleticoMineiroLogo },
  { name: 'Athletico Paranaense', logo: athleticoParanaenseLogo },
]
