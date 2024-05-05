from bs4 import BeautifulSoup
from selenium import webdriver

def main():
    url = 'https://www.amazon.com/hz/wishlist/ls/1YWPWG9NHD4RP?ref_=wl_share'

    # invoke the webdriver
    browser = webdriver.Chrome()
        
    browser.get(url)

    # initialize the array and variable for item prices
    prices = []
    total_price = 0

    html = browser.execute_script("return document.getElementsByTagName('html')[0].innerHTML")
    soup = BeautifulSoup(html, "html.parser")

    for item in soup.find_all('span', class_='a-price'):
        for item_text in item.find_all(name="span"):
            st = item_text.text.replace("$", "")
            prices.append(float(st))
            break

    total_price = sum(prices)

    print("Count: ", len(prices))
    print("Total Price: $", total_price)

    # close the automated browser
    browser.close()


main()