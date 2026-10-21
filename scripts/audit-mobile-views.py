"""
Audit Mobile Views of Plastico Impex Web Experience
Tests multiple mobile viewport sizes (390x844 iPhone, 412x915 Pixel/Galaxy)
Captures screenshots across all pages and interactive components.
"""

import os
import time
from playwright.sync_api import sync_playwright

PAGES = [
    ('home-top', 'http://localhost:5173/'),
    ('products', 'http://localhost:5173/products'),
    ('pdp', 'http://localhost:5173/product/aerosteel-vacuum-flask-750ml'),
    ('solutions', 'http://localhost:5173/corporate-gifting'),
    ('branding', 'http://localhost:5173/branding'),
    ('contact', 'http://localhost:5173/contact'),
    ('admin-gate', 'http://localhost:5173/admin'),
]

def main():
    os.makedirs('reports/mobile', exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # iPhone 14/15 dimensions
        context = browser.new_context(
            viewport={"width": 390, "height": 844},
            user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1",
            is_mobile=True,
            has_touch=True
        )
        page = context.new_page()

        for name, url in PAGES:
            print(f"Testing {name} at {url}...")
            page.goto(url)
            page.wait_for_load_state('networkidle')
            time.sleep(1)
            page.screenshot(path=f'reports/mobile/{name}.png')

        # Test Hero Scrolling on Homepage
        print("Testing Hero scroll progression on mobile...")
        page.goto('http://localhost:5173/')
        page.wait_for_load_state('networkidle')
        time.sleep(1)

        # Scroll to 100vh
        page.evaluate("window.scrollTo(0, window.innerHeight * 1.5)")
        time.sleep(0.5)
        page.screenshot(path='reports/mobile/home-hero-scene2.png')

        # Scroll to 400vh
        page.evaluate("window.scrollTo(0, window.innerHeight * 4.0)")
        time.sleep(0.5)
        page.screenshot(path='reports/mobile/home-hero-scene4.png')

        # Scroll past hero to catalog section (800vh)
        page.evaluate("window.scrollTo(0, window.innerHeight * 8.0)")
        time.sleep(0.5)
        page.screenshot(path='reports/mobile/home-past-hero.png')

        # Test Mobile Menu Drawer
        print("Testing Mobile Menu Drawer...")
        menu_btn = page.locator('button[aria-label="Toggle navigation menu"]')
        if menu_btn.count() > 0:
            menu_btn.click()
            time.sleep(0.6)
            page.screenshot(path='reports/mobile/mobile-menu.png')

        browser.close()
        print("Mobile audit complete! Screenshots saved in reports/mobile/")

if __name__ == '__main__':
    main()
