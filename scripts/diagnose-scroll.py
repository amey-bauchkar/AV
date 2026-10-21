from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    
    page.on("console", lambda msg: print(f"[CONSOLE]: {msg.text}"))
    page.on("pageerror", lambda err: print(f"[PAGE ERROR]: {err}"))
    
    page.goto('http://localhost:5173/', wait_until='domcontentloaded')
    page.wait_for_timeout(1000)
    
    print("Wheel scrolling (0, 1500)...")
    page.mouse.wheel(0, 1500)
    page.wait_for_timeout(1000)
    
    res = page.evaluate("""() => {
        const pbar = document.querySelector('[role="progressbar"]');
        return {
            scrollY: window.scrollY,
            pbar: pbar ? pbar.innerText.replace(/\\n/g, ' ') : null
        };
    }""")
    print("Result:", res)
    browser.close()
