from playwright.sync_api import sync_playwright
import os

os.makedirs('reports', exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    
    # 1. About Page Desktop - Showcase
    page = browser.new_page(viewport={'width': 1280, 'height': 900})
    page.goto('http://localhost:5173/about', wait_until='networkidle')
    page.wait_for_timeout(600)
    
    about_elem = page.locator('.about-showcase-section')
    if about_elem.count() > 0:
        about_elem.first.scroll_into_view_if_needed()
        page.wait_for_timeout(300)
        page.evaluate('window.scrollBy(0, -60)')
        page.wait_for_timeout(300)
        page.screenshot(path='reports/about-page-desktop.png')
        print('Captured reports/about-page-desktop.png')

    # 1b. About Page Desktop - Manufacturing Benchmarks
    bench_elem = page.locator('.manufacturing-benchmarks-container')
    if bench_elem.count() > 0:
        bench_elem.first.scroll_into_view_if_needed()
        page.wait_for_timeout(300)
        page.evaluate('window.scrollBy(0, -40)')
        page.wait_for_timeout(300)
        page.screenshot(path='reports/about-benchmarks-desktop.png')
        print('Captured reports/about-benchmarks-desktop.png')

    # 2. Homepage About Section Desktop
    page.goto('http://localhost:5173/', wait_until='networkidle')
    page.wait_for_timeout(600)
    home_about = page.locator('.about-showcase-section')
    if home_about.count() > 0:
        home_about.first.scroll_into_view_if_needed()
        page.wait_for_timeout(300)
        page.evaluate('window.scrollBy(0, -60)')
        page.wait_for_timeout(300)
        page.screenshot(path='reports/home-about-desktop.png')
        print('Captured reports/home-about-desktop.png')

    # 3. Mobile About Page
    mobile_page = browser.new_page(viewport={'width': 390, 'height': 844}, is_mobile=True)
    mobile_page.goto('http://localhost:5173/about', wait_until='networkidle')
    mobile_page.wait_for_timeout(600)
    mob_bench = mobile_page.locator('.manufacturing-benchmarks-container')
    if mob_bench.count() > 0:
        mob_bench.first.scroll_into_view_if_needed()
        mobile_page.wait_for_timeout(300)
        mobile_page.screenshot(path='reports/about-benchmarks-mobile.png')
        print('Captured reports/about-benchmarks-mobile.png')

    browser.close()
    print('About section verification complete!')
