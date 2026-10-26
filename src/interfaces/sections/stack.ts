export interface IStackTechnology {
  name: string
  description: string
  icon: string
  decoration: string
}

export interface IStackCategory {
  title: string
  description: string
  technologies: readonly IStackTechnology[]
}
