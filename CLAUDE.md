@AGENTS.md

# ААЛАМ House

Одностраничный лендинг агентства недвижимости. Next.js 16 (App Router, `cacheComponents`), TypeScript, Tailwind 4.

- Проверка перед «готово»: `npm run lint` и `npm run build`.
- Содержимое лежит в `src/data` (`site.ts`, `listings.ts`, `content.ts`), компоненты его только отображают. Тексты и объекты править там, а не в разметке.
- Цвета и скругления заданы токенами в `src/app/globals.css`. Новые значения добавлять токеном, а не произвольным цветом в классе.
- Размеры шрифта пишутся как `text-[14px]`: у макета `line-height: normal`, а именованные размеры Tailwind подставляют свой интерлиньяж.
- Файлы не называть `com1`–`com9`, `lpt1`–`lpt9`, `con`, `nul`, `aux`, `prn` с любым расширением: это зарезервированные имена Windows, `git add` на них падает с «No such file or directory».
- Заявки отправляет серверный экшен `src/app/actions.ts` в Telegram, ключи берутся из `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID`.
