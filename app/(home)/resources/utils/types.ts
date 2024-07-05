export interface CardInfo {
  id: number
  iconName: string
  grayText: string
  boldText: string
}
export interface CardsProps {
  title: string
  description: string
  information: string
  cards: CardInfo[]
}
