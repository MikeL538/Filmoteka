import './scss/main.scss';
import { setupResetPasswordPage } from './ts/ui/resetPasswordPage.js';

(window as Window & { __resetPasswordDebug?: boolean }).__resetPasswordDebug = true;
console.log('reset-password.ts loaded');

setupResetPasswordPage();
