from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    page.goto('http://localhost:5173/')
    page.wait_for_timeout(1000)

    # Let's inspect window.onscroll and window event listeners
    res = page.evaluate("""() => {
        const hero = document.querySelector('section[aria-label="Interactive cinematic product showcase"]');
        const beforeY = window.scrollY;
        
        // Scroll directly
        window.scrollTo({ top: 2300, behavior: 'instant' });
        window.dispatchEvent(new Event('scroll'));
        
        const afterY = window.scrollY;
        return { beforeY, afterY };
    }""")
    print("Scroll result:", res)
    page.wait_for_timeout(1000)
    
    text = page.evaluate("document.querySelector('[role=\"progressbar\"]').innerText.replace(/\\n/g, ' ')")
    print("Indicator text after 1s:", text)
    browser.close()
