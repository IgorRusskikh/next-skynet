import ru from './messages/ru.json';
 
export type Messages = typeof ru;
 
declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}