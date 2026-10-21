from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    page.goto('http://localhost:5173/')
    page.wait_for_timeout(1000)

    print("Initial:", page.evaluate("document.querySelector('[role=\"progressbar\"]').innerText.replace(/\\n/g, ' ')"))
    
    page.evaluate("window.scrollTo(0, 2300)")
    page.wait_for_timeout(800)
    
    print("After Y=2300:", page.evaluate("document.querySelector('[role=\"progressbar\"]').innerText.replace(/\\n/g, ' ')"))

    page.evaluate("window.scrollTo(0, 4600)")
    page.wait_for_timeout(800)
    
    print("After Y=4600:", page.evaluate("document.querySelector('[role=\"progressbar\"]').innerText.replace(/\\n/g, ' ')"))

    page.evaluate("window.scrollTo(0, 5600)")
    page.wait_for_timeout(800)
    
    print("After Y=5600:", page.evaluate("document.querySelector('[role=\"progressbar\"]').innerText.replace(/\\n/g, ' ')"))

    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(800)
    
    print("Reverse to Y=0:", page.evaluate("document.querySelector('[role=\"progressbar\"]').innerText.replace(/\\n/g, ' ')"))
    browser.close()
