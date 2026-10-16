/* Головне місце для ваших посилань і проєктів.
   Посилання нижче взяті з попередньої версії сайту — замініть їх, якщо вони змінилися.
   Порожнє href або значення з REPLACE_ME не стає кнопкою.

   Email: можна вказати "mailto:name@email.com" або просто "name@email.com".
   Новий проєкт: скопіюйте об’єкт у масиві projects і заповніть title, description, links.
   Іконки: "receipt", "plus". */
window.SITE_CONFIG = {
  social: [
    {
      id: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/mrzubr"
    },
    {
      id: "telegram",
      label: "Telegram",
      href: "https://t.me/Zubr6v"
    },
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com/Zubr6v"
    },
    {
      id: "email",
      label: "Email",
      href: "mailto:mrzubr755@gmail.com"
    }
  ],
  projects: [
    {
      title: "Хто Платив?",
      description: "Telegram-бот і Mini App для обліку спільних витрат, розподілу рахунків і розрахунку боргів між друзями.",
      icon: "receipt",
      placeholder: false,
      links: [
        { label: "Відкрити бота", href: "https://t.me/who_paid_bot" },
        { label: "Канал", href: "https://t.me/who_paid_info" }
      ]
    },
    {
      title: "Наступний проєкт",
      description: "Тут з’явиться наступний проєкт.",
      icon: "plus",
      placeholder: true,
      links: []
    }
  ]
};
