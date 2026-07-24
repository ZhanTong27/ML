import { chromium, webkit, devices } from 'playwright';
import fs from 'node:fs';

const SITE = 'http://127.0.0.1:8080/career-roadmap/?v512=3';
const results = [];

function review(id, start, end, summary, confidence) {
  return {
    schemaVersion: 'career-os-v4-weekly-1', reviewId: id, range: { start, end }, summary,
    highlights: [`${summary} highlight`], topEvidenceIds: [],
    diagnosisUpdates: [{ diagnosisId: 'diag-test', lifecycle: 'supported', previousConfidence: confidence - 5, confirmedConfidence: confidence, evidenceStrength: 'medium', reason: `${summary} reason`, supportingEvidenceIds: [], counterEvidenceIds: [] }],
    courseDecision: { action: 'light_adjustment', reason: `${summary} course`, addedTasks: [] },
    nextWeek: { priority: `${summary} priority`, workFocus: '', learningFocus: '', feedbackQuestion: '' },
    resumeCandidates: [], missingInformation: [],
  };
}

const seedState = {
  selectedDate: '2026-07-24', calendarMonth: '2026-07', week: 'w2', checks: {}, settings: { lastView: 'growth' },
  dailyLogs: [], problemLogs: [], schedule: [], cycleArchives: [], customLearning: [], abilities: [], resume: {}, facts: [], evidence: [],
  diagnoses: [{ id: 'diag-test', topic: 'Test Diagnosis', lifecycle: 'collecting' }],
  careerModel: [{ diagnosisId: 'diag-test', topic: 'Test Diagnosis', diagnosisConfidence: 40 }], diagnosisHistory: [], pendingConfidence: [{ diagnosisId: 'diag-test', date: '2026-07-24' }],
  weeklyReviewRecords: [review('2026-W29-seed', '2026-07-13', '2026-07-17', 'OLD W29 REVIEW', 50)],
  weeklyReviews: [review('2026-W30-legacy-import', '2026-07-20', '2026-07-24', 'NEW W30 REVIEW', 70)],
};

const timeout = (ms, label) => new Promise((_, reject) => setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms));

async function execute(type, name, options) {
  const item = { name, passed: false, errors: [] };
  let browser;
  try {
    browser = await type.launch({ headless: true });
    const context = await browser.newContext(options);
    await context.addInitScript((state) => localStorage.setItem('jett-career-os-v22', JSON.stringify(state)), seedState);
    const page = await context.newPage();
    page.setDefaultTimeout(10000);
    page.on('pageerror', (error) => item.errors.push(error.message));
    page.on('console', (message) => { if (message.type() === 'error') item.errors.push(message.text()); });
    const response = await page.goto(SITE, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForFunction(() => window.CAREER_OS_V512?.complete === true, null, { timeout: 20000 });
    await page.waitForTimeout(700);

    const promoted = await page.evaluate(() => ({
      formalIds: S.weeklyReviewRecords.map((x) => x.reviewId),
      legacyMirror: S.weeklyReviews.some((x) => x.formalReviewId === '2026-W30-legacy-import'),
      currentText: document.getElementById('weekly-review-current-v595')?.innerText || '',
      history: S.diagnosisHistory.some((x) => x.reviewId === '2026-W30-legacy-import' && x.diagnosisId === 'diag-test'),
      confidence: S.careerModel.find((x) => x.diagnosisId === 'diag-test')?.diagnosisConfidence,
    }));

    const w31 = review('2026-W31-quick-import', '2026-07-27', '2026-07-31', 'LATEST W31 REVIEW', 82);
    await page.evaluate((payload) => {
      openQuick('weekly');
      document.getElementById('qRange').value = '2026-07-27—2026-07-31';
      document.getElementById('qText').value = JSON.stringify(payload);
      document.querySelector('#quickContent [data-save]').click();
    }, w31);
    await page.waitForTimeout(1900);

    const imported = await page.evaluate(() => ({
      formal: S.weeklyReviewRecords.some((x) => x.reviewId === '2026-W31-quick-import'),
      legacyMirror: S.weeklyReviews.some((x) => x.formalReviewId === '2026-W31-quick-import'),
      currentText: document.getElementById('weekly-review-current-v595')?.innerText || '',
      detailText: document.getElementById('weekly-review-detail-v595')?.innerText || '',
      history: S.diagnosisHistory.some((x) => x.reviewId === '2026-W31-quick-import' && x.diagnosisId === 'diag-test'),
      confidence: S.careerModel.find((x) => x.diagnosisId === 'diag-test')?.diagnosisConfidence,
    }));

    item.http = response?.status() || 0; item.promoted = promoted; item.imported = imported;
    item.passed = item.http === 200 && item.errors.length === 0 &&
      promoted.formalIds.includes('2026-W30-legacy-import') && promoted.legacyMirror && promoted.currentText.includes('2026-W30-legacy-import') && promoted.currentText.includes('NEW W30 REVIEW') && promoted.history && promoted.confidence === 70 &&
      imported.formal && imported.legacyMirror && imported.currentText.includes('2026-W31-quick-import') && imported.currentText.includes('LATEST W31 REVIEW') && imported.detailText.includes('NEW W30 REVIEW') && imported.history && imported.confidence === 82;
    await context.close();
  } catch (error) {
    item.errors.push(error?.stack || String(error));
  }
  if (browser) await Promise.race([browser.close(), timeout(5000, `${name} browser close`)]).catch(() => {});
  results.push(item);
}

await Promise.race([execute(chromium, 'desktop', { viewport: { width: 1440, height: 1000 }, locale: 'zh-CN' }), timeout(45000, 'desktop')]).catch((error) => results.push({ name: 'desktop', passed: false, errors: [String(error)] }));
await Promise.race([execute(webkit, 'iphone', { ...devices['iPhone 15 Pro'], locale: 'zh-CN' }), timeout(45000, 'iphone')]).catch((error) => results.push({ name: 'iphone', passed: false, errors: [String(error)] }));
const report = { passed: results.length === 2 && results.every((item) => item.passed), results };
fs.mkdirSync('/tmp/v512-weekly', { recursive: true });
fs.writeFileSync('/tmp/v512-weekly/result.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
process.exit(report.passed ? 0 : 1);
