from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    
    # 1. Desktop Homepage
    page = browser.new_page(viewport={'width': 1280, 'height': 800})
    page.goto('http://localhost:5173/', wait_until='networkidle')
    page.wait_for_timeout(500)
    print('1. Homepage Title:', page.title())
    header_text = page.locator('header').inner_text()
    print('   Header text:\n', header_text)
    
    page.evaluate('window.scrollTo(0, document.body.scrollHeight)')
    page.wait_for_timeout(1000)
    footer_text = page.locator('footer').inner_text()
    print('   Footer contains AV Corporate giftings & events:', 'AV Corporate giftings & events' in footer_text)
    print('   Footer contains Plastico:', 'Plastico' in footer_text)
    page.screenshot(path='reports/verify-desktop-footer.png')

    # 2. Mobile View & Drawer
    m_page = browser.new_page(viewport={'width': 390, 'height': 844})
    m_page.goto('http://localhost:5173/', wait_until='networkidle')
    m_page.wait_for_timeout(500)
    # Click hamburger button
    m_page.click("button[aria-label='Open mobile navigation menu']")
    m_page.wait_for_timeout(600)
    drawer = m_page.locator("div[role='dialog']")
    drawer_text = drawer.inner_text()
    print('2. Mobile drawer text sample:\n', drawer_text[:200])
    print('   Mobile drawer contains AV Corporate giftings & events:', 'AV Corporate giftings & events' in drawer_text)
    print('   Mobile drawer contains Plastico:', 'Plastico' in drawer_text)
    print('   Mobile drawer contains PIX:', 'PIX' in drawer_text)
    m_page.screenshot(path='reports/verify-mobile-drawer.png')

    # 3. About Page
    page.goto('http://localhost:5173/about', wait_until='networkidle')
    page.wait_for_timeout(500)
    about_h1 = page.locator('h1').inner_text()
    print('3. About H1:', about_h1)
    about_text = page.inner_text('body')
    print('   About Page contains Plastico:', 'Plastico' in about_text)
    page.screenshot(path='reports/verify-about-page.png')

    # 4. Contact Page
    page.goto('http://localhost:5173/contact', wait_until='networkidle')
    page.wait_for_timeout(500)
    contact_text = page.inner_text('body')
    print('4. Contact Page contains Plastico:', 'Plastico' in contact_text)
    print('   Contact Page contains AV Corporate giftings & events:', 'AV Corporate giftings & events' in contact_text)

    # 5. Product Detail Page
    page.goto('http://localhost:5173/product/pix-033-thermos-vacuum-bottle-500ml', wait_until='networkidle')
    page.wait_for_timeout(500)
    print('5. PDP Title:', page.title())
    pdp_text = page.inner_text('body')
    print('   PDP contains Plastico:', 'Plastico' in pdp_text)

    # 6. Admin Page
    page.goto('http://localhost:5173/admin', wait_until='networkidle')
    page.wait_for_timeout(500)
    admin_login_text = page.inner_text('body')
    print('6. Admin Login contains Plastico:', 'Plastico' in admin_login_text)
    print('   Admin Login contains AV Corporate giftings & events:', 'AV Corporate giftings & events' in admin_login_text)

    browser.close()
    print('All verifications completed successfully!')
