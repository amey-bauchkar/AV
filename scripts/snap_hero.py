import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={'width': 1520, 'height': 850})
        await page.goto('http://localhost:5173/corporate-gifting?occasion=onboarding', wait_until='networkidle')
        await page.wait_for_timeout(1000)
        await page.screenshot(path=r'C:\Users\SEBIN\.gemini\antigravity-ide\brain\57981abb-e2e3-4248-a266-b1baad1b8019\hero_header_enlarged.png')
        await browser.close()
        print('Screenshot captured successfully!')

asyncio.run(run())
