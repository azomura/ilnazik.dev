export function createSectionRoutes<const M extends string, const T extends readonly string[]>(
  main: M,
  sections: T
) {
  return Object.fromEntries(sections.map(section => [section, `${main}#${section}`])) as {
    [K in T[number]]: `${M}#${K}`
  }
}
