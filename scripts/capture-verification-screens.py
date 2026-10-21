from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    page.goto('http://localhost:5173/', wait_until='domcontentloaded')
    page.wait_for_timeout(1000)
    
    # Scene 1 screenshot
    page.screenshot(path='reports/smooth-scroll-scene1.png')
    
    # Scroll to Scene 2
    page.mouse.wheel(0, 1800)
    page.wait_for_timeout(900)
    page.screenshot(path='reports/smooth-scroll-scene2.png')
    
    # Scroll to Scene 4 (Precision Macro)
    page.mouse.wheel(0, 3200)
    page.wait_for_timeout(900)
    page.screenshot(path='reports/smooth-scroll-scene4.png')
    
    # Scroll to Scene 6 (Master Collection)
    page.mouse.wheel(0, 3200)
    page.wait_for_timeout(900)
    page.screenshot(path='reports/smooth-scroll-scene6.png')
    
    print("Screenshots captured successfully!")
    browser.close()
