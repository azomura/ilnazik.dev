import type { IService } from '@/interfaces/service'

export const services: readonly IService[] = [
  {
    id: 'frontend',
    category: 'frontend',
    title: 'Frontend-разработка',
    description: 'Быстрые адаптивные интерфейсы, дизайн-системы и сложные клиентские сценарии.',
    priceFrom: 90000,
    duration: '4–5 недель'
  },
  {
    id: 'backend',
    category: 'backend',
    title: 'Backend-разработка',
    description: 'Архитектура сервисов, интеграции, базы данных и безопасные API.',
    priceFrom: 90000,
    duration: '4–5 недель'
  },
  {
    id: 'mobile',
    category: 'mobile',
    title: 'Мобильные приложения',
    description: 'Кроссплатформенные приложения, разработка под ключ.',
    priceFrom: 90000,
    duration: '4–5 недель'
  },
  {
    id: 'desktop',
    category: 'desktop',
    title: 'Приложения для ПК',
    description: 'Кроссплатформенные приложения, разработка под ключ.',
    priceFrom: 90000,
    duration: '4–5 недель'
  },
  {
    id: 'chatbots',
    category: 'chatbots',
    title: 'Чат-боты для TG, MAX, Discord',
    description: 'Кроссплатформенные боты, разработка полного цикла.',
    priceFrom: 90000,
    duration: '4–5 недель'
  },
  {
    id: 'mini-apps',
    category: 'mini-apps',
    title: 'Мини-приложения MAX, Telegram',
    description: 'Кроссплатформенные мини-приложения, разработка полного цикла.',
    priceFrom: 90000,
    duration: '4–5 недель'
  }
]
