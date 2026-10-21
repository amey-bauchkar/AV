from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1280, 'height': 850})

    # 1. Products page (reference style)
    page.goto('http://localhost:4173/products', wait_until='networkidle')
    page.wait_for_timeout(400)
    page.screenshot(path='reports/verify-products-style.png')
    print('1. Captured Products page')

    # 2. Branding page
    page.goto('http://localhost:4173/branding', wait_until='networkidle')
    page.wait_for_timeout(400)
    page.screenshot(path='reports/verify-branding-style.png')
    print('2. Captured Branding page')

    # 3. About page
    page.goto('http://localhost:4173/about', wait_until='networkidle')
    page.wait_for_timeout(400)
    page.screenshot(path='reports/verify-about-style.png')
    print('3. Captured About page')

    # 4. Contact page
    page.goto('http://localhost:4173/contact', wait_until='networkidle')
    page.wait_for_timeout(400)
    page.screenshot(path='reports/verify-contact-style.png')
    print('4. Captured Contact page')

    # 5. Homepage Branding Section
    page.goto('http://localhost:4173/', wait_until='networkidle')
    page.wait_for_timeout(400)
    # Scroll to Section D (Branding)
    page.evaluate("window.scrollTo(0, 3200)")
    page.wait_for_timeout(400)
    page.screenshot(path='reports/verify-home-branding-style.png')
    print('5. Captured Homepage branding section')

    # 6. Homepage CTA Section
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(400)
    page.screenshot(path='reports/verify-home-cta-style.png')
    print('6. Captured Homepage CTA section')

    browser.close()
    print('All screenshots captured successfully!')
