import {
  test,
  Page,
  expect,
  chromium,
  Browser,
  BrowserContext,
} from "@playwright/test";
test.describe("Test", () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;

  test.beforeAll(async () => {
    const browser = await chromium.launch({
      headless: false,
    });
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("https://parabank.parasoft.com");
  });
  test("Register", async () => {
    await page.getByRole("link", { name: "Register" }).click();
    await page.locator('[id="customer\\.firstName"]').click();
    await page.locator('[id="customer\\.firstName"]').fill("Rahul");
    await page.locator('[id="customer\\.lastName"]').click();
    await page.locator('[id="customer\\.lastName"]').fill("Kumar");
    await page.locator('[id="customer\\.address\\.street"]').click();
    await page.locator('[id="customer\\.address\\.street"]').fill("Sector 4");
    await page.locator('[id="customer\\.address\\.city"]').click();
    await page.locator('[id="customer\\.address\\.city"]').fill("Chandigarh");
    await page.locator('[id="customer\\.address\\.state"]').click();
    await page.locator('[id="customer\\.address\\.state"]').fill("Chandigarh");
    await page.locator('[id="customer\\.address\\.zipCode"]').click();
    await page.locator('[id="customer\\.address\\.zipCode"]').fill("160101");
    await page.locator('[id="customer\\.phoneNumber"]').click();
    await page.locator('[id="customer\\.phoneNumber"]').fill("8765435789");
    await page.locator('[id="customer\\.ssn"]').click();
    await page.locator('[id="customer\\.ssn"]').fill("34687898");
    await page.locator('[id="customer\\.username"]').click();
    await page.locator('[id="customer\\.username"]').fill("rahul");
    await page.locator('[id="customer\\.password"]').click();
    await page.locator('[id="customer\\.password"]').fill("rahul@123");
    await page.locator("#repeatedPassword").click();
    await page.locator("#repeatedPassword").fill("rahul@123");
    await page.getByRole("button", { name: "Register" }).click();
  });

  test("Open Account", async () => {
    await page.locator('input[name="username"]').click();
    await page.locator('input[name="username"]').fill("rahul");
    await page.locator('input[name="password"]').click();
    await page.locator('input[name="password"]').fill("rahul@123");
    await page.locator('//*[@id="loginPanel"]/form/div[3]/input').click();
    await page.getByRole("link", { name: "Open New Account" }).click();
    await page.locator("#type").selectOption("1");
    await page.getByRole("button", { name: "Open New Account" }).click();

    await page.selectOption('//*[@id="fromAccountId"]', { index: 0 });
    await expect(page.locator('//*[@id="openAccountResult"]/p[1]')).toHaveText(
      "Congratulations, your account is now open."
    );
    await page.getByRole("link", { name: "Open New Account" }).click();
    await page.locator("#type").selectOption("1");

    await page.getByRole("button", { name: "Open New Account" }).click();
    await expect(page.locator('//*[@id="openAccountResult"]/p[1]')).toHaveText(
      "Congratulations, your account is now open."
    );
  });

  test("Bill Pay", async () => {
    await page.locator('input[name="username"]').click();
    await page.locator('input[name="username"]').fill("rahul");
    await page.locator('input[name="password"]').click();
    await page.locator('input[name="password"]').fill("rahul@123");
    await page.locator('//*[@id="loginPanel"]/form/div[3]/input').click();
    await page.locator('//*[@id="leftPanel"]/ul/li[4]/a').click();
    await page.locator('input[name="payee\\.name"]').click();
    await page.locator('input[name="payee\\.name"]').fill("John");
    await page.locator('input[name="payee\\.address\\.street"]').click();
    await page
      .locator('input[name="payee\\.address\\.street"]')
      .fill("Sector 13");
    await page.locator('input[name="payee\\.address\\.city"]').click();
    await page.locator('input[name="payee\\.address\\.city"]').fill("Noida");
    await page.locator('input[name="payee\\.address\\.state"]').click();
    await page.locator('input[name="payee\\.address\\.state"]').fill("U.P");
    await page.locator('input[name="payee\\.address\\.zipCode"]').click();
    await page.locator('input[name="payee\\.address\\.zipCode"]').fill("12345");
    await page.locator('input[name="payee\\.phoneNumber"]').click();
    await page.locator('input[name="payee\\.phoneNumber"]').fill("9876543289");
    await page.locator('input[name="payee\\.accountNumber"]').click();
    await page.locator('input[name="payee\\.accountNumber"]').fill("14010");
    await page.locator('input[name="verifyAccount"]').click();
    await page.locator('input[name="verifyAccount"]').fill("14010");
    await page.locator('input[name="amount"]').click();
    await page.locator('input[name="amount"]').fill("44");

    await page.selectOption('select[name="fromAccountId"]', { index: 0 });

    await page.getByRole("button", { name: "Send Payment" }).click();
    await expect(page.locator('//*[@id="billpayResult"]/h1')).toHaveText(
      " Bill Payment Complete"
    );
  });

  test("Transfer Funds", async () => {
    // await page.locator('input[name="username"]').click();
    // await page.locator('input[name="username"]').fill("rahul");
    // await page.locator('input[name="password"]').click();
    // await page.locator('input[name="password"]').fill("rahul@123");
    // await page.locator('//*[@id="loginPanel"]/form/div[3]/input').click();
    await page.locator('//*[@id="leftPanel"]/ul/li[3]/a').click();
    await page.waitForTimeout(3000);
    await page.locator("#amount").click();
    await page.locator("#amount").fill("60");
    await page.selectOption("#fromAccountId", { index: 0 });
    await page.selectOption("#toAccountId", { index: 1 });
    await page.getByRole("button", { name: "Transfer" }).click();
    await page.getByText("$60.00 has been transferred").click();
    await expect(page.locator('//*[@id="showResult"]/h1')).toHaveText(
      " Transfer Complete!"
    );
  });

  test("Reqest Loan", async () => {
    await page.locator('input[name="username"]').click();
    await page.locator('input[name="username"]').fill("rahul");
    await page.locator('input[name="password"]').click();
    await page.locator('input[name="password"]').fill("rahul@123");
    await page.locator('//*[@id="loginPanel"]/form/div[3]/input').click();
    await page.getByRole("link", { name: "Request Loan" }).click();
    await page.locator("#amount").click();
    await page.locator("#amount").fill("10");
    await page.locator("#downPayment").click();
    await page.locator("#downPayment").fill("2");
    await page.selectOption("#fromAccountId", { index: 0 });
    await page.getByRole("button", { name: "Apply Now" }).click();
    await page.waitForTimeout(2000);

    await expect(page.locator('//*[@id="requestLoanResult"]/h1')).toHaveText(
      " Loan Request Processed "
    );
  });
  

  test.afterAll(async () => {
    await page.locator('//*[@id="leftPanel"]/ul/li[8]/a').click();
    await page.waitForTimeout(3000);
  });
});
