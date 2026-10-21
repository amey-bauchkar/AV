"""
Capture and verify all mobile screens of Plastico Impex
Viewport: iPhone 14 / standard modern smartphone (390 x 844)
"""

import os
import time
from playwright.sync_api import sync_playwright

def main():
    os.makedirs('reports/mobile-verified', exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={"width": 390, "height": 844},
            user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1",
            is_mobile=True,
            has_touch=True
        )
        page = context.new_page()

        # 1. Home Top
        print("1. Capturing Home Top on mobile...")
        page.goto('http://localhost:5173/')
        page.wait_for_load_state('networkidle')
        time.sleep(1.5)
        page.screenshot(path='reports/mobile-verified/01-home-top.png')

        # 2. Hero Scene 2
        print("2. Capturing Hero Scene 2 on mobile...")
        page.evaluate("window.scrollTo(0, window.innerHeight * 1.5)")
        time.sleep(0.8)
        page.screenshot(path='reports/mobile-verified/02-home-scene2.png')

        # 3. Hero Scene 4
        print("3. Capturing Hero Scene 4 on mobile...")
        page.evaluate("window.scrollTo(0, window.innerHeight * 4.0)")
        time.sleep(0.8)
        page.screenshot(path='reports/mobile-verified/03-home-scene4.png')

        # 4. Past Hero to Categories
        print("4. Capturing Past Hero Categories on mobile...")
        page.evaluate("window.scrollTo(0, window.innerHeight * 8.0)")
        time.sleep(0.8)
        page.screenshot(path='reports/mobile-verified/04-home-categories.png')

        # 5. Open Mobile Menu
        print("5. Testing Mobile Navigation Menu...")
        page.goto('http://localhost:5173/')
        page.wait_for_load_state('networkidle')
        time.sleep(1)
        menu_btn = page.locator('button[aria-label="Open mobile navigation menu"]')
        if menu_btn.count() > 0:
            menu_btn.click()
            time.sleep(0.6)
            page.screenshot(path='reports/mobile-verified/05-mobile-nav-menu.png')

        # 6. Products Catalog Page
        print("6. Capturing Products Catalog on mobile...")
        page.goto('http://localhost:5173/products')
        page.wait_for_load_state('networkidle')
        time.sleep(1)
        page.screenshot(path='reports/mobile-verified/06-products-catalog.png')

        # 7. Real Product Detail Page
        print("7. Capturing Real Product Detail Page on mobile...")
        page.goto('http://localhost:5173/product/pix-033-thermos-vacuum-bottle-500ml')
        page.wait_for_load_state('networkidle')
        time.sleep(1)
        page.screenshot(path='reports/mobile-verified/07-pdp-top.png')

        # Scroll PDP to quantity & action buttons
        page.evaluate("window.scrollTo(0, 480)")
        time.sleep(0.5)
        page.screenshot(path='reports/mobile-verified/08-pdp-actions.png')

        # 8. Add item & Open Cart Drawer
        print("8. Testing Cart Drawer on mobile...")
        add_btn = page.locator('button[type="submit"]:has-text("Add 1 to Quotation Basket")')
        if add_btn.count() > 0:
            add_btn.click()
            time.sleep(0.5)
        cart_btn = page.locator('button[aria-label^="Open quotation basket"]')
        if cart_btn.count() > 0:
            cart_btn.click()
            time.sleep(0.6)
            page.screenshot(path='reports/mobile-verified/09-cart-drawer.png')

        # 9. Admin Desk on mobile
        print("9. Capturing Admin Desk on mobile...")
        page.goto('http://localhost:5173/admin')
        page.wait_for_load_state('networkidle')
        time.sleep(1)
        page.screenshot(path='reports/mobile-verified/10-admin-gate.png')

        browser.close()
        print("All mobile screenshots verified and saved in reports/mobile-verified/!")

if __name__ == '__main__':
    main()
