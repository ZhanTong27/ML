import { chromium, webkit, devices } from 'playwright';

const SITE = 'http://127.0.0.1:8080/career-roadmap/?v511=1';
const results = [];
const baseState = (dailyLogs, selectedDate = '2026-07-18') => ({
  selectedDate,
  calendarMonth: '2026-07',
  week: 'w1',
  checks: {},
  settings: { lastView: 'today' },
  dailyLogs,
  problemLogs: [],
  weeklyReviews: [],
  schedule: [],
  cycleArchives: [],
  customLearning: [],
  abilities: [],
  resume: {},
});

async function openSeeded(browser, options, state) {
  const context = await browser.newContext(options);
  await context.addInitScript(
    (seed) => localStorage.setItem('jett-career-os-v22', JSON.stringify(seed)),
    state,
  );
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  const response = await page.goto(SITE, { waitUntil: 'load', timeout: 45000 });
  await page.waitForFunction(() => window.CAREER_OS_V511?.complete === true, null, { timeout: 30000 });
  return { context, page, errors, response };
}

async function run(type, name, options) {
  const item = { name, passed: false, errors: [] };
  let browser;
  try {
    browser = await type.launch({ headless: true });
    const migratedRun = await openSeeded(
      browser,
      options,
      baseState([
        { id: 'unrelated-0719', date: '2026-07-19', summary: 'unrelated record must remain unchanged' },
        {
          id: 'misdated-0720',
          date: '2026-07-18',
          summary: '完成line coverage补齐；导师将部分人力转向时钟与复位UT自动生成方向；尚未进入生成器实现阶段。',
        },
      ]),
    );
    const { page, errors, response } = migratedRun;
    const migrated = await page.evaluate(() => ({
      unrelated: S.dailyLogs.some((x) => x.id === 'unrelated-0719' && x.date === '2026-07-19'),
      moved: S.dailyLogs.some((x) => x.id === 'misdated-0720' && x.date === '2026-07-20'),
      oldMisdated: S.dailyLogs.some((x) => x.id === 'misdated-0720' && x.date === '2026-07-18'),
      selectedDate: S.selectedDate,
      backup: !!localStorage.getItem('zhantong-career-os-v5-pre-v511-daily-date'),
    }));

    await page.evaluate(() => openQuick('daily'));
    const defaultDate = await page.$eval('#qDate', (element) => element.value);
    const localToday = await page.evaluate(() => localISO());
    await page.evaluate(() => {
      document.getElementById('qDate').value = '2026-07-21';
      document.getElementById('qText').value = JSON.stringify({
        date: '2026-07-18',
        summary: 'date conflict regression',
      });
      saveQuick('daily');
    });
    const imported = await page.evaluate(() => {
      const record = S.dailyLogs.find((x) => x.date === '2026-07-21');
      return {
        saved: !!record,
        payloadDate: record?.importMeta?.dateMismatch?.payloadDate || '',
        resolution: record?.importMeta?.dateMismatch?.resolution || '',
        selectedDate: S.selectedDate,
        unrelatedStillThere: S.dailyLogs.some((x) => x.id === 'unrelated-0719' && x.date === '2026-07-19'),
      };
    });
    await migratedRun.context.close();

    const untouchedRun = await openSeeded(
      browser,
      options,
      baseState([{ id: 'legitimate-0718', date: '2026-07-18', summary: 'legitimate July 18 record without migration signatures' }]),
    );
    const untouched = await untouchedRun.page.evaluate(() => ({
      remains: S.dailyLogs.some((x) => x.id === 'legitimate-0718' && x.date === '2026-07-18'),
      noUnexpectedJuly20: !S.dailyLogs.some((x) => x.id === 'legitimate-0718' && x.date === '2026-07-20'),
    }));

    item.errors = [...errors, ...untouchedRun.errors];
    item.migrated = migrated;
    item.defaultDate = defaultDate;
    item.localToday = localToday;
    item.imported = imported;
    item.untouched = untouched;
    item.http = [response?.status() || 0, untouchedRun.response?.status() || 0];
    item.passed =
      item.http.every((status) => status === 200) &&
      item.errors.length === 0 &&
      migrated.unrelated &&
      migrated.moved &&
      !migrated.oldMisdated &&
      migrated.selectedDate === '2026-07-20' &&
      migrated.backup &&
      defaultDate === localToday &&
      imported.saved &&
      imported.payloadDate === '2026-07-18' &&
      imported.resolution === 'selected-date-wins' &&
      imported.selectedDate === '2026-07-21' &&
      imported.unrelatedStillThere &&
      untouched.remains &&
      untouched.noUnexpectedJuly20;
    await untouchedRun.context.close();
  } catch (error) {
    item.errors.push(error?.stack || String(error));
  }
  if (browser) await browser.close();
  results.push(item);
}

await run(chromium, 'desktop', { viewport: { width: 1440, height: 1000 }, locale: 'zh-CN' });
await run(webkit, 'iphone', { ...devices['iPhone 15 Pro'], locale: 'zh-CN' });
console.log(JSON.stringify(results, null, 2));
if (results.some((item) => !item.passed)) process.exit(1);
