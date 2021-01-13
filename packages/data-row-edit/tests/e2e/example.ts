import {jest} from '@jest/globals'
jest.setTimeout(40 * 1000)

describe("Data row edit", () => {
  it("should have the exact text 'TypeTest' in the h1", async () => {
    await page.goto("http://localhost:8080/test_TypeTest/1");
    // via the toEqualText method
    await expect(page).toEqualText("h1", "TypeTest")
    await page.screenshot({ path: `e2e-output/img/-${browserName}.png` });
    // or via the Playwright text selector engine
    await expect(page).toHaveSelector('"TypeTest"', {
      state: "attached"
    })
  })
})