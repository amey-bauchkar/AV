from playwright.sync_api import sync_playwright
import os

os.makedirs('reports', exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    
    # Desktop tests
    page = browser.new_page(viewport={'width': 1280, 'height': 850})
    
    # 1. Dedicated Branding page Hero
    page.goto('http://localhost:5173/branding', wait_until='networkidle')
    page.wait_for_timeout(500)
    page.screenshot(path='reports/branding-page-desktop.png', full_page=False)
    print('Captured reports/branding-page-desktop.png')

    # 1b. Dedicated Branding page Bento Grid
    bento_section = page.locator('section:has-text("Four Benchmark Imprint Methods")')
    if bento_section.count() > 0:
        bento_section.first.scroll_into_view_if_needed()
        page.wait_for_timeout(500)
        bento_section.first.screenshot(path='reports/branding-bento-desktop.png')
        print('Captured reports/branding-bento-desktop.png')
    
    # 2. Homepage Branding section
    page.goto('http://localhost:5173/', wait_until='networkidle')
    page.wait_for_timeout(500)
    # Locate Section D
    branding_heading = page.locator('text=Precision Imprinted.')
    if branding_heading.count() > 0:
        branding_heading.first.scroll_into_view_if_needed()
        page.wait_for_timeout(500)
        page.screenshot(path='reports/home-branding-desktop.png')
        print('Captured reports/home-branding-desktop.png')
    
    # Mobile tests (iPhone 14 equivalent)
    mobile_page = browser.new_page(viewport={'width': 390, 'height': 844}, is_mobile=True)
    
    # 3. Dedicated Branding page mobile
    mobile_page.goto('http://localhost:5173/branding', wait_until='networkidle')
    mobile_page.wait_for_timeout(500)
    mobile_page.screenshot(path='reports/branding-page-mobile.png', full_page=False)
    print('Captured reports/branding-page-mobile.png')

    # 4. Homepage Branding section mobile
    mobile_page.goto('http://localhost:5173/', wait_until='networkidle')
    mobile_page.wait_for_timeout(500)
    branding_mobile = mobile_page.locator('text=Precision Imprinted.')
    if branding_mobile.count() > 0:
        branding_mobile.first.scroll_into_view_if_needed()
        mobile_page.wait_for_timeout(500)
        mobile_page.screenshot(path='reports/home-branding-mobile.png')
        print('Captured reports/home-branding-mobile.png')

    browser.close()
    print('Branding visual verification complete!')
