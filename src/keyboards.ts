// src/keyboards.ts
import { Markup } from 'telegraf';

/** Main menu */
export function mainMenu() {
  return Markup.inlineKeyboard([
    [Markup.button.callback('👛 Wallets', 'wallets'), Markup.button.callback('🟢 Buy', 'menu_buy')],
    [Markup.button.callback('🔴 Sell', 'menu_sell'), Markup.button.callback('📊 Price', 'price')],
    [Markup.button.callback('⚙️ Settings', 'settings'), Markup.button.callback('🧾 Balances', 'balances')],
  ]);
}

/** Settings menu just returns to previous handlers; buttons are built inline elsewhere */
export function settingsMenu() {
  return Markup.inlineKeyboard([
    [Markup.button.callback('⬅️ Back', 'main_back')],
    [Markup.button.callback('⛽ Gas Limit', 'set_gl'), Markup.button.callback('⚡ Gwei Booster', 'set_gb')],
    [Markup.button.callback('📈 Default Gas %', 'set_defpct'), Markup.button.callback('🤖 Auto-buy', 'auto_toggle')],
    [Markup.button.callback('🧮 Auto-buy amount', 'auto_amt')],
  ]);
}

/** Gas % quick picker */
export function buyGasPctMenu() {
  const mk = (n: number) => Markup.button.callback(
    n === 0 ? 'Reset (0%)' : (n > 0 ? `+${n}%` : `${n}%`),
    `gas_pct_set:${n}`
  );
  return Markup.inlineKeyboard([
    [mk(-25), mk(-10), mk(-5), mk(0), mk(+5), mk(+10), mk(+25)],
    [Markup.button.callback('⬅️ Back', 'menu_buy')],
  ]);
}

/**
 * Buy menu keyboard.
 * `walletRows` is an array of rows of wallet toggle buttons (W1..Wn),
 * which will be placed under the Wallets pill.
 */
export function buyMenu(gasPct: number, walletRows?: ReturnType<typeof Markup.button.callback>[][]) {
  const rows: any[][] = [];

  // Top gas pill
  rows.push([Markup.button.callback(`⛽ Gas % (${gasPct}%)`, 'gas_pct_open')]);

  // Back / Refresh
  rows.push([Markup.button.callback('⬅️ Back', 'main_back'), Markup.button.callback('🔄 Refresh', 'buy_refresh')]);

  // Unclickable “EDIT BUY DATA”
  rows.push([Markup.button.callback('•  EDIT BUY DATA  •', 'noop')]);

  // Contract / Pair (contract opens the token setter)
  rows.push([Markup.button.callback('📄 Contract', 'buy_set_token'), Markup.button.callback('🔗 Pair', 'pair_info')]);

  // Wallets pill + wallet toggles
  rows.push([Markup.button.callback('•  Wallets  •', 'noop')]);
  if (walletRows?.length) rows.push(...walletRows);

  // Choose Wallet (sets "active wallet") & Amount
  rows.push([Markup.button.callback('💼 Choose Wallet', 'choose_wallet'), Markup.button.callback('🔢 Amount', 'buy_set_amount')]);

  // Bottom actions
  rows.push([
    Markup.button.callback('✅ Buy Now', 'buy_exec'),
    Markup.button.callback('🛒 Buy All Wallets', 'buy_exec_all'),
  ]);

  return Markup.inlineKeyboard(rows);
}

/** Sell menu keyboard */
export function sellMenu() {
  return Markup.inlineKeyboard([
    [Markup.button.callback('25%', 'sell_pct_25'), Markup.button.callback('50%', 'sell_pct_50'), Markup.button.callback('75%', 'sell_pct_75'), Markup.button.callback('100%', 'sell_pct_100')],
    [Markup.button.callback('⬅️ Back', 'main_back'), Markup.button.callback('🧾 Balances', 'balances')],
    [Markup.button.callback('🔴 Sell Now', 'sell_exec')],
  ]);
}
