export interface IPageLink {
  href: string
  title: string
}

export interface INavigationLink {
  href: string
  label: string
}

export interface INavigationGroup {
  title: string
  links: readonly INavigationLink[]
}
